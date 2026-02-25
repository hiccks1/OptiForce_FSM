// ============================================================
// packages/ai/src/retrievers/ScheduleRetriever.ts
// Technician schedule retrieval (JSONB visits projection)
// ============================================================

import type { PrismaClient } from '@prisma/client';
import { ScheduleService } from '@fsm/core/services/ScheduleService';
import { BaseRetriever } from './BaseRetriever';
import type { RetrieverContext, RetrieverResult, RetrievedItem } from './types';
import {
  DRIFTY_VERSION,
  DriftyLayer,
  DRIFTY_FILE_DECLARATION_SYMBOL,
  type DriftyFileContract,
} from '../../../../drifty/laws';

export const DRIFTY_FILE_CONTRACT: DriftyFileContract = {
  driftyVersion: DRIFTY_VERSION,
  layers: [DriftyLayer.L5_AI],
  usesAI: true,
};
export const DRIFTY_FILE_CONTRACT_SYMBOL = DRIFTY_FILE_DECLARATION_SYMBOL;

interface ScheduleQuery {
  technicianId?: string;
  from?: Date;
  to?: Date;
  limit?: number;
}

export class ScheduleRetriever extends BaseRetriever<ScheduleQuery, Record<string, unknown>> {
  readonly name = 'schedule-retriever';
  readonly version = 2;

  private readonly schedule: ScheduleService;

  constructor(prisma: PrismaClient) {
    super();
    this.schedule = new ScheduleService(prisma as any);
  }

  protected async perform(
    ctx: RetrieverContext,
    input: ScheduleQuery
  ): Promise<RetrieverResult<Record<string, unknown>>> {
    if (!ctx.companyId) {
      return this.reject('FORBIDDEN_SCOPE', 'Missing company scope');
    }

    const from = input.from ?? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const to = input.to ?? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const rows = await this.schedule.listVisitsInRange(ctx as any, {
      from,
      to,
      technicianId: input.technicianId,
      limit: input.limit ?? 50,
    });

    if (!rows.length) {
      return {
        outcome: 'success',
        code: 'NO_RESULTS',
        reason: 'No scheduled visits found',
        items: [],
        meta: { version: this.version },
      };
    }

    const items: RetrievedItem[] = rows.map((v) => ({
      id: v.id,
      source: 'jobs.data.visits',
      data: {
        jobId: v.jobId,
        technicianId: v.technicianId,
        startTime: v.scheduledStart,
        endTime: v.scheduledEnd,
        summary: v.title,
        customerName: v.customerName,
      },
    }));

    return {
      outcome: 'success',
      code: 'OK',
      reason: 'Schedule retrieved',
      items,
      meta: {
        version: this.version,
        examinedCount: rows.length,
        sources: ['job.data.visits'],
      },
    };
  }
}
