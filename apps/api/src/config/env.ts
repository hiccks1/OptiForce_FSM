// apps/api/src/config/env.ts
// Global environment bootstrap (runs once)

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};


import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Always resolve from repo root, not cwd
const ROOT = path.resolve(__dirname, '../../../../');

// Load root .env (source of truth)
const rootEnv = path.join(ROOT, '.env');
if (fs.existsSync(rootEnv)) {
  dotenv.config({ path: rootEnv });
}

// Optional fallback for package-local overrides
const localEnv = path.join(ROOT, 'packages/db/.env');
if (fs.existsSync(localEnv)) {
  dotenv.config({ path: localEnv, override: false });
}

// Fail fast if required values missing
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing (env bootstrap failed)');
}
