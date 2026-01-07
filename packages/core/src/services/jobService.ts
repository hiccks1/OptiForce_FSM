// ============================================
// packages/core/src/services/JobService.ts
// Job Management - JSONB-First, Config-Driven
// ============================================

import type { PrismaClient, Job } from '@prisma/client';
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
// JOB DATA TYPES
// ============================================================

interface JobData {
  // Required fields
  status: string;
  accountId: string;
  title: string;
  
  // Optional core fields
  description?: string;
  estimatedValue?: number;
  scheduledDate?: string;
  technicianId?: string;
  csrId?: string;
  priority?: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  
  // Address
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  
  // Equipment
  equipmentType?: string;
  
  // Collections
  visits?: Array<{
    id: string;
    technicianId: string;
    scheduledDate: string;
    status: string;
    notes?: string;
  }>;
  
  lineItems?: Array<{
    id: string;
    description: string;
    cost: number;
    quantity: number;
    addedBy: string;
    addedAt: string;
  }>;
  
  notes?: Array<{
    id: string;
    content: string;
    createdBy: string;
    createdAt: string;
  }>;
  
  documents?: Array<{
    id: string;
    documentId: string;
    addedBy: string;
    addedAt: string;
  }>;
  
  // Custom fields (company-specific)
  customFields?: Record<string, unknown>;
}

interface LineItemInput {
  description: string;
  cost: number;
  quantity: number;
}

interface NoteInput {
  content: string;
}

interface DateRange {
  start: Date;
  end: Date;
}

// ============================================================
// JOB SERVICE
// ============================================================

export class JobService extends BaseEntityService<Job> {
  protected readonly entityType = 'job';
  
  protected readonly prismaModel = {
    create: (args: any) => this.prisma.job.create(args),
    findFirst: (args: any) => this.prisma.job.findFirst(args),
    update: (args: any) => this.prisma.job.update(args),
  };

  constructor(
    prisma: PrismaClient,
    private readonly configService: ConfigService
  ) {
    super(prisma);
  }

  // ============================================================
  // CREATE JOB
  // ============================================================

  async createJob(
    ctx: RequestContext,
    data: Partial<JobData>
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'create', async () => {
      const config = await this.loadConfig(ctx);
      
      // Validate required fields for creation
      this.validateForCreate(data, config);
      
      // Create job with JSONB data
      const job = await this.prisma.job.create({
        data: {
          companyId: ctx.companyId,
          data: data as any,
        },
      });
      
      return job;
    });
  }

  // ============================================================
  // UPDATE JOB DATA (MERGE PATCH)
  // ============================================================

  async updateJobData(
    ctx: RequestContext,
    jobId: string,
    patch: Partial<JobData>
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      const config = await this.loadConfig(ctx);
      
      // Merge patch into existing data (immutable)
      const merged = {
        ...(job.data as JobData),
        ...patch,
      };
      
      // Validate merged result (invariants only)
      this.validateForUpdate(merged, config);
      
      // Update JSONB (generated columns update automatically)
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data: merged },
      });
      
      return updated;
    });
  }

  // ============================================================
  // LIST OPERATIONS (USE GENERATED COLUMNS)
  // ============================================================

  async listByStatus(
    ctx: RequestContext,
    status: string
  ): Promise<Result<readonly Job[]>> {
    return this.execute(ctx, 'read', async () => {
      // Query via generated column (fast, indexed)
      const jobs = await this.prisma.$queryRaw<Job[]>`
        SELECT *
        FROM jobs
        WHERE company_id = ${ctx.companyId}
          AND status = ${status}
          AND is_deleted = false
        ORDER BY scheduled_at ASC NULLS LAST
        LIMIT 100
      `;
      
      return jobs;
    });
  }

  async listByTechnician(
    ctx: RequestContext,
    technicianId: string
  ): Promise<Result<readonly Job[]>> {
    return this.execute(ctx, 'read', async () => {
      // Query via generated column
      const jobs = await this.prisma.$queryRaw<Job[]>`
        SELECT *
        FROM jobs
        WHERE company_id = ${ctx.companyId}
          AND technician_id = ${technicianId}
          AND is_deleted = false
        ORDER BY scheduled_at ASC NULLS LAST
        LIMIT 100
      `;
      
      return jobs;
    });
  }

  async listScheduled(
    ctx: RequestContext,
    range: DateRange
  ): Promise<Result<readonly Job[]>> {
    return this.execute(ctx, 'read', async () => {
      // Query via generated timestamp column
      const jobs = await this.prisma.$queryRaw<Job[]>`
        SELECT *
        FROM jobs
        WHERE company_id = ${ctx.companyId}
          AND scheduled_at IS NOT NULL
          AND scheduled_at BETWEEN ${range.start} AND ${range.end}
          AND is_deleted = false
        ORDER BY scheduled_at ASC
        LIMIT 500
      `;
      
      return jobs;
    });
  }

  // ============================================================
  // STATUS OPERATIONS
  // ============================================================

  async updateStatus(
    ctx: RequestContext,
    jobId: string,
    status: string
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      
      // Update status immutably
      const data = {
        ...(job.data as JobData),
        status,
      };
      
      // Generated column updates automatically (STORED)
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
    });
  }

  // ============================================================
  // ASSIGNMENT OPERATIONS
  // ============================================================

  async assignTechnician(
    ctx: RequestContext,
    jobId: string,
    technicianId: string
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      
      // Update technician assignment immutably
      const data = {
        ...(job.data as JobData),
        technicianId,
      };
      
      // Generated column updates automatically
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
    });
  }

  async reschedule(
    ctx: RequestContext,
    jobId: string,
    scheduledDate: string
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      
      // Update scheduled date immutably
      const data = {
        ...(job.data as JobData),
        scheduledDate,
      };
      
      // Generated column updates automatically
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
    });
  }

  // ============================================================
  // COLLECTION OPERATIONS (APPEND TO ARRAYS)
  // ============================================================

  async addLineItem(
    ctx: RequestContext,
    jobId: string,
    lineItem: LineItemInput
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      const config = await this.loadConfig(ctx);
      const existingData = job.data as JobData;
      
      // Create line item with metadata
      const item = {
        id: randomUUID(),
        ...lineItem,
        addedBy: ctx.userId,
        addedAt: new Date().toISOString(),
      };
      
      // Build new line items array
      const lineItems = [...(existingData.lineItems || []), item];
      
      // Calculate new total
      const totalValue = lineItems.reduce(
        (sum, item) => sum + item.cost * item.quantity,
        0
      );
      
      // Validate against config limits
      if (
        config.bettyConfig?.maxJobValue &&
        totalValue > config.bettyConfig.maxJobValue
      ) {
        throw new ValidationError('Job exceeds maximum allowed value', {
          max: config.bettyConfig.maxJobValue,
          current: totalValue,
        });
      }
      
      // Build new data object immutably
      const data = {
        ...existingData,
        lineItems,
        estimatedValue: totalValue,
      };
      
      // Update JSONB
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
    });
  }

  async addNote(
    ctx: RequestContext,
    jobId: string,
    note: NoteInput
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      const existingData = job.data as JobData;
      
      // Create note with metadata
      const newNote = {
        id: randomUUID(),
        content: note.content,
        createdBy: ctx.userId,
        createdAt: new Date().toISOString(),
      };
      
      // Build new data object immutably
      const data = {
        ...existingData,
        notes: [...(existingData.notes || []), newNote],
      };
      
      // Update JSONB
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
    });
  }

  async addDocument(
    ctx: RequestContext,
    jobId: string,
    documentId: string
  ): Promise<Result<Job>> {
    return this.execute(ctx, 'update', async () => {
      const job = await this.getExistingJob(ctx, jobId);
      const existingData = job.data as JobData;
      
      // Create document reference with metadata
      const docRef = {
        id: randomUUID(),
        documentId,
        addedBy: ctx.userId,
        addedAt: new Date().toISOString(),
      };
      
      // Build new data object immutably
      const data = {
        ...existingData,
        documents: [...(existingData.documents || []), docRef],
      };
      
      // Update JSONB
      const updated = await this.prisma.job.update({
        where: { id: jobId },
        data: { data },
      });
      
      return updated;
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

  private async getExistingJob(
    ctx: RequestContext,
    jobId: string
  ): Promise<Job> {
    const job = await this.prisma.job.findFirst({
      where: {
        id: jobId,
        companyId: ctx.companyId,
        isDeleted: false,
      },
    });
    
    if (!job) {
      throw new NotFoundError('job', jobId);
    }
    
    return job;
  }

  private validateForCreate(
    data: Partial<JobData>,
    config: CompanyConfigSchema
  ): void {
    // Required fields for creation
    if (!data.status) {
      throw new ValidationError('Job status is required', {
        field: 'status',
      });
    }
    
    if (!data.accountId) {
      throw new ValidationError('Account ID is required', {
        field: 'accountId',
      });
    }
    
    if (!data.title) {
      throw new ValidationError('Job title is required', {
        field: 'title',
      });
    }
    
    // Config-driven validation
    this.validateInvariants(data, config);
  }

  private validateForUpdate(
    data: JobData,
    config: CompanyConfigSchema
  ): void {
    // Only validate invariants on updates
    // (presence is already guaranteed from existing data)
    this.validateInvariants(data, config);
  }

  private validateInvariants(
    data: Partial<JobData>,
    config: CompanyConfigSchema
  ): void {
    // Config-driven value limits
    if (
      config.bettyConfig?.maxJobValue &&
      typeof data.estimatedValue === 'number' &&
      data.estimatedValue > config.bettyConfig.maxJobValue
    ) {
      throw new ValidationError('Job exceeds maximum allowed value', {
        max: config.bettyConfig.maxJobValue,
        value: data.estimatedValue,
      });
    }
    
    // Priority validation (if specified)
    if (data.priority) {
      const validPriorities = ['LOW', 'NORMAL', 'HIGH', 'URGENT'];
      if (!validPriorities.includes(data.priority)) {
        throw new ValidationError('Invalid priority value', {
          field: 'priority',
          value: data.priority,
          allowed: validPriorities,
        });
      }
    }
  }
}
