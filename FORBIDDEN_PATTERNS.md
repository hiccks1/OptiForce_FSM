// ============================================
// /FSM/FORBIDDEN_PATTERNS.md
// DRIFTY v1 — “Never do this” list.
// Any appearance of these patterns is drift.
// ============================================

# Forbidden Patterns (DRIFTY v1)

## A) Prisma / DB Drift (Hard No)
- Putting `datasource.url = env("DATABASE_URL")` back into `schema.prisma`.
- Switching away from Prisma v7 adapter mode.
- Adding authoritative relational tables for:
  - Customer, Contact, Address, Visit, Appointment, Note
- Storing authoritative business truth in relational columns when it belongs in JSONB.

## B) JSONB Contract Violations (Hard No)
- Overwriting `Job.data` wholesale instead of patch/merge.
- Creating “shadow truth” outside `Job.data` (except derived hot paths).
- Adding scheduling tables that replace `Job.data.visits[]`.

## C) Validation Drift (Hard No)
- Using class-validator, yup, joi, ajv, or any non-Zod validation.
- Encoding business validation rules in Prisma schema instead of CompanyConfig/Zod.
- Hardcoding required fields that should be config-driven per company.

## D) Tenant Boundary Violations (Hard No)
- Any query/mutation missing tenant scoping.
- Accepting `companyId` from request body for public endpoints.
- Bypassing RequestContext for service calls.

## E) Bootstrap / Hot-Path Violations (Hard No)
- Creating indexes/generated columns without routing through the company bootstrap mechanism.
- Running per-company DDL without:
  - idempotency
  - a recorded bootstrap state (version/steps/hash)
- Treating hot paths as authoritative instead of derived.

## F) Architecture Swaps / Over-Engineering
- Adding NestJS, Next.js server actions, tRPC, GraphQL.
- Introducing repository pattern unless it already exists as canonical in this repo.
- DTO mapper layers and excessive “clean architecture” folders that duplicate types and logic.

## G) Logging / Audit Drift
- Silent writes with no AuditLog where required by service pattern.
- AI decisions without AIActionLog.
- Relying only on console logs for domain actions.

## H) Security/Convenience Hacks
- “Temporary” bypasses that skip tenant checks, validation, audit, or soft delete.
- Storing secrets in code or committing `.env` files.
