// packages/ai/src/memory/index.ts
// ============================================================
// Memory Barrel Export
// ============================================================

export * from './types';
export * from './BaseMemory';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
