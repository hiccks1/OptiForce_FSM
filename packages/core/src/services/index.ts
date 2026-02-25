===============================================================================================
// packages/core/src/services/index.ts (LOCKED)
// Services barrel export.
===============================================================================================

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L2_DOMAIN"],
};

export { BaseEntityService } from "./BaseEntityService";
export { ScheduleService, type CalendarVisit } from "./ScheduleService";
export { AuthService, type LoginResult } from "./AuthService";
