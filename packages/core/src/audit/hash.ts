import crypto from 'node:crypto';

// ============================================
// Stable, deterministic JSON stringify
// - Sorts keys recursively
// - Normalizes Dates
// - Preserves arrays
// ============================================

function stableSerialize(value: unknown): string {
  return JSON.stringify(normalize(value));
}

function normalize(value: unknown): unknown {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(normalize);
  }

  const obj = value as Record<string, unknown>;
  const sorted: Record<string, unknown> = {};

  for (const key of Object.keys(obj).sort()) {
    const v = obj[key];
    if (v !== undefined) {
      sorted[key] = normalize(v);
    }
  }

  return sorted;
}

// ============================================
// AUDIT HASH
// ============================================

export function computeAuditHash(payload: unknown): string {
  const serialized = stableSerialize(payload);
  return crypto.createHash('sha256').update(serialized).digest('hex');
}


