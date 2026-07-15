// Canonical JSONB shape stored in Job.data for the demo (JSONB-first).
import { randomUUID } from 'node:crypto';

export type Address = {
  line1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
};

export type CustomerInfo = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: Address;
};

export type VisitStatus = 'SCHEDULED' | 'EN_ROUTE' | 'ON_SITE' | 'COMPLETED' | 'CANCELLED';

export type Visit = {
  id: string;
  title?: string;
  technicianId?: string;
  technicianName?: string;
  start: string; // ISO
  end: string; // ISO
  status: VisitStatus;
  notes?: string;
};

export type JobStatus = 'NEW' | 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type JobData = {
  title: string;
  serviceType?: string;
  priority?: 'low' | 'normal' | 'urgent';
  status: JobStatus;
  customer: CustomerInfo;
  visits: Visit[];
  notes?: string;
};

export function newId(prefix: string): string {
  return `${prefix}_${randomUUID().slice(0, 8)}`;
}

export function asJobData(raw: unknown): JobData {
  const d = (raw ?? {}) as Partial<JobData>;
  return {
    title: d.title ?? 'Untitled job',
    serviceType: d.serviceType,
    priority: d.priority ?? 'normal',
    status: d.status ?? 'NEW',
    customer: (d.customer ?? { id: newId('cust'), name: 'Unknown' }) as CustomerInfo,
    visits: Array.isArray(d.visits) ? (d.visits as Visit[]) : [],
    notes: d.notes,
  };
}

/** Recomputes a job status from its visits. */
export function deriveStatus(data: JobData): JobStatus {
  const active = data.visits.filter((v) => v.status !== 'CANCELLED');
  if (active.length === 0) return data.status === 'COMPLETED' ? 'COMPLETED' : 'NEW';
  if (active.every((v) => v.status === 'COMPLETED')) return 'COMPLETED';
  if (active.some((v) => v.status === 'ON_SITE' || v.status === 'EN_ROUTE')) return 'IN_PROGRESS';
  return 'SCHEDULED';
}
