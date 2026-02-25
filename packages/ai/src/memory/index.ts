import { DriftyLayer } from "../../drifty/laws";
// packages/ai/src/memory/index.ts
// Public exports for memory module

export * from './BaseMemory'
export * from './types'

// Version: 1.0


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
