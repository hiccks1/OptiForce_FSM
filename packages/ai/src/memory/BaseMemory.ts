// packages/ai/src/memory/BaseMemory.ts
// ============================================================
// Base Memory
// Defines lifecycle for derived AI state
// ============================================================

import type {
  MemoryContext,
  MemoryRecord,
} from './types';

export abstract class BaseMemory {
  abstract readonly name: string;

  abstract load(
    ctx: MemoryContext
  ): Promise<MemoryRecord | null>;

  abstract store(
    ctx: MemoryContext,
    record: MemoryRecord
  ): Promise<void>;

  abstract clear(
    ctx: MemoryContext
  ): Promise<void>;
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
