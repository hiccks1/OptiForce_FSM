// apps/api/src/middleware/requireRole.ts
import type { Request, Response, NextFunction } from 'express';
import type { UserRole } from '@fsm/db';

export const STAFF_ROLES: readonly UserRole[] = ['OWNER', 'ADMIN', 'MANAGER', 'CSR', 'FIELD'];

// Staff endpoints: signed-in employees (or the demo fallback). Portal links are rejected.
export function requireStaff(roles: readonly UserRole[] = STAFF_ROLES) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { principal, role } = req.ctx;
    if (principal === 'portal' || !role || !roles.includes(role)) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    next();
  };
}

// Portal endpoints: a customer portal link, or staff previewing the portal.
export function requirePortalOrStaff(req: Request, res: Response, next: NextFunction) {
  const { principal, role } = req.ctx;
  if (principal === 'portal' || (role && STAFF_ROLES.includes(role))) {
    next();
    return;
  }
  res.status(403).json({ error: 'Forbidden' });
}

export function requireDemoMode(demoMode: boolean) {
  return (_req: Request, res: Response, next: NextFunction) => {
    if (!demoMode) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    next();
  };
}
