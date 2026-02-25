// ============================================
// /FSM/ARCHITECTURE_CONTRACT.md
// Opti-Force / DRIFTY v1 — Repo Constitution
// Source of truth for all code in this repo.
// If a request conflicts with this file, THIS FILE WINS.
// ============================================

# Opti-Force Architecture Contract (DRIFTY v1)

## 0) Non-Negotiables
- This repo is **multi-tenant**. **Company is the tenant root**.
- Domain truth is **JSONB-first**. Do **not** normalize domain entities into relational tables.
- All deletes are **soft deletes** with accountability (`deletedAt`, `deletedBy`, `isDeleted` where applicable).
- All meaningful domain mutations must be **audited**:
  - `AuditLog` for human/system actions.
  - `AIActionLog` for AI decisions (actor type + input/output context).
- If anything is unclear: **do not invent patterns**. Implement the smallest change consistent with this contract and existing repo patterns.

## 1) Stack & Runtime
- Node 20+, PNPM, Turbo monorepo.
- API: Express.
- DB: PostgreSQL 16+ with JSONB, GIN, expression indexes, and generated/derived columns for hot paths.
- Cache/queues: Redis.
- Object storage: MinIO.
- Validation: **Zod only**, **config-driven** via `CompanyConfig` (runtime source of truth) with versioned schemas.

## 2) Prisma Rules (Critical)
- Prisma **v7** in **adapter mode** (e.g., `@prisma/adapter-pg`).
- `schema.prisma` MUST NOT contain `datasource.url = env("DATABASE_URL")` (Prisma 7 restriction).
- Migration/CLI connection is configured via `prisma.config.ts` using `defineConfig` + `env('DATABASE_URL')`.
- Runtime PrismaClient is constructed with the adapter (pg Pool) and exported as a singleton from `packages/db`.

Required patterns:
- `packages/db` exports:
  - `prisma` singleton
  - generated client exports
  - a `shutdownPrisma()` helper if already used in repo

## 3) Data Model Contract (JSONB-First)
### Tenant boundary
- Every read/write must be scoped by `companyId` from RequestContext.
- API must reject calls missing tenant identity:
  - Header: `x-company-id` (required for authenticated staff endpoints)
  - Customer portal endpoints may derive company from session/token mapping, but **must still resolve a companyId** internally.

### JSONB-first domain truth
- `Job` is the primary business entity.
- All lifecycle data lives in `Job.data` JSON:
  - customers/contacts/addresses/visits/appointments/notes/custom fields/migration artifacts
- Do not create authoritative relational tables for Customer/Visit/Address/etc.
- Relational columns are allowed only as **derived hot paths** (non-authoritative) for performance.

### Documents
- `Document` stores metadata only; file bytes live in MinIO.

## 4) Zod + CompanyConfig Contract (Mandatory)
- Zod is the **only** validation system.
- `CompanyConfig` is the **runtime source of truth** for:
  - field definitions
  - requiredness
  - workflow rules
  - scheduling rules
  - customer portal behavior toggles
- Validation is **config-driven**, not schema-driven.
- Zod schemas are **versioned**; changes must be forward-compatible and migration-safe.

## 5) Per-Company Bootstrap / Init Contract (Mandatory)
Every company must have an idempotent “first setup” bootstrap that:
- Creates/updates:
  - hot-path generated columns
  - expression/GIN indexes
  - any approved DB extensions/options
- Is **idempotent** (safe to run multiple times).
- Is **versioned and recorded** so the system knows what has been applied.

### Required mechanics
- A company bootstrap must:
  - run on company creation OR first login OR explicit admin action (repo-standard)
  - write a “bootstrap state” record (DB table/row or JSON marker) containing:
    - bootstrap version
    - applied steps list
    - optional hash of DDL content
    - timestamp + actor
- Hot paths must always be treated as **derived**. JSONB remains authoritative.

## 6) Service Layer Contract
- RequestContext must carry:
  - `companyId`
  - `actor` (human/system/AI + id)
  - correlation/request id (trace id)
- Services follow consistent patterns:
  - `BaseEntityService` for CRUD utilities, tenant scoping helpers, soft delete, audit hooks.
  - Domain services (`JobService`, `ScheduleService`, `DocumentService`, etc.) mutate JSONB via patch/merge.
- Domain services must:
  - enforce tenant scoping
  - validate via CompanyConfig/Zod
  - write AuditLog/AIActionLog as required
  - never bypass the bootstrap/hot-path contract when adding derived fields

## 7) Scheduling Contract
- Scheduling is **versioned and JSON-driven**.
- Visits/appointments live under the canonical JSON structure in `Job.data` (e.g., `data.visits[]`).
- “Calendar views” are projections of visits with optional hot-path indexes.

## 8) API Contract (Express)
- Routes grouped by domain: auth, customers, jobs, schedule, documents.
- No DTO layer explosion; use Zod-validated inputs and typed outputs.
- Errors must use shared error types and consistent HTTP mapping.
- No tenant ID accepted from arbitrary request body for public endpoints.

## 9) Frontend Contract (Vite/React)
- API base URL from env; default local port matches API.
- Client must include tenant header/session mapping required by API.
- UI must not contain domain truth; domain truth is enforced in services.

## 10) Exports & Boundaries
- Canonical exports:
  - types: `packages/core/src/types/index.ts`
  - db: `packages/db`
  - services: `packages/core/src/services`
- No circular deps and no cross-layer contamination.

## 11) Definition of Done
A feature is done only if:
- tenant scoped end-to-end
- validated via CompanyConfig/Zod
- audited (and AI logged if AI acted)
- JSONB-first respected
- bootstrap rules preserved (hot paths derived + recorded)
- deterministic seed/dev scripts exist where applicable
