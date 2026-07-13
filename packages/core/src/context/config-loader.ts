// packages/core/src/context/config-loader.ts
import { prisma } from '@fsm/db';
import { PrismaCompanyConfigSchema, type CompanyConfigEntity } from '@fsm/schemas';

/**
 * High-performance configuration resolution context layer
 * Guarantees that the parsed database record exactly matches expected L2 typings
 */
export async function loadCompanyConfig(
  companyId: string, 
  targetVersion: number
): Promise<CompanyConfigEntity> {
  
  // 1. Fetch raw unvalidated structure from Postgres
  const rawRecord = await prisma.companyConfig.findUnique({
    where: {
      companyId_version: {
        companyId,
        version: targetVersion
      }
    }
  });

  if (!rawRecord) {
    throw new Error(`Configuration Resolution Failure: No configuration found for Company [${companyId}] at Version [${targetVersion}].`);
  }

  if (!rawRecord.isActive) {
    throw new Error(`Security Exception: Tenant configuration version [${targetVersion}] has been deactivated.`);
  }

  // 2. Pass straight through the Zod parse pipe to validate the entire JSONB payload structure
  // This turns Prisma's anonymous 'JsonValue' into your highly complex, typed contract model
  const validatedConfig: CompanyConfigEntity = PrismaCompanyConfigSchema.parse({
    ...rawRecord,
    createdAt: rawRecord.createdAt.toISOString() // Align native Date objects with strict string format requirements
  });

  return validatedConfig;
}
