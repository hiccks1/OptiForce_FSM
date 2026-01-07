// ============================================
// packages/core/src/services/DocumentService.ts
// Document Management - JSONB-First
// ============================================

import type { PrismaClient, Document } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type {
  RequestContext,
  Result,
  CompanyConfigSchema,
} from '../types';
import { success } from '../types';

import { BaseEntityService } from './BaseEntityService';
import type { ConfigService } from './ConfigService';

import { ValidationError, NotFoundError } from '../errors';

// ============================================================
// DOCUMENT DATA (JSONB)
// ============================================================

interface DocumentData {
  title: string;
  type: 'PHOTO' | 'PDF' | 'INVOICE' | 'CONTRACT' | 'OTHER';

  description?: string;

  file: {
    storageKey: string;
    filename: string;
    mimeType: string;
    sizeBytes: number;
  };

  linkedEntity?: {
    type: 'JOB' | 'ACCOUNT' | 'VISIT';
    id: string;
  };

  tags?: string[];

  uploadedBy: string;
  uploadedAt: string;
}

// ============================================================
// INPUT TYPES
// ============================================================

interface CreateDocumentInput {
  title: string;
  type: DocumentData['type'];
  description?: string;
  file: DocumentData['file'];
  linkedEntity?: DocumentData['linkedEntity'];
  tags?: string[];
}

// ============================================================
// DOCUMENT SERVICE
// ============================================================

export class DocumentService extends BaseEntityService<Document> {
  protected readonly entityType = 'document';

  protected readonly prismaModel = {
    create: (args: any) => this.prisma.document.create(args),
    findFirst: (args: any) => this.prisma.document.findFirst(args),
    update: (args: any) => this.prisma.document.update(args),
  };

  constructor(
    prisma: PrismaClient,
    private readonly configService: ConfigService
  ) {
    super(prisma);
  }

  // ============================================================
  // CREATE DOCUMENT
  // ============================================================

  async createDocument(
    ctx: RequestContext,
    input: CreateDocumentInput
  ): Promise<Result<Document>> {
    return this.execute(ctx, 'create', async () => {
      const config = await this.loadConfig(ctx);

      this.validateCreate(input, config);

      const data: DocumentData = {
        title: input.title,
        type: input.type,
        description: input.description,
        file: input.file,
        linkedEntity: input.linkedEntity,
        tags: input.tags ?? [],
        uploadedBy: ctx.userId,
        uploadedAt: new Date().toISOString(),
      };

      const document = await this.prisma.document.create({
        data: {
          companyId: ctx.companyId,
          data: data as any,
        },
      });

      return document;
    });
  }

  // ============================================================
  // LISTING (GENERATED COLUMNS)
  // ============================================================

  async listByType(
    ctx: RequestContext,
    type: DocumentData['type']
  ): Promise<Result<readonly Document[]>> {
    return this.execute(ctx, 'read', async () => {
      const docs = await this.prisma.$queryRaw<Document[]>`
        SELECT *
        FROM documents
        WHERE company_id = ${ctx.companyId}
          AND document_type = ${type}
          AND is_deleted = false
        ORDER BY uploaded_at DESC
        LIMIT 100
      `;

      return docs;
    });
  }

  async listForEntity(
    ctx: RequestContext,
    entityType: 'JOB' | 'ACCOUNT' | 'VISIT',
    entityId: string
  ): Promise<Result<readonly Document[]>> {
    return this.execute(ctx, 'read', async () => {
      const docs = await this.prisma.$queryRaw<Document[]>`
        SELECT *
        FROM documents
        WHERE company_id = ${ctx.companyId}
          AND linked_entity_type = ${entityType}
          AND linked_entity_id = ${entityId}
          AND is_deleted = false
        ORDER BY uploaded_at DESC
        LIMIT 100
      `;

      return docs;
    });
  }

  // ============================================================
  // UPDATE METADATA
  // ============================================================

  async updateMetadata(
    ctx: RequestContext,
    documentId: string,
    patch: {
      title?: string;
      description?: string;
      tags?: string[];
    }
  ): Promise<Result<Document>> {
    return this.execute(ctx, 'update', async () => {
      const doc = await this.getExisting(ctx, documentId);
      const existing = doc.data as DocumentData;

      const data: DocumentData = {
        ...existing,
        ...patch,
      };

      const updated = await this.prisma.document.update({
        where: { id: documentId },
        data: { data },
      });

      return updated;
    });
  }

  // ============================================================
  // SOFT DELETE
  // ============================================================

  async softDelete(
    ctx: RequestContext,
    documentId: string
  ): Promise<Result<Document>> {
    return this.execute(ctx, 'delete', async () => {
      const doc = await this.getExisting(ctx, documentId);

      const deleted = await this.prisma.document.update({
        where: { id: documentId },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: ctx.userId,
        },
      });

      return deleted;
    });
  }

  // ============================================================
  // PRIVATE HELPERS
  // ============================================================

  private async loadConfig(
    ctx: RequestContext
  ): Promise<CompanyConfigSchema> {
    const config = await this.configService.getActiveConfig(ctx.companyId);
    if (!config) {
      throw new ValidationError('Company configuration not found', {
        companyId: ctx.companyId,
      });
    }
    return config;
  }

  private async getExisting(
    ctx: RequestContext,
    documentId: string
  ): Promise<Document> {
    const doc = await this.prisma.document.findFirst({
      where: {
        id: documentId,
        companyId: ctx.companyId,
        isDeleted: false,
      },
    });

    if (!doc) {
      throw new NotFoundError('document', documentId);
    }

    return doc;
  }

  private validateCreate(
    input: CreateDocumentInput,
    _config: CompanyConfigSchema
  ): void {
    if (!input.title) {
      throw new ValidationError('Document title is required');
    }

    if (!input.file?.storageKey) {
      throw new ValidationError('File storageKey is required');
    }

    if (!input.file?.mimeType) {
      throw new ValidationError('File mimeType is required');
    }

    if (input.file.sizeBytes <= 0) {
      throw new ValidationError('Invalid file size');
    }
  }
}
