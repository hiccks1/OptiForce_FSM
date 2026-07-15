// ============================================
// packages/core/src/context/index.ts
// Context Layer Barrel Export
// ============================================
// VERSION: 1.0.0
// ============================================

export {
  // Types
  type RequestContext,
  type CreateContextParams,
  type CreateBettyContextParams,
  type CreateSystemContextParams,
  
  // Factories
  createContext,
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


