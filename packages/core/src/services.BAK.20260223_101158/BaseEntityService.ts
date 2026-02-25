// ============================================
// packages/core/src/services/BaseEntityService.ts
// Foundation Service - Auditing, Tenant Isolation, Soft Delete
// ============================================
// LAYER: Services (Application Layer)
// FILE VERSION: 2.1.0
// STACK: Turborepo + Prisma + PostgreSQL (JSONB/GIN) + Zod + Multi-Tenant
//
// BREAKING CHANGE RULES:
//   - Changing execute() semantics → MAJOR
//   - Changing AuditWriter contract → MAJOR
//   - Changing repository interface → MAJOR
//   - Adding optional fields/hooks → MINOR
// ============================================

import { createHash } from 'crypto';

// ============================================
// TURBOREPO/MONOREPO BEST PRACTICE:
// ✅ All type imports from central barrel export (@repo/types or @opti-force/types)
// ✅ Never import from internal paths like '../types' or './models'
// Reference: Prisma + Turborepo docs - packages/db pattern
// ============================================
import type {
  EntityType,
  OperationType,
  Result,
  AuditLogEntry,
  BaseEntity,
  IAiActionLogger,
  // JSONB typing - Prisma's InputJsonValue for type-safe JSON operations
  JsonValue,
} from '@fsm/core/types';

import { success, failure } from '@fsm/core/types';
import type { RequestContext } from '@fsm/core/types';
import { NotFoundError, DomainError, ConflictError, ValidationError } from '@fsm/core/types';

// Zod for runtime validation at service boundaries
import type { ZodSchema, ZodError } from 'zod';

import { DriftyLayer } from "../../drifty/laws";
// ============================================
// RUNTIME VERSION (for debugging/logging/health checks)
// ============================================

export const BASE_ENTITY_SERVICE_VERSION = '2.1.0' as const;

// ============================================
// AUDIT WRITER CONTRACT
// ============================================
// Best Practice: Define interface first for Liskov Substitution
// Infrastructure layer implements this - service doesn't know if it's
// Prisma, Redis, or event-sourced

export interface AuditWriter {
  /**
   * Write an audit log entry
   */
  write(entry: AuditLogEntry): Promise<void>;

  /**
   * Get the last audit entry for chain linking
   * Required for maintaining chain of custody integrity (C2PA compliance)
   */
  getLastEntry(
    companyId: string,
    entityType: EntityType,
    entityId: string
  ): Promise<AuditLogEntry | null>;
}

// ============================================
// REPOSITORY CONTRACT (Abstracts Prisma/Infrastructure)
// ============================================
// PRISMA + POSTGRESQL BEST PRACTICES:
// - Service depends on interface, NOT PrismaClient directly
// - This enables: DI for testing, swapping implementations, LSP compliance
// - Repository implementations handle Prisma-specific concerns:
//   * Connection pooling singleton pattern
//   * JSONB operations with InputJsonValue typing
//   * GIN-indexed query operators (@>, ?|, ?&)
//
// Reference: Prisma Turborepo guide - packages/db pattern
// ============================================

export interface IBaseRepository<T extends BaseEntity> {
  /**
   * Create entity with tenant isolation
   * JSONB fields should use Prisma's InputJsonValue type
   */
  create(data: {
    companyId: string;
    [key: string]: unknown;
  }): Promise<T>;

  /**
   * Find single entity - ALWAYS include tenant + soft delete filter
   * PostgreSQL BEST PRACTICE: Index on (companyId, deletedAt) for this pattern
   */
  findFirst(params: {
    where: {
      id: string;
      companyId: string;
      deletedAt: null; // ✅ Soft delete: DateTime? pattern, not boolean
    };
  }): Promise<T | null>;

  /**
   * Find many with tenant isolation
   * JSONB/GIN BEST PRACTICE: Use containment operators for indexed queries
   * Example: metadata: { path: ['status'], equals: 'active' }
   */
  findMany(params: {
    where: {
      companyId: string;
      deletedAt: null;
      [key: string]: unknown;
    };
    orderBy?: Record<string, 'asc' | 'desc'>;
    take?: number;
    skip?: number;
  }): Promise<T[]>;

  /**
   * Update entity
   * JSONB BEST PRACTICE: Use jsonb_set for partial updates, not full replacement
   * Avoids TOAST overhead on large documents
   */
  update(params: {
    where: { id: string };
    data: Record<string, unknown>;
  }): Promise<T>;

  /**
   * Optimistic locking update - uses updatedAt as version marker
   * Returns count to detect concurrent modification
   */
  updateMany(params: {
    where: {
      id: string;
      companyId: string;
      deletedAt: null;
      updatedAt?: Date;
    };
    data: Record<string, unknown>;
  }): Promise<{ count: number }>;

  /**
   * Count for existence checks and pagination
   */
  count(params: {
    where: {
      companyId: string;
      deletedAt: null;
      [key: string]: unknown;
    };
  }): Promise<number>;

  /**
   * JSONB CONTAINMENT QUERY - GIN index optimized
   * PostgreSQL BEST PRACTICE: Use @> operator for GIN-indexed JSONB queries
   * This is what makes JSONB queries fast with GIN indexes
   *
   * @example
   * // Find documents where metadata contains { status: 'published' }
   * findByJsonContains('metadata', { status: 'published' })
   */
  findByJsonContains?(params: {
    companyId: string;
    deletedAt: null;
    jsonField: string;
    contains: JsonValue;
  }): Promise<T[]>;
}

// ============================================
// LIFECYCLE HOOK INTERFACES
// ============================================
// Best Practice: Explicit interfaces for hooks enable type-safe overrides
// Hooks provide extension points without modifying base class

export interface IEntityLifecycleHooks<T extends BaseEntity> {
  // Validation hooks - throw DomainError on failure
  validateCreate(ctx: RequestContext, input: unknown): void;
  validateUpdate(ctx: RequestContext, entity: T, input: unknown): void;

  // Pre-operation hooks - async for external calls (cache, locks, quotas)
  beforeCreate(ctx: RequestContext, input: unknown): Promise<void>;
  beforeUpdate(ctx: RequestContext, entity: T, input: unknown): Promise<void>;
  beforeDelete(ctx: RequestContext, entity: T): Promise<void>;

  // Post-operation hooks - for side effects (events, cache invalidation)
  afterCreate(ctx: RequestContext, entity: T): Promise<void>;
  afterUpdate(ctx: RequestContext, entity: T, previousEntity: T): Promise<void>;
  afterDelete(ctx: RequestContext, entityId: string, deletedEntity: T): Promise<void>;
}

// ============================================
// EXECUTE OPTIONS
// ============================================

export interface ExecuteOptions {
  /** Skip audit logging for this operation (use sparingly) */
  skipAudit?: boolean;
  /** Custom metadata to include in audit log JSONB payload */
  auditMetadata?: Record<string, unknown>;
}

// ============================================
// ZOD VALIDATION RESULT TYPE
// ============================================
// Best Practice: Explicit error handling with Result pattern
// Reference: typescript.tv - Error Handling with Result Types

export type ZodValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ZodError };

// ============================================
// BASE ENTITY SERVICE
// ============================================
// ARCHITECTURE LAYER: Application Services
// DEPENDENCIES: Repository interfaces (injected), NOT Prisma directly
//
// This service knows THAT data can be persisted, not HOW.
// The "how" is the repository implementation's concern.
// ============================================

export abstract class BaseEntityService<T extends BaseEntity>
  implements IEntityLifecycleHooks<T>
{
  /**
   * Runtime version for debugging, logging, and health checks
   * Included in audit trail for traceability
   */
  public readonly version = BASE_ENTITY_SERVICE_VERSION;

  /**
   * Entity type identifier (e.g., 'Document', 'User', 'Invoice')
   * Used for audit logging, error messages, and type discrimination
   */
  protected abstract readonly entityType: EntityType;

  /**
   * Repository interface - INJECTED, not instantiated
   * Service doesn't know if this is Prisma, Mongo, or in-memory for tests
   *
   * PRISMA BEST PRACTICE: Repository implementation uses singleton PrismaClient
   * to avoid connection pool exhaustion in serverless environments
   */
  protected abstract readonly repository: IBaseRepository<T>;

  constructor(
    protected readonly auditWriter?: AuditWriter,
    protected readonly aiActionLogger?: IAiActionLogger
  ) {}

  // ============================================
  // EXECUTE PIPELINE (CROSS-CUTTING CONCERNS)
  // ============================================
  // Every operation flows through this pipeline:
  // 1. Chain of custody linking (fetch previous hash)
  // 2. Execute action
  // 3. Deterministic SHA-256 hash of result
  // 4. Write audit entry with chain link
  // 5. Separate AI action logging (if applicable)
  // 6. Return Result<T> (never throws)
  //
  // BEST PRACTICE: Single execution path for:
  // - Audit logging
  // - Error handling
  // - Tenant isolation enforcement
  // - AI action tracking
  // ============================================

  protected async execute<R>(
    ctx: RequestContext,
    operation: OperationType,
    action: () => Promise<R>,
    entityId?: string,
    options: ExecuteOptions = {}
  ): Promise<Result<R>> {
    const startTime = Date.now();

    // ✅ Chain of Custody: Get previous hash for blockchain-style linking
    let prevRecordHash: string | null = null;
    if (this.auditWriter && entityId && !options.skipAudit) {
      const lastEntry = await this.auditWriter.getLastEntry(
        ctx.companyId,
        this.entityType,
        entityId
      );
      prevRecordHash = lastEntry?.afterHash ?? null;
    }

    const auditEntry: Partial<AuditLogEntry> = {
      companyId: ctx.companyId,
      entityType: this.entityType,
      actorId: ctx.actorId,
      actorType: ctx.actorType,
      operation,
      occurredAt: new Date(),
      prevRecordHash,
      metadata: options.auditMetadata,
    };

    try {
      const result = await action();
      const resultEntityId = entityId ?? this.extractEntityId(result);

      // ✅ Deterministic SHA-256 hash (NOT random UUID)
      // Same input = same hash for audit integrity verification
      const afterHash = this.computeHash(result);

      // Write success audit
      if (this.auditWriter && !options.skipAudit) {
        await this.auditWriter.write({
          ...auditEntry,
          id: crypto.randomUUID(),
          entityId: resultEntityId,
          beforeHash: prevRecordHash,
          afterHash,
          payload: {
            success: true,
            durationMs: Date.now() - startTime,
            serviceVersion: this.version,
          },
          ai: ctx.ai
            ? {
                sessionId: ctx.ai.sessionId,
                intent: ctx.ai.intent,
                confidence: ctx.ai.confidence,
                model: {
                  provider: 'anthropic',
                  model: ctx.ai.model,
                },
              }
            : undefined,
        } as AuditLogEntry);
      }

      // ✅ SEPARATE AI Action Logging (per architecture - dedicated AiActionLog table)
      if (ctx.ai && this.aiActionLogger) {
        await this.aiActionLogger.log({
          companyId: ctx.companyId,
          action: operation,
          entityType: this.entityType,
          entityId: resultEntityId,
          aiModelId: ctx.ai.model,
          aiModelVersion: ctx.ai.modelVersion,
          input: { operation, entityId: resultEntityId },
          output: { success: true },
          latencyMs: Date.now() - startTime,
          requestId: ctx.requestId,
          sessionId: ctx.ai.sessionId,
        });
      }

      return success(result);
    } catch (error) {
      return this.handleExecutionError(
        error,
        ctx,
        operation,
        entityId,
        auditEntry,
        startTime,
        options
      );
    }
  }

  /**
   * Centralized error handling for execute pipeline
   */
  private async handleExecutionError<R>(
    error: unknown,
    ctx: RequestContext,
    operation: OperationType,
    entityId: string | undefined,
    auditEntry: Partial<AuditLogEntry>,
    startTime: number,
    options: ExecuteOptions
  ): Promise<Result<R>> {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';

    // Compute error hash deterministically
    const errorHash = this.computeHash({
      error: errorMessage,
      timestamp: new Date().toISOString(),
      operation,
    });

    // Write failure audit
    if (this.auditWriter && !options.skipAudit) {
      await this.auditWriter.write({
        ...auditEntry,
        id: crypto.randomUUID(),
        entityId: entityId ?? 'unknown',
        beforeHash: auditEntry.prevRecordHash ?? null,
        afterHash: errorHash,
        payload: {
          success: false,
          error: errorMessage,
          durationMs: Date.now() - startTime,
          serviceVersion: this.version,
        },
      } as AuditLogEntry);
    }

    // Log failed AI actions too (regulatory compliance)
    if (ctx.ai && this.aiActionLogger) {
      await this.aiActionLogger.log({
        companyId: ctx.companyId,
        action: operation,
        entityType: this.entityType,
        entityId: entityId ?? 'unknown',
        aiModelId: ctx.ai.model,
        aiModelVersion: ctx.ai.modelVersion,
        input: { operation, entityId },
        output: { success: false, error: errorMessage },
        latencyMs: Date.now() - startTime,
        requestId: ctx.requestId,
        sessionId: ctx.ai.sessionId,
      });
    }

    // Return typed failure (not thrown)
    if (error instanceof DomainError) {
      return failure(error);
    }

    return failure(new DomainError(errorMessage, 'INTERNAL_ERROR', 500));
  }

  // ============================================
  // CRUD OPERATIONS
  // ============================================

  /**
   * Get entity by ID with tenant isolation
   * MULTI-TENANT BEST PRACTICE: ALWAYS filter by companyId
   */
  async getById(ctx: RequestContext, id: string): Promise<Result<T>> {
    return this.execute(
      ctx,
      'read',
      async () => {
        const entity = await this.repository.findFirst({
          where: {
            id,
            companyId: ctx.companyId,
            deletedAt: null, // ✅ Soft delete pattern
          },
        });

        if (!entity) {
          throw new NotFoundError(this.entityType, id);
        }

        return entity;
      },
      id
    );
  }

  /**
   * Soft delete entity
   * BEST PRACTICE: Never hard delete - maintain full audit trail
   * Uses deletedAt timestamp, not boolean flag
   */
  async softDelete(ctx: RequestContext, id: string): Promise<Result<void>> {
    return this.execute(
      ctx,
      'delete',
      async () => {
        // Verify exists and belongs to tenant
        const entity = await this.repository.findFirst({
          where: {
            id,
            companyId: ctx.companyId,
            deletedAt: null,
          },
        });

        if (!entity) {
          throw new NotFoundError(this.entityType, id);
        }

        // Run lifecycle hooks
        this.validateDelete(ctx, entity);
        await this.beforeDelete(ctx, entity);

        // ✅ Soft delete using deletedAt timestamp (not isDeleted boolean)
        await this.repository.update({
          where: { id },
          data: {
            deletedAt: new Date(),
            updatedAt: new Date(),
          },
        });

        // Post-delete hook for side effects
        await this.afterDelete(ctx, id, entity);
      },
      id
    );
  }

  // ============================================
  // OPTIMISTIC LOCKING UPDATE
  // ============================================
  // BEST PRACTICE: Prevent lost updates in concurrent environments
  // Uses updatedAt as version marker - if it changed, someone else modified

  protected async updateWithLock<D extends Record<string, unknown>>(
    ctx: RequestContext,
    id: string,
    currentUpdatedAt: Date,
    data: D
  ): Promise<T> {
    const result = await this.repository.updateMany({
      where: {
        id,
        companyId: ctx.companyId,
        deletedAt: null,
        updatedAt: currentUpdatedAt,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw ConflictError.concurrentModification(this.entityType, id);
    }

    // Fetch fresh entity
    const fresh = await this.repository.findFirst({
      where: {
        id,
        companyId: ctx.companyId,
        deletedAt: null,
      },
    });

    if (!fresh) {
      throw new NotFoundError(this.entityType, id);
    }

    return fresh;
  }

  // ============================================
  // ZOD VALIDATION HELPERS
  // ============================================
  // BEST PRACTICE: Runtime validation at service boundaries
  // Zod schemas defined in @opti-force/types, validated here
  //
  // Why Zod + Prisma together:
  // - Prisma types = database schema (what's stored)
  // - Zod schemas = API contracts (what's accepted)
  // - They're often different! (e.g., omit id, timestamps on create)
  // ============================================

  /**
   * Validate input against Zod schema
   * Returns Result pattern, doesn't throw
   *
   * @example
   * const result = this.validateWithZod(CreateDocumentSchema, input);
   * if (!result.success) {
   *   throw new ValidationError(result.error.issues);
   * }
   */
  protected validateWithZod<S>(
    schema: ZodSchema<S>,
    input: unknown
  ): ZodValidationResult<S> {
    const result = schema.safeParse(input);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
  }

  /**
   * Validate and throw if invalid
   * Use in validateCreate/validateUpdate hooks
   */
  protected validateOrThrow<S>(schema: ZodSchema<S>, input: unknown): S {
    const result = this.validateWithZod(schema, input);
    if (!result.success) {
      throw new ValidationError(
        result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        }))
      );
    }
    return result.data;
  }

  // ============================================
  // HELPERS
  // ============================================

  /**
   * Extract entity ID from result
   */
  private extractEntityId(result: unknown): string {
    if (result && typeof result === 'object' && 'id' in result) {
      return String((result as { id: unknown }).id);
    }
    return 'unknown';
  }

  /**
   * Compute deterministic SHA-256 hash
   *
   * CHAIN OF CUSTODY BEST PRACTICE:
   * - Same inputs MUST produce same hash (deterministic)
   * - Sort object keys for consistent serialization
   * - Used for C2PA-style content credentials
   */
  private computeHash(data: unknown): string {
    const normalized = JSON.stringify(data, (_, value) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return Object.keys(value)
          .sort()
          .reduce((sorted, key) => {
            sorted[key] = value[key];
            return sorted;
          }, {} as Record<string, unknown>);
      }
      return value;
    });
    return createHash('sha256').update(normalized).digest('hex');
  }

  // ============================================
  // VALIDATION HOOKS (Stub - Override in child)
  // ============================================
  // ZOD BEST PRACTICE: Validate at service boundary before any DB ops
  // ============================================

  /**
   * Validate input before create operation
   * @throws ValidationError if Zod validation fails
   * @throws DomainError if business rules violated
   *
   * @example
   * ```typescript
   * // In DocumentService extends BaseEntityService<Document>
   * validateCreate(ctx: RequestContext, input: unknown): void {
   *   // Zod schema validation
   *   const data = this.validateOrThrow(CreateDocumentSchema, input);
   *
   *   // Business rule: title must be unique per company
   *   // (actual check would be in beforeCreate since it's async)
   * }
   * ```
   */
  validateCreate(_ctx: RequestContext, _input: unknown): void {
    // STUB: Override in child services
    // Use this.validateOrThrow(YourCreateSchema, input)
  }

  /**
   * Validate input before update operation
   * @throws ValidationError if Zod validation fails
   * @throws DomainError if business rules violated (e.g., entity locked)
   *
   * @example
   * ```typescript
   * validateUpdate(ctx: RequestContext, entity: Document, input: unknown): void {
   *   // Check entity state allows update
   *   if (entity.status === 'LOCKED') {
   *     throw new DomainError('Cannot update locked document', 'ENTITY_LOCKED', 409);
   *   }
   *
   *   // Zod validation
   *   this.validateOrThrow(UpdateDocumentSchema, input);
   * }
   * ```
   */
  validateUpdate(_ctx: RequestContext, _entity: T, _input: unknown): void {
    // STUB: Override in child services
  }

  /**
   * Validate entity can be deleted
   * @throws DomainError if deletion not allowed
   *
   * @example
   * ```typescript
   * validateDelete(ctx: RequestContext, entity: Document): void {
   *   if (entity.hasActiveChildren) {
   *     throw new DomainError(
   *       'Cannot delete document with active children',
   *       'HAS_DEPENDENCIES',
   *       409
   *     );
   *   }
   * }
   * ```
   */
  validateDelete(_ctx: RequestContext, _entity: T): void {
    // STUB: Override in child services
  }

  // ============================================
  // LIFECYCLE HOOKS (Stub - Override in child)
  // ============================================
  // Use these for cross-cutting concerns:
  // - beforeX: Acquire locks, check quotas, enrich data
  // - afterX: Emit events, invalidate cache, send notifications
  //
  // REDIS CACHE BEST PRACTICE: Invalidate in afterX hooks
  // ============================================

  /**
   * Called before entity creation
   * Use for: checking quotas, acquiring locks, enriching input
   *
   * @example
   * ```typescript
   * async beforeCreate(ctx: RequestContext, input: CreateDocumentInput): Promise<void> {
   *   // Check company quota
   *   const count = await this.repository.count({
   *     where: { companyId: ctx.companyId, deletedAt: null }
   *   });
   *   const quota = ctx.company?.documentQuota ?? 1000;
   *   if (count >= quota) {
   *     throw new DomainError('Document quota exceeded', 'QUOTA_EXCEEDED', 403);
   *   }
   * }
   * ```
   */
  async beforeCreate(_ctx: RequestContext, _input: unknown): Promise<void> {
    // STUB: Override in child services
  }

  /**
   * Called after entity creation
   * Use for: emitting domain events, cache warming, notifications
   *
   * REDIS BEST PRACTICE: Warm cache here if entity will be read immediately
   *
   * @example
   * ```typescript
   * async afterCreate(ctx: RequestContext, entity: Document): Promise<void> {
   *   // Emit domain event
   *   await this.eventBus.publish({
   *     type: 'DOCUMENT_CREATED',
   *     payload: { id: entity.id, companyId: ctx.companyId },
   *   });
   *
   *   // Invalidate list cache
   *   await this.cache.invalidate(`${ctx.companyId}:documents:list:*`);
   * }
   * ```
   */
  async afterCreate(_ctx: RequestContext, _entity: T): Promise<void> {
    // STUB: Override in child services
  }

  /**
   * Called before entity update
   * Use for: capturing previous state for diff, permission checks
   *
   * @example
   * ```typescript
   * async beforeUpdate(ctx: RequestContext, entity: Document, input: unknown): Promise<void> {
   *   // Store previous state for afterUpdate diff
   *   this.previousState = { ...entity };
   * }
   * ```
   */
  async beforeUpdate(
    _ctx: RequestContext,
    _entity: T,
    _input: unknown
  ): Promise<void> {
    // STUB: Override in child services
  }

  /**
   * Called after entity update
   * Use for: emitting update events with diff, cache invalidation
   *
   * @example
   * ```typescript
   * async afterUpdate(
   *   ctx: RequestContext,
   *   entity: Document,
   *   previousEntity: Document
   * ): Promise<void> {
   *   // Emit update event with changes
   *   await this.eventBus.publish({
   *     type: 'DOCUMENT_UPDATED',
   *     payload: {
   *       id: entity.id,
   *       changes: this.computeDiff(previousEntity, entity),
   *     },
   *   });
   *
   *   // Invalidate caches
   *   await this.cache.invalidate(`${ctx.companyId}:document:${entity.id}`);
   *   await this.cache.invalidate(`${ctx.companyId}:documents:list:*`);
   * }
   * ```
   */
  async afterUpdate(
    _ctx: RequestContext,
    _entity: T,
    _previousEntity: T
  ): Promise<void> {
    // STUB: Override in child services
  }

  /**
   * Called before entity soft delete
   * Use for: archiving, releasing locks, cleanup
   *
   * @example
   * ```typescript
   * async beforeDelete(ctx: RequestContext, entity: Document): Promise<void> {
   *   // Archive to cold storage (MinIO) before soft delete
   *   await this.archiveService.archive(entity);
   *
   *   // Release any edit locks
   *   await this.lockService.releaseAll(entity.id);
   * }
   * ```
   */
  async beforeDelete(_ctx: RequestContext, _entity: T): Promise<void> {
    // STUB: Override in child services
  }

  /**
   * Called after entity soft delete
   * Use for: emitting delete events, cascade soft-deletes, cache invalidation
   *
   * @example
   * ```typescript
   * async afterDelete(
   *   ctx: RequestContext,
   *   entityId: string,
   *   deletedEntity: Document
   * ): Promise<void> {
   *   // Emit delete event
   *   await this.eventBus.publish({
   *     type: 'DOCUMENT_DELETED',
   *     payload: { id: entityId },
   *   });
   *
   *   // Cascade soft-delete children
   *   await this.commentService.softDeleteByDocumentId(ctx, entityId);
   *
   *   // Invalidate all related caches
   *   await this.cache.invalidate(`${ctx.companyId}:document:*:${entityId}`);
   *   await this.cache.invalidate(`${ctx.companyId}:documents:list:*`);
   * }
   * ```
   */
  async afterDelete(
    _ctx: RequestContext,
    _entityId: string,
    _deletedEntity: T
  ): Promise<void> {
    // STUB: Override in child services
  }

  // ============================================
  // JSONB QUERY HELPERS
  // ============================================
  // POSTGRESQL/GIN BEST PRACTICE:
  // - Use @> (containment) operator for GIN-indexed queries
  // - Avoid ->> with = for large tables (doesn't use GIN index)
  // - Index: CREATE INDEX idx_metadata ON table USING GIN(metadata)
  // ============================================

  /**
   * Query by JSONB containment - GIN index optimized
   * Only available if repository implements findByJsonContains
   *
   * @example
   * // Find documents where metadata contains { status: 'published', type: 'article' }
   * const docs = await this.findByMetadata(ctx, 'metadata', {
   *   status: 'published',
   *   type: 'article'
   * });
   */
  protected async findByMetadata(
    ctx: RequestContext,
    jsonField: string,
    contains: JsonValue
  ): Promise<Result<T[]>> {
    if (!this.repository.findByJsonContains) {
      return failure(
        new DomainError(
          'JSONB containment queries not supported by repository',
          'NOT_IMPLEMENTED',
          501
        )
      );
    }

    return this.execute(
      ctx,
      'read',
      async () => {
        return this.repository.findByJsonContains!({
          companyId: ctx.companyId,
          deletedAt: null,
          jsonField,
          contains,
        });
      },
      undefined,
      { skipAudit: true } // Don't audit bulk reads
    );
  }

  // ============================================
  // UTILITY METHODS
  // ============================================

  /**
   * Check if entity exists (without loading full entity)
   * Skips audit logging to reduce noise
   */
  async exists(ctx: RequestContext, id: string): Promise<Result<boolean>> {
    return this.execute(
      ctx,
      'read',
      async () => {
        const count = await this.repository.count({
          where: {
            id,
            companyId: ctx.companyId,
            deletedAt: null,
          } as any,
        });
        return count > 0;
      },
      id,
      { skipAudit: true }
    );
  }

  /**
   * Get service info for debugging/health checks
   */
  getServiceInfo(): {
    version: string;
    entityType: EntityType;
    hasAuditWriter: boolean;
    hasAiLogger: boolean;
    supportsJsonContains: boolean;
  } {
    return {
      version: this.version,
      entityType: this.entityType,
      hasAuditWriter: !!this.auditWriter,
      hasAiLogger: !!this.aiActionLogger,
      supportsJsonContains: !!this.repository.findByJsonContains,
    };
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
