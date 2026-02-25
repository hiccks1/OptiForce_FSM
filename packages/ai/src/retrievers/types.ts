import { DriftyLayer } from "../../drifty/laws";
// ============================================================
// packages/ai/src/retrievers/types.ts
// AI Retriever Contracts
// Read-only, auditable, versioned data access
// ============================================================

/**
 * Context provided by the AI runtime.
 * Retrievers MUST NOT authorize or mutate state.
 */
export interface RetrieverContext {
  companyId: string;
  actorId: string;
  actorType: 'user' | 'system' | 'ai';

  /**
   * Capabilities resolved upstream.
   * Used only for filtering / scoping — never enforcement.
   */
  capabilities: readonly string[];

  /**
   * Correlation ID for tracing, audit, and replay.
   */
  requestId?: string;
}

/**
 * Standardized reason codes for retrieval outcomes.
 * Enables deterministic handling & compliance review.
 */
export type RetrieverResultCode =
  | 'OK'
  | 'NO_RESULTS'
  | 'FORBIDDEN_SCOPE'
  | 'INVALID_QUERY'
  | 'SOURCE_UNAVAILABLE'
  | 'INTERNAL_ERROR';

/**
 * Individual retrieved item with provenance.
 * NEVER return raw DB rows without attribution.
 */
export interface RetrievedItem<T = unknown> {
  /**
   * Stable identifier of the source record.
   */
  id: string;

  /**
   * Logical source (table, index, bucket, provider).
   */
  source: string;

  /**
   * Relevance score (0–1), if applicable.
   */
  score?: number;

  /**
   * Retrieved content.
   */
  data: T;
}

/**
 * Rich, explicit retriever result.
 * Designed for audit, explainability, and downstream AI safety.
 */
export interface RetrieverResult<T = unknown> {
  /**
   * Explicit outcome — no ambiguity.
   */
  outcome: 'success' | 'rejected';

  /**
   * Machine-readable reason code.
   */
  code: RetrieverResultCode;

  /**
   * Human-readable explanation (safe to log).
   */
  reason: string;

  /**
   * Retrieved items with provenance.
   */
  items: readonly RetrievedItem<T>[];

  /**
   * Optional metadata for observability & tuning.
   */
  meta?: {
    /**
     * Retriever version used.
     */
    version: number;

    /**
     * Total candidates evaluated (before filtering).
     */
    examinedCount?: number;

    /**
     * Execution duration in ms.
     */
    durationMs?: number;

    /**
     * Data sources consulted.
     */
    sources?: readonly string[];
  };
}



export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
