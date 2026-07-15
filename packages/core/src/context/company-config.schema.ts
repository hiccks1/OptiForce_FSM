// packages/schemas/src/company-config.schema.ts
import { z } from 'zod';
import { CompanyConfigPayloadSchema, DRIFTY_FILE_CONTRACT, DriftyLayer } from './company.schema';

/**
 * Strict Layer Separation Contract
 * Enforces L2 Domain boundaries for Company Settings.
 */

/**
 * Precise L2 Application Mirror of model CompanyConfig
 */
export const PrismaCompanyConfigSchema = z.object({
  // Identical primary key tracking
  id: z.string().cuid(),
  
  // Architectural Constraint: Company context must be validated first
  companyId: z.string().uuid("Company ID must be a valid UUID structure"),
  
  // Version tracking matched to your integer column
  version: z.number().int().positive(),
  
  /**
   * The Typed JSONB Engine
   * Casts Prisma's generic Json column directly to your complex metadata validator
   */
  schema: CompanyConfigPayloadSchema,
  
  // Integrity sealing check tracking
  contentHash: z.string().length(64, "SHA-256 integrity hash must be 64 characters").nullable(),
  
  // Operation Flags
  isActive: z.boolean().default(true),
  createdAt: z.string().datetime(),
  createdBy: z.string().nullable(),
});

export type CompanyConfigEntity = z.infer<typeof PrismaCompanyConfigSchema>;
