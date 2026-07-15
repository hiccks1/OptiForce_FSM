// ============================================
// packages/core/src/domain/shared/validation-result.ts
// Shared validation-result primitives - Pure Domain Logic
// ============================================
// LAYER: Domain
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

/**
 * Canonical "everything is fine" result. Frozen so callers can share it safely.
 */
export const VALID: ValidationResult = { valid: true, errors: [], warnings: [] };

/**
 * Build a failing result from one or more error messages.
 */
export function invalid(...errors: string[]): ValidationResult {
  return { valid: false, errors, warnings: [] };
}

/**
 * Attach warnings to an existing result without changing its validity.
 */
export function withWarnings(
  result: ValidationResult,
  ...warnings: string[]
): ValidationResult {
  return { ...result, warnings: [...result.warnings, ...warnings] };
}

/**
 * Merge several results into one, concatenating errors and warnings.
 * Valid only when every input result is valid.
 */
export function combineResults(
  results: readonly ValidationResult[]
): ValidationResult {
  const errors = results.flatMap((r) => r.errors);
  const warnings = results.flatMap((r) => r.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
