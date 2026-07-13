import { PrismaClient } from './@fsm/db';
import { prisma, DriftyLayer } from './client'; 
import type { RequestContext } from '../../core/context/RequestContext';

export const DB_TRANSACTIONS_VERSION = 1 as const;

export async function tenantTransaction<T>(
  ctx: RequestContext,
  fn: (tx: Prisma.TransactionClient) => Promise<T> 
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
