// apps/api/src/middleware/attachCtx.ts

import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'node:crypto';
import { prisma } from '@fsm/db';
import type { CompanyConfigPayload } from '@fsm/core';
import { loadActiveCompanyConfig } from '@fsm/core';
import { createUserContext } from '@fsm/core';
import type { RequestContext } from '@fsm/core';
import type { UserRole } from '@prisma/client';

export type ApiDeps = {
  prisma: typeof prisma;
};

declare global {
  namespace Express {
    interface Request {
      ctx: RequestContext;
      deps: ApiDeps;
      companyConfig?: CompanyConfigPayload;
      user?: {
        id: string;
        role: UserRole;
        email?: string;
      };
    }
  }
}

async function resolveCompanyId(raw: string): Promise<string> {
  const v = raw.trim();
  if (!v) throw new Error('Missing companyId');

  // If it looks like a real Company.id (cuid-ish), use it directly
  if (v.length >= 20) return v;

  // Otherwise treat it as subdomain ("demo", etc.) and upsert for MVP convenience
  const company = await prisma.company.upsert({
    where: { subdomain: v },
    update: {},
    create: { name: `${v} Company`, subdomain: v },
    select: { id: true },
  });

  return company.id;
}

export async function attachCtx(req: Request, res: Response, next: NextFunction) {
  try {
    const requestId = (req.header('x-request-id') as string) || randomUUID();

    const fromHeader = req.header('x-company-id');
    const fromQuery = typeof req.query.companyId === 'string' ? req.query.companyId : undefined;
    const rawCompany = (fromHeader ?? fromQuery ?? '').trim();

    if (!rawCompany) {
      res.status(400).json({ error: 'Missing companyId. Provide x-company-id header or ?companyId=' });
      return;
    }

    const companyId = await resolveCompanyId(rawCompany);

    // Actor (auth can populate req.user earlier; if not, we default)
    const userId = (req.user?.id ?? 'anonymous') as any;
    const role = (req.user?.role ?? ('CSR' as UserRole)) as any;
    const userEmail = req.user?.email;

    // Build pure core context (NO prisma inside)
    req.ctx = createUserContext({
      companyId: companyId as any,
      userId,
      userRole: role,
      userEmail,
      ipAddress: req.ip,
      userAgent: req.header('user-agent') ?? undefined,
      requestId,
    });

    // Attach API deps separately
    req.deps = { prisma };

    // Load active CompanyConfig once per request (config-driven system)
    const { payload } = await loadActiveCompanyConfig({ prisma }, companyId);
    req.companyConfig = payload;

    res.setHeader('X-Request-ID', requestId);

    next();
  } catch (err) {
    res.status(400).json({ error: err instanceof Error ? err.message : 'Unknown error' });
  }
}
