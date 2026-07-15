The DRIFTY Laws are tiered and composable

There are 6 layers, and every file explicitly declares which layer(s) it belongs to.

This is what allows correctness without over-constraint.

DRIFTY LAW LAYERS (canonical)
L0 — Repository & Monorepo Laws

Applies to: everything

Purpose:
Make the repo legible, enforceable, and safe for scale.

Examples:

Turbo boundaries

Package dependency direction

No circular imports across packages

One responsibility per package

Shared types live in packages/core or packages/schemas

L1 — Data & Persistence Laws

Applies to:

Prisma schema

DB access

Migrations

JSONB usage

Purpose:
Make data immutable, auditable, and migration-safe.

Examples:

JSONB is source of truth

No relational normalization of domain data

HotPathColumns only for indexed reads

Generated columns are derived, never authoritative

No destructive migrations

L2 — Domain Mutation Laws

Applies to:

Services (JobService, ContractService, ScheduleService)

AI-assisted mutations

Purpose:
Prevent silent corruption and logic drift.

Examples:

All mutations are immutable

No partial JSON overwrites

Schema version must be written on mutation

Actor metadata is mandatory

Hooks must exist and be versioned

L3 — Integration & Import Laws

Applies to:

Google Calendar

FSM imports

CSV

APIs

Purpose:
Allow “magic” migrations without lying.

Examples:

Imported data is never trusted

Raw source data is preserved

Mappings are reversible

No integration writes directly to domain JSON

Importers emit normalized patches only

L4 — Infra & Performance Laws

Applies to:

Redis

MinIO

Queues

Hot paths

Purpose:
Keep performance predictable and explainable.

Examples:

Redis is a cache, never a source of truth

MinIO stores blobs only, never meaning

Hot paths must be declared and justified

Background work is idempotent

L5 — AI & Automation Laws

Applies to:

LLM usage

AI decisions

Agents

Autocomplete / mutation helpers

Purpose:
Make AI safe, auditable, and non-destructive.

Examples:

AI never mutates without a reason

All AI actions logged

AI suggestions are reviewable

AI operates on patches, not raw objects

What this gives you (this is the payoff)

Once these laws exist:

You can generate services

You can validate services

You can reject bad PRs automatically

You can onboard engineers without hand-holding

You can demo to investors without embarrassment

You can truthfully say:

“Our platform enforces correctness by construction.”
