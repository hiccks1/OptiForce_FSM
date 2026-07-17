// ============================================
// packages/core/src/domain/shared/index.ts
// Shared Domain Utilities Barrel Export
// ============================================

export {
  type ValidationResult,
  VALID,
  invalid,
  withWarnings,
  combineResults,
} from './validation-result';

export {
  type TransitionMap,
  type TransitionCheck,
  type StateMachine,
  createStateMachine,
} from './stateMachine';
