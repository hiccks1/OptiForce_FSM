// apps/api/src/controllers/jobs.ts
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';
import { asJobData, deriveStatus, newId, type JobData, type Visit } from '../domain/jobData';

function companyId(req: Request): string {
  return req.ctx.companyId;
}

async function saveJobData(jobId: string, data: JobData, actorId: string) {
  return prisma.job.update({
    where: { id: jobId },
    data: {
      data: data as unknown as object,
      updatedBy: actorId,
    },
  });
}

// GET /jobs — list all jobs (engagements) for the tenant.
export async function listJobs(req: Request, res: Response) {
  try {
    const rows = await prisma.job.findMany({
      where: { companyId: companyId(req), deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    const jobs = rows.map((r) => {
      const d = asJobData(r.data);
      return {
        id: r.id,
        title: d.title,
        serviceType: d.serviceType,
        priority: d.priority,
        status: d.status,
        customer: d.customer,
        visitCount: d.visits.filter((v) => v.status !== 'CANCELLED').length,
        nextVisit: d.visits
          .filter((v) => v.status !== 'CANCELLED')
          .sort((a, b) => +new Date(a.start) - +new Date(b.start))[0]?.start ?? null,
        createdAt: r.createdAt,
      };
    });

    res.json({ jobs });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to list jobs' });
  }
}

// GET /jobs/:id — full job with visits.
export async function getJobById(req: Request, res: Response) {
  try {
    const row = await prisma.job.findFirst({
      where: { id: req.params.id, companyId: companyId(req), deletedAt: null },
    });
    if (!row) return res.status(404).json({ error: 'Job not found' });
    return res.json({ id: row.id, ...asJobData(row.data), createdAt: row.createdAt });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to get job' });
  }
}

// POST /jobs — create a job. If a scheduledWindow is provided, seed a first visit.
export async function createJob(req: Request, res: Response) {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const sw = body.scheduledWindow as { start?: string; end?: string } | undefined;

    const visits: Visit[] = [];
    if (sw?.start && sw?.end) {
      visits.push({
        id: newId('visit'),
        title: (body.title as string) ?? 'Visit',
        technicianId: (body.assignedTechnicianId as string) || undefined,
        start: sw.start,
        end: sw.end,
        status: 'SCHEDULED',
        notes: (body.notes as string) || undefined,
      });
    }

    const data: JobData = {
      title: (body.title as string) ?? 'New job',
      serviceType: (body.serviceType as string) ?? undefined,
      priority: (body.priority as JobData['priority']) ?? 'normal',
      status: visits.length ? 'SCHEDULED' : 'NEW',
      customer: {
        id: (body.customerId as string) || newId('cust'),
        name: (body.customerName as string) ?? 'Unknown customer',
        email: (body.customerEmail as string) || undefined,
        phone: (body.customerPhone as string) || undefined,
        address: (body.serviceAddress as JobData['customer']['address']) ?? undefined,
      },
      visits,
      notes: (body.notes as string) || undefined,
    };

    const created = await prisma.job.create({
      data: { companyId: companyId(req), data: data as unknown as object, createdBy: req.ctx.actorId },
    });

    res.status(201).json({ jobId: created.id, visitId: visits[0]?.id ?? null });
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to create job' });
  }
}

// GET /jobs/calendar?start=&end= — flatten visits across jobs into calendar events.
export async function calendarJobs(req: Request, res: Response) {
  try {
    const start = typeof req.query.start === 'string' ? req.query.start : undefined;
    const end = typeof req.query.end === 'string' ? req.query.end : undefined;
    const startMs = start ? +new Date(start) : -Infinity;
    const endMs = end ? +new Date(end) : Infinity;

    const rows = await prisma.job.findMany({
      where: { companyId: companyId(req), deletedAt: null },
    });

    const events = rows.flatMap((r) => {
      const d = asJobData(r.data);
      return d.visits
        .filter((v) => v.status !== 'CANCELLED')
        .filter((v) => {
          const s = +new Date(v.start);
          return Number.isFinite(s) && s >= startMs && s <= endMs;
        })
        .map((v) => ({
          id: v.id,
          jobId: r.id,
          title: v.title ?? d.title,
          technicianId: v.technicianId ?? null,
          technicianName: v.technicianName ?? null,
          start: v.start,
          end: v.end,
          status: v.status,
          customerName: d.customer.name,
          address: d.customer.address ?? null,
        }));
    });

    res.json({ start, end, count: events.length, events });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load calendar' });
  }
}

// POST /jobs/:jobId/visits — add a visit to an existing job.
export async function addVisit(req: Request, res: Response) {
  try {
    const row = await prisma.job.findFirst({
      where: { id: req.params.jobId, companyId: companyId(req), deletedAt: null },
    });
    if (!row) return res.status(404).json({ error: 'Job not found' });

    const data = asJobData(row.data);
    const body = (req.body ?? {}) as Record<string, unknown>;
    const visit: Visit = {
      id: newId('visit'),
      title: (body.title as string) || data.title,
      technicianId: (body.technicianId as string) || undefined,
      technicianName: (body.technicianName as string) || undefined,
      start: body.start as string,
      end: body.end as string,
      status: 'SCHEDULED',
      notes: (body.notes as string) || undefined,
    };
    data.visits.push(visit);
    data.status = deriveStatus(data);
    await saveJobData(row.id, data, req.ctx.actorId);
    return res.status(201).json({ jobId: row.id, visitId: visit.id });
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to add visit' });
  }
}

// PATCH /jobs/:jobId/visits/:visitId — reschedule / edit a visit.
export async function updateVisit(req: Request, res: Response) {
  try {
    const row = await prisma.job.findFirst({
      where: { id: req.params.jobId, companyId: companyId(req), deletedAt: null },
    });
    if (!row) return res.status(404).json({ error: 'Job not found' });

    const data = asJobData(row.data);
    const idx = data.visits.findIndex((v) => v.id === req.params.visitId);
    if (idx === -1) return res.status(404).json({ error: 'Visit not found' });

    const body = (req.body ?? {}) as Record<string, unknown>;
    const v = data.visits[idx]!;
    data.visits[idx] = {
      ...v,
      start: (body.start as string) ?? v.start,
      end: (body.end as string) ?? v.end,
      technicianId: body.technicianId !== undefined ? (body.technicianId as string) : v.technicianId,
      technicianName: body.technicianName !== undefined ? (body.technicianName as string) : v.technicianName,
      title: body.title !== undefined ? (body.title as string) : v.title,
      notes: body.notes !== undefined ? (body.notes as string) : v.notes,
      status: (body.status as Visit['status']) ?? v.status,
    };
    data.status = deriveStatus(data);
    await saveJobData(row.id, data, req.ctx.actorId);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to update visit' });
  }
}

// DELETE /jobs/:jobId/visits/:visitId — cancel a visit (soft, keeps history).
export async function cancelVisit(req: Request, res: Response) {
  try {
    const row = await prisma.job.findFirst({
      where: { id: req.params.jobId, companyId: companyId(req), deletedAt: null },
    });
    if (!row) return res.status(404).json({ error: 'Job not found' });

    const data = asJobData(row.data);
    const idx = data.visits.findIndex((v) => v.id === req.params.visitId);
    if (idx === -1) return res.status(404).json({ error: 'Visit not found' });
    data.visits[idx]!.status = 'CANCELLED';
    data.status = deriveStatus(data);
    await saveJobData(row.id, data, req.ctx.actorId);
    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to cancel visit' });
  }
}
