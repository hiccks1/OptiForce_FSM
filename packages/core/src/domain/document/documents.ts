// packages/core/src/domain/documents.ts
// ============================================================
// Phase 2 — Domain Primitives
// Defines WHAT EXISTS and WHAT IS IMMUTABLE
// No persistence logic. No UI. No rendering.
// ============================================================

import type { CompanySchema } from '../config/companySchema';

import { DriftyLayer } from "../../drifty/laws";
// ============================================================
// CORE DOMAIN TYPES
// ============================================================

export type DocumentType =
  | 'contract'
  | 'change-order'
  | 'generic';

// ============================================================
// BASE DOCUMENT (FOUNDATION OF ALL LEGAL ARTIFACTS)
// ============================================================

export interface Document {
  id: string;

  companyId: string;

  type: DocumentType;

  // Template key from CompanySchema
  templateKey: string;

  // Versioned schema snapshot at time of creation
  schemaVersion: CompanySchema['schemaVersion'];

  // Business data captured from config-defined fields
  data: Record<string, unknown>;

  // System metadata (NOT customer-editable)
  metadata: {
    createdAt: string;
    createdBy: string; // userId | system | AI
    materializedAt?: string; // when it became immutable
  };

  // Immutability flag (enforced by domain rules)
  immutable: boolean;
}

// ============================================================
// CONTRACT (IMMUTABLE ROOT DOCUMENT)
// ============================================================

export interface Contract extends Document {
  type: 'contract';

  // Contracts are always immutable once materialized
  immutable: true;

  // Contract-specific references
  contractNumber: string;

  jobId?: string;

  // Aggregates all related change orders (read-only view)
  changeOrderIds: string[];
}

// ============================================================
// CHANGE ORDER (DELTA DOCUMENT)
// ============================================================

export interface ChangeOrder extends Document {
  type: 'change-order';

  immutable: true;

  // Required parent reference
  parentContractId: string;

  // Optional chaining for multiple change orders
  previousChangeOrderId?: string;

  // Financial delta only (no rewriting originals)
  delta: {
    addedCost?: number;
    deductedCost?: number;
    netChange: number;
  };
}

// ============================================================
// DOMAIN LAWS (EXPRESSED AS TYPES, ENFORCED IN SERVICES)
// ============================================================

// 1. Documents start mutable (draft) and become immutable once materialized
export type DraftDocument = Document & { immutable: false };

// 2. Materialized documents are immutable forever
export type MaterializedDocument = Document & { immutable: true };

// 3. Contracts may only be created, never updated
export type NewContract = Omit<Contract, 'immutable' | 'changeOrderIds'>;

// 4. Change orders may only reference existing contracts
export type NewChangeOrder = Omit<
  ChangeOrder,
  'immutable' | 'previousChangeOrderId'
>;

// ============================================================
// DOMAIN INTENT (NO IMPLEMENTATION HERE)
// ============================================================

// - Validation of data shape is driven by CompanySchema
// - Immutability is enforced at service layer
// - Rendering (HTML/PDF) consumes Document + schema
// - Payments & ledgers consume Contract + ChangeOrder deltas


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
