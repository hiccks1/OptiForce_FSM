-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'MANAGER', 'CSR', 'FIELD', 'CUSTOMER', 'SYSTEM');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('HUMAN', 'SYSTEM', 'AI');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subdomain" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_configs" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "schema" JSONB NOT NULL,
    "contentHash" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "company_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "contentHash" TEXT,
    "previousHash" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "contentHash" TEXT,
    "previousHash" TEXT,
    "c2paManifestId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "title" TEXT,
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "metadata" JSONB NOT NULL,
    "storagePath" TEXT,
    "storageUrl" TEXT,
    "mimeType" TEXT,
    "fileSize" INTEGER,
    "contentHash" TEXT,
    "previousHash" TEXT,
    "c2paManifestId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actorId" TEXT,
    "actorType" TEXT NOT NULL DEFAULT 'HUMAN',
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beforeHash" TEXT,
    "afterHash" TEXT NOT NULL,
    "prevRecordHash" TEXT,
    "beforeState" JSONB,
    "afterState" JSONB,
    "payload" JSONB NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "requestId" TEXT,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_action_logs" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "actorId" TEXT,
    "actorType" "ActorType" NOT NULL,
    "action" TEXT NOT NULL,
    "model" TEXT,
    "version" TEXT,
    "input" JSONB NOT NULL,
    "outcome" JSONB NOT NULL,
    "allowed" BOOLEAN NOT NULL,
    "reason" TEXT,
    "confidence" DOUBLE PRECISION,
    "contentHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_action_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c2pa_manifests" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "manifestJson" JSONB NOT NULL,
    "signature" TEXT,
    "signedAt" TIMESTAMP(3),
    "signedBy" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "c2pa_manifests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hot_path_columns" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "tableName" TEXT NOT NULL,
    "columnName" TEXT NOT NULL,
    "jsonPath" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "isIndexed" BOOLEAN NOT NULL DEFAULT false,
    "indexName" TEXT,
    "usage" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "hot_path_columns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_subdomain_key" ON "companies"("subdomain");

-- CreateIndex
CREATE INDEX "companies_deletedAt_idx" ON "companies"("deletedAt");

-- CreateIndex
CREATE INDEX "company_configs_companyId_isActive_idx" ON "company_configs"("companyId", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "company_configs_companyId_version_key" ON "company_configs"("companyId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_companyId_deletedAt_idx" ON "users"("companyId", "deletedAt");

-- CreateIndex
CREATE INDEX "users_companyId_role_idx" ON "users"("companyId", "role");

-- CreateIndex
CREATE INDEX "jobs_companyId_deletedAt_idx" ON "jobs"("companyId", "deletedAt");

-- CreateIndex
CREATE INDEX "jobs_createdAt_idx" ON "jobs"("createdAt");

-- CreateIndex
CREATE INDEX "contracts_companyId_deletedAt_idx" ON "contracts"("companyId", "deletedAt");

-- CreateIndex
CREATE INDEX "contracts_createdAt_idx" ON "contracts"("createdAt");

-- CreateIndex
CREATE INDEX "documents_companyId_deletedAt_idx" ON "documents"("companyId", "deletedAt");

-- CreateIndex
CREATE INDEX "documents_companyId_status_idx" ON "documents"("companyId", "status");

-- CreateIndex
CREATE INDEX "audit_logs_companyId_entityType_entityId_idx" ON "audit_logs"("companyId", "entityType", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_companyId_occurredAt_idx" ON "audit_logs"("companyId", "occurredAt");

-- CreateIndex
CREATE INDEX "ai_action_logs_companyId_actorType_idx" ON "ai_action_logs"("companyId", "actorType");

-- CreateIndex
CREATE INDEX "ai_action_logs_companyId_createdAt_idx" ON "ai_action_logs"("companyId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "c2pa_manifests_entityType_entityId_key" ON "c2pa_manifests"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "hot_path_columns_companyId_tableName_idx" ON "hot_path_columns"("companyId", "tableName");

-- CreateIndex
CREATE UNIQUE INDEX "hot_path_columns_companyId_tableName_columnName_key" ON "hot_path_columns"("companyId", "tableName", "columnName");

-- AddForeignKey
ALTER TABLE "company_configs" ADD CONSTRAINT "company_configs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_action_logs" ADD CONSTRAINT "ai_action_logs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
