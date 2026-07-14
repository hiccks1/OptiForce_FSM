

export type ID = string;

export type Customer = {
  id: ID;
  name: string;
  email?: string;
  phone?: string;
};

export type VisitStatus = "SCHEDULED" | "EN_ROUTE" | "ON_SITE" | "COMPLETED" | "CANCELLED";

export type Visit = {
  id: ID;
  jobId?: ID;
  customerId?: ID;
  customerName?: string;

  technicianId?: ID;
  technicianName?: string;

  status: VisitStatus;

  scheduledStart: string; // ISO
  scheduledEnd: string; // ISO

  title?: string;
  notes?: string;

  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
};

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; status?: number };
