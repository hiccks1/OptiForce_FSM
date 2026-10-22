// apps/api/src/auth/tokens.ts
// Signed tokens: staff sessions (tenant + role from the user record),
// customer-portal links scoped to a single job, customer portal sessions, and
// one-time customer invites (only valid while the user has no password).
import jwt from 'jsonwebtoken';
import type { UserRole } from '@fsm/db';
import { config } from '../config/env';

export type StaffClaims = { typ: 'staff'; sub: string; cid: string; role: UserRole };
export type PortalClaims = { typ: 'portal'; cid: string; jobId: string };
export type CustomerClaims = { typ: 'customer'; sub: string; cid: string; custId: string };
export type InviteClaims = { typ: 'invite'; sub: string; cid: string };
export type TokenClaims = StaffClaims | PortalClaims | CustomerClaims;

const ISSUER = 'optiforce-api';

export function signStaffToken(user: { id: string; companyId: string; role: UserRole }): string {
  const claims: Omit<StaffClaims, 'sub'> = { typ: 'staff', cid: user.companyId, role: user.role };
  return jwt.sign(claims, config.jwtSecret, {
    subject: user.id,
    issuer: ISSUER,
    expiresIn: config.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

export function signPortalToken(input: { companyId: string; jobId: string }): string {
  const claims: PortalClaims = { typ: 'portal', cid: input.companyId, jobId: input.jobId };
  return jwt.sign(claims, config.jwtSecret, {
    issuer: ISSUER,
    expiresIn: config.portalLinkTtl as jwt.SignOptions['expiresIn'],
  });
}

export function signCustomerToken(user: { id: string; companyId: string; customerId: string }): string {
  const claims: Omit<CustomerClaims, 'sub'> = { typ: 'customer', cid: user.companyId, custId: user.customerId };
  return jwt.sign(claims, config.jwtSecret, {
    subject: user.id,
    issuer: ISSUER,
    expiresIn: config.portalSessionTtl as jwt.SignOptions['expiresIn'],
  });
}

export function signInviteToken(user: { id: string; companyId: string }): string {
  const claims: Omit<InviteClaims, 'sub'> = { typ: 'invite', cid: user.companyId };
  return jwt.sign(claims, config.jwtSecret, {
    subject: user.id,
    issuer: ISSUER,
    expiresIn: config.portalInviteTtl as jwt.SignOptions['expiresIn'],
  });
}

export function verifyInviteToken(token: string): InviteClaims | null {
  try {
    const p = jwt.verify(token, config.jwtSecret, { issuer: ISSUER }) as jwt.JwtPayload;
    if (p.typ === 'invite' && typeof p.sub === 'string' && typeof p.cid === 'string') {
      return { typ: 'invite', sub: p.sub, cid: p.cid };
    }
    return null;
  } catch {
    return null;
  }
}

export function verifyToken(token: string): TokenClaims | null {
  try {
    const p = jwt.verify(token, config.jwtSecret, { issuer: ISSUER }) as jwt.JwtPayload;
    if (p.typ === 'staff' && typeof p.sub === 'string' && typeof p.cid === 'string' && typeof p.role === 'string') {
      return { typ: 'staff', sub: p.sub, cid: p.cid, role: p.role as UserRole };
    }
    if (p.typ === 'portal' && typeof p.cid === 'string' && typeof p.jobId === 'string') {
      return { typ: 'portal', cid: p.cid, jobId: p.jobId };
    }
    if (p.typ === 'customer' && typeof p.sub === 'string' && typeof p.cid === 'string' && typeof p.custId === 'string') {
      return { typ: 'customer', sub: p.sub, cid: p.cid, custId: p.custId };
    }
    return null;
  } catch {
    return null;
  }
}

export function bearerToken(header: string | undefined): string | null {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim() || null;
}
