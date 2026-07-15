// packages/ai/src/prompts/index.ts
// ============================================================
// Prompt Barrel Export
// ============================================================

export type { PromptDefinition } from './types';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
