// packages/core/src/config/loadCompanyConfig.ts
import type { prisma as PrismaSingleton } from '@fsm/db';
import { parseCompanyConfigPayload } from './payload';

import { DriftyLayer } from "../../drifty/laws";
export async function loadActiveCompanyConfig(
  deps: { prisma: typeof PrismaSingleton },
  companyId: string
) {
  const row = await deps.prisma.companyConfig.findFirst({
    where: { companyId, isActive: true },
    orderBy: { version: 'desc' },
    select: { schema: true, version: true },
  });

  if (!row) {
    throw new Error(`No active CompanyConfig found for companyId=${companyId}`);
  }

  const payload = parseCompanyConfigPayload(row.schema);
  return { payload, version: row.version };
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L4_INFRA],
} as const;
