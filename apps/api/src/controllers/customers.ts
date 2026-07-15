// apps/api/src/controllers/customers.ts
// Customers are JSONB-first: each customer is represented by a Job that embeds
// the customer under data.customer (visits are added later when scheduling).
import type { Request, Response } from 'express';
import { prisma } from '@fsm/db';
import { asJobData, newId, type JobData } from '../domain/jobData';

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

    const byCustomer = new Map<
      string,
      { id: string; name: string; email?: string; phone?: string; address?: unknown; jobCount: number; upcomingVisits: number }
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
        });
      }
    }

    res.json({ customers: Array.from(byCustomer.values()) });
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to list customers' });
  }
}

// POST /customers — create a customer as a new Job shell.
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

    return res.status(201).json({ id: customerId, name, email: data.customer.email, phone: data.customer.phone });
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : 'Failed to create customer' });
  }
}
