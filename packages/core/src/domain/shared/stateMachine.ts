// ============================================
// packages/core/src/domain/shared/stateMachine.ts
// Generic finite state machine - Pure Domain Logic
// ============================================
// LAYER: Domain
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

/**
 * A transition map: for each state, the states it may transition into.
 */
export type TransitionMap<S extends string> = Record<S, readonly S[]>;

export type TransitionCheck =
  | { valid: true }
  | { valid: false; reason: string };

export interface StateMachine<S extends string> {
  /** Is `to` a valid next state from `from`? */
  canTransition(from: S, to: S): boolean;
  /** States reachable from `current`. */
  getAllowedTransitions(current: S): readonly S[];
  /** A state is terminal when it has no outgoing transitions. */
  isTerminal(status: S): boolean;
  /** Can this state transition into the configured cancel state? */
  canCancel(status: S): boolean;
  /** Validate a transition, returning a human-readable reason when invalid. */
  validateTransition(from: S, to: S): TransitionCheck;
}

/**
 * Build a set of pure state-machine helpers from a transition map.
 *
 * @param transitions   Allowed transitions keyed by source state.
 * @param cancelState   State treated as "cancellation" for `canCancel`
 *                      (defaults to `'CANCELLED'`).
 */
export function createStateMachine<S extends string>(
  transitions: TransitionMap<S>,
  cancelState: S = 'CANCELLED' as S
): StateMachine<S> {
  function canTransition(from: S, to: S): boolean {
    return transitions[from].includes(to);
  }

  function getAllowedTransitions(current: S): readonly S[] {
    return transitions[current];
  }

  function isTerminal(status: S): boolean {
    return transitions[status].length === 0;
  }

  function canCancel(status: S): boolean {
    return transitions[status].includes(cancelState);
  }

  function validateTransition(from: S, to: S): TransitionCheck {
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

  return {
    canTransition,
    getAllowedTransitions,
    isTerminal,
    canCancel,
    validateTransition,
  };
}
