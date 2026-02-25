// ============================================
// packages/core/src/errors/authorization.ts
// Authorization Errors
// ============================================

import { DomainError } from './base';
import type { EntityType, OperationType } from '../types';

import { DriftyLayer } from "../../drifty/laws";
/**
 * Thrown when actor lacks permission for an operation.
 * 
 * Use for:
 * - Role-based denials
 * - AI permission boundaries
 * - Cross-tenant access attempts (after validation)
 */
export class AuthorizationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'AUTHORIZATION_ERROR', 403, details);
  }

  /**
   * Factory for operation denial
   */
  static denied(
    entityType: EntityType,
    operation: OperationType,
    reason?: string
  ): AuthorizationError {
    const msg = reason
      ? `Cannot ${operation} ${entityType}: ${reason}`
      : `Cannot ${operation} ${entityType}`;
    
    return new AuthorizationError(msg, {
      entityType,
      operation,
      reason,
    });
  }

  /**
   * Factory for AI-specific denial
   */
  static aiDenied(
    operation: string,
    confidence: number,
    requiredConfidence: number
  ): AuthorizationError {
    return new AuthorizationError(
      `AI action denied: confidence ${confidence} below threshold ${requiredConfidence}`,
      {
        operation,
        confidence,
        requiredConfidence,
        actorType: 'AI',
      }
    );
  }

  /**
   * Factory for AI action requiring human approval
   */
  static requiresApproval(operation: string): AuthorizationError {
    return new AuthorizationError(
      `AI action requires human approval: ${operation}`,
      {
        operation,
        requiresApproval: true,
        actorType: 'AI',
      }
    );
  }

  /**
   * Factory for cross-tenant access attempt
   */
  static crossTenant(): AuthorizationError {
    return new AuthorizationError(
      'Access denied',
      { reason: 'cross_tenant' }
    );
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L0_REPO],
} as const;
