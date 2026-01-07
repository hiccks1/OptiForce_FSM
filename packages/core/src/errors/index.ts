// ============================================
// packages/core/src/errors/index.ts
// ============================================

export * from './DomainError';
export * from './ValidationError';
export * from './NotFoundError';
export * from './AuthorizationError';
export * from './ConfigurationError';
export * from './ConflictError';

// Type guard
export function isDomainError(error: unknown): error is DomainError {
  return error instanceof DomainError;
}
