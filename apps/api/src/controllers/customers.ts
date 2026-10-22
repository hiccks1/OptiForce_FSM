// apps/api/src/controllers/customers.ts
// Customers are JSONB-first: each customer is represented by a Job that embeds
// the customer under data.customer (visits are added later when scheduling).
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';
import { asJobData, newId, type JobData } from '../domain/jobData';
import { inviteCustomer } from '../auth/portalInvites';

export type PortalStatus = 'active' | 'invited' | null;

async function portalStatusByCustomer(companyId: string): Promise<Map<string, PortalStatus>> {
  const users = await prisma.user.findMany({
    where: { companyId, role: 'CUSTOMER', deletedAt: null, customerId: { not: null } },
    select: { customerId: true, passwordHash: true },
  });
  return new Map(users.map((u) => [u.customerId!, u.passwordHash ? 'active' : 'invited']));
}

function companyId(req: Request): string {
  return req.ctx.companyId;
}

// GET /customers — one entry per customer, with a rollup of their jobs/visits.
export async function listCustomers(req: Request, res: Response) {
  try {
    const rows = await prisma.job.findMany({
      where: { companyId: companyId(req), deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    const portal = await portalStatusByCustomer(companyId(req));
    const byCustomer = new Map<
      string,
      { id: string; name: string; email?: string; phone?: string; address?: unknown; jobCount: number; upcomingVisits: number; portalStatus: PortalStatus }
    >();

    for (const r of rows) {
      const d = asJobData(r.data);
      const key = d.customer.id || d.customer.name;
      const existing = byCustomer.get(key);
      const upcoming = d.visits.filter((v) => v.status !== 'CANCELLED' && +new Date(v.start) >= Date.now()).length;
      if (existing) {
        existing.jobCount += 1;
        existing.upcomingVisits += upcoming;
      } else {
        byCustomer.set(key, {
          id: d.customer.id,
          name: d.customer.name,
          email: d.customer.email,
          phone: d.customer.phone,
          address: d.customer.address,
          jobCount: 1,
          upcomingVisits: upcoming,
          portalStatus: portal.get(d.customer.id) ?? null,
        });
      }
    }

    res.json({ customers: Array.from(byCustomer.values()) });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to list customers' });
  }
}

// POST /customers — create a customer as a new Job shell. With an email, also
// creates the customer's portal account and emails them an invite.
export async function createCustomer(req: Request, res: Response) {
  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const name = (body.name as string)?.trim();
    if (!name) return res.status(400).json({ error: 'Customer name is required' });

    const customerId = newId('cust');
    const data: JobData = {
      title: `${name} — customer record`,
      serviceType: (body.serviceType as string) || undefined,
      priority: 'normal',
      status: 'NEW',
      customer: {
        id: customerId,
        name,
        email: (body.email as string) || undefined,
        phone: (body.phone as string) || undefined,
        address: (body.address as JobData['customer']['address']) || undefined,
      },
      visits: [],
    };

    await prisma.job.create({
      data: { companyId: companyId(req), data: data as unknown as object, createdBy: req.ctx.actorId },
    });

    const invite = data.customer.email
      ? await inviteCustomer({ companyId: companyId(req), customer: data.customer }).catch((err: unknown) => ({
          status: 'not_sent' as const,
          reason: err instanceof Error ? err.message : 'Invite failed',
        }))
      : null;

    return res.status(201).json({ id: customerId, name, email: data.customer.email, phone: data.customer.phone, invite });
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to create customer' });
  }
}

// POST /customers/:customerId/invite — (re)send the portal invite email.
export async function resendCustomerInvite(req: Request, res: Response) {
  try {
    const job = await prisma.job.findFirst({
      where: { companyId: companyId(req), deletedAt: null, data: { path: ['customer', 'id'], equals: req.params.customerId } },
      orderBy: { createdAt: 'desc' },
      select: { data: true },
    });
    if (!job) return res.status(404).json({ error: 'Customer not found' });

    const { customer } = asJobData(job.data);
    if (!customer.email) return res.status(400).json({ error: 'Customer has no email address' });

    const invite = await inviteCustomer({ companyId: companyId(req), customer });
    return res.json({ invite });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to send invite' });
  }
}
