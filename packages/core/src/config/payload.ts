// ============================================
// packages/core/src/config/payload.ts
// CompanyConfigPayload - What goes in CompanyConfig.schema (DB)
// ============================================
// LAYER: Config
// PURPOSE: Single type for entire tenant configuration
// ============================================

import type { CompanySchema } from './companySchema';
import type { /* feature types */ } from './features';

import { CompanyConfigPayloadSchema } from '@fsm/schemas/company.schema';

// ============================================
// METADATA (Company identity)
// ============================================

export interface CompanyMetadata {
  readonly companyId: string;
  readonly name: string;
  readonly industry: 'HVAC' | 'Plumbing' | 'Electrical' | 'Roofing' | 'General' | 'Other';
  readonly timezone: string;
  readonly currency: 'USD' | 'CAD' | 'EUR' | 'GBP';
  readonly locale: string;
  readonly createdAt: string;
}

// ============================================
// HOT COLUMNS (GIN Index Strategy)
// ============================================

export interface HotColumnsConfig {
  readonly strategy: 'kpi' | 'automation' | 'balanced' | 'custom';
  readonly indexes: ReadonlyArray<{
    readonly table: string;
    readonly jsonPath: string;
    readonly dataType: 'string' | 'number' | 'date' | 'boolean';
    readonly indexName?: string;
  }>;
}

// ============================================
// C2PA COMPLIANCE
// ============================================

export interface C2PAConfig {
  readonly enabled: boolean;
  readonly signAllDocuments: boolean;
  readonly signPhotos: boolean;
  readonly auditRetention: '1year' | '3years' | '7years' | '10years' | 'forever';
  readonly hashAlgorithm: 'sha256' | 'sha384' | 'sha512';
}

// ============================================
// BRANDING
// ============================================

export interface BrandingConfig {
  readonly logoUrl?: string;
  readonly primaryColor: string;
  readonly secondaryColor: string;
  readonly accentColor: string;
  readonly fontFamily?: string;
  readonly customCss?: string;
}

// ============================================
// INTEGRATIONS
// ============================================

export interface IntegrationsConfig {
  // Accounting
  readonly quickbooks?: {
    readonly enabled: boolean;
    readonly syncInvoices: boolean;
    readonly syncPayments: boolean;
    readonly syncCustomers: boolean;
  };
  readonly xero?: {
    readonly enabled: boolean;
    readonly syncInvoices: boolean;
    readonly syncPayments: boolean;
  };

  // Payment Processing
  readonly stripe?: {
    readonly enabled: boolean;
    readonly accountId?: string;
  };
  readonly square?: {
    readonly enabled: boolean;
    readonly locationId?: string;
  };

  // Communication
  readonly twilio?: {
    readonly enabled: boolean;
    readonly phoneNumber?: string;
  };
  readonly sendgrid?: {
    readonly enabled: boolean;
  };

  // GPS/Fleet
  readonly samsara?: {
    readonly enabled: boolean;
  };
  readonly verizonConnect?: {
    readonly enabled: boolean;
  };

  // Marketing
  readonly googleAds?: {
    readonly enabled: boolean;
    readonly conversionTracking: boolean;
  };

  // CRM
  readonly salesforce?: {
    readonly enabled: boolean;
    readonly syncCustomers: boolean;
  };
}

// ============================================
// FULL PAYLOAD (Goes in CompanyConfig.schema)
// ============================================

export interface CompanyConfigPayload {
  // Version (for migrations)
  readonly configVersion: '1.0';

  // Identity
  readonly metadata: CompanyMetadata;

  // LAW BOOK (Document/Contract schemas)
  readonly schema: CompanySchema;

  // Performance (GIN indexes)
  readonly hotColumns: HotColumnsConfig;

  // Compliance
  readonly c2pa: C2PAConfig;

  // Branding
  readonly branding: BrandingConfig;

  // External Services
  readonly integrations: IntegrationsConfig;

  // ============================================
  // FEATURE FLAGS (All modules)
  // ============================================

  readonly features: {
    readonly scheduling: SchedulingFeatures;
    readonly jobs: JobsFeatures;
    readonly invoicing: InvoicingFeatures;
    readonly estimates: EstimatesFeatures;
    readonly inventory: InventoryFeatures;
    readonly fleet: FleetFeatures;
    readonly customerPortal: CustomerPortalFeatures;
    readonly communications: CommunicationsFeatures;
    readonly reporting: ReportingFeatures;
    readonly timeTracking: TimeTrackingFeatures;
    readonly betty: BettyFeatures;
    readonly crm: CRMFeatures;
    readonly memberships: MembershipsFeatures;
    readonly documents: DocumentsFeatures;
    readonly multiLocation: MultiLocationFeatures;
  };
}

// ============================================
// DEFAULT CONFIGS (Templates)
// ============================================

export const DEFAULT_SCHEDULING: SchedulingFeatures = {
  enabled: true,
  dispatchBoard: true,
  weeklyView: true,
  monthlyCalendar: true,
  mapView: true,
  unassignedJobsTray: {
    enabled: true,
    label: 'Unassigned',
    showInDailyView: true,
    showInWeeklyView: true,
    filters: ['priority', 'jobType', 'zone'],
  },
  serviceZones: {
    enabled: true,
    customBoundaries: true,
    zoneColors: true,
    jobZoneDot: true,
    mapOverlay: true,
    maxZones: 20,
  },
  personnelColors: {
    technicians: true,
    salespeople: true,
    installers: true,
    customRoles: false,
  },
  technicianShifts: true,
  skillBasedAssignment: true,
  zoneAssignment: true,
  capacityPlanning: true,
  arrivalWindows: true,
  bufferTime: true,
  maxJobsPerTech: 8,
  routeOptimization: false,    // Premium
  aiDispatch: false,           // Premium
  onlineBooking: true,
  realTimeTracking: true,
  appointmentConfirmation: true,
  etaNotifications: true,
  meetingsAndTraining: true,
  ptoManagement: true,
  recurringJobs: true,
  maintenanceContracts: true,
};

export const DEFAULT_JOBS: JobsFeatures = {
  enabled: true,
  customStatuses: true,
  statusWorkflow: {
    statuses: ['DRAFT', 'SCHEDULED', 'DISPATCHED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'CANCELLED'],
    transitions: {
      DRAFT: ['SCHEDULED', 'CANCELLED'],
      SCHEDULED: ['DISPATCHED', 'CANCELLED'],
      DISPATCHED: ['IN_PROGRESS', 'CANCELLED'],
      IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
      COMPLETED: ['INVOICED'],
      INVOICED: [],
      CANCELLED: [],
    },
  },
  multiVisitJobs: true,
  multiTechJobs: true,
  maxVisitsPerJob: 50,
  photoCapture: true,
  videoCapture: false,         // Premium
  voiceNotes: false,           // Premium
  maxPhotosPerJob: 50,
  maxVideoMinutes: 5,
  customerSignature: true,
  technicianSignature: false,
  signatureRequired: true,
  customFields: true,
  maxCustomFields: 20,
  requiredFields: [],
  fullAuditTrail: true,
  jobCloning: true,
  techCanCreateJobs: false,
  techCanEditPrice: false,
};

export const DEFAULT_BETTY: BettyFeatures = {
  enabled: false,
  scheduling: false,
  customerComms: false,
  jobSuggestions: false,
  inventoryAlerts: false,
  reportGeneration: false,
  maxConfidence: 0.8,
  requiresApproval: [
    'invoice.issue',
    'contract.sign',
    'changeOrder.approve',
    'payment.refund',
  ],
  cannotAccess: [
    'user.password',
    'payment.credentials',
    'company.financials',
    'employee.ssn',
  ],
  autoSchedule: false,
  autoDispatch: false,
  autoRespond: false,
  autoCreateJob: false,
  aiActionNotifications: true,
  aiSuggestionNotifications: true,
};

// ============================================
// TYPE GUARDS
// ============================================

export function parseCompanyConfigPayload(data: unknown): CompanyConfigPayload {
  // Zod-only validation (contract)
  return CompanyConfigPayloadSchema.parse(data) as unknown as CompanyConfigPayload;
}

export function safeParseCompanyConfigPayload(data: unknown): {
  ok: true;
  value: CompanyConfigPayload;
} | {
  ok: false;
  error: string;
} {
  const res = CompanyConfigPayloadSchema.safeParse(data);
  if (!res.success) {
    return { ok: false, error: res.error.message };
  }
  return { ok: true, value: res.data as unknown as CompanyConfigPayload };
}


