//===================================================
// packages/core/src/services/BaseEntityService.ts (LOCKED)
// Base service helpers: tenant scoping + audit hooks (no repository pattern).
//=================================================

import type { PrismaClient } from "@fsm/db";
import type { RequestContext } from "../context/RequestContext";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "SOFT_DELETE"
  | "RESTORE";

export type AuditWriteInput = {
  companyId: string;
  actorType: "human" | "system" | "ai";
  actorId?: string | null;
  entityType: string;
  entityId: string;
  action: AuditAction;
  before?: unknown;
  after?: unknown;
  correlationId?: string | null;
  meta?: Record<string, unknown>;
};

export class BaseEntityService {
  constructor(protected readonly prisma: PrismaClient) {}

  protected requireCompany(ctx: RequestContext): string {
    if (!ctx.companyId) throw new Error("Missing companyId in RequestContext");
    return ctx.companyId;
  }

  protected async writeAudit(_ctx: RequestContext, input: AuditWriteInput): Promise<void> {
    // If AuditLog exists in schema (it does in the canonical contract), write it.
    // Keep this resilient: if the model name changes, services shouldn't explode during early boot.
    const prismaAny = this.prisma as any;
    if (!prismaAny?.auditLog?.create) return;

    await prismaAny.auditLog.create({
      data: {
        companyId: input.companyId,
        actorType: input.actorType,
        actorId: input.actorId ?? null,
        entityType: input.entityType,
        entityId: input.entityId,
        action: input.action,
        before: input.before ?? null,
        after: input.after ?? null,
        correlationId: input.correlationId ?? null,
        meta: input.meta ?? null,
      },
    });
  }
}
