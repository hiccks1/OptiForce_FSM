// packages/schemas/src/job.schema.ts
import { z } from 'zod';
import { DRIFTY_FILE_CONTRACT, DriftyLayer } from './company.schema';

/**
 * Strict Layer Separation Contract
 * Enforces L2 Domain boundaries for Job Payload Mutations.
 */
export const JOB_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;

/**
 * Minimal C2PA Compliant AI Manifest Tracking
 */
export const JobC2PAManifestSchema = z.object({
  manifestIdentifier: z.string(),
  actor: z.enum(['AI_SCHEDULER', 'AI_DISPATCH_OPTIMIZER']), // Your 2 C2PA compliant AIs
  assertionSummaryHash: z.string().length(64),
  signedAt: z.string().datetime(),
});

/**
 * Highly Flexible JSONB Core Engine (The "data" Column)
 * Polymorphic layout adapting smoothly based on CompanyConfig onboarding tiers.
 */
export const JobDataJsonbSchema = z.object({
  status: z.enum(['DRAFT', 'ACTIVE', 'SCHEDULED', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
  scheduledStart: z.string().datetime({ message: "Must be a valid ISO 8601 date string" }),
  scheduledEnd: z.string().datetime({ message: "Must be a valid ISO 8601 date string" }),
  
  // Base fields utilized across all operational tires
  baseMetadata: z.object({
    title: z.string().min(1),
    assignedTechIds: z.array(z.string().uuid()).default([]),
  }),

  // Un-modeled dynamic property map injected via custom CompanyConfig FieldDefinitions
  customFields: z.record(z.unknown()).default({}),

  // Enterprise Tier Only Payload Map: Left open/optional at core level
  enterpriseAiContext: z.object({
    routingConfidence: z.number().min(0).max(1),
    optimalTechMatchedReason: z.string(),
    c2paManifests: z.array(JobC2PAManifestSchema),
  }).optional(),
});

/**
 * Precise L2 Application Mirror of model Job
 * Enforces companyId FIRST to guarantee absolute tenant data fence lines.
 */
export const PrismaJobSchema = z.object({
  // Global Architectural Constraint: companyId always leads the structural object
  companyId: z.string().uuid("Company ID must be a valid UUID structure"),
  id: z.string().cuid(),

  // The parsed structural JSONB column validation
  data: JobDataJsonbSchema,

  // Immutability Verification Ledger Fields
  contentHash: z.string().length(64, "SHA-256 hash must be 64 characters").nullable(),
  previousHash: z.string().length(64, "SHA-256 hash must be 64 characters").nullable(),

  // Operation Lifecycle Auditing Fields
  deletedAt: z.string().datetime().nullable(),
  deletedBy: z.string().nullable(),
  createdAt: z.string().datetime(),
  createdBy: z.string().nullable(),
  updatedAt: z.string().datetime(),
  updatedBy: z.string().nullable(),
});

export type JobEntity = z.infer<typeof PrismaJobSchema>;
export type JobDataPayload = z.infer<typeof JobDataJsonbSchema>;
