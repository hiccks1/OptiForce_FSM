// apps/api/src/middleware/auth.ts - JWT bearer authentication

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import type { UserRole } from '@prisma/client';

// When true, requests without a valid bearer token are rejected. Defaults to
// enforced everywhere except explicit local development so we never ship an
// open API by omission.
const AUTH_REQUIRED =
  process.env.AUTH_REQUIRED === 'true' ||
  (process.env.AUTH_REQUIRED !== 'false' && process.env.NODE_ENV === 'production');

type JwtUser = {
  id: string;
  role: UserRole;
  email?: string;
};

function parseBearer(header: string | undefined): string | null {
  if (!header) return null;
  const [scheme, token] = header.split(' ');
  if (!scheme || scheme.toLowerCase() !== 'bearer' || !token) return null;
  return token.trim() || null;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = parseBearer(req.header('authorization'));

  if (!token) {
    if (AUTH_REQUIRED) {
      res.status(401).json({ error: 'Missing or malformed Authorization bearer token' });
      return;
    }
    // Unauthenticated dev request: leave req.user unset (attachCtx defaults it).
    next();
    return;
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ error: 'Server auth misconfigured: JWT_SECRET is not set' });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    const id = typeof payload.sub === 'string' ? payload.sub : (payload.id as string | undefined);
    const role = payload.role as UserRole | undefined;

    if (!id || !role) {
      res.status(401).json({ error: 'Invalid token claims' });
      return;
    }

    req.user = {
      id,
      role,
      email: typeof payload.email === 'string' ? payload.email : undefined,
    } satisfies JwtUser;

    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
