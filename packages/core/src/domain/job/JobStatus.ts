// ============================================
// packages/core/src/domain/job/JobStatus.ts
// Job State Machine - Pure Domain Logic
// ============================================
// LAYER: Domain
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

import { createStateMachine } from '../shared/stateMachine';

/**
 * Job lifecycle states
 * 
 * DRAFT → SCHEDULED → DISPATCHED → IN_PROGRESS → COMPLETED → INVOICED
 *   │         │           │             │            │
 *   ▼         ▼           ▼             ▼            ▼
 * CANCELLED CANCELLED  CANCELLED    CANCELLED    (no cancel)
 * 
 * Note: Job can only be COMPLETED when ALL visits are COMPLETED
 */
export type JobStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'DISPATCHED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'INVOICED'
  | 'CANCELLED';

/**
 * Valid state transitions
 */
const TRANSITIONS: Record<JobStatus, readonly JobStatus[]> = {
  DRAFT: ['SCHEDULED', 'CANCELLED'],
  SCHEDULED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED: ['INVOICED'],  // No cancel after completion
  INVOICED: [],             // Terminal
  CANCELLED: [],            // Terminal
} as const;

const machine = createStateMachine<JobStatus>(TRANSITIONS);

/**
 * States that lock the job (limited edits)
 */
const LOCKED_STATES: readonly JobStatus[] = ['COMPLETED', 'INVOICED', 'CANCELLED'] as const;

/**
 * States where pricing can still be modified
 */
const PRICE_EDITABLE_STATES: readonly JobStatus[] = ['DRAFT', 'SCHEDULED', 'DISPATCHED', 'IN_PROGRESS'] as const;

// ============================================
// PURE FUNCTIONS
// ============================================

export const canTransition = machine.canTransition;
export const getAllowedTransitions = machine.getAllowedTransitions;
export const isTerminal = machine.isTerminal;
export const canCancel = machine.canCancel;
export const validateTransition = machine.validateTransition;

export function isLocked(status: JobStatus): boolean {
  return LOCKED_STATES.includes(status);
}

export function canEditPricing(status: JobStatus): boolean {
  return PRICE_EDITABLE_STATES.includes(status);
}

export function canAddVisits(status: JobStatus): boolean {
  return !isLocked(status);
}

// ============================================
// COMPLETION RULES
// ============================================

/**
 * A job can only be marked COMPLETED when:
 * 1. All visits are COMPLETED
 * 2. No visits are in-progress or scheduled
 */
export interface JobCompletionCheck {
  readonly canComplete: boolean;
  readonly reasons: readonly string[];
  readonly visitSummary: {
    readonly total: number;
    readonly completed: number;
    readonly cancelled: number;
    readonly pending: number;
  };
}

export function checkJobCompletion(
  visitStatuses: readonly string[]
): JobCompletionCheck {
  const reasons: string[] = [];
  
  const completed = visitStatuses.filter(s => s === 'COMPLETED').length;
  const cancelled = visitStatuses.filter(s => s === 'CANCELLED').length;
  const pending = visitStatuses.filter(s => !['COMPLETED', 'CANCELLED'].includes(s)).length;
  const total = visitStatuses.length;

  if (total === 0) {
    reasons.push('Job has no visits');
  }

  if (pending > 0) {
    reasons.push(`${pending} visit(s) not completed`);
  }

  if (completed === 0 && total > 0) {
    reasons.push('No visits have been completed');
  }

  return {
    canComplete: reasons.length === 0,
    reasons,
    visitSummary: { total, completed, cancelled, pending },
  };
}

