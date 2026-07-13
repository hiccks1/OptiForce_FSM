// ============================================
// packages/core/src/context/index.ts
// Context Layer Barrel Export
// ============================================
// VERSION: 1.0.0
// ============================================

export {
  // Types
  type RequestContext,
  type CreateUserContextParams,
  type CreateBettyContextParams,
  type CreateSystemContextParams,
  
  // Factories
  createUserContext,
  createBettyContext,
  createSystemContext,
  
  // Type guards
  isHumanActor,
  isAIActor,
  isSystemActor,
  hasUserId,
  
  // Assertions
  assertHumanActor,
  assertAIActor,
} from './RequestContext';


