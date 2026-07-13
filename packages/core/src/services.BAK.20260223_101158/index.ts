// ============================================
// packages/core/src/services/index.ts
// Services Layer Barrel Export
// ============================================
// DRIFTY: JSONB-first domain. No relational Visit/Customer/Invoice tables.
// ============================================

export { BaseEntityService, type AuditWriter } from './BaseEntityService';

export { ScheduleService, type CalendarVisit, type ScheduleHooks } from './ScheduleService';

// Auth is used by API middleware.
export { AuthService } from './AuthService';


