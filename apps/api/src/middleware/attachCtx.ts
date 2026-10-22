// apps/api/src/middleware/attachCtx.ts
// Resolves tenant + actor for every protected request from the signed token.
// The tenant always comes from the token; x-company-id / ?companyId are only
// honoured in DEMO_MODE for unauthenticated demo requests.
import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { prisma, type UserRole } from '@fsm/db';
import { config } from '../config/env';
import { bearerToken, verifyToken } from '../auth/tokens';

export type RequestContext = {
  companyId: string;
  requestId: string;
  actorId: string;
  actorType: 'HUMAN' | 'SYSTEM' | 'AI';
  principal: 'staff' | 'portal' | 'demo';
  role: UserRole | null;
  // Set for portal principals: the only job this request may touch.
  portalJobId?: string;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      ctx: RequestContext;
    }
  }
}

async function resolveDemoCompanyId(raw: string | undefined): Promise<string | null> {
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
    res.setHeader('X-Request-ID', requestId);

    const token = bearerToken(req.header('authorization'));
    if (token) {
      const claims = verifyToken(token);
      if (!claims) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
      }

      if (claims.typ === 'staff') {
        const user = await prisma.user.findFirst({
          where: { id: claims.sub, companyId: claims.cid, deletedAt: null, company: { deletedAt: null } },
          select: { id: true, companyId: true, role: true },
        });
        if (!user) {
          res.status(401).json({ error: 'User no longer active' });
          return;
        }
        req.ctx = { companyId: user.companyId, requestId, actorId: user.id, actorType: 'HUMAN', principal: 'staff', role: user.role };
      } else {
        req.ctx = {
          companyId: claims.cid,
          requestId,
          actorId: `portal:${claims.jobId}`,
          actorType: 'HUMAN',
          principal: 'portal',
          role: 'CUSTOMER',
          portalJobId: claims.jobId,
        };
      }
      next();
      return;
    }

    if (!config.demoMode) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const fromHeader = req.header('x-company-id') ?? undefined;
    const fromQuery = typeof req.query.companyId === 'string' ? req.query.companyId : undefined;
    const companyId = await resolveDemoCompanyId(fromHeader ?? fromQuery);
    if (!companyId) {
      res.status(400).json({ error: 'No company found. Seed the database first.' });
      return;
    }

    req.ctx = {
      companyId,
      requestId,
      actorId: (req.header('x-actor-id') as string) || 'csr_demo',
      actorType: 'HUMAN',
      principal: 'demo',
      role: 'CSR',
    };
    next();
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Context error' });
  }
}
