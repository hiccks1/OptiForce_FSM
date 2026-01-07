// ============================================
// packages/core/src/services/BaseEntityService.ts
// Foundation Service (Auditing, Validation, Soft Delete)
// ============================================

import type { PrismaClient } from '@prisma/client';
import type {
  RequestContext,
  EntityType,
  OperationType,
  Result,
} from '../types';
import { success, failure } from '../types';
import {
  ValidationError,
  NotFoundError,
} from '../errors';
import type { AuditLogEntry } from '../types';

// ============================================================
// BASE ENTITY CONSTRAINTS
// ============================================================

export interface BaseEntity {
  id: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// ============================================================
// BASE SERVICE
// ============================================================

export abstract class BaseEntityService<T extends BaseEntity> {
  protected abstract readonly entityType: EntityType;

  /**
   * Explicit Prisma surface
   * (prevents `any`, enforces CRUD shape)
   */
  protected abstract readonly prismaModel: {
    create: (args: any) => Promise<T>;
    findFirst: (args: any) => Promise<T | null>;
    update: (args: any) => Promise<T>;
  };

  constructor(
    protected readonly prisma: PrismaClient
  ) {}

  // ============================================================
  // PUBLIC CRUD — GENERIC ENGINE
  // ============================================================

  async create(
    context: RequestContext,
    input: Omit<T, keyof BaseEntity>
  ): Promise<Result<T>> {
    return this.execute(context, 'create', async () => {
      this.validateCreate(input);

      const entity = await this.prismaModel.create({
        data: {
          ...input,
          companyId: context.companyId,
        },
      });

      return entity;
    });
  }

  async getById(
    context: RequestContext,
    id: string
  ): Promise<Result<T>> {
    return this.execute(context, 'read', async () => {
      const entity = await this.prismaModel.findFirst({
        where: {
          id,
          companyId: context.companyId,
          deletedAt: null,
        },
      });

      if (!entity) {
        throw new NotFoundError(this.entityType, id);
      }

      return entity;
    });
  }

  async update(
    context: RequestContext,
    id: string,
    input: Partial<T>
  ): Promise<Result<T>> {
    return this.execute(context, 'update', async () => {
      this.validateUpdate(input);

      const entity = await this.prismaModel.update({
        where: { id },
        data: {
          ...input,
          updatedAt: new Date(),
        },
      });

      return entity;
    });
  }

  async delete(
    context: RequestContext,
    id: string
  ): Promise<Result<void>> {
    return this.execute(context, 'delete', async () => {
      const entity = await this.prismaModel.findFirst({
        where: {
          id,
          companyId: context.companyId,
          deletedAt: null,
        },
      });

      if (!entity) {
        throw new NotFoundError(this.entityType, id);
      }

      await this.prismaModel.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    });
  }

  // ============================================================
  // EXECUTION PIPELINE (THE LAW)
  // ============================================================

  protected async execute<R>(
    context: RequestContext,
    operation: OperationType,
    action: () => Promise<R>
  ): Promise<Result<R>> {
    const audit: AuditLogEntry = {
      companyId: context.companyId,
      actorId: context.userId ?? null,
      actorType: context.actorType,
      action: `${this.entityType}.${operation}`,
      input: {},
      outcome: {},
      allowed: true,
    };

    try {
      const result = await action();

      audit.outcome = { success: true };

      await this.writeAudit(audit);

      return success(result);
    } catch (error) {
      audit.allowed = false;
      audit.outcome = {
        error: error instanceof Error ? error.message : 'Unknown error',
      };

      await this.writeAudit(audit);

      return failure(error as any);
    }
  }

  // ============================================================
  // VALIDATION HOOKS (OVERRIDABLE)
  // ============================================================

  protected validateCreate(_input: unknown): void {
    // Default: no-op
    // Override in child services if needed
  }

  protected validateUpdate(_input: unknown): void {
    // Default: no-op
    // Override in child services if needed
  }

  // ============================================================
  // AUDIT WRITER (CENTRALIZED)
  // ============================================================

  protected async writeAudit(entry: AuditLogEntry): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        companyId: entry.companyId,
        actorId: entry.actorId,
        actorType: entry.actorType,
        action: entry.action,
        input: entry.input as any,
        outcome: entry.outcome as any,
        allowed: entry.allowed,
      },
    });
  }
}
