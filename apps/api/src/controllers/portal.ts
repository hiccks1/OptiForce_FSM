// apps/api/src/controllers/portal.ts
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';
import { asJobData } from '../domain/jobData';
import { config } from '../config/env';
import { signPortalToken } from '../auth/tokens';
import { cancelVisit, updateVisit } from './jobs';

function canTouchJob(req: Request, jobId: string): boolean {
  return req.ctx.principal !== 'portal' || req.ctx.portalJobId === jobId;
}

// GET /portal/config — returns the tenant's customer-portal configuration.
export async function portalConfig(req: Request, res: Response) {
  try {
    const company = await prisma.company.findUnique({
      where: { id: req.ctx.companyId },
      select: { name: true },
    });

    const cfg = await prisma.companyConfig.findFirst({
      where: { companyId: req.ctx.companyId, isActive: true },
      orderBy: { version: 'desc' },
      select: { schema: true },
    });

    const schema = (cfg?.schema ?? {}) as Record<string, unknown>;
    const portal = (schema.customerPortal ?? {}) as Record<string, unknown>;

    res.json({
      companyName: company?.name ?? 'Service Company',
      title: (portal.title as string) ?? 'Customer Portal',
      description:
        (portal.description as string) ?? 'View and manage your upcoming service appointments.',
      primaryColor: (portal.primaryColor as string) ?? '#4f46e5',
      allowReschedule: portal.allowReschedule !== false,
    });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load portal config' });
  }
}

// GET /portal/upcoming — upcoming visits for the customer portal.
export async function portalUpcoming(req: Request, res: Response) {
  try {
    const rows = await prisma.job.findMany({
      where: {
        companyId: req.ctx.companyId,
        deletedAt: null,
        ...(req.ctx.portalJobId ? { id: req.ctx.portalJobId } : {}),
      },
    });

    const now = Date.now();
    const visits = rows
      .flatMap((r) => {
        const d = asJobData(r.data);
        return d.visits
          .filter((v) => v.status !== 'CANCELLED' && +new Date(v.start) >= now)
          .map((v) => ({
            id: v.id,
            jobId: r.id,
            title: v.title ?? d.title,
            technicianName: v.technicianName ?? null,
            start: v.start,
            end: v.end,
            status: v.status,
            customerName: d.customer.name,
            address: d.customer.address ?? null,
          }));
      })
      .sort((a, b) => +new Date(a.start) - +new Date(b.start));

    res.json({ visits });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to load upcoming visits' });
  }
}

// POST /portal/links — staff create a signed customer-portal link for one job
// (sent to the customer by text/email). Body: { jobId }.
export async function createPortalLink(req: Request, res: Response) {
  try {
    const jobId = typeof req.body?.jobId === 'string' ? req.body.jobId : '';
    if (!jobId) return res.status(400).json({ error: 'jobId is required' });

    const job = await prisma.job.findFirst({
      where: { id: jobId, companyId: req.ctx.companyId, deletedAt: null },
      select: { id: true },
    });
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const token = signPortalToken({ companyId: req.ctx.companyId, jobId: job.id });
    return res.status(201).json({
      url: `${config.portalBaseUrl}/portal?token=${encodeURIComponent(token)}`,
      token,
      expiresIn: config.portalLinkTtl,
    });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to create portal link' });
  }
}

// PATCH /portal/jobs/:jobId/visits/:visitId — customer reschedules (start/end only).
export async function portalRescheduleVisit(req: Request, res: Response) {
  if (!canTouchJob(req, req.params.jobId!)) return res.status(404).json({ error: 'Job not found' });
  const body = (req.body ?? {}) as Record<string, unknown>;
  req.body = { start: body.start, end: body.end };
  return updateVisit(req, res);
}

// DELETE /portal/jobs/:jobId/visits/:visitId — customer cancels a visit.
export async function portalCancelVisit(req: Request, res: Response) {
  if (!canTouchJob(req, req.params.jobId!)) return res.status(404).json({ error: 'Job not found' });
  return cancelVisit(req, res);
}
