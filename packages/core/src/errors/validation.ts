// ============================================
// packages/core/src/errors/validation.ts
// Validation Errors
// ============================================

import { DomainError } from './base';

import { DriftyLayer } from "../../drifty/laws";
/**
 * Thrown when input validation fails.
 * 
 * Use for:
 * - Invalid field values
 * - Missing required fields
 * - Type mismatches
 * - Business rule violations that are input-related
 */
export class ValidationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }

  /**
   * Factory for field-specific validation errors
   */
  static field(
    fieldName: string,
    reason: string,
    value?: unknown
  ): ValidationError {
    return new ValidationError(`${fieldName}: ${reason}`, {
      field: fieldName,
      reason,
      value: value !== undefined ? String(value) : undefined,
    });
  }

  /**
   * Factory for missing required field
   */
  static required(fieldName: string): ValidationError {
    return new ValidationError(`${fieldName} is required`, {
      field: fieldName,
      reason: 'required',
    });
  }

  /**
   * Factory for invalid type
   */
  static invalidType(
    fieldName: string,
    expected: string,
    received: string
  ): ValidationError {
    return new ValidationError(
      `${fieldName}: expected ${expected}, received ${received}`,
      { field: fieldName, expected, received }
    );
  }

  /**
   * Factory for schema version mismatch
   */
  static schemaVersion(
    expected: number,
    received: number
  ): ValidationError {
    return new ValidationError(
      `Schema version mismatch: expected ${expected}, received ${received}`,
      { expected, received, reason: 'schema_version_mismatch' }
    );
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L0_REPO],
} as const;
