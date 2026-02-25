import { DriftyLayer } from "../../drifty/laws";
// packages/ai/src/tools/types.ts
// ============================================================
// AI Tool Contracts
// Side-effectful, capability-gated actions
// ============================================================

export interface ToolContext {
  companyId: string;
  actorId: string;

  /**
   * Capabilities resolved upstream.
   * Tools must never self-authorize.
   */
  capabilities: readonly string[];
}

export interface ToolResult {
  /**
   * Explicit outcome — no ambiguity.
   */
  outcome: 'success' | 'rejected';

  /**
   * Optional structured data for audit or follow-up.
   */
  data?: unknown;
}

export interface Tool {
  /**
   * Stable identifier for config & audit
   */
  readonly name: string;

  /**
   * Execute a single, explicit action.
   */
  execute(
    ctx: ToolContext,
    input: unknown
  ): Promise<ToolResult>;
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
