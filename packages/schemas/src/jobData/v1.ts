// packages/schemas/src/jobData/v1.ts
// Canonical Job.data JSONB contract (versioned)
// DRIFTY: JSONB-first, visits are the only scheduling primitive.

import { z } from "zod";

import { DriftyLayer } from "../../drifty/laws";
export const JOB_DATA_VERSION = 1 as const;

export const VisitStatusV1 = z.enum([
  "scheduled",
  "in_progress",
  "completed",
  "canceled",
  "no_show",
]);

export const VisitV1 = z.object({
  id: z.string().min(1),
  technicianId: z.string().min(1),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  status: VisitStatusV1.default("scheduled"),
  summary: z.string().max(500).optional(),
  locationRef: z
    .object({
      locationId: z.string().min(1),
    })
    .optional(),
  checkIn: z
    .object({
      at: z.string().datetime(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
  checkOut: z
    .object({
      at: z.string().datetime(),
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
  canceledAt: z.string().datetime().optional(),
  meta: z.record(z.unknown()).optional(),
});

export const CustomerV1 = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  meta: z.record(z.unknown()).optional(),
});

export const LocationV1 = z.object({
  id: z.string().min(1),
  label: z.string().optional(),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  postal: z.string().optional(),
  country: z.string().optional(),
  meta: z.record(z.unknown()).optional(),
});

export const NoteV1 = z.object({
  id: z.string().min(1),
  at: z.string().datetime(),
  authorId: z.string().optional(),
  text: z.string().min(1),
  meta: z.record(z.unknown()).optional(),
});

export const JobDataV1 = z.object({
  jobDataVersion: z.literal(JOB_DATA_VERSION),

  status: z
    .enum(["new", "scheduled", "in_progress", "completed", "canceled"])
    .default("new"),

  customers: z.array(CustomerV1).default([]),
  locations: z.array(LocationV1).default([]),

  // Canonical scheduling primitive:
  // All calendar projections are derived from these visits.
  visits: z.array(VisitV1).default([]),

  notes: z.array(NoteV1).default([]),

  // External system payloads MUST be preserved verbatim.
  external: z.record(z.unknown()).default({}),
});

export type VisitV1 = z.infer<typeof VisitV1>;
export type JobDataV1 = z.infer<typeof JobDataV1>;


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
