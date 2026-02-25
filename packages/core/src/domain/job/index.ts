import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/domain/job/index.ts
// Job Domain Barrel Export
// ============================================

// Status / State Machine
export {
  type JobStatus,
  canTransition,
  getAllowedTransitions,
  isTerminal,
  isLocked,
  canEditPricing,
  canCancel,
  canAddVisits,
  validateTransition,
  type JobCompletionCheck,
  checkJobCompletion,
} from './JobStatus';

// Data Shapes
export {
  JOB_SCHEMA_VERSION,
  type JobData,
  type JobPricing,
  type LineItem,
  type EquipmentRecord,
  type Attachment,
  type StatusChange,
  type JobCompletionData,
  type JobCancellationData,
  type JobTotals,
  calculateJobTotals,
  createJobData,
} from './JobData';

// Business Rules
export {
  type ValidationResult,
  validateTenantIsolation,
  validateNotLocked,
  validateJobCreate,
  validateLineItem,
  validatePricingChange,
  validateJobCompletion,
  validateJobCancellation,
  validateAddVisit,
  validateJobUpdate,
} from './JobRules';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
