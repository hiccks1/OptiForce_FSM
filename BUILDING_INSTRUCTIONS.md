PHASE 0 — Architectural Laws (Already Done)

Status: ✅ Complete
Owner: Founder / Architect

Artifacts:

ARCHITECTURAL_LAWS.md

Layer boundaries

“Only one thing touches DB”

Soft-delete only

Command-only mutations

AI is outside the trust boundary

Gate:
Team must read + sign off.
No PRs accepted without acknowledging laws.

PHASE 1 — Canonical Data Model (Cone Tip)

Status: ✅ Complete (your Prisma schema)

Artifacts:

packages/db/prisma/schema.prisma

JSONB-first models

Hot columns

No app-specific fields

Rules:

Schema is append-only

No refactors without migration + RFC

No business logic assumptions

Gate:
Schema frozen except additive changes.

PHASE 2 — Base Entity & Invariants

Status: ✅ Complete

Artifacts:

BaseEntityService

Soft delete

Audit hooks

Hashing / immutability logic

Rules:

Every entity extends base

No service bypasses base behavior

Gate:
Unit tests proving:

No hard delete

Audit always written

Hash chain survives updates

PHASE 3 — Execution Context (Who / Why / How)

Status: ✅ Complete

Artifacts:

RequestContext

Actor typing (human / AI / system)

Company config loading

Audit sink

Rules:

No service callable without context

Context is immutable

Context created once per request

Gate:
Runtime guard: calling service without context throws.

PHASE 4 — Domain Services (State Mutation)

Status: 🟡 In progress

Artifacts:

JobService

VisitService

DocumentService

InvoiceService, etc.

Rules:

Services mutate one entity only

Validation is config-driven

No cross-service writes

No policy logic

Gate:
Each service reviewed for:

No any

No raw Prisma calls outside base

No permission checks inside service

PHASE 5 — Company Config & Declarative Rules

Status: 🟡 Partial

Artifacts:

Company config schema

Workflow flags

Field requirements

Immutability rules

Rules:

Config decides behavior, not code

No hard-coded industry logic

Feature flags live here

Gate:
Demo company can enable/disable entire workflows without code changes.

PHASE 6 — Commands (Intent Layer) ← THIS WAS MISSING

Status: ⛔ Not started (critical)

Artifacts:

CreateVisitCommand

SignContractCommand

RescheduleJobCommand

etc.

Rules:

Commands are immutable

No DB awareness

Capture intent + identity

Every mutation starts as a command

Gate:
No service method callable directly from API.

PHASE 7 — Zod Schemas (Boundary Validation)

Status: ⛔ Not started

Artifacts:

Zod schemas for each command

API payload schemas

Worker payload schemas

Rules:

Validation happens once

Fail fast

No re-validation inside services

Gate:
Malformed input never reaches handlers.

PHASE 8 — Policies (Pure Decision Logic)

Status: ⛔ Not started

Artifacts:

Permission policies

State transition rules

AI restrictions

Rules:

Pure functions only

Deterministic

No side effects

No Prisma

Gate:
Every handler must call at least one policy.

PHASE 9 — Command Handlers (Orchestration)

Status: ⛔ Not started

Artifacts:

One handler per command

Loads minimal state

Calls policies

Calls services

Emits events

Rules:

No business logic

No schema knowledge

No validation

Gate:
Handlers are readable top-to-bottom in <200 lines.

PHASE 10 — Events & Projections (Evidence Layer)

Status: ⛔ Not started

Artifacts:

Domain events

Hash chaining

Projections (read models)

Rules:

Append-only

Replayable

Exportable for legal

Gate:
System can rebuild state from events alone.

PHASE 11 — API Layer (Thin, Dumb)

Status: ⛔ Not started

Artifacts:

Route → command mapper

Auth → context builder

Zod validation

Handler invocation

Rules:

No business logic

No Prisma imports

No config awareness

Gate:
API can be replaced without touching core.

PHASE 12 — Worker Layer

Status: ⛔ Not started

Artifacts:

Queue consumers

Command emitters

Projection updaters

Rules:

Workers do not mutate domain directly

Workers emit commands or events only

Gate:
Workers are stateless.

PHASE 13 — AI Layer (Betty)

Status: ⛔ Not started

Artifacts:

Prompt → intent mapping

Clarifying question loop

Command generation

Rules:

Betty cannot see services

Betty cannot see Prisma

Betty cannot bypass policies

Gate:
AI can be disabled without breaking system.

PHASE 14 — Observability & Scale

Status: ⛔ Not started

Artifacts:

Metrics

Tracing

Backpressure

Sharding strategy

Rules:

No silent failures

Everything observable

Gate:
Load test at 10× expected usage.

The One Rule That Prevents Chaos

No layer may import from a layer above it. Ever.

If someone breaks this:

PR rejected

Refactor immediately

No exceptions
