// packages/core/src/services/ScheduleService.ts
// ============================================================
// Scheduling projection + mutation for Job.data.visits[] (JSONB-first)
// Canonical domain noun: "visit" ("appointment" is not used in API/domain)
// ============================================================

import { randomUUID } from 'node:crypto';
import type { RequestContext } from '../context/RequestContext';
import {
  DRIFTY_VERSION,
  DriftyLayer,
  DRIFTY_FILE_DECLARATION_SYMBOL,
  type DriftyFileContract,
} from '../../../../drifty/laws';

// Export symbol name for validators (do not rename)

export const DRIFTY_LAW_REGISTRY = {
  version: DRIFTY_VERSION,
  layers: {
    L1_DATA_LAWS,
    L2_DOMAIN_LAWS,
  },
};

type PrismaLike = {
  $queryRaw: any;
  $executeRaw: any;
  job: {
    create: (args: any) => Promise<any>;
  };
};

export type CalendarVisit = {
  id: string; // visit id
  jobId: string;
  scheduledStart: string;
  scheduledEnd: string;
  technicianId?: string;
  title?: string;
  notes?: string;
  customerName?: string;
};

export interface ScheduleHooks {
  version: string;
  beforeCreateVisit?(ctx: RequestContext, input: unknown): Promise<void>;
  afterCreateVisit?(ctx: RequestContext, output: { jobId: string; visitId: string }): Promise<void>;
  beforeUpdateVisit?(ctx: RequestContext, input: unknown): Promise<void>;
  afterUpdateVisit?(ctx: RequestContext, output: { ok: true }): Promise<void>;
}

export class ScheduleService {
  constructor(
    private readonly prisma: PrismaLike,
    private readonly hooks: ScheduleHooks = { version: '1.0.0' }
  ) {}

  async listVisitsInRange(
    ctx: RequestContext,
    params: { from: Date; to: Date; technicianId?: string; limit?: number }
  ): Promise<CalendarVisit[]> {
    const fromIso = params.from.toISOString();
    const toIso = params.to.toISOString();
    const limit = Math.max(1, Math.min(params.limit ?? 500, 2000));

    const rows = await this.prisma.$queryRaw<
      Array<{
        visitId: string;
        jobId: string;
        scheduledStart: string;
        scheduledEnd: string;
        technicianId: string | null;
        title: string | null;
        notes: string | null;
        customerName: string | null;
      }>
    >`
      select
        (v.visit->>'id') as "visitId",
        j.id as "jobId",
        (v.visit->>'start') as "scheduledStart",
        (v.visit->>'end') as "scheduledEnd",
        nullif((v.visit->>'technicianId'), '') as "technicianId",
        (j.data->>'title') as "title",
        (j.data->>'description') as "notes",
        (j.data->>'customerName') as "customerName"
      from jobs j
      cross join lateral jsonb_array_elements(coalesce(j.data->'visits', '[]'::jsonb)) v(visit)
      where j."companyId" = ${ctx.companyId as any}
        and j."deletedAt" is null
        and (v.visit ? 'start')
        and (v.visit ? 'end')
        and (v.visit->>'start') < ${toIso}
        and (v.visit->>'end') > ${fromIso}
        ${
          params.technicianId
            ? this.prisma.$queryRaw`and (v.visit->>'technicianId') = ${params.technicianId}`
            : this.prisma.$queryRaw``
        }
      order by (v.visit->>'start') asc
      limit ${limit};
    `;

    return rows.map((r) => ({
      id: r.visitId,
      jobId: r.jobId,
      scheduledStart: r.scheduledStart,
      scheduledEnd: r.scheduledEnd,
      technicianId: r.technicianId ?? undefined,
      title: r.title ?? undefined,
      notes: r.notes ?? undefined,
      customerName: r.customerName ?? undefined,
    }));
  }

  async createJobWithVisit(
    ctx: RequestContext,
    params: {
      scheduledStart: Date;
      scheduledEnd: Date;
      technicianId?: string;
      customerName?: string;
      title?: string;
      notes?: string;
      address?: unknown;
    }
  ): Promise<{ jobId: string; visitId: string }> {
    const visitId = randomUUID();
    const nowIso = new Date().toISOString();

    await this.hooks.beforeCreateVisit?.(ctx, params);

    const data = {
      schemaVersion: '1.0',
      source: 'calendar',
      title: params.title ?? 'Visit',
      description: params.notes ?? '',
      jobType: 'VISIT',
      priority: 'NORMAL',

      customerName: params.customerName ?? '',
      serviceAddress: params.address ?? undefined,

      visits: [
        {
          id: visitId,
          start: params.scheduledStart.toISOString(),
          end: params.scheduledEnd.toISOString(),
          technicianId: params.technicianId ?? undefined,
          status: 'SCHEDULED',
          createdAt: nowIso,
        },
      ],

      status: 'SCHEDULED',
      statusHistory: [
        {
          at: nowIso,
          to: 'SCHEDULED',
          by: ctx.actorType,
        },
      ],
    };

    const job = await this.prisma.job.create({
      data: {
        companyId: ctx.companyId as any,
        data,
        createdBy: ctx.actorId ?? undefined,
      },
      select: { id: true },
    });

    const out = { jobId: job.id, visitId };
    await this.hooks.afterCreateVisit?.(ctx, out);
    return out;
  }

  async updateVisit(
    ctx: RequestContext,
    params: {
      jobId: string;
      visitId: string;
      scheduledStart: Date;
      scheduledEnd: Date;
      technicianId?: string;
      title?: string;
      notes?: string;
      customerName?: string;
      address?: unknown;
    }
  ): Promise<{ ok: true }> {
    const startIso = params.scheduledStart.toISOString();
    const endIso = params.scheduledEnd.toISOString();

    await this.hooks.beforeUpdateVisit?.(ctx, params);

    // Update visit inside visits[] by visitId (no full overwrite of Job.data)
    const n = await this.prisma.$executeRaw`
      update jobs j
      set data =
        (
          select jsonb_set(
            jsonb_set(
              jsonb_set(
                jsonb_set(
                  j.data,
                  '{visits}',
                  (
                    select jsonb_agg(
                      case
                        when (v->>'id') = ${params.visitId}
                          then jsonb_set(
                            jsonb_set(
                              jsonb_set(
                                jsonb_set(v, '{start}', to_jsonb(${startIso}::text), true),
                                '{end}', to_jsonb(${endIso}::text), true
                              ),
                              '{technicianId}', to_jsonb(${(params.technicianId ?? '')}::text), true
                            ),
                            '{updatedAt}', to_jsonb(${new Date().toISOString()}::text), true
                          )
                        else v
                      end
                    )
                    from jsonb_array_elements(coalesce(j.data->'visits','[]'::jsonb)) v
                  ),
                  true
                ),
                '{title}',
                to_jsonb(${(params.title ?? '')}::text),
                true
              ),
              '{description}',
              to_jsonb(${(params.notes ?? '')}::text),
              true
            ),
            '{customerName}',
            to_jsonb(${(params.customerName ?? '')}::text),
            true
          )
        )
      where j.id = ${params.jobId}
        and j."companyId" = ${ctx.companyId as any}
        and j."deletedAt" is null;
    `;

    if (!n || Number(n) === 0) {
      throw new Error('Job not found for company');
    }

    // Optional: update serviceAddress only if provided (separate patch)
    if (params.address !== undefined) {
      await this.prisma.$executeRaw`
        update jobs
        set data = jsonb_set(data, '{serviceAddress}', to_jsonb(${JSON.stringify(params.address)}::jsonb), true)
        where id = ${params.jobId}
          and "companyId" = ${ctx.companyId as any}
          and "deletedAt" is null;
      `;
    }

    const out = { ok: true } as const;
    await this.hooks.afterUpdateVisit?.(ctx, out);
    return out;
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
