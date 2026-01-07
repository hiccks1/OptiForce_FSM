// ============================================
// packages/core/src/errors/AuthorizationError.ts
// ============================================

export class AuthorizationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'AUTHORIZATION_ERROR', 403, details);
  }
}
