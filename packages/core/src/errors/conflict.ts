// ============================================
// packages/core/src/errors/conflict.ts
// Conflict Errors
// ============================================

import { DomainError } from './base';
import type { EntityType, ImmutabilityReason } from '../types';

/**
 * Thrown when an operation conflicts with current state.
 * 
 * Use for:
 * - Optimistic locking failures
 * - Duplicate key violations
 * - Invalid state transitions
 * - Immutability violations
 */
export class ConflictError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'CONFLICT_ERROR', 409, details);
  }

  /**
   * Factory for optimistic locking failure
   */
  static concurrentModification(
    entityType: EntityType,
    entityId: string
  ): ConflictError {
    return new ConflictError(
      `${entityType} was modified by another process`,
      {
        entityType,
        entityId,
        reason: 'concurrent_modification',
        suggestion: 'Refresh and retry',
      }
    );
  }

  /**
   * Factory for duplicate entity
   */
  static duplicate(
    entityType: EntityType,
    field: string,
    value: string
  ): ConflictError {
    return new ConflictError(
      `${entityType} with ${field} "${value}" already exists`,
      {
        entityType,
        field,
        value,
        reason: 'duplicate',
      }
    );
  }

  /**
   * Factory for invalid state transition
   */
  static invalidTransition(
    entityType: EntityType,
    currentState: string,
    targetState: string,
    allowedStates?: string[]
  ): ConflictError {
    return new ConflictError(
      `Cannot transition ${entityType} from ${currentState} to ${targetState}`,
      {
        entityType,
        currentState,
        targetState,
        allowedStates,
        reason: 'invalid_transition',
      }
    );
  }

  /**
   * Factory for immutability violation
   */
  static immutable(
    entityType: EntityType,
    entityId: string,
    reason: ImmutabilityReason
  ): ConflictError {
    return new ConflictError(
      `${entityType} is immutable: ${reason}`,
      {
        entityType,
        entityId,
        immutabilityReason: reason,
        reason: 'immutable',
      }
    );
  }

  /**
   * Factory for operation already completed
   */
  static alreadyCompleted(
    operation: string,
    entityType: EntityType,
    entityId: string
  ): ConflictError {
    return new ConflictError(
      `${operation} already completed for ${entityType}`,
      {
        entityType,
        entityId,
        operation,
        reason: 'already_completed',
      }
    );
  }
}


