// ============================================
// /FSM/BUILD_SEQUENCE.md
// DRIFTY v1 — Build order + dependency rules.
// Files must be added/fixed in this order.
// ============================================

# Build Sequence & Layer Rules (DRIFTY v1)

## Layer Dependency Rule
- A layer may only depend on itself and layers above it in this list.
- No reverse imports. No circular dependencies.

## 1) Foundation
1. `packages/core/src/types/*`
2. `packages/core/src/errors/*`
3. `packages/core/src/context/RequestContext.ts`

## 2) Database
4. `packages/db` (Prisma v7 adapter mode + singleton exports)
5. `prisma.config.ts` + migrations
6. Seed + dev scripts (deterministic)
7. DB extensions baseline (if used)

## 3) Config & Validation
8. `CompanyConfig` model + loaders
9. Zod config schemas (versioned) + validators

## 4) Company Bootstrap (Mandatory Before Domain Features)
10. Company bootstrap engine:
   - idempotent steps
   - recorded bootstrap state (version/steps/hash)
   - applies hot-path generated columns + indexes
11. Company creation/first-run trigger wiring

## 5) Core Services
12. `BaseEntityService` (tenant scope helpers + audit + soft delete)
13. Domain services:
   - `JobService` (JSON patch/merge)
   - `ScheduleService` (visits in JSON)
   - `DocumentService` (MinIO metadata + DB)
   - others as needed

## 6) API (apps/api)
14. Express app + middleware:
   - tenant resolver
   - auth/session
   - error middleware
15. Domain routes/controllers:
   - customers/jobs/schedule/documents/auth
   - Zod validation per request
   - all calls go through services

## 7) Web (apps/web)
16. API client wrapper (inject tenant/session)
17. Pages:
   - Login, Dashboard, Calendar, NewCustomer, NewAppointment
18. Components/UI primitives

## 8) Worker / AI
19. Worker queue consumers
20. AI integration:
   - route handlers/services
   - AIActionLog mandatory
   - no direct DB writes outside services

## Definition of “Stable”
A layer is stable when:
- imports are clean (no cross-layer leaks)
- tenant checks exist for all access paths
- Zod validation is config-driven where required
- bootstrap rules are in place before hot-path usage
- deterministic scripts exist (seed/init/dev)

## When a Change Request Arrives
- If it touches a lower layer than current work, fix the lower layer first.
- No UI built on broken service contracts.
- No new patterns introduced mid-stream.
