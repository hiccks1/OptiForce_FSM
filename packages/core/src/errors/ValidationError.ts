// ============================================
// packages/core/src/errors/ValidationError.ts
// ============================================

export class ValidationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

// ============================================
// packages/core/src/errors/NotFoundError.ts
// ============================================

export class NotFoundError extends DomainError {
  constructor(
    entityType: string,
    entityId: string
  ) {
    super(
      `${entityType} with id ${entityId} not found`,
      'NOT_FOUND',
      404,
      { entityType, entityId }
    );
  }
}
