// ============================================
// packages/core/src/errors/notFound.ts
// Not Found Errors
// ============================================

import { DomainError } from './base';
import type { EntityType } from '../types';

import { DriftyLayer } from "../../drifty/laws";
/**
 * Thrown when an entity cannot be found.
 * 
 * IMPORTANT: This is returned for BOTH:
 * - Entity doesn't exist
 * - Entity exists but is soft-deleted
 * - Entity exists but belongs to different company
 * 
 * We intentionally don't distinguish these for security.
 */
export class NotFoundError extends DomainError {
  constructor(
    public readonly entityType: EntityType,
    public readonly entityId: string
  ) {
    super(
      `${entityType} not found: ${entityId}`,
      'NOT_FOUND',
      404,
      { entityType, entityId }
    );
  }

  /**
   * Factory for bulk not found (when multiple IDs are missing)
   */
  static bulk(
    entityType: EntityType,
    missingIds: string[]
  ): NotFoundError {
    const first = missingIds[0] ?? 'unknown';
    const error = new NotFoundError(entityType, first);
    error.details!.missingIds = missingIds;
    error.details!.count = missingIds.length;
    return error;
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L0_REPO],
} as const;
