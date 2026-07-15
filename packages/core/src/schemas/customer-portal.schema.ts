```ts
// packages/config/src/schemas/customer-portal.schema.ts

/*
  Phase 2.5 – Customer Portal Canonical Schema
  -------------------------------------------
  Purpose:
  - Single source of truth for customer-facing portal behavior
  - Fully config-driven, additive, non-breaking by design
  - Mirrors CompanyConfig philosophy

  Design Laws:
  - Schema-first, UI-dumb
  - Additive evolution only
  - No workflow logic, only declarations
*/

export interface CustomerPortalSchema {
  schemaVersion: '1.0';

  metadata?: {
    name?: string;
    description?: string;
    tags?: string[];
  };

  access: PortalAccess;
  navigation: PortalNavigation;
  pages: PortalPages;
  documents: PortalDocuments;
  actions?: PortalActions;
  ui?: PortalUI;
  audit?: PortalAudit;
}

// =====================================================
// ACCESS & AUTH
// =====================================================

export interface PortalAccess {
  allowUnauthenticated?: boolean;
  authMethods: Array<'magic-link' | 'password' | 'sso'>;

  roles: Record<string, PortalRole>;
}

export interface PortalRole {
  label: string;
  permissions: string[]; // declarative strings
}

// =====================================================
// NAVIGATION
// =====================================================

export interface PortalNavigation {
  menu: PortalNavItem[];
}

export interface PortalNavItem {
  id: string;
  label: string;
  pageRef: string;
  rolesAllowed?: string[];
}

// =====================================================
// PAGES
// =====================================================

export interface PortalPages {
  [pageId: string]: PortalPage;
}

export interface PortalPage {
  title: string;
  description?: string;
  rolesAllowed?: string[];

  layout: 'single-column' | 'two-column' | 'wizard';

  sections: PortalSection[];
}

export interface PortalSection {
  id: string;
  type:
    | 'text'
    | 'data-view'
    | 'form'
    | 'document-viewer'
    | 'action-panel';

  source?: string; // job.data.*, document.*, contract.*

  config?: Record<string, any>; // section-specific config
}

// =====================================================
// DOCUMENT VISIBILITY
// =====================================================

export interface PortalDocuments {
  visibilityRules: PortalDocumentRule[];
}

export interface PortalDocumentRule {
  documentType: 'contract' | 'change-order' | 'invoice' | 'receipt';
  showWhen?: PortalCondition;
}

// =====================================================
// ACTIONS
// =====================================================

export interface PortalActions {
  [actionId: string]: PortalAction;
}

export interface PortalAction {
  label: string;
  type: 'sign' | 'approve' | 'download' | 'upload' | 'pay';

  target?: string; // documentRef
  conditions?: PortalCondition;
}

// =====================================================
// UI & THEME (OPTIONAL)
// =====================================================

export interface PortalUI {
  theme?: {
    logoUrl?: string;
    primaryColor?: string;
  };
}

// =====================================================
// AUDIT & SAFETY
// =====================================================

export interface PortalAudit {
  logViews?: boolean;
  logDownloads?: boolean;
  logSignatures?: boolean;
}

// =====================================================
// CONDITIONS (SHARED)
// =====================================================

export interface PortalCondition {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'exists';
  value?: any;
}
```


