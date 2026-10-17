// apps/api/src/config/env.ts
// Global environment bootstrap (runs once)

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};


import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

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

const DEMO_JWT_SECRET = 'optiforce-demo-mode-insecure-secret-do-not-use';

const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is missing (env bootstrap failed)'),
  // Demo/sales mode: email-only sign-in, unauthenticated requests fall back to a demo tenant.
  DEMO_MODE: z.enum(['true', 'false']).default('false').transform((v) => v === 'true'),
  JWT_SECRET: z.string().optional(),
  JWT_EXPIRES_IN: z.string().default('12h'),
  PORTAL_LINK_TTL: z.string().default('7d'),
  PORTAL_BASE_URL: z.string().url().default('http://localhost:5173'),
  // Comma-separated list of allowed browser origins.
  CORS_ORIGINS: z.string().optional(),
});

function loadConfig() {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new Error(`Invalid environment: ${issues}`);
  }
  const env = parsed.data;

  let jwtSecret = env.JWT_SECRET;
  if (!jwtSecret || jwtSecret.length < 32) {
    if (env.NODE_ENV === 'production' || !env.DEMO_MODE) {
      throw new Error('JWT_SECRET must be set to at least 32 characters (only optional when DEMO_MODE=true outside production)');
    }
    jwtSecret = DEMO_JWT_SECRET;
  }

  if (env.DEMO_MODE) {
    // eslint-disable-next-line no-console
    console.warn('[api] DEMO_MODE is ON: email-only sign-in and demo tenant fallback are enabled. Never use with real customer data.');
  }

  const corsOrigins = env.CORS_ORIGINS
    ? env.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
    : [env.PORTAL_BASE_URL];

  return {
    nodeEnv: env.NODE_ENV,
    port: env.PORT,
    demoMode: env.DEMO_MODE,
    jwtSecret,
    jwtExpiresIn: env.JWT_EXPIRES_IN,
    portalLinkTtl: env.PORTAL_LINK_TTL,
    portalBaseUrl: env.PORTAL_BASE_URL.replace(/\/$/, ''),
    corsOrigins,
  };
}

export const config = loadConfig();
