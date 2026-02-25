import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/index.ts
// Main Core Package Export
// ============================================

export * from './types';
export * from './errors';
export * from './context';
export * from './services';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L0_REPO],
} as const;
