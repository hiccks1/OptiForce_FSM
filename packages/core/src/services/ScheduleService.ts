//=================================================
// packages/core/src/services/ScheduleService.ts (LOCKED)
// ScheduleService: visits live in Job.data.visits[] (JSONB-first).
//==================================

import { randomUUID } from "node:crypto";
import type { PrismaClient } from "@fsm/db";
import type { RequestContext } from "../context/RequestContext";
import { BaseEntityService } from "./BaseEntityService";

export type CalendarVisit = {
  id: string;
  jobId: string;
  scheduledStart: string;
  scheduledEnd: string;
  technicianId?: string;
  title?: string;
  notes?: string;
  customerName?: string;
};

export class ScheduleService extends BaseEntityService {
  constructor(prisma: PrismaClient) {
    super(prisma);
  }

  async listVisitsInRange(
    ctx: RequestContext,
    params: { from: Date; to: Date; technicianId?: string; limit?: number }
  ): Promise<CalendarVisit[]> {
    const companyId = this.requireCompany(ctx);
    const fromIso = params.from.toISOString();
    const toIso = params.to.toISOString();
    const limit = Math.max(1, Math.min(params.limit ?? 500, 2000));

    // JSONB projection from Job.data.visits[]
    const rows = await (this.prisma as any).$queryRaw<
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
        (v.visit->>'scheduledStart') as "scheduledStart",
        (v.visit->>'scheduledEnd') as "scheduledEnd",
        (v.visit->>'technicianId') as "technicianId",
        (v.visit->>'title') as "title",
        (v.visit->>'notes') as "notes",
        (j.data->'customer'->>'name') as "customerName"
      from "Job" j
      cross join lateral jsonb_array_elements(coalesce(j.data->'visits','[]'::jsonb)) as v(visit)
      where j."companyId" = ${companyId}
        and (v.visit->>'scheduledStart') is not null
        and (v.visit->>'scheduledEnd') is not null
        and (v.visit->>'scheduledStart')::timestamptz < ${toIso}::timestamptz
        and (v.visit->>'scheduledEnd')::timestamptz   > ${fromIso}::timestamptz
        and (${params.technicianId ?? null}::text is null or (v.visit->>'technicianId') = ${params.technicianId ?? null})
      order by (v.visit->>'scheduledStart')::timestamptz asc
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

  async createVisit(
    ctx: RequestContext,
    input: {
      jobId: string;
      scheduledStart: string;
      scheduledEnd: string;
      technicianId?: string;
      title?: string;
      notes?: string;
    }
  ): Promise<{ ok: true; visitId: string }> {
    const companyId = this.requireCompany(ctx);
    const visitId = randomUUID();

    const visit = {
      id: visitId,
      scheduledStart: input.scheduledStart,
      scheduledEnd: input.scheduledEnd,
      technicianId: input.technicianId ?? null,
      title: input.title ?? null,
      notes: input.notes ?? null,
    };

    // Append to Job.data.visits[] using jsonb operations (no full Job.data replace).
    await (this.prisma as any).$executeRaw`
      update "Job"
      set data = jsonb_set(
        coalesce(data,'{}'::jsonb),
        '{visits}',
        coalesce(data->'visits','[]'::jsonb) || ${JSON.stringify(visit)}::jsonb,
        true
      )
      where id = ${input.jobId} and "companyId" = ${companyId};
    `;

    await this.writeAudit(ctx, {
      companyId,
      actorType: ctx.actor?.type ?? "system",
      actorId: ctx.actor?.id ?? null,
      entityType: "Job",
      entityId: input.jobId,
      action: "UPDATE",
      meta: { op: "schedule.createVisit", visitId },
      correlationId: ctx.correlationId ?? null,
    });

    return { ok: true, visitId };
  }
}
