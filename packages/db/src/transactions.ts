// ============================================
// packages/db/src/transactions.ts
// Prisma Transactions with Context Guard
// ============================================

import type { PrismaClient } from '@prisma/client';
import prisma from './client';
import type { RequestContext } from '../../core/context/RequestContext';

import { DriftyLayer } from "../../drifty/laws";
/**
 * DB transactions layer version.
 * Bump ONLY if the contract changes.
 */
export const DB_TRANSACTIONS_VERSION = 1 as const;

/**
 * Executes a Prisma transaction with a required RequestContext.
 * Enforces tenant presence but does NOT auto-scope queries.
 */
export async function tenantTransaction<T>(
  ctx: RequestContext,
  fn: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  if (!ctx.companyId) {
    throw new Error('Missing companyId in RequestContext');
  }

  return prisma.$transaction((tx) => fn(tx));
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L1_DATA],
} as const;
