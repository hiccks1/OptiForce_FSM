// ============================================
// packages/core/src/errors/base.ts
// Domain Error Base Class
// ============================================
// LAYER: Errors
// IMPORTS FROM: types (for types only)
// EXPORTS TO: All layers
// ============================================

/**
 * Base class for all domain errors.
 * 
 * DESIGN DECISIONS:
 * - All domain errors extend this class
 * - Errors are serializable for audit logging
 * - HTTP status codes are suggestions, not requirements
 * - Error codes are machine-readable, messages are human-readable
 */
export abstract class DomainError extends Error {
  public readonly timestamp: Date;

  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();

    // Maintains proper stack trace in V8 environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Serialize for audit logging (strips stack trace)
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      timestamp: this.timestamp.toISOString(),
    };
  }

  /**
   * Create a safe version for client responses (no internal details)
   */
  toClientJSON(): Record<string, unknown> {
    return {
      code: this.code,
      message: this.message,
    };
  }
}



