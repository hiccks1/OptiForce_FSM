// packages/ai/src/tools/BaseTool.ts
// ============================================================
// Base Tool
// Enforces capability gating and execution shape
// ============================================================

import type {
  Tool,
  ToolContext,
  ToolResult,
} from './types';

export abstract class BaseTool implements Tool {
  abstract readonly name: string;

  protected requireCapability(
    ctx: ToolContext,
    capability: string
  ): ToolResult | void {
    if (!ctx.capabilities.includes(capability)) {
      return { outcome: 'rejected' };
    }
  }

  abstract execute(
    ctx: ToolContext,
    input: unknown
  ): Promise<ToolResult>;
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
