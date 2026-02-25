import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/domain/visit/index.ts
// Visit Domain Barrel Export
// ============================================

// Status / State Machine
export {
  type VisitStatus,
  canTransition,
  getAllowedTransitions,
  isTerminal,
  isImmutable,
  requiresChainOfCustody,
  canEdit,
  canCancel,
  validateTransition,
  getTransitionRequirements,
  type TransitionRequirements,
} from './VisitStatus';

// Data Shapes
export {
  VISIT_SCHEMA_VERSION,
  type VisitData,
  type RegulatedVisitData,
  type PartNeeded,
  type PartUsed,
  type LaborEntry,
  type DispatchRecord,
  type ArrivalRecord,
  type DepartureRecord,
  type PhotoRecord,
  type SignatureRecord,
  type CompletionRecord,
  type CancellationRecord,
  type TechnicianCredentials,
  type Certification,
  type TestEquipmentRecord,
  type TestResultRecord,
  type TestReading,
  type ChainOfCustodyRecord,
  isRegulatedVisitData,
  hasCompletion,
  hasCancellation,
  createVisitData,
} from './VisitData';

// Business Rules
export {
  type ValidationResult,
  validateParentJob,
  validateTenantIsolation,
  validateNotImmutable,
  validateArrival,
  validateCompletion,
  validateRegulatedCompletion,
  validateCancellation,
  validateVisitCreate,
  validateVisitUpdate,
  type TimeSlot,
  detectOverlap,
  checkTechnicianCapacity,
} from './VisitRules';

// Completion & Hashing
export {
  type CompleteVisitInput,
  type BuildChainOfCustodyInput,
  type VisitCompletionResult,
  buildCompletionRecord,
  collectHashInputs,
  collectRegulatedHashInputs,
  toCanonicalJSON,
  buildChainOfCustody,
  prepareCompletion,
  prepareRegulatedCompletion,
} from './VisitCompletion';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
