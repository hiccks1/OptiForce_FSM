// apps/api/src/controllers/jobs.ts

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};


import type { Request, Response } from "express";
import { prisma } from "@fsm/db";
import { ScheduleService } from "@fsm/core/services/ScheduleService";
import type { RequestContext } from "@fsm/core/context/RequestContext";

function requireCtx(req: Request): RequestContext {
  const ctx = (req as any).context as RequestContext | undefined;
  if (!ctx) {
    throw new Error("RequestContext missing on request. Ensure attachRequestContext middleware runs first.");
  }
  return ctx;
}

function requireCompanyId(req: Request): string {
  const ctx = requireCtx(req);
  const companyId = (ctx as any).companyId as string | undefined;
  if (!companyId || !companyId.trim()) {
    throw new Error("Missing companyId. Provide x-company-id header or ?companyId=");
  }
  return companyId.trim();
}

function parsePagination(req: Request) {
  const page = Math.max(1, Number(req.query.page ?? 1));
  const limit = Math.min(200, Math.max(1, Number(req.query.limit ?? 50)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

function getScheduleService() {
  return new ScheduleService(prisma as any);
}

// =====================================================
// JOBS (JSONB-first)
// =====================================================

export async function createJob(req: Request, res: Response) {
  try {
    const companyId = requireCompanyId(req);
    const ctx = requireCtx(req);
    const data = (req.body ?? {}) as Record<string, any>;

    // If caller provides a scheduledWindow, treat this as "create job with first visit"
    const sw = data?.scheduledWindow;
    const swStart = typeof sw?.start === "string" ? sw.start : null;
    const swEnd = typeof sw?.end === "string" ? sw.end : null;

    if (swStart && swEnd) {
      const start = new Date(swStart);
      const end = new Date(swEnd);

      if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid scheduledWindow.start/end ISO strings" });
      }

      const svc = getScheduleService();

      const created = await svc.createAppointmentJob(ctx, {
        scheduledStart: start,
        scheduledEnd: end,
        technicianId:
          typeof data?.assignedTechnicianId === "string"
            ? data.assignedTechnicianId
            : undefined,
        customerName:
          typeof data?.customerName === "string" ? data.customerName : undefined,
        title: typeof data?.title === "string" ? data.title : undefined,
        notes: typeof data?.notes === "string" ? data.notes : undefined,
        address: data?.serviceAddress,
      });

      return res.status(201).json({
        jobId: created.jobId,
        visitId: created.visitId,
      });
    }

    // Otherwise: generic JSONB-first create
    const created = await prisma.job.create({
      data: {
        companyId,
        data,
      },
      select: {
        id: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
        data: true,
      },
    });

    return res.status(201).json(created);
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function listJobs(req: Request, res: Response) {
  try {
    const companyId = requireCompanyId(req);
    const { page, limit, skip } = parsePagination(req);

    const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
    const status =
      typeof req.query.status === "string" ? req.query.status.trim() : "";

    const where: any = {
      companyId,
      deletedAt: null,
    };

    if (q) {
      where.OR = [
        { data: { path: ["customerName"], string_contains: q } },
        { data: { path: ["title"], string_contains: q } },
        { data: { path: ["jobType"], string_contains: q } },
      ];
    }

    if (status) {
      where.OR = [
        { AND: [{ data: { path: ["statusHistory"], array_length: 0 } }] },
        { data: { path: ["statusHistory", -1, "to"], equals: status } },
      ];
    }

    const [total, rows] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          companyId: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
          data: true,
        },
      }),
    ]);

    return res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: rows,
    });
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function getJobById(req: Request, res: Response) {
  try {
    const companyId = requireCompanyId(req);
    const id = req.params.id;

    const job = await prisma.job.findFirst({
      where: { id, companyId, deletedAt: null },
      select: {
        id: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        data: true,
        contentHash: true,
        previousHash: true,
      },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    return res.json(job);
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function updateJobStatus(req: Request, res: Response) {
  try {
    const companyId = requireCompanyId(req);
    const id = req.params.id;

    const body = (req.body ?? {}) as { to?: string; note?: string };
    if (!body.to)
      return res.status(400).json({ error: "Missing required body: { to }" });

    const job = await prisma.job.findFirst({
      where: { id, companyId, deletedAt: null },
      select: { id: true, data: true },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    const d: any = job.data ?? {};
    const history: any[] = Array.isArray(d.statusHistory) ? d.statusHistory : [];
    const from = history.length ? history[history.length - 1]?.to ?? null : null;

    history.push({
      at: new Date().toISOString(),
      from,
      to: body.to,
      note: body.note ?? null,
    });

    d.statusHistory = history;

    const saved = await prisma.job.update({
      where: { id },
      data: { data: d },
      select: {
        id: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
        data: true,
      },
    });

    return res.json(saved);
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

// =====================================================
// CALENDAR (VISITS INSIDE Job.data.visits[])
// =====================================================

export async function calendarJobs(req: Request, res: Response) {
  try {
    requireCompanyId(req);
    const ctx = requireCtx(req);

    const start =
      typeof req.query.start === "string" ? new Date(req.query.start) : null;
    const end =
      typeof req.query.end === "string" ? new Date(req.query.end) : null;

    if (!start || Number.isNaN(start.getTime())) {
      return res
        .status(400)
        .json({ error: "Missing/invalid ?start= ISO datetime" });
    }
    if (!end || Number.isNaN(end.getTime())) {
      return res
        .status(400)
        .json({ error: "Missing/invalid ?end= ISO datetime" });
    }

    const technicianId =
      typeof req.query.technicianId === "string"
        ? req.query.technicianId.trim()
        : undefined;

    const svc = getScheduleService();

    const rows = await svc.listAppointmentsInRange(ctx, {
      from: start,
      to: end,
      technicianId: technicianId || undefined,
      limit: 2000,
    });

    // REQUIRED: { id: visitId, jobId }
    const events = rows.map((r) => ({
      id: r.id, // visitId
      jobId: r.jobId,
      title: r.title ?? "Visit",
      technicianId: r.technicianId ?? null,
      start: r.scheduledStart ?? null,
      end: r.scheduledEnd ?? null,
      customerName: r.customerName ?? null,
      raw: r,
    }));

    return res.json({
      start: start.toISOString(),
      end: end.toISOString(),
      count: events.length,
      events,
    });
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

// =====================================================
// VISIT PATCH (NEW CORRECT ENDPOINT)
// =====================================================

export async function updateVisit(req: Request, res: Response) {
  try {
    requireCompanyId(req);
    const ctx = requireCtx(req);

    const jobId = req.params.jobId;
    const visitId = req.params.visitId;

    const body = (req.body ?? {}) as {
      start?: string;
      end?: string;
      technicianId?: string;
      title?: string;
      notes?: string;
      customerName?: string;
      address?: unknown;
    };

    if (!body.start || !body.end) {
      return res
        .status(400)
        .json({ error: "Missing required body: { start, end } (ISO strings)" });
    }

    const start = new Date(body.start);
    const end = new Date(body.end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid start/end ISO strings" });
    }

    const svc = getScheduleService();

    await svc.updateVisit(ctx, {
      jobId,
      visitId,
      scheduledStart: start,
      scheduledEnd: end,
      technicianId:
        typeof body.technicianId === "string" ? body.technicianId : undefined,
      title: typeof body.title === "string" ? body.title : undefined,
      notes: typeof body.notes === "string" ? body.notes : undefined,
      customerName:
        typeof body.customerName === "string" ? body.customerName : undefined,
      address: body.address,
    });

    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

// =====================================================
// LEGACY ENDPOINT (KEEP TEMPORARILY TO AVOID BREAKING)
// PATCH /jobs/:id/schedule
// - Treats :id as jobId
// - Uses body.visitId if provided, otherwise patches first visit
// =====================================================

export async function scheduleJob(req: Request, res: Response) {
  try {
    const companyId = requireCompanyId(req);
    const ctx = requireCtx(req);
    const jobId = req.params.id;

    const body = (req.body ?? {}) as {
      start?: string;
      end?: string;
      technicianId?: string;
      visitId?: string;
    };

    if (!body.start || !body.end) {
      return res
        .status(400)
        .json({ error: "Missing required body: { start, end } (ISO strings)" });
    }

    const start = new Date(body.start);
    const end = new Date(body.end);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return res.status(400).json({ error: "Invalid start/end ISO strings" });
    }

    // Determine visitId: explicit or first visit
    let visitId = typeof body.visitId === "string" ? body.visitId : undefined;

    if (!visitId) {
      const job = await prisma.job.findFirst({
        where: { id: jobId, companyId, deletedAt: null },
        select: { data: true },
      });

      const d: any = job?.data ?? {};
      const visits: any[] = Array.isArray(d.visits) ? d.visits : [];
      visitId = typeof visits?.[0]?.id === "string" ? visits[0].id : undefined;
    }

    if (!visitId) {
      return res
        .status(400)
        .json({ error: "No visitId provided and job has no visits[]" });
    }

    const svc = getScheduleService();

    await svc.updateVisit(ctx, {
      jobId,
      visitId,
      scheduledStart: start,
      scheduledEnd: end,
      technicianId:
        typeof body.technicianId === "string" ? body.technicianId : undefined,
    });

    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}
