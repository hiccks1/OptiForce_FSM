// ============================================
// packages/core/src/errors/ConfigurationError.ts
// ============================================

export class ConfigurationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'CONFIGURATION_ERROR', 500, details);
  }
}
