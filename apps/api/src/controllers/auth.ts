// apps/api/src/controllers/auth.ts
// Staff sign-in: email + password (bcrypt). The user's company comes from the
// user record, never from the request. In DEMO_MODE, users without a password
// can sign in by email only.
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '@fsm/db';
import { config } from '../config/env';
import { signStaffToken } from '../auth/tokens';
import { STAFF_ROLES } from '../middleware/requireRole';

const INVALID = 'Invalid email or password';

export async function login(req: Request, res: Response) {
  try {
    const email = ((req.body?.email as string) ?? '').trim().toLowerCase();
    const password = (req.body?.password as string) ?? '';
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await prisma.user.findFirst({
      where: { email, deletedAt: null, company: { deletedAt: null } },
      select: { id: true, email: true, name: true, role: true, companyId: true, passwordHash: true },
    });

    if (!user || !STAFF_ROLES.includes(user.role)) return res.status(401).json({ error: INVALID });

    if (user.passwordHash) {
      if (!password || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ error: INVALID });
      }
    } else if (!config.demoMode) {
      return res.status(401).json({ error: INVALID });
    }

    const { passwordHash: _omit, ...publicUser } = user;
    return res.json({ token: signStaffToken(user), user: publicUser });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Login failed' });
  }
}

// GET /auth/me — the signed-in user.
export async function me(req: Request, res: Response) {
  const user = await prisma.user.findFirst({
    where: { id: req.ctx.actorId, companyId: req.ctx.companyId, deletedAt: null },
    select: { id: true, email: true, name: true, role: true, companyId: true },
  });
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ user });
}

// GET /auth/users — demo account picker on the login page (DEMO_MODE only).
export async function listDemoUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany({
    where: { companyId: req.ctx.companyId, deletedAt: null },
    select: { id: true, email: true, name: true, role: true },
    orderBy: { createdAt: 'asc' },
  });
  res.json({ users });
}
