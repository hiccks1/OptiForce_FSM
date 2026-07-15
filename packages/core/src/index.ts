// ============================================
// packages/core/src/types/index.ts
// PURE TYPES ONLY - Zero runtime code
// ============================================
// LAYER: Foundation
// IMPORTS FROM: @prisma/client only
// EXPORTS TO: All layers
// ============================================

// ✅ Use "export type" so Vite completely strips these lines out during build!
export type { UserRole, ActorType } from '@fsm/db';
export type { UserRole as UserRoleType, ActorType as ActorTypeType } from '@fsm/db';

// ============================================
// BRANDED TYPES (Compile-time safety)
// ============================================
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

export type CompanyId = Brand<string, 'CompanyId'>;
export type UserId = Brand<string, 'UserId'>;
// ... (rest of your branded types stay exactly the same)

export type JobId = Brand<string, 'JobId'>;
export type JobVisitId = Brand<string, 'JobVisitId'>;
export type ContractId = Brand<string, 'ContractId'>;
export type DocumentId = Brand<string, 'DocumentId'>;
export type InvoiceId = Brand<string, 'InvoiceId'>;
export type AccountId = Brand<string, 'AccountId'>;
export type CustomerId = Brand<string, 'CustomerId'>;
export type SignatureId = Brand<string, 'SignatureId'>;
export type ZoneId = Brand<string, 'ZoneId'>;

// ============================================
// RESULT TYPE (Functional error handling)
// ============================================

export type Success<T> = {
  readonly success: true;
  readonly data: T;
};

export type Failure<E = Error> = {
  readonly success: false;
  readonly error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

// Pure functions (no side effects = acceptable in types layer)
export const success = <T>(data: T): Success<T> => ({
  success: true,
  data,
});

export const failure = <E = Error>(error: E): Failure<E> => ({
  success: false,
  error,
});

// Type guards
export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> =>
  result.success === true;

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> =>
  result.success === false;

// ============================================
// ENTITY TYPES
// ============================================

export type EntityType =
  | 'job'
  | 'jobVisit'
  | 'contract'
  | 'document'
  | 'invoice'
  | 'user'
  | 'account'
  | 'customer'
  | 'signature'
  | 'zone'
  | 'vehicle'
  | 'inventory'
  | 'timeEntry'
  | 'message'
  | 'companyConfig';

export type OperationType =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'list'
  | 'sign'
  | 'void'
  | 'issue'
  | 'complete'
  | 'cancel'
  | 'schedule'
  | 'assign'
  | 'approve'
  | 'reject';

export interface EntityOperation {
  readonly entity: EntityType;
  readonly operation: OperationType;
}

// ============================================
// BASE ENTITY SHAPE (all entities have these)
// ============================================

export interface BaseEntity {
  readonly id: string;
  readonly companyId: CompanyId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isDeleted: boolean;
  readonly deletedAt: Date | null;
}

// ============================================
// SOFT DELETE QUERY HELPERS
// ============================================

export interface SoftDeleteWhere {
  readonly companyId: CompanyId;
  readonly isDeleted: false;
}

export interface EntityWhere extends SoftDeleteWhere {
  readonly id: string;
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
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ============================================
// AUDIT TYPES
// ============================================

export interface AIModelInfo {
  readonly provider: 'anthropic' | 'openai' | 'local';
  readonly model: string;
  readonly version?: string;
  readonly checksum?: string;
}

export interface AIAuditMetadata {
  readonly sessionId: string;
  readonly intent?: string;
  readonly confidence: number;
  readonly model: AIModelInfo;
  readonly tokensUsed?: number;
  readonly latencyMs?: number;
}

export interface AuditLogEntry {
  readonly id: string;
  readonly companyId: CompanyId;
  readonly entityType: EntityType;
  readonly entityId: string;
  readonly actorId: UserId | null;
  readonly actorType: ActorTypeType;
  readonly operation: OperationType;
  readonly occurredAt: Date;
  readonly beforeHash: string | null;
  readonly afterHash: string;
  readonly prevRecordHash: string | null;
  readonly payload: unknown;
  readonly ai?: AIAuditMetadata;
}

// ============================================
// JSONB VERSIONING
// ============================================

export interface VersionedData {
  readonly schemaVersion: number;
}

export interface AuditedData extends VersionedData {
  readonly _audit?: ReadonlyArray<{
    readonly id: string;
    readonly at: string;
    readonly actorId: string | null;
    readonly actorType: ActorTypeType;
    readonly reason: string;
    readonly source?: string;
    readonly notes?: string;
  }>;
}

// ============================================
// IMMUTABILITY STATUS
// ============================================

export type ImmutabilityReason =
  | 'signed'
  | 'completed'
  | 'issued'
  | 'paid'
  | 'voided'
  | 'archived';

export interface ImmutabilityCheck {
  readonly isImmutable: boolean;
  readonly reason?: ImmutabilityReason;
  readonly lockedAt?: Date;
  readonly lockedBy?: string;
}

// ============================================
// MONEY (Value Object Type)
// ============================================

export interface Money {
  readonly amount: number;
  readonly currency: 'USD' | 'CAD' | 'EUR' | 'GBP';
}

// ============================================
// ADDRESS (Value Object Type)
// ============================================

export interface Address {
  readonly street1: string;
  readonly street2?: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
  readonly latitude?: number;
  readonly longitude?: number;
}

// ============================================
// TIME WINDOW
// ============================================

export interface TimeWindow {
  readonly start: string; // ISO datetime
  readonly end: string;   // ISO datetime
}

export interface ArrivalWindow {
  readonly label: string;         // "Morning", "Afternoon"
  readonly start: string;         // "08:00"
  readonly end: string;           // "12:00"
}


