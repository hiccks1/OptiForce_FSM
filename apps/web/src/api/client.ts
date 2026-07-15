// apps/web/src/api/client.ts — the single API client used by every page.
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const COMPANY_ID = 'comp_demo_123';

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  const sep = path.includes('?') ? '&' : '?';
  const url = `${API_BASE}${path}${sep}companyId=${COMPANY_ID}`;
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', 'x-company-id': COMPANY_ID, ...(init?.headers ?? {}) },
      ...init,
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) {
      return { ok: false, status: res.status, error: (json && (json.error || json.message)) || `Request failed (${res.status})` };
    }
    return { ok: true, data: json as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Network error' };
  }
}

export type Address = { line1?: string; city?: string; state?: string; postalCode?: string };

export type CalendarEvent = {
  id: string;
  jobId: string;
  title: string;
  technicianId: string | null;
  technicianName: string | null;
  start: string;
  end: string;
  status: string;
  customerName: string;
  address: Address | null;
};

export type Customer = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: Address;
  jobCount: number;
  upcomingVisits: number;
};

export type JobSummary = {
  id: string;
  title: string;
  serviceType?: string;
  priority?: string;
  status: string;
  customer: { id: string; name: string };
  visitCount: number;
  nextVisit: string | null;
  createdAt: string;
};

export type DocumentRow = {
  id: string;
  title: string | null;
  status: string;
  mimeType: string | null;
  fileSize: number | null;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type User = { id: string; email: string; name: string | null; role: string };

export type PortalConfig = {
  companyName: string;
  title: string;
  description: string;
  primaryColor: string;
  allowReschedule: boolean;
};

export const api = {
  login(email: string) {
    return request<{ token: string; user: User & { companyId: string } }>(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  listUsers() {
    return request<{ users: User[] }>(`/auth/users`);
  },

  listCalendar(params: { start: string; end: string }) {
    return request<{ events: CalendarEvent[]; count: number }>(
      `/jobs/calendar?start=${encodeURIComponent(params.start)}&end=${encodeURIComponent(params.end)}`,
    );
  },
  createJob(input: {
    title: string;
    serviceType?: string;
    customerName: string;
    customerEmail?: string;
    customerPhone?: string;
    assignedTechnicianId?: string;
    notes?: string;
    start: string;
    end: string;
    serviceAddress?: Address;
  }) {
    return request<{ jobId: string; visitId: string | null }>(`/jobs`, {
      method: 'POST',
      body: JSON.stringify({
        title: input.title,
        serviceType: input.serviceType,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        assignedTechnicianId: input.assignedTechnicianId,
        notes: input.notes,
        serviceAddress: input.serviceAddress,
        scheduledWindow: { start: input.start, end: input.end },
      }),
    });
  },
  addVisit(jobId: string, input: { title?: string; technicianId?: string; technicianName?: string; start: string; end: string; notes?: string }) {
    return request<{ jobId: string; visitId: string }>(`/jobs/${jobId}/visits`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  updateVisit(jobId: string, visitId: string, input: Record<string, unknown>) {
    return request<{ ok: true }>(`/jobs/${jobId}/visits/${visitId}`, {
      method: 'PATCH',
      body: JSON.stringify(input),
    });
  },
  cancelVisit(jobId: string, visitId: string) {
    return request<{ ok: true }>(`/jobs/${jobId}/visits/${visitId}`, { method: 'DELETE' });
  },

  listJobs() {
    return request<{ jobs: JobSummary[] }>(`/jobs`);
  },

  listCustomers() {
    return request<{ customers: Customer[] }>(`/customers`);
  },
  createCustomer(input: { name: string; email?: string; phone?: string; serviceType?: string; address?: Address }) {
    return request<{ id: string; name: string }>(`/customers`, { method: 'POST', body: JSON.stringify(input) });
  },

  listDocuments() {
    return request<{ documents: DocumentRow[] }>(`/documents`);
  },

  portalConfig() {
    return request<PortalConfig>(`/portal/config`);
  },
  portalUpcoming() {
    return request<{ visits: CalendarEvent[] }>(`/portal/upcoming`);
  },
  portalReschedule(jobId: string, visitId: string, input: { start: string; end: string }) {
    return request<{ ok: true }>(`/jobs/${jobId}/visits/${visitId}`, { method: 'PATCH', body: JSON.stringify(input) });
  },
  portalCancel(jobId: string, visitId: string) {
    return request<{ ok: true }>(`/jobs/${jobId}/visits/${visitId}`, { method: 'DELETE' });
  },
};
