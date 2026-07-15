import { prisma } from './client';
import { Prisma } from './generated/prisma/client';

export const DB_TRANSACTIONS_VERSION = 1 as const;

/**
 * Runs a callback inside a database transaction. Callers are expected to have a
 * tenant-scoped context; the companyId guard keeps tenant-less calls out.
 */
export async function tenantTransaction<T>(
  ctx: { companyId?: string },
  fn: (tx: Prisma.TransactionClient) => Promise<T>,
): Promise<T> {
  if (!ctx.companyId) {
    throw new Error('Missing companyId in RequestContext');
  }

  return prisma.$transaction((tx) => fn(tx));
}
