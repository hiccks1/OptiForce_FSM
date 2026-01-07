// ============================================
// packages/core/src/services/InvoiceService.ts
// Financial Ledger - Irreversible by Design
// ============================================

import type { PrismaClient, Invoice } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type {
  RequestContext,
  Result,
  CompanyConfigSchema,
} from '../types';
import { success } from '../types';

import { BaseEntityService } from './BaseEntityService';
import type { ConfigService } from './ConfigService';

import {
  ValidationError,
  NotFoundError,
  ConflictError,
} from '../errors';

// ============================================================
// INVOICE DATA (JSONB)
// ============================================================

interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  jobId: string;
  accountId: string;

  status: 'DRAFT' | 'ISSUED' | 'PAID' | 'VOID';

  currency: string;

  issuedAt?: string;
  paidAt?: string;

  subtotal: number;
  tax: number;
  total: number;

  lineItems: InvoiceLineItem[];

  notes?: string;

  createdBy: string;
  createdAt: string;

  updatedBy?: string;
  updatedAt?: string;

  voidReason?: string;
}

// ============================================================
// INPUT TYPES
// ============================================================

interface CreateInvoiceInput {
  jobId: string;
  accountId: string;
  currency: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  notes?: string;
}

// ============================================================
// INVOICE SERVICE
// ============================================================

export class InvoiceService extends BaseEntityService<Invoice> {
  protected readonly entityType = 'invoice';

  protected readonly prismaModel = {
    create: (args: any) => this.prisma.invoice.create(args),
    findFirst: (args: any) => this.prisma.invoice.findFirst(args),
    update: (args: any) => this.prisma.invoice.update(args),
  };

  constructor(
    prisma: PrismaClient,
    private readonly configService: ConfigService
  ) {
    super(prisma);
  }

  // ============================================================
  // CREATE DRAFT INVOICE
  // ============================================================

  async createDraft(
    ctx: RequestContext,
    input: CreateInvoiceInput
  ): Promise<Result<Invoice>> {
    return this.execute(ctx, 'create', async () => {
      const config = await this.loadConfig(ctx);

      if (input.lineItems.length === 0) {
        throw new ValidationError('Invoice must contain at least one line item');
      }

      const lineItems: InvoiceLineItem[] = input.lineItems.map(item => {
        if (item.quantity <= 0 || item.unitPrice < 0) {
          throw new ValidationError('Invalid line item values');
        }

        return {
          id: randomUUID(),
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.quantity * item.unitPrice,
        };
      });

      const subtotal = lineItems.reduce((s, i) => s + i.total, 0);
      const taxRate = config.invoiceConfig?.taxRate ?? 0;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      const data: InvoiceData = {
        invoiceNumber: this.generateInvoiceNumber(),
        jobId: input.jobId,
        accountId: input.accountId,
        status: 'DRAFT',
        currency: input.currency,
        subtotal,
        tax,
        total,
        lineItems,
        notes: input.notes,
        createdBy: ctx.userId,
        createdAt: new Date().toISOString(),
      };

      const invoice = await this.prisma.invoice.create({
        data: {
          companyId: ctx.companyId,
          jobId: input.jobId,
          accountId: input.accountId,
          data: data as any,
        },
      });

      return invoice;
    });
  }

  // ============================================================
  // ISSUE INVOICE (IRREVERSIBLE)
  // ============================================================

  async issueInvoice(
    ctx: RequestContext,
    invoiceId: string
  ): Promise<Result<Invoice>> {
    return this.execute(ctx, 'update', async () => {
      const invoice = await this.getExisting(ctx, invoiceId);
      const data = invoice.data as InvoiceData;

      if (data.status !== 'DRAFT') {
        throw new ConflictError('Only draft invoices can be issued');
      }

      const updated: InvoiceData = {
        ...data,
        status: 'ISSUED',
        issuedAt: new Date().toISOString(),
        updatedBy: ctx.userId,
        updatedAt: new Date().toISOString(),
      };

      return this.prisma.invoice.update({
        where: { id: invoiceId },
        data: { data: updated },
      });
    });
  }

  // ============================================================
  // MARK AS PAID
  // ============================================================

  async markPaid(
    ctx: RequestContext,
    invoiceId: string
  ): Promise<Result<Invoice>> {
    return this.execute(ctx, 'update', async () => {
      const invoice = await this.getExisting(ctx, invoiceId);
      const data = invoice.data as InvoiceData;

      if (data.status !== 'ISSUED') {
        throw new ConflictError('Only issued invoices can be paid');
      }

      const updated: InvoiceData = {
        ...data,
        status: 'PAID',
        paidAt: new Date().toISOString(),
        updatedBy: ctx.userId,
        updatedAt: new Date().toISOString(),
      };

      return this.prisma.invoice.update({
        where: { id: invoiceId },
        data: { data: updated },
      });
    });
  }

  // ============================================================
  // VOID INVOICE (NEVER DELETE)
  // ============================================================

  async voidInvoice(
    ctx: RequestContext,
    invoiceId: string,
    reason: string
  ): Promise<Result<Invoice>> {
    return this.execute(ctx, 'update', async () => {
      const invoice = await this.getExisting(ctx, invoiceId);
      const data = invoice.data as InvoiceData;

      if (data.status === 'PAID') {
        throw new ConflictError('Paid invoices cannot be voided');
      }

      const updated: InvoiceData = {
        ...data,
        status: 'VOID',
        voidReason: reason,
        updatedBy: ctx.userId,
        updatedAt: new Date().toISOString(),
      };

      return this.prisma.invoice.update({
        where: { id: invoiceId },
        data: { data: updated },
      });
    });
  }

  // ============================================================
  // REPORTING QUERIES (GENERATED COLUMNS)
  // ============================================================

  async listByAccount(
    ctx: RequestContext,
    accountId: string
  ): Promise<Result<readonly Invoice[]>> {
    return this.execute(ctx, 'read', async () => {
      const invoices = await this.prisma.$queryRaw<Invoice[]>`
        SELECT *
        FROM invoices
        WHERE company_id = ${ctx.companyId}
          AND account_id = ${accountId}
          AND is_deleted = false
        ORDER BY issued_at DESC NULLS LAST
      `;

      return invoices;
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
      throw new ValidationError('Company configuration not found');
    }
    return config;
  }

  private async getExisting(
    ctx: RequestContext,
    invoiceId: string
  ): Promise<Invoice> {
    const invoice = await this.prisma.invoice.findFirst({
      where: {
        id: invoiceId,
        companyId: ctx.companyId,
        isDeleted: false,
      },
    });

    if (!invoice) {
      throw new NotFoundError('invoice', invoiceId);
    }

    return invoice;
  }

  private generateInvoiceNumber(): string {
    return `INV-${Date.now()}`;
  }
}
