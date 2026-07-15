// packages/core/src/config/companySchema.ts
// =============================================
// CompanyConfig Schema — Phase 1 (LAW BOOK)
// Versioned, forward-compatible, UI-friendly, still declarative
// ==============================================

// ===============================================
// TOP-LEVEL COMPANY SCHEMA
// ==================================================

export interface CompanySchema {
  // Allows evolution of the schema itself without breaking old tenants
  schemaVersion: '1.0';

  documents: DocumentDefinitions;
  contracts: ContractDefinitions;
  changeOrders: ChangeOrderDefinitions;

  // future-proofing (do not implement yet)
  // estimates?: EstimateDefinitions;
}

// ============================================================
// DOCUMENT FOUNDATION
// ============================================================

export interface DocumentDefinitions {
  fieldTypes: Record<string, FieldTypeDefinition>;
  commonFields: Record<string, FieldDefinition>;
}

// ============================================================
// FIELD TYPES (PRIMITIVES + VALIDATION)
// ============================================================

export type FieldType =
  | 'text'
  | 'number'
  | 'currency'
  | 'boolean'
  | 'date'
  | 'datetime'
  | 'select'
  | 'multiselect'
  | 'signature'
  | 'initial'
  | 'computed';

export interface FieldTypeDefinition {
  type: FieldType;

  // Used for select / multiselect
  options?: string[];

  // Used for computed fields (totals, rollups)
  computedFrom?: string[];

  // Declarative validation (UI + client-side, no business logic)
  validation?: {
    min?: number;
    max?: number;
    regex?: string;
  };
}

// ============================================================
// FIELD DEFINITION (MOST IMPORTANT STRUCTURE)
// ============================================================

export interface FieldDefinition {
  label: string;

  // Optional admin-facing description (tooltips, builders, docs)
  description?: string;

  type: FieldType;

  required?: boolean;

  // Mutability rules
  // draft  = editable before signing
  // never  = immutable once materialized
  mutable: 'draft' | 'never';

  // Role-based visibility
  visibleTo: Array<'customer' | 'tech' | 'sales' | 'admin'>;

  // Legal acknowledgements
  requiresInitial?: boolean;
  requiresSignature?: boolean;

  // Optional default
  defaultValue?: unknown;
}

// ============================================================
// CONTRACT DEFINITIONS (IMMUTABLE BY LAW)
// ============================================================

export interface ContractDefinitions {
  templates: Record<string, ContractTemplate>;
}

export interface ContractTemplate {
  name: string;

  // Optional categorization for UI filtering / search
  category?: string;
  tags?: string[];

  // Field map (no fixed schema)
  fields: Record<string, FieldDefinition>;

  // Level of legal boilerplate
  legal:
    | 'full'
    | 'state-required'
    | 'company-standard';

  // Signature order enforcement
  signingOrder: Array<'customer' | 'company'>;

  // Materialization rules
  materialization: {
    createsDocument: true;
    immutable: true;
  };
}

// ===================================================
// CHANGE ORDER DEFINITIONS (DELTA DOCUMENTS)
// ==================================================

export interface ChangeOrderDefinitions {
  templates: Record<string, ChangeOrderTemplate>;
}

export interface ChangeOrderTemplate {
  name: string;

  // Optional categorization for UI filtering / reporting
  category?: string;
  tags?: string[];

  // Only delta-related fields
  fields: Record<string, FieldDefinition>;

  // What this change order attaches to
  references:
    | 'original-contract'
    | 'previous-change-order';

  // Legal scope
  legal: 'delta-only';

  // Materialization rules
  materialization: {
    createsDocument: true;
    immutable: true;
  };
}


