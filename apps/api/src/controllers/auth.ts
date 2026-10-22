// apps/api/src/controllers/auth.ts
// Staff sign-in: email + password (bcrypt). The user's company comes from the
// user record, never from the request. In DEMO_MODE, users without a password
// can sign in by email only.
// Customer portal: accept an emailed invite (set password) and sign in.
import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@fsm/db';
import { config } from '../config/env';
import { signCustomerToken, signStaffToken, verifyInviteToken } from '../auth/tokens';
import { STAFF_ROLES } from '../middleware/requireRole';

const INVALID = 'Invalid email or password';

export async function login(req: Request, res: Response) {
  try {
    const email = ((req.body?.email as string) ?? '').trim().toLowerCase();
    const password = (req.body?.password as string) ?? '';
    if (!email) return res.status(400).json({ error: 'Email is required' });

    // Emails are unique per company; a staff email shared across companies is ambiguous.
    const matches = await prisma.user.findMany({
      where: { email, role: { in: [...STAFF_ROLES] }, deletedAt: null, company: { deletedAt: null } },
      select: { id: true, email: true, name: true, role: true, companyId: true, passwordHash: true },
      take: 2,
    });
    if (matches.length > 1) {
      return res.status(409).json({ error: 'This email belongs to more than one company. Contact support.' });
    }
    const user = matches[0];

    if (!user) return res.status(401).json({ error: INVALID });

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

const PasswordSchema = z.string().min(8, 'Password must be at least 8 characters').max(200);

async function pendingInviteUser(token: string) {
  const claims = verifyInviteToken(token);
  if (!claims) return null;
  return prisma.user.findFirst({
    where: {
      id: claims.sub,
      companyId: claims.cid,
      role: 'CUSTOMER',
      passwordHash: null,
      deletedAt: null,
      company: { deletedAt: null },
    },
    select: { id: true, email: true, name: true, companyId: true, customerId: true, company: { select: { name: true } } },
  });
}

const INVITE_INVALID = 'This invite link is invalid, expired, or has already been used.';

// GET /auth/invite?token= — details for the set-password page.
export async function inviteInfo(req: Request, res: Response) {
  const token = typeof req.query.token === 'string' ? req.query.token : '';
  const user = token ? await pendingInviteUser(token) : null;
  if (!user) return res.status(410).json({ error: INVITE_INVALID });
  return res.json({ email: user.email, name: user.name, companyName: user.company.name });
}

// POST /auth/invite/accept { token, password } — set the password once and sign in.
export async function acceptInvite(req: Request, res: Response) {
  const token = typeof req.body?.token === 'string' ? req.body.token : '';
  const pw = PasswordSchema.safeParse(req.body?.password);
  if (!pw.success) return res.status(400).json({ error: pw.error.issues[0]?.message ?? 'Invalid password' });

  const user = token ? await pendingInviteUser(token) : null;
  if (!user || !user.customerId) return res.status(410).json({ error: INVITE_INVALID });

  // Only succeeds while no password is set, so the link is single-use.
  const { count } = await prisma.user.updateMany({
    where: { id: user.id, passwordHash: null },
    data: { passwordHash: await bcrypt.hash(pw.data, 10) },
  });
  if (count !== 1) return res.status(410).json({ error: INVITE_INVALID });

  return res.json(customerSession({ ...user, customerId: user.customerId }));
}

// POST /auth/customer/login { company, email, password } — company is its id or subdomain.
export async function customerLogin(req: Request, res: Response) {
  const company = typeof req.body?.company === 'string' ? req.body.company.trim() : '';
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!company || !email || !password) return res.status(400).json({ error: 'Company, email and password are required' });

  const user = await prisma.user.findFirst({
    where: {
      email,
      role: 'CUSTOMER',
      deletedAt: null,
      company: { deletedAt: null, OR: [{ id: company }, { subdomain: company }] },
    },
    select: { id: true, email: true, name: true, companyId: true, customerId: true, passwordHash: true, company: { select: { name: true } } },
  });
  if (!user?.passwordHash || !user.customerId || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: INVALID });
  }
  return res.json(customerSession({ ...user, customerId: user.customerId }));
}

function customerSession(user: { id: string; email: string; name: string | null; companyId: string; customerId: string; company: { name: string } }) {
  return {
    token: signCustomerToken(user),
    user: { id: user.id, email: user.email, name: user.name, companyId: user.companyId, companyName: user.company.name },
  };
}
