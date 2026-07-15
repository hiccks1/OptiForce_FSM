//===================================================
// packages/core/src/services/index.ts (LOCKED)
// Services barrel export.
//================================================


export { BaseEntityService } from "./BaseEntityService";
export { ScheduleService, type CalendarVisit } from "./ScheduleService";
import { JobService } from '@fsm/core/services/JobService';
export { AuthService, type LoginResult } from "./AuthService";
