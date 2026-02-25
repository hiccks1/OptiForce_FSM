import { DriftyLayer } from "../../drifty/laws";
// packages/ai/src/prompts/types.ts
// ============================================================
// Prompt Definitions
// Versioned, auditable, non-executable
// ============================================================

export interface PromptDefinition {
  /**
   * Stable identifier (e.g. "contract-review")
   */
  readonly name: string;

  /**
   * Immutable semantic version.
   * Legal + audit boundary.
   */
  readonly version: number;

  /**
   * Raw prompt content.
   * Treated as data, not logic.
   */
  readonly content: string;
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
