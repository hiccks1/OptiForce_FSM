// ============================================
// packages/core/src/types/index.ts
// Core Types - Foundation Layer
// ============================================

import type { UserRole, ActorType } from '@prisma/client';

// ============================================
// REQUEST CONTEXT (WHO + WHY)
// ============================================

export interface RequestContext {
  // Identity
  readonly requestId: string;
  readonly userId: string;
  readonly companyId: string;
  
  // Actor type (critical for permissions)
  readonly actorType: ActorType; // 'HUMAN' | 'AI' | 'SYSTEM'
  
  // Human-specific
  readonly userRole?: UserRole;
  readonly userEmail?: string;
  
  // AI-specific
  readonly bettySessionId?: string;
  readonly bettyConfidence?: number;
  readonly bettyIntent?: string;
  
  // Audit trail
  readonly timestamp: Date;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  
  // Metadata
  readonly metadata?: Record<string, unknown>;
}

// ============================================
// RESULT TYPE (Success/Failure Pattern)
// ============================================

export type Success<T> = {
  readonly success: true;
  readonly data: T;
};

export type Failure = {
  readonly success: false;
  readonly error: DomainError;
};

export type Result<T> = Success<T> | Failure;

// Helper constructors
export const success = <T>(data: T): Success<T> => ({
  success: true,
  data,
});

export const failure = (error: DomainError): Failure => ({
  success: false,
  error,
});

// ============================================
// ENTITY TYPES
// ============================================

export type EntityType = 'job' | 'document' | 'user';

export type OperationType = 'create' | 'read' | 'update' | 'delete' | 'list';

export interface EntityOperation {
  readonly entity: EntityType;
  readonly operation: OperationType;
}

// ============================================
// PAGINATION
// ============================================

export interface PaginationParams {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: string;
  readonly sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  readonly data: ReadonlyArray<T>;
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ============================================
// AUDIT LOG ENTRY
// ============================================

export interface AuditLogEntry {
  readonly companyId: string;
  readonly actorId: string | null;
  readonly actorType: ActorType;
  readonly action: string;
  readonly input: Record<string, unknown>;
  readonly outcome: Record<string, unknown>;
  readonly allowed: boolean;
}

// ============================================
// COMPANY CONFIG TYPES
// ============================================

export interface CompanyConfigSchema {
  readonly jobSchema: Record<string, unknown>;
  readonly bettyConfig?: BettyConfig;
  readonly workflows?: Record<string, unknown>;
  readonly uiSettings?: Record<string, unknown>;
}

export interface BettyConfig {
  readonly enabled: boolean;
  readonly permissions: BettyPermissions;
  readonly requiresApproval: boolean;
  readonly maxJobValue?: number;
  readonly approvalRules?: Record<string, unknown>;
}

export interface BettyPermissions {
  readonly canCreateJobs: boolean;
  readonly canUpdateJobs: boolean;
  readonly canDeleteJobs: boolean;
  readonly canCreateDocuments: boolean;
  readonly canDeleteDocuments: boolean;
}
