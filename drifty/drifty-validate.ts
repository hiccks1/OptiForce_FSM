
import ts from "typescript";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { minimatch } from "minimatch";
import {
  DRIFTY_VERSION,
  DriftyLayer,
  DRIFTY_FILE_DECLARATION_SYMBOL,
} from "./laws";

type Rules = {
  version: string;
  productionRoots: string[];
  productionSubdir: string;
  excludeGlobs: string[];
  bannedTokens: string[];
  schemaPrismaPath: string;
  allowJobDataFullReplaceIn: string[];
  aiLogMustMention: string[];
};

const targetPath = process.argv[2] ?? ".";
const cwd = process.cwd();

const rules = loadRules();
const prismaModels = loadPrismaModels(path.resolve(cwd, rules.schemaPrismaPath));

const files = collectFilesForValidation(targetPath, rules);

let failures = 0;

for (const file of files) {
  try {
    validateFile(file, rules, prismaModels);
  } catch (err: any) {
    failures++;
    console.error(`\nFAIL ${file}`);
    console.error(`  ${err?.message ?? String(err)}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} file(s) failed DRIFTY validation.`);
  process.exit(1);
}

console.log("\nDRIFTY validation passed.");

function loadRules(): Rules {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const rulesPath = path.resolve(__dirname, "rules.json");
  const raw = fs.readFileSync(rulesPath, "utf8");
  const parsed = JSON.parse(raw) as Rules;

  if (parsed.version !== DRIFTY_VERSION) {
    throw new Error(
      `rules.json version mismatch (${parsed.version}), expected ${DRIFTY_VERSION}`
    );
  }

  return parsed;
}

function collectFilesForValidation(root: string, rules: Rules): string[] {
  const out: string[] = [];
  const rootAbs = path.resolve(cwd, root);

  const productionRootAbs = rules.productionRoots.map((r) =>
    path.resolve(cwd, r)
  );

  walk(rootAbs);

  return out;

  function walk(dir: string) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const full = path.join(dir, entry);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        if (entry === "node_modules" || entry === ".git") continue;
        walk(full);
        continue;
      }

      if (!stat.isFile()) continue;

      if (full.endsWith(".d.ts")) continue;
      if (full.endsWith(".test.ts") || full.endsWith(".spec.ts")) continue;
      if (full.endsWith(".md")) continue;

      const relFromCwd = normalizeSlashes(path.relative(cwd, full));
      if (isExcluded(relFromCwd, rules.excludeGlobs)) continue;

      if (!full.endsWith(".ts") && !full.endsWith(".tsx")) continue;

      if (!isUnderProductionRoots(full, productionRootAbs, rules.productionSubdir)) {
        continue;
      }

      out.push(relFromCwd);
    }
  }
}

function isUnderProductionRoots(
  fileAbs: string,
  productionRootsAbs: string[],
  productionSubdir: string
): boolean {
  const normalizedSubdir = productionSubdir.replace(/\/+$/, "");
  for (const rootAbs of productionRootsAbs) {
    const sub = path.join(rootAbs, normalizedSubdir);
    if (isPathUnder(fileAbs, sub)) return true;
  }
  return false;
}

function isExcluded(relPath: string, globs: string[]): boolean {
  for (const g of globs) {
    if (minimatch(relPath, g, { dot: true })) return true;
  }
  return false;
}

function isPathUnder(fileAbs: string, dirAbs: string): boolean {
  const rel = path.relative(dirAbs, fileAbs);
  return !!rel && !rel.startsWith("..") && !path.isAbsolute(rel);
}

function normalizeSlashes(p: string): string {
  return p.replace(/\\/g, "/");
}

function stripComments(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

function validateFile(fileRel: string, rules: Rules, prismaModels: Set<string>): void {
  const fileAbs = path.resolve(cwd, fileRel);
  const sourceText = fs.readFileSync(fileAbs, "utf8");

  enforceBannedTokens(fileRel, sourceText, rules.bannedTokens);

  enforceNoUnknownPrismaDelegates(fileRel, sourceText, prismaModels);

  const sourceFile = ts.createSourceFile(
    fileAbs,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    fileAbs.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );

  const contract = extractDriftyContract(sourceFile);
  if (!contract) {
    throw new Error(`Missing export ${DRIFTY_FILE_DECLARATION_SYMBOL}`);
  }

  if (contract.driftyVersion !== DRIFTY_VERSION) {
    throw new Error(`Drifty version mismatch (${contract.driftyVersion})`);
  }

  if (!Array.isArray(contract.layers) || contract.layers.length === 0) {
    throw new Error("Drifty file must declare at least one layer");
  }

  enforceLayerRules(fileRel, sourceText, contract.layers as DriftyLayer[], rules);
}

function enforceBannedTokens(fileRel: string, sourceText: string, banned: string[]): void {
  const scanText = stripComments(sourceText);
  for (const token of banned) {
    const re = new RegExp(`\\b${escapeRegExp(token)}\\b`, "i");
    if (re.test(scanText)) {
      throw new Error(`Banned token "${token}"`);
    }
  }
}

function enforceNoUnknownPrismaDelegates(
  fileRel: string,
  sourceText: string,
  prismaModels: Set<string>
): void {
  // Find prisma.<delegate> usage, and ensure <delegate> is a real Prisma model delegate.
  // This is a high-signal drift check: prisma.visit, prisma.customer, etc.
  const scanText = stripComments(sourceText);

  const re = /\bprisma\.([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(scanText)) !== null) {
    const delegate = m[1];

    // Allow prisma.$transaction, prisma.$connect, prisma.$disconnect, prisma.$queryRaw, etc.
    if (delegate.startsWith("$")) continue;

    // Delegate names are typically camelCase model names (job, companyConfig, aiActionLog, etc).
    // We compare case-insensitively against model names from schema.prisma.
    const ok = hasModelDelegate(prismaModels, delegate);
    if (!ok) {
      throw new Error(`Unknown Prisma delegate "prisma.${delegate}" (not in schema.prisma)`);
    }
  }
}

function hasModelDelegate(models: Set<string>, delegate: string): boolean {
  const dl = delegate.toLowerCase();
  for (const m of models) {
    if (m.toLowerCase() === dl) return true;
  }
  return false;
}

function enforceLayerRules(
  fileRel: string,
  sourceText: string,
  layers: DriftyLayer[],
  rules: Rules
): void {
  if (layers.includes(DriftyLayer.L3_INTEGRATION) || layers.includes(DriftyLayer.L5_AI)) {
    enforceNoDirectPrismaMutations(sourceText);
  }

  if (layers.includes(DriftyLayer.L2_DOMAIN)) {
    enforceNoJobDataFullReplaceOutsideAllowlist(fileRel, sourceText, rules.allowJobDataFullReplaceIn);
  }

  if (layers.includes(DriftyLayer.L5_AI)) {
    enforceAiLoggingSignal(sourceText, rules.aiLogMustMention);
  }
}

function enforceNoDirectPrismaMutations(sourceText: string): void {
  const scanText = stripComments(sourceText);

  // Very targeted: prisma.<model>.create/update/delete/upsert
  const re = /\bprisma\.[a-zA-Z_][a-zA-Z0-9_]*\.(create|update|delete|upsert)\s*\(/g;
  if (re.test(scanText)) {
    throw new Error("Integration/AI layer cannot call prisma.create/update/delete/upsert directly");
  }
}

function enforceNoJobDataFullReplaceOutsideAllowlist(
  fileRel: string,
  sourceText: string,
  allowlist: string[]
): void {
  const normalized = normalizeSlashes(fileRel);
  const allowed = allowlist.map(normalizeSlashes);

  if (allowed.includes(normalized)) return;

  const scanText = stripComments(sourceText);

  // Detect the specific forbidden pattern: prisma.job.update({ data: { data: ... } })
  const re = /\bprisma\.job\.update\s*\(\s*\{[\s\S]*?\bdata\s*:\s*\{[\s\S]*?\bdata\s*:/m;
  if (re.test(scanText)) {
    throw new Error("Full Job.data replace is forbidden outside allowlist (use patch/merge)");
  }
}

function enforceAiLoggingSignal(sourceText: string, mustMention: string[]): void {
  const scanText = stripComments(sourceText);
  for (const needle of mustMention) {
    if (scanText.includes(needle)) return;
  }
  throw new Error("AI layer must log actions (missing AIActionLog signal)");
}

function extractDriftyContract(sourceFile: ts.SourceFile): any | null {
  let found: any = null;

  sourceFile.forEachChild((node) => {
    if (
      ts.isVariableStatement(node) &&
      node.declarationList.declarations.length === 1
    ) {
      const decl = node.declarationList.declarations[0];
      if (
        ts.isIdentifier(decl.name) &&
        decl.name.text === DRIFTY_FILE_DECLARATION_SYMBOL &&
        decl.initializer &&
        ts.isObjectLiteralExpression(decl.initializer)
      ) {
        found = literalToObject(decl.initializer);
      }
    }
  });

  return found;
}

function literalToObject(expr: ts.ObjectLiteralExpression): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const prop of expr.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      obj[prop.name.text] = literalValue(prop.initializer);
    }
  }
  return obj;
}

function literalValue(node: ts.Expression): any {
  if (ts.isStringLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literalValue);
  return undefined;
}

function loadPrismaModels(schemaPathAbs: string): Set<string> {
  const schema = fs.readFileSync(schemaPathAbs, "utf8");
  const models = new Set<string>();

  // Simple and stable: parse `model X {` blocks
  const re = /^\s*model\s+([A-Za-z_][A-Za-z0-9_]*)\s*\{/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(schema)) !== null) {
    models.add(m[1]);
  }

  return models;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
TS
