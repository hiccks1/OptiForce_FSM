import type { ApiResult, Visit, Customer } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
      ...init,
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : null;

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: (json && (json.error || json.message)) || `Request failed (${res.status})`,
      };
    }

    return { ok: true, data: json as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Network error" };
  }
}

type CalendarResponse = {
  start: string;
  end: string;
  count: number;
  events: Array<{
    id: string; // visitId
    jobId: string;
    title?: string;
    technicianId?: string | null;
    start?: string | null;
    end?: string | null;
    customerName?: string | null;
    address?: unknown;
    raw?: unknown;
  }>;
};

type CreateJobVisitResponse = { jobId: string; visitId: string };

export const api = {
  // =========================
  // VISITS (Calendar)
  // =========================

  async listVisits(params: { from: string; to: string; technicianId?: string }) {
    const q = new URLSearchParams({
      companyId: "comp_dev_123",
      start: params.from,
      end: params.to,
      ...(params.technicianId ? { technicianId: params.technicianId } : {}),
    }).toString();

    const res = await request<CalendarResponse>(`/jobs/calendar?${q}`);
    if (!res.ok) return res;

    const mapped: Visit[] = (res.data.events ?? []).map((e) => {
      return {
        id: e.id, // visitId
        jobId: e.jobId, // jobId
        scheduledStart: e.start ?? "",
        scheduledEnd: e.end ?? "",
        technicianId: e.technicianId ?? undefined,
        title: e.title ?? "Visit",
        notes: undefined,
        customerName: e.customerName ?? undefined,
        address: e.address as any,
        customerId: undefined,
        status: "SCHEDULED",
      };
    });

    const tf = params.technicianId?.trim();
    const filtered = tf ? mapped.filter((v) => (v.technicianId ?? "") === tf) : mapped;

    return { ok: true, data: filtered } as ApiResult<Visit[]>;
  },

  async createVisit(input: {
    scheduledStart: string;
    scheduledEnd: string;
    technicianId?: string;
    title?: string;
    notes?: string;
    customerName?: string;
    address?: Visit["address"];
  }) {
    const payload: Record<string, unknown> = {
      title: input.title ?? "Visit",
      customerName: input.customerName ?? null,
      notes: input.notes ?? null,
      assignedTechnicianId: input.technicianId ?? null,
      scheduledWindow: { start: input.scheduledStart, end: input.scheduledEnd },
      serviceAddress: input.address ?? null,
    };

    const q = new URLSearchParams({ companyId: "comp_dev_123" }).toString();

    const created = await request<CreateJobVisitResponse>(`/jobs?${q}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!created.ok) return created as any;

    // Return a Visit-shaped object so UI can keep working without refetch,
    // but we still recommend the caller refresh().
    const v: Visit = {
      id: created.data.visitId,
      jobId: created.data.jobId,
      scheduledStart: input.scheduledStart,
      scheduledEnd: input.scheduledEnd,
      technicianId: input.technicianId,
      title: input.title ?? "Visit",
      notes: input.notes,
      customerName: input.customerName,
      address: input.address,
      status: "SCHEDULED",
    };

    return { ok: true, data: v } as ApiResult<Visit>;
  },

  async updateVisit(
    visit: { jobId: string; visitId: string },
    input: {
      scheduledStart: string;
      scheduledEnd: string;
      technicianId?: string;
      title?: string;
      notes?: string;
      customerName?: string;
      address?: unknown;
    }
  ) {
    const q = new URLSearchParams({ companyId: "comp_dev_123" }).toString();

    return request<{ ok: true }>(`/jobs/${visit.jobId}/visits/${visit.visitId}?${q}`, {
      method: "PATCH",
      body: JSON.stringify({
        start: input.scheduledStart,
        end: input.scheduledEnd,
        technicianId: input.technicianId ?? undefined,
        title: input.title ?? undefined,
        notes: input.notes ?? undefined,
        customerName: input.customerName ?? undefined,
        address: input.address,
      }),
    });
  },

  async cancelVisit(_visitId: string, _input: { reason: string }) {
    return { ok: false, error: "Cancel not implemented in MVP yet" } as ApiResult<Visit>;
  },

  // =========================
  // CUSTOMER PORTAL
  // =========================

  async portalUpcoming() {
    const from = new Date();
    const to = new Date(from);
    to.setDate(to.getDate() + 60);

    const q = new URLSearchParams({
      companyId: "comp_dev_123",
      start: from.toISOString(),
      end: to.toISOString(),
    }).toString();

    const res = await request<CalendarResponse>(`/jobs/calendar?${q}`);
    if (!res.ok) return res;

    const mapped: Visit[] = (res.data.events ?? []).map((e) => {
      return {
        id: e.id, // visitId
        jobId: e.jobId,
        scheduledStart: e.start ?? "",
        scheduledEnd: e.end ?? "",
        technicianId: e.technicianId ?? undefined,
        title: e.title ?? "Visit",
        notes: undefined,
        customerName: e.customerName ?? undefined,
        address: e.address as any,
        customerId: undefined,
        status: "SCHEDULED",
      };
    });

    const now = Date.now();
    const upcoming = mapped
      .filter((v) => {
        const t = +new Date(v.scheduledStart);
        return Number.isFinite(t) && t >= now;
      })
      .sort((a, b) => +new Date(a.scheduledStart) - +new Date(b.scheduledStart));

    return { ok: true, data: { visits: upcoming } } as ApiResult<{ visits: Visit[] }>;
  },

  async portalReschedule(visit: { jobId: string; visitId: string }, input: { scheduledStart: string; scheduledEnd: string }) {
    const q = new URLSearchParams({ companyId: "demo" }).toString();

    return request<{ ok: true }>(`/jobs/${visit.jobId}/visits/${visit.visitId}?${q}`, {
      method: "PATCH",
      body: JSON.stringify({
        start: input.scheduledStart,
        end: input.scheduledEnd,
      }),
    });
  },

  async portalCancel(_visitId: string, _input: { reason: string }) {
    return { ok: false, error: "Cancel not implemented in MVP yet" } as ApiResult<Visit>;
  },

  // =========================
  // CUSTOMERS
  // =========================

  async createCustomer(input: { name: string; email?: string; phone?: string }) {
    return request<Customer>(`/customers`, {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};
