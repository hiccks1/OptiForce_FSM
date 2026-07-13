// ============================================
// /FSM/ARCHITECTURE_CONTRACT.md
// Opti-Force / DRIFTY v1 — Repo Constitution
// Source of truth for all code generated in this repo.
// If a request conflicts with this file, THIS FILE WINS.
// ============================================

# Opti-Force Architecture Contract (DRIFTY v1)

## 0) Non-Negotiables
- This repo is **multi-tenant**. **Company is the tenant root**.
- Domain data is **JSONB-first**. Do **not** normalize domain objects into relational tables unless explicitly marked as derived/non-destructive.
- **Soft delete everywhere** (`deletedAt`, `deletedBy`, `isDeleted` where applicable).
- **Audit + AI accountability**:
  - `AuditLog` records human/system actions.
  - `AIActionLog` records AI decisions with actor type and context.
- If uncertain, **do not invent new architecture**. Search in-repo patterns first, then implement the smallest compatible change.

## 1) Stack & Runtime
- Node 20+, PNPM, Turbo monorepo.
- API: Express (not Next, not tRPC).
- DB: PostgreSQL 16+ with JSONB + GIN + generated/derived columns for hot paths.
- Cache/queues: Redis.
- Object storage: MinIO.
- Validation: Zod, **config-driven** via `CompanyConfig` and versioned schemas.

## 2) Prisma Rules (Critical)
- Prisma **v7** with **adapter mode** (e.g., `@prisma/adapter-pg`).
- `schema.prisma` MUST NOT contain `datasource.url = env("DATABASE_URL")` (Prisma 7 restriction).
- Migration/CLI connection comes from `prisma.config.ts` via `defineConfig` + `env('DATABASE_URL')`.
- Runtime uses PrismaClient constructed with adapter (pg Pool).

Required patterns:
- packages/db exports a single `prisma` instance + generated client exports.
- API imports Prisma types from `@prisma/client` (or the repo’s exported generated client if that is the chosen standard).

Zod & CompanyConfig
-Zod is the only validation system.
-Business validation rules must be config-driven via CompanyConfig and versioned.
-Prisma schema is not used for business validation beyond basic DB constraints.

Per-company bootstrap / init
-Each company must have an idempotent bootstrap that runs on first setup:
-creates/updates hot-path generated columns
-creates/updates indexes (GIN / expression indexes)
-applies required extensions/options
-Bootstrap must record what ran (version + hash) to prevent repeated/different DDL.
-Hot paths are derived only; JSONB remains the source of truth.

## 3) Data Model Contract
### Tenant boundary
- Every domain write/read must be scoped by `companyId` (or equivalent tenant key) from RequestContext.
- API must reject calls missing tenant identity:
  - Header: `x-company-id` (preferred)
  - Fallback: `?companyId=` only for internal tooling/dev, never for public customers.

### JSONB-first domain
- `Job` is the primary business entity.
- All lifecycle data lives in `Job.data` JSON:
  - customer/contact/address/visits/notes/custom fields/migration artifacts
- Do not create relational tables for Customer/Visit/Address/etc.
- Derived columns are allowed only as:
  - generated columns
  - `HotPathColumn` indexed JSON paths
  - non-destructive projections (never authoritative)

### Documents
- `Document` stores metadata only; actual bytes are in MinIO.

## 4) Service Layer Contract
- RequestContext exists and must carry:
  - `companyId`
  - `actor` (user/system/AI)
  - correlation/request id (trace id)
- Services follow a consistent pattern:
  - `BaseEntityService` for common CRUD, soft delete, audit hooks
  - Domain services like `JobService`, `ScheduleService` operate on JSONB via patch/merge
- Domain services must:
  - validate using CompanyConfig Zod schemas
  - log to AuditLog/AIActionLog as appropriate
  - never bypass tenant scoping

## 5) Scheduling Contract
- Scheduling is **versioned and JSON-driven**.
- Visits/appointments live in `Job.data.visits[]` (or the canonical JSON structure for scheduling).
- Any “calendar” views are projections of JSONB visits with optional hot-path indexes.

## 6) API Contract
- Express routes grouped by domain: customers, jobs, schedule, documents, auth.
- No DTO layer explosion. Use typed request/response with Zod validation.
- Errors:
  - Use shared error classes (ValidationError, NotFoundError, etc.)
  - Consistent HTTP mapping.

## 7) Frontend Contract (Web)
- Vite/React client calls API with base URL from env, default local port as configured.
- Client must include tenant id header for authenticated sessions (or via session token mapping).
- UI must not encode business logic that belongs in services.

## 8) Codegen & Exports Contract
- Central, stable exports:
  - types from `packages/core/src/types/index.ts`
  - db client from `packages/db`
  - services from `packages/core/src/services`
- No circular dependencies. No cross-layer contamination.

## 9) What “Done” Means
A feature is done only if:
- tenant-scoped end-to-end
- validated via CompanyConfig/Zod
- audited (and AI logged if AI acted)
- JSONB-first respected
- tests or at least deterministic seed/dev script exists
md
Copy code
// ============================================
// /FSM/FORBIDDEN_PATTERNS.md
// DRIFTY v1 — “Never do this” list.
// If any codegen introduces these, it is considered drift.
// ============================================

# Forbidden Patterns (DRIFTY v1)

## A) Data Model & Prisma (Hard No)
- Creating relational tables for:
  - Customer, Contact, Address, Visit, Appointment, Note (authoritative domain entities)
- Adding authoritative columns that duplicate JSONB domain truth (except derived/generated/hot-path).
- Adding `datasource { url = env("DATABASE_URL") }` back into `schema.prisma` (Prisma 7 adapter mode).
- Introducing Prisma Accelerate / Data Proxy unless explicitly requested.

## B) Architecture Drift
- Repository pattern (“repositories/” CRUD wrappers) unless already canonical.
- CQRS/event-sourcing frameworks or message buses unless already in use.
- Over-abstraction: DTO folders, “mappers”, “transformers”, “facades” for simple flows.
- Adding GraphQL, tRPC, Next.js server actions, NestJS, or any framework swap.

## C) Validation & Types
- class-validator, yup, joi (Zod only).
- Schema-driven validation via Prisma schema for business rules (CompanyConfig is source of truth).
- Duplicating types in multiple places instead of exporting via the canonical types index.

## D) Tenant & Security Violations
- Any query missing tenant scope.
- Accepting companyId from the client body for public endpoints (must come from header/session).
- Mixing customer-portal permissions with internal staff permissions without explicit policy.

## E) JSONB Violations
- Overwriting `Job.data` wholesale instead of patch/merge.
- Mutating JSON without bumping/recording schema version when required.
- Storing visit/appointment data outside the canonical JSON structure.

## F) Logging / Audit Drift
- Silent writes with no AuditLog/AIActionLog where required by the service pattern.
- Writing logs only to console for core business actions.

## G) “Convenience” Libraries That Don’t Belong
- ORM alternatives, auto-generated clients, generic admin dashboards.
- State management sprawl in web app (keep it minimal; use React primitives unless necessary).

## H) Anti-Patterns
- “Just make it work” hacks that bypass:
  - tenant checks
  - validation
  - soft delete
  - audit logging
- Adding new global singletons except the canonical Prisma singleton pattern.

## I) Any change that breaks these invariants
- JSONB-first domain truth
- Company-root tenancy
- Config-driven validation
- Soft delete + accountability
- Deterministic exports and layer boundaries
md
Copy code
// ============================================
// /FSM/BUILD_SEQUENCE.md
// DRIFTY v1 — Allowed build order and layer dependencies.
// Code must be added in this order. Earlier layers must stabilize first.
// ============================================

# Build Sequence & Layer Rules (DRIFTY v1)

## Layer Dependency Rule
- A layer may only depend on itself and layers above it in this list.
- No reverse imports. No circular dependencies.

## 1) Foundation
1. `packages/core/src/types/*`  
   - Canonical enums/interfaces shared across repo.
2. `packages/core/src/errors/*`  
   - Standard error types and HTTP mappings.
3. `packages/core/src/context/RequestContext.ts`  
   - Must include companyId + actor + trace/correlation id.

## 2) Database
4. `packages/db`  
   - Prisma v7 adapter mode config
   - prisma singleton
   - generated client exports
5. Migrations / init / seed
   - Postgres extensions (gin/trgm/etc) if used
   - deterministic seed scripts (idempotent where possible)

## 3) Core Services
6. `packages/core/src/services/BaseEntityService.ts`  
   - audit hooks, soft delete helpers, tenant scoping utilities
7. `packages/core/src/services/*DomainService.ts`  
   - JobService, DocumentService, ScheduleService, etc.
   - Must be JSONB-first and config-validated

## 4) API (apps/api)
8. `apps/api/src/app.ts` + middleware
   - tenant resolver (x-company-id)
   - auth/session extraction
   - error middleware
9. Routes + controllers per domain
   - customers/jobs/schedule/documents/auth
   - each endpoint must enforce tenant scope and validate inputs

## 5) Web (apps/web)
10. API client wrapper
   - base URL env
   - inject tenant header/session
11. Pages
   - Login
   - Dashboard
   - Calendar
   - NewCustomer
   - NewAppointment
12. Components + UI primitives
   - reusable forms, calendar UI, etc.

## 6) Worker / AI
13. Worker app
   - queue consumers, scheduled jobs
14. AI integration
   - embeddings/intent routes
   - AIActionLog required for decisions
   - no direct DB writes without service calls

## Definition of “Stable”
A layer is stable when:
- imports are clean (no cross-layer leaks)
- tenant checks exist for all access paths
- basic tests or deterministic scripts exist
- no placeholder TODOs that block the next layer

## When a Change Request Arrives
- If it touches a lower layer than the current work, we fix the lower layer first.
- No building UI around broken service contracts.
- No new patterns introduced mid-stream.
