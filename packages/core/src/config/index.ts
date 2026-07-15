// ============================================
// packages/core/src/config/index.ts
// Config Layer Barrel Export
// ============================================
// VERSION: 1.0.0
// ============================================

// Schema (LAW BOOK - Document/Contract definitions)
export type {
  CompanySchema,
  DocumentDefinitions,
  ContractDefinitions,
  ChangeOrderDefinitions,
  FieldType,
  FieldTypeDefinition,
  FieldDefinition,
  ContractTemplate,
  ChangeOrderTemplate,
} from './companySchema';

// Feature Flags (All module toggles)
export type {
  SchedulingFeatures,
  JobsFeatures,
  InvoicingFeatures,
  EstimatesFeatures,
  InventoryFeatures,
  FleetFeatures,
  CustomerPortalFeatures,
  CommunicationsFeatures,
  ReportingFeatures,
  TimeTrackingFeatures,
  BettyFeatures,
  CRMFeatures,
  MembershipsFeatures,
  DocumentsFeatures,
  MultiLocationFeatures,
} from './features';

// Payload (What goes in DB)
export type {
  CompanyConfigPayload,
  CompanyMetadata,
  HotColumnsConfig,
  C2PAConfig,
  BrandingConfig,
  IntegrationsConfig,
} from './payload';

export {
  DEFAULT_SCHEDULING,
  DEFAULT_JOBS,
  DEFAULT_BETTY,
  parseCompanyConfigPayload,
  safeParseCompanyConfigPayload,
} from './payload';


