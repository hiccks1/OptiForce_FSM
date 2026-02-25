import { DriftyLayer } from "../../drifty/laws";
// packages/ai/src/index.ts
// ============================================================
// AI Package Public API
// ============================================================

export * from './retrievers';
export * from './tools';
export * from './prompts';
export * from './memory';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
