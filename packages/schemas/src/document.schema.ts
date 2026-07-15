// packages/schemas/src/document.schema.ts
import { z } from 'zod';

export const DocumentStatusSchema = z.enum([
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'ARCHIVED',
]);

/**
 * Metadata stored on a Document row. Actual file bytes live in object storage;
 * this schema only validates the JSONB metadata payload.
 */
export const DocumentMetadataSchema = z.object({
  documentType: z.string().optional(),
  version: z.string().optional(),
  jobId: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type DocumentStatus = z.infer<typeof DocumentStatusSchema>;
export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;
