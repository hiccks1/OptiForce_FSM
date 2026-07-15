// ============================================================
// packages/ai/src/retrievers/BaseRetriever.ts
// Base class for deterministic, auditable retrievers
// ============================================================

import type {
  Retriever,
  RetrieverContext,
  RetrieverResult,
  RetrieverResultCode,
} from './types';

export abstract class BaseRetriever<Input, Output>
  implements Retriever<Input, Output>
{
  abstract readonly name: string;
  abstract readonly version: number;

  protected abstract perform(
    ctx: RetrieverContext,
    input: Input
  ): Promise<RetrieverResult<Output>>;

  async retrieve(
    ctx: RetrieverContext,
    input: Input
  ): Promise<RetrieverResult<Output>> {
    const start = Date.now();

    try {
      const result = await this.perform(ctx, input);

      return {
        ...result,
        meta: {
  ...(result.meta ?? {}),
  version: this.version,
  durationMs: Date.now() - start,
        },
      };
    } catch (error) {
      return {
        outcome: 'rejected',
        code: 'INTERNAL_ERROR',
        reason:
          error instanceof Error ? error.message : 'Unhandled retriever error',
        items: [],
        meta: {
          version: this.version,
          durationMs: Date.now() - start,
        },
      };
    }
  }

  protected reject(
    code: RetrieverResultCode,
    reason: string
  ): RetrieverResult<Output> {
    return {
      outcome: 'rejected',
      code,
      reason,
      items: [],
      meta: {
        version: this.version,
      },
    };
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L5_AI],
} as const;
