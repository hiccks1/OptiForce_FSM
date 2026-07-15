// ============================================
// packages/core/src/domain/visit/VisitStatus.ts
// Visit State Machine - Pure Domain Logic
// ============================================
// LAYER: Domain
// IMPORTS FROM: types only
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

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

/**
 * States that lock the visit (no further edits)
 */
const TERMINAL_STATES: readonly VisitStatus[] = ['COMPLETED', 'CANCELLED'] as const;

/**
 * States that require chain of custody for regulated industries
 */
const CUSTODY_STATES: readonly VisitStatus[] = ['ON_SITE', 'COMPLETED'] as const;

// ============================================
// PURE FUNCTIONS
// ============================================

/**
 * Check if transition is allowed
 */
export function canTransition(
  from: VisitStatus,
  to: VisitStatus
): boolean {
  return TRANSITIONS[from].includes(to);
}

/**
 * Get allowed next states
 */
export function getAllowedTransitions(
  current: VisitStatus
): readonly VisitStatus[] {
  return TRANSITIONS[current];
}

/**
 * Check if visit is in terminal state (no more transitions)
 */
export function isTerminal(status: VisitStatus): boolean {
  return TERMINAL_STATES.includes(status);
}

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

/**
 * Check if visit can be cancelled
 */
export function canCancel(status: VisitStatus): boolean {
  return TRANSITIONS[status].includes('CANCELLED');
}

/**
 * Validate transition and return error message if invalid
 */
export function validateTransition(
  from: VisitStatus,
  to: VisitStatus
): { valid: true } | { valid: false; reason: string } {
  if (from === to) {
    return { valid: false, reason: `Already in ${from} status` };
  }

  if (isTerminal(from)) {
    return {
      valid: false,
      reason: `Cannot transition from terminal state ${from}`,
    };
  }

  if (!canTransition(from, to)) {
    const allowed = getAllowedTransitions(from);
    return {
      valid: false,
      reason: `Cannot transition from ${from} to ${to}. Allowed: ${allowed.join(', ')}`,
    };
  }

  return { valid: true };
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


