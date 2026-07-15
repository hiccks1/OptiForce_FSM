#!/usr/bin/env node

import ts from "typescript";
import fs from "fs";
import path from "path";
import {
  DRIFTY_VERSION,
  DriftyLayer,
  DRIFTY_FILE_DECLARATION_SYMBOL,
} from "./laws";

// ============================================================
// CLI ENTRY
// ============================================================

const targetPath = process.argv[2];
if (!targetPath) {
  console.error("Usage: drifty-validate <path>");
  process.exit(1);
}

const files = collectTsFiles(targetPath);
let failures = 0;

for (const file of files) {
  try {
    validateFile(file);
  } catch (err: any) {
    failures++;
    console.error(`\n❌ ${file}`);
    console.error(`   ${err.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} file(s) failed DRIFTY validation.`);
  process.exit(1);
}

console.log("\n✅ DRIFTY validation passed.");

// ============================================================
// FILE COLLECTION
// ============================================================

function collectTsFiles(dir: string): string[] {
  const out: string[] = [];

  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      out.push(...collectTsFiles(full));
    } else if (
      full.endsWith(".ts") &&
      !full.endsWith(".d.ts") &&
      !full.includes("node_modules")
    ) {
      out.push(full);
    }
  }

  return out;
}

// ============================================================
// FILE VALIDATION
// ============================================================

function validateFile(filePath: string): void {
  const sourceText = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  const contract = extractDriftyContract(sourceFile);
  if (!contract) {
    throw new Error(
      `Missing export ${DRIFTY_FILE_DECLARATION_SYMBOL}`
    );
  }

  if (contract.driftyVersion !== DRIFTY_VERSION) {
    throw new Error(
      `Drifty version mismatch (${contract.driftyVersion})`
    );
  }

  enforceLayerRules(sourceFile, contract.layers);
}

// ============================================================
// CONTRACT EXTRACTION
// ============================================================

function extractDriftyContract(
  sourceFile: ts.SourceFile
): any | null {
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

function literalToObject(
  expr: ts.ObjectLiteralExpression
): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const prop of expr.properties) {
    if (
      ts.isPropertyAssignment(prop) &&
      ts.isIdentifier(prop.name)
    ) {
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
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map(literalValue);
  return undefined;
}

// ============================================================
// LAYER RULE ENFORCEMENT
// ============================================================

function enforceLayerRules(
  sourceFile: ts.SourceFile,
  layers: DriftyLayer[]
): void {
  if (layers.includes(DriftyLayer.L2_DOMAIN)) {
    enforceDomainRules(sourceFile);
  }

  if (layers.includes(DriftyLayer.L3_INTEGRATION)) {
    enforceNoDirectMutation(sourceFile);
  }

  if (layers.includes(DriftyLayer.L5_AI)) {
    enforceAiRules(sourceFile);
  }
}

// ============================================================
// DOMAIN RULES
// ============================================================

function enforceDomainRules(sourceFile: ts.SourceFile): void {
  let hasBeforeHook = false;
  let hasAfterHook = false;
  let mutatesJson = false;

  sourceFile.forEachChild(function walk(node) {
    if (
      ts.isMethodDeclaration(node) &&
      node.name &&
      ts.isIdentifier(node.name)
    ) {
      if (node.name.text === "beforeMutate") hasBeforeHook = true;
      if (node.name.text === "afterMutate") hasAfterHook = true;
    }

    if (
      ts.isPropertyAccessExpression(node) &&
      node.name.text === "data"
    ) {
      mutatesJson = true;
    }

    ts.forEachChild(node, walk);
  });

  if (!hasBeforeHook || !hasAfterHook) {
    throw new Error(
      "Domain service must implement beforeMutate and afterMutate hooks"
    );
  }

  if (!mutatesJson) {
    throw new Error(
      "Domain service claims L2_DOMAIN but never touches JSONB data"
    );
  }
}

// ============================================================
// INTEGRATION RULES
// ============================================================

function enforceNoDirectMutation(
  sourceFile: ts.SourceFile
): void {
  sourceFile.forEachChild(function walk(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression)
    ) {
      const name = node.expression.name.text;
      if (name === "update" || name === "create") {
        throw new Error(
          "Integration layer cannot call prisma.create/update directly"
        );
      }
    }
    ts.forEachChild(node, walk);
  });
}

// ============================================================
// AI RULES
// ============================================================

function enforceAiRules(sourceFile: ts.SourceFile): void {
  let logsAI = false;

  sourceFile.forEachChild(function walk(node) {
    if (
      ts.isIdentifier(node) &&
      node.text === "AIActionLog"
    ) {
      logsAI = true;
    }
    ts.forEachChild(node, walk);
  });

  if (!logsAI) {
    throw new Error(
      "AI layer must log all actions to AIActionLog"
    );
  }
}
