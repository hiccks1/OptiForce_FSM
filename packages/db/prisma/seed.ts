// FSM/packages/db/prisma/seed.ts
/* eslint-disable no-console */

import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
// Pure TS path resolution - no trailing file extensions
import { PrismaClient } from '../src/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Executing database seed script against the current schema model...');

  const companyId = "comp_demo_123";
  const userId = "user_demo_456";
  const contractId = "contract_demo_789";
  const jobId = "job_demo_987";
  const manifestId = "manifest_demo_abc";
  const documentId = "doc_demo_xyz";

  // 1. Seed 'companies' -> Prisma Client exposes this as 'company'
  console.log('🏢 Seeding companies...');
  await prisma.company.upsert({
    where: { id: companyId },
    update: {},
    create: {
      id: companyId,
      name: "FSM Active Enterprise",
      subdomain: "demo",
      deletedBy: null,
    },
  });

  // 2. Seed 'users' -> Prisma Client exposes this as 'user'
  console.log('👤 Seeding users...');
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: "engineer@demo.fsm",
      name: "Phil Developer",
      companyId: companyId,
      deletedBy: null,
      role: "OWNER"
    },
  });

  // 3. Seed 'company_configs' -> Prisma Client exposes this as 'company_configs' or 'company_config'
  console.log('⚙️ Seeding company_configs...');
  await prisma.companyConfigs?.upsert?.({
    where: { id: "config_demo_001" },
    update: {},
    create: {
      id: "config_demo_001",
      companyId: companyId,
      isActive: true,
      version: 1,
      contentHash: "config-v1-hash",
      schema: { version: "1.0", features: ["audit", "c2pa"] },
    },
  }) || await prisma.companyConfig.upsert({
    where: { id: "config_demo_001" },
    update: {},
    create: {
      id: "config_demo_001",
      companyId: companyId,
      isActive: true,
      version: 1,
      contentHash: "config-v1-hash",
      schema: { version: "1.0", features: ["audit", "c2pa"] },
    },
  });

  // 4. Seed 'contracts' -> Prisma Client exposes this as 'contracts' or 'contract'
  console.log('📄 Seeding contracts...');
  await prisma.contracts?.upsert?.({
    where: { id: contractId },
    update: {},
    create: {
      id: contractId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      c2paManifestId: null,
      previousHash: "",
      contentHash: "initial-contract-secure-hash",
      data: MockJobPayload
    },
  }) || await prisma.contract.upsert({
    where: { id: contractId },
    update: {},
    create: {
      id: contractId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      c2paManifestId: null,
      previousHash: "",
      contentHash: "initial-contract-secure-hash",
       data: {
      contractType: "standard_service",
      version: "1.0",
      terms: "This is a placeholder for your variable multi-contract types or cryptohash signatures.",
      cryptoHash: "0x7f83b1a2c3d4e5f6"
    },

    },
  });

  // 5. Seed 'jobs' -> Prisma Client exposes this as 'jobs' or 'job'
  console.log('🛠️ Seeding jobs...');
  const mockJobPayload: any = {
    title: "Enterprise Systems Deployment",
    description: "Initialize core networking structures and baseline pipelines",
    priority: "urgent",
  };

  await prisma.jobs?.upsert?.({
    where: { id: jobId },
    update: {},
    create: {
      id: jobId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      previousHash: "",
      contentHash: "initial-job-secure-hash",
      data: mockJobPayload,
    },
  }) || await (prisma as any).job.upsert({
    where: { id: jobId },
    update: {},
    create: {
      id: jobId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      previousHash: "",
      contentHash: "initial-job-secure-hash",
      data: mockJobPayload,
    },
  });

  // 6. Seed 'c2pa_manifests' -> Prisma Client exposes this as 'c2pa_manifests' or 'c2pa_manifest'
  console.log('🔏 Seeding c2pa_manifests...');
  await prisma.c2PAManifest?.upsert?.({
    where: { id: manifestId },
    update: {},
    create: {
      id: manifestId,
      companyId: companyId,
      entityId: contractId,
      entityType: "contract",
      isVerified: true,
      verifiedBy: userId,
      signedBy: "Cloudflare Secure Edge Engine",
      signature: "sha256-sig-payload-block-string",
      manifestJson: { version: "c2pa@1.0", integrity: "valid" },
    },
  }) || await prisma.C2PAManifest.upsert({
    where: { id: manifestId },
    update: {},
    create: {
      id: manifestId,
      companyId: companyId,
      entityId: contractId,
      entityType: "contract",
      isVerified: true,
      verifiedBy: userId,
      signedBy: "Cloudflare Secure Edge Engine",
      signature: "sha256-sig-payload-block-string",
      manifestJson: { version: "c2pa@1.0", integrity: "valid" },
    },
  });

  // 7. Seed 'documents' -> Prisma Client exposes this as 'documents' or 'document'
  console.log('📁 Seeding documents...');
  await prisma.document?.upsert?.({
    where: { id: documentId },
    update: {},
    create: {
      id: documentId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      c2paManifestId: manifestId,
      previousHash: "0x00000000",
      contentHash: "file-storage-integrity-hash",
      fileSize: 1048576,
      metadata: {
      contractType: "standard_service",
      version: "1.0"
    },
    }
  }) || await prisma.document.upsert({
    where: { id: documentId },
    update: {},
    create: {
      id: documentId,
      companyId: companyId,
      createdBy: userId,
      updatedBy: userId,
      deletedBy: null,
      c2paManifestId: manifestId,
      previousHash: "0x00000000",
      contentHash: "file-storage-integrity-hash",
      fileSize: 1048576,
      metadata: {
      contractType: "standard_service",
      version: "1.0"
    },
    }
  });

   // 8. Seed Log Tables
  console.log('📝 Seeding relational monitoring tables...');
  
  // Use the correct singular camelCase name: prisma.auditLog
  await prisma.auditLog.upsert({
    where: {
      id: "audit_log_001"
    },
    update: {},
    create: {
      id: "audit_log_001",
      requestId: "req_fsm_alpha_1",
      userAgent: "Mozilla/5.0 Terminal Runner",
      ipAddress: "127.0.0.1",
      actorType: "HUMAN", // Must match your ActorType enum exactly (e.g., HUMAN, SYSTEM, AI)
      prevRecordHash: "0x0",
      beforeHash: "0x0",
      afterHash: "initial-contract-secure-hash",
      companyId: "comp_demo_123", // Make sure to link the required company relation if your schema demands it
    },
  });

  const aiLogsModel = prisma.aiActioLogs || (prisma as any).ai_action_log;
  await aiLogsModel.create({
    data: {
      id: "ai_log_001",
      actorId: userId,
      action: "schema_alignment_verification",
      model: "gpt-4o",
      version: "v1.0",
      reason: "Initial baseline synchronization across docker instances",
      contentHash: "ai-action-proof-hash",
      allowed: true,
    },
  });

  const hotPathModel = (prisma as any).hot_path_columns || (prisma as any).hot_path_column;
  await hotPathModel.create({
    data: {
      id: "hot_path_001",
      companyId: companyId,
      tableName: "jobs",
      columnName: "contentHash",
      jsonPath: "$.title",
      dataType: "text",
      indexName: "idx_jobs_hot_path_contentHash",
      isIndexed: true,
      usage: "Frequent database state sync evaluations",
      createdBy: userId,
    },
  });

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ An error occurred during the seeding cycle:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
