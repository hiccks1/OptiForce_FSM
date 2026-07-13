import fs from "fs";
import path from "path";

const DRIFTY_VERSION = "1.0.0";
const SYMBOL = "DRIFTY_FILE_CONTRACT";

const cwd = process.cwd();

// Minimal layer mapping that satisfies your validator's layer rules
function layersFor(rel: string): string[] {
  const p = rel.replace(/\\/g, "/");

  if (p.startsWith("packages/db/")) return ["L1_DATA"];
  if (p.startsWith("packages/ai/")) return ["L5_AI"];
  if (p.startsWith("packages/storage/") || p.startsWith("packages/queue/") || p.startsWith("packages/logger/"))
    return ["L4_INFRA"];

  if (p.startsWith("apps/api/")) return ["L3_INTEGRATION"];
  if (p.startsWith("apps/web/")) return ["L3_INTEGRATION"];
  if (p.startsWith("apps/worker/")) return ["L4_INFRA"];

  if (p.startsWith("packages/core/src/services/") || p.startsWith("packages/core/src/domain/") || p.startsWith("packages/core/src/events/"))
    return ["L2_DOMAIN"];

  if (p.startsWith("packages/core/src/config/") || p.startsWith("packages/core/src/schemas/") || p.startsWith("packages/schemas/"))
    return ["L2_DOMAIN"];

  // types/errors/context/audit/etc
  if (p.startsWith("packages/core/")) return ["L0_REPO"];

  return ["L0_REPO"];
}

function isProbablyProductionTs(rel: string): boolean {
  const p = rel.replace(/\\/g, "/");
  if (!p.endsWith(".ts") && !p.endsWith(".tsx")) return false;
  if (p.endsWith(".d.ts")) return false;
  if (p.endsWith(".test.ts") || p.endsWith(".spec.ts")) return false;
  if (p.includes("/node_modules/") || p.includes("/.git/")) return false;
  if (p.includes("/dist/") || p.includes("/build/") || p.includes("/coverage/")) return false;
  if (p.includes("/.turbo/") || p.includes("/.next/") || p.includes("/.cache/") || p.includes("/.vite/")) return false;
  if (p.includes("/out/") || p.includes("/tmp/")) return false;

  // match what your validator tends to treat as "production roots"
  return (
    p.startsWith("packages/") ||
    p.startsWith("apps/")
  );
}

function walk(dirAbs: string, out: string[]) {
  for (const entry of fs.readdirSync(dirAbs)) {
    const full = path.join(dirAbs, entry);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (entry === "node_modules" || entry === ".git") continue;
      walk(full, out);
      continue;
    }
    if (!st.isFile()) continue;
    const rel = path.relative(cwd, full).replace(/\\/g, "/");
    if (isProbablyProductionTs(rel)) out.push(rel);
  }
}

function hasContract(src: string): boolean {
  return new RegExp(`\\bexport\\s+const\\s+${SYMBOL}\\b`).test(src);
}

function insertContract(src: string, layers: string[]): string {
  // Must be a plain object literal for your validator to read it.
  const snippet =
`export const ${SYMBOL} = {
  driftyVersion: "${DRIFTY_VERSION}",
  layers: ${JSON.stringify(layers)},
};

`;

  // Put after leading comment banner if present
  const m = src.match(/^(\s*(?:\/\/[^\n]*\n|\/\*[\s\S]*?\*\/\s*\n)+)/);
  if (m) {
    return m[1] + "\n" + snippet + src.slice(m[1].length);
  }
  return snippet + src;
}

const files: string[] = [];
walk(cwd, files);

let changed = 0;

for (const rel of files) {
  const abs = path.join(cwd, rel);
  const src = fs.readFileSync(abs, "utf8");
  if (hasContract(src)) continue;

  const layers = layersFor(rel);
  const next = insertContract(src, layers);
  fs.writeFileSync(abs, next, "utf8");
  changed++;
}

console.log(`DRIFTY_FILE_CONTRACT inserted into ${changed} file(s).`);
