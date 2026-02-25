// packages/core/src/audit/writeAuditLog.ts
import { computeAuditHash } from './hash';
import type { PrismaClient } from '@prisma/client';

import { DriftyLayer } from "../../drifty/laws";
export async function writeAuditLog(
  prisma: PrismaClient,
  input: {
    companyId: string;
    actorType: 'HUMAN' | 'SYSTEM' | 'AI';
    actorId?: string | null;
    entityType: string;
    entityId: string;
    action: string;
    payload: unknown; // JSONB
  }
) {
  const custodyHash = computeAuditHash({
    companyId: input.companyId,
    actorType: input.actorType,
    actorId: input.actorId ?? null,
    entityType: input.entityType,
    entityId: input.entityId,
    action: input.action,
    payload: input.payload,
  });

  return prisma.auditLog.create({
    data: {
      companyId: input.companyId,
      actorType: input.actorType,
      actorId: input.actorId,
      entityType: input.entityType,
      entityId: input.entityId,
      action: input.action,
      payload: input.payload, // JSONB
      custodyHash,            // STRING COLUMN
    },
  });
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
