// apps/api/src/middleware/attachCtx.ts
import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { prisma } from '@fsm/db';

export type RequestContext = {
  companyId: string;
  requestId: string;
  actorId: string;
  actorType: 'HUMAN' | 'SYSTEM' | 'AI';
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}

/**
 * Resolves the tenant for the request. Accepts an explicit company id/subdomain
 * (header or query); otherwise falls back to the single demo company so the
 * demo works out of the box.
 */
async function resolveCompanyId(raw: string | undefined): Promise<string | null> {
  const v = (raw ?? '').trim();

  if (v) {
    const byId = await prisma.company.findUnique({ where: { id: v }, select: { id: true } });
    if (byId) return byId.id;

    const bySub = await prisma.company.findUnique({ where: { subdomain: v }, select: { id: true } });
    if (bySub) return bySub.id;
  }

  const first = await prisma.company.findFirst({
    where: { deletedAt: null },
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  });
  return first?.id ?? null;
}

export async function attachCtx(req: Request, res: Response, next: NextFunction) {
  try {
    const requestId = (req.header('x-request-id') as string) || randomUUID();
    const fromHeader = req.header('x-company-id') ?? undefined;
    const fromQuery = typeof req.query.companyId === 'string' ? req.query.companyId : undefined;

    const companyId = await resolveCompanyId(fromHeader ?? fromQuery);
    if (!companyId) {
      res.status(400).json({ error: 'No company found. Seed the database first.' });
      return;
    }

    req.ctx = {
      companyId,
      requestId,
      actorId: (req.header('x-actor-id') as string) || 'csr_demo',
      actorType: 'HUMAN',
    };

    res.setHeader('X-Request-ID', requestId);
    next();
  } catch (err) {
    next(err);
  }
}
