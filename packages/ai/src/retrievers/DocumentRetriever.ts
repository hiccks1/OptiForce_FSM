// ============================================================
// packages/ai/src/retrievers/DocumentRetriever.ts
// Document retrieval (metadata only) with tenant + soft delete enforcement
// ============================================================

import type { PrismaClient } from '@prisma/client';
import { BaseRetriever } from './BaseRetriever';
import type { RetrieverContext, RetrieverResult, RetrievedItem } from './types';
import {
  DRIFTY_VERSION,
  DriftyLayer,
  DRIFTY_FILE_DECLARATION_SYMBOL,
  type DriftyFileContract,
} from '../../../../drifty/laws';

export const DRIFTY_FILE_CONTRACT: DriftyFileContract = {
  driftyVersion: DRIFTY_VERSION,
  layers: [DriftyLayer.L5_AI, DriftyLayer.L1_DATA],
  usesAI: true,
};
export const DRIFTY_FILE_CONTRACT_SYMBOL = DRIFTY_FILE_DECLARATION_SYMBOL;

interface DocumentQuery {
  documentId?: string;
  type?: string;
  status?: string;
  relatedEntityId?: string;
  limit?: number;
}

export class DocumentRetriever extends BaseRetriever<DocumentQuery, Record<string, unknown>> {
  readonly name = 'document-retriever';
  readonly version = 2;

  constructor(private readonly prisma: PrismaClient) {
    super();
  }

  protected async perform(
    ctx: RetrieverContext,
    input: DocumentQuery
  ): Promise<RetrieverResult<Record<string, unknown>>> {
    if (!ctx.companyId) {
      return this.reject('FORBIDDEN_SCOPE', 'Missing company scope');
    }

    const documents = await this.prisma.document.findMany({
      where: {
        companyId: ctx.companyId,
        deletedAt: null,
        ...(input.documentId && { id: input.documentId }),
      },
      take: input.limit ?? 10,
      orderBy: { createdAt: 'desc' },
    });

    if (!documents.length) {
      return {
        outcome: 'success',
        code: 'NO_RESULTS',
        reason: 'No matching documents found',
        items: [],
        meta: { version: this.version },
      };
    }

    const items: RetrievedItem[] = documents.map((doc) => ({
      id: doc.id,
      source: 'prisma.document',
      data: (doc.metadata ?? {}) as Record<string, unknown>,
    }));

    return {
      outcome: 'success',
      code: 'OK',
      reason: 'Documents retrieved successfully',
      items,
      meta: {
        version: this.version,
        examinedCount: documents.length,
        sources: ['document'],
      },
    };
  }
}
