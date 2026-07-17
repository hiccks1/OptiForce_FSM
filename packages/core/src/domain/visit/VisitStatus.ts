// ============================================
// packages/core/src/domain/visit/VisitStatus.ts
// Visit State Machine - Pure Domain Logic
// ============================================
// LAYER: Domain
// IMPORTS FROM: types only
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

import { createStateMachine } from '../shared/stateMachine';

/**
 * Visit lifecycle states
 * 
 * SCHEDULED → EN_ROUTE → ON_SITE → COMPLETED
 *     │          │          │          │
 *     ▼          ▼          ▼          ▼
 * CANCELLED  CANCELLED  CANCELLED   🔒 IMMUTABLE
 */
export type VisitStatus =
  | 'SCHEDULED'
  | 'EN_ROUTE'
  | 'ON_SITE'
  | 'COMPLETED'
  | 'CANCELLED';

/**
 * Valid state transitions
 */
const TRANSITIONS: Record<VisitStatus, readonly VisitStatus[]> = {
  SCHEDULED: ['EN_ROUTE', 'CANCELLED'],
  EN_ROUTE: ['ON_SITE', 'CANCELLED'],
  ON_SITE: ['COMPLETED', 'CANCELLED'],
  COMPLETED: [],  // Terminal - IMMUTABLE
  CANCELLED: [],  // Terminal
} as const;

const machine = createStateMachine<VisitStatus>(TRANSITIONS);

/**
 * States that require chain of custody for regulated industries
 */
const CUSTODY_STATES: readonly VisitStatus[] = ['ON_SITE', 'COMPLETED'] as const;

// ============================================
// PURE FUNCTIONS
// ============================================

export const canTransition = machine.canTransition;
export const getAllowedTransitions = machine.getAllowedTransitions;
export const isTerminal = machine.isTerminal;
export const canCancel = machine.canCancel;
export const validateTransition = machine.validateTransition;

/**
 * Check if visit is immutable (completed = locked forever)
 */
export function isImmutable(status: VisitStatus): boolean {
  return status === 'COMPLETED';
}

/**
 * Check if status requires chain of custody tracking
 */
export function requiresChainOfCustody(status: VisitStatus): boolean {
  return CUSTODY_STATES.includes(status);
}

/**
 * Check if visit can be edited
 */
export function canEdit(status: VisitStatus): boolean {
  return !isTerminal(status);
}

// ============================================
// TRANSITION REQUIREMENTS
// ============================================

/**
 * What's required to enter each state
 */
export interface TransitionRequirements {
  EN_ROUTE: {
    technicianId: string;
    dispatchedAt: string;
  };
  ON_SITE: {
    arrivedAt: string;
    gpsLat: number;
    gpsLng: number;
    gpsAccuracy: number;
  };
  COMPLETED: {
    completedAt: string;
    workPerformed: string;
    technicianSignature: string;
    customerSignature?: string;  // Optional for some job types
  };
  CANCELLED: {
    cancelledAt: string;
    cancelledBy: string;
    reason: string;
  };
}

/**
 * Get requirements for entering a state
 */
export function getTransitionRequirements(
  to: VisitStatus
): (keyof TransitionRequirements[typeof to])[] | null {
  switch (to) {
    case 'EN_ROUTE':
      return ['technicianId', 'dispatchedAt'];
    case 'ON_SITE':
      return ['arrivedAt', 'gpsLat', 'gpsLng', 'gpsAccuracy'];
    case 'COMPLETED':
      return ['completedAt', 'workPerformed', 'technicianSignature'];
    case 'CANCELLED':
      return ['cancelledAt', 'cancelledBy', 'reason'];
    default:
      return null;
  }
}


