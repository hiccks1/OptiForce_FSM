# Job.data JSONB Contract

This folder is the canonical source of truth for the `Job.data` JSONB shape.

## Vocabulary (non-negotiable)

- **visit**: the only scheduling primitive. Stored in `Job.data.visits[]`.
- **appointment**: banned in code. UI may use the label, but internal types/APIs use `visit`.
- **soft delete**:
  - Relational entities: `deletedAt` / `deletedBy`.
  - JSONB sub-entities: represent cancellation via `status` + timestamps (e.g. `canceledAt`). Do not use `isDeleted`.

## Versioning

- `Job.data.jobDataVersion` is required and must match the schema version (e.g. `1` for `v1.ts`).
- Add a new version (v2, v3, ...) for any breaking change.
- Add a JSON migration when introducing a new version.

## Scheduling

All schedule/calendar reads are projections from `Job.data.visits[]`.
No relational Visit/Appointment tables are allowed.

## Files

- `v1.ts`: Zod schema for JobDataV1 + VisitV1
