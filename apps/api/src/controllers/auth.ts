// apps/api/src/controllers/auth.ts
// Simplified demo auth: look up a seeded user by email within the tenant and
// return a lightweight session. No password store in the demo.
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';

export async function login(req: Request, res: Response) {
  try {
    const email = ((req.body?.email as string) ?? '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await prisma.user.findFirst({
      where: { companyId: req.ctx.companyId, email, deletedAt: null },
      select: { id: true, email: true, name: true, role: true, companyId: true },
    });

    if (!user) return res.status(401).json({ error: 'No user found with that email' });

    return res.json({
      token: `demo.${user.id}`,
      user,
    });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Login failed' });
  }
}

export async function me(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    where: { companyId: req.ctx.companyId, deletedAt: null },
    select: { id: true, email: true, name: true, role: true },
    orderBy: { createdAt: 'asc' },
  });
  res.json({ users });
}
