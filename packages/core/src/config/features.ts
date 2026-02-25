import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/config/features.ts
// Feature Flags & Module Configuration
// ============================================
// LAYER: Config
// PURPOSE: Per-tenant feature toggles
// ============================================

// ============================================
// SCHEDULING / CALENDAR
// ============================================

export interface SchedulingFeatures {
  enabled: boolean;

  // Views
  dispatchBoard: boolean;
  weeklyView: boolean;
  monthlyCalendar: boolean;
  mapView: boolean;

  // Unassigned Jobs Tray (sticky bottom)
  unassignedJobsTray: {
    enabled: boolean;
    label: string;               // "Unassigned", "Job Pool", etc.
    showInDailyView: boolean;
    showInWeeklyView: boolean;
    filters: string[];           // Priority, job type, zone
  };

  // Zone / Geographic Color Coding
  serviceZones: {
    enabled: boolean;
    customBoundaries: boolean;   // Customer draws zone shapes
    zoneColors: boolean;         // Each zone gets a color
    jobZoneDot: boolean;         // Color dot on job ticket corner
    mapOverlay: boolean;         // Show zones on map view
    maxZones: number;            // Limit per company
  };

  // Personnel Color Coding
  personnelColors: {
    technicians: boolean;
    salespeople: boolean;
    installers: boolean;
    customRoles: boolean;
  };

  // Technician Management
  technicianShifts: boolean;
  skillBasedAssignment: boolean;
  zoneAssignment: boolean;

  // Capacity & Availability
  capacityPlanning: boolean;
  arrivalWindows: boolean;
  bufferTime: boolean;
  maxJobsPerTech: number;

  // Optimization
  routeOptimization: boolean;
  aiDispatch: boolean;

  // Customer-Facing
  onlineBooking: boolean;
  realTimeTracking: boolean;
  appointmentConfirmation: boolean;
  etaNotifications: boolean;

  // Non-Job Events
  meetingsAndTraining: boolean;
  ptoManagement: boolean;

  // Recurring
  recurringJobs: boolean;
  maintenanceContracts: boolean;
}

// ============================================
// JOBS / WORK ORDERS
// ============================================

export interface JobsFeatures {
  enabled: boolean;

  // Lifecycle
  customStatuses: boolean;
  statusWorkflow: {
    statuses: string[];
    transitions: Record<string, string[]>;
  };

  // Multi-Visit / Multi-Tech
  multiVisitJobs: boolean;
  multiTechJobs: boolean;
  maxVisitsPerJob: number;

  // Documentation
  photoCapture: boolean;
  videoCapture: boolean;
  voiceNotes: boolean;
  maxPhotosPerJob: number;
  maxVideoMinutes: number;

  // Signatures
  customerSignature: boolean;
  technicianSignature: boolean;
  signatureRequired: boolean;

  // Custom Fields
  customFields: boolean;
  maxCustomFields: number;
  requiredFields: string[];

  // History
  fullAuditTrail: boolean;
  jobCloning: boolean;

  // Permissions
  techCanCreateJobs: boolean;
  techCanEditPrice: boolean;
}

// ============================================
// INVOICING / PAYMENTS
// ============================================

export interface InvoicingFeatures {
  enabled: boolean;

  // Invoice Types
  standardInvoice: boolean;
  progressBilling: boolean;
  recurringInvoices: boolean;
  depositInvoices: boolean;

  // Pricing
  flatRatePricing: boolean;
  timeAndMaterials: boolean;
  customPriceBooks: boolean;

  // Tax
  taxCalculation: boolean;
  multiTaxRates: boolean;
  taxExemptions: boolean;

  // Payments
  onlinePayments: boolean;
  fieldPayments: boolean;
  partialPayments: boolean;
  paymentPlans: boolean;
  achPayments: boolean;
  creditCardPayments: boolean;
  tapToPay: boolean;

  // Automation
  autoInvoiceOnComplete: boolean;
  autoPaymentReminders: boolean;
  lateFeeCalculation: boolean;

  // Accounting Integration
  quickbooksSync: boolean;
  xeroSync: boolean;
  customAccountingExport: boolean;
}

// ============================================
// ESTIMATES / QUOTES
// ============================================

export interface EstimatesFeatures {
  enabled: boolean;

  // Types
  simpleEstimates: boolean;
  goodBetterBest: boolean;
  optionalItems: boolean;
  bundledPackages: boolean;

  // Presentation
  visualEstimates: boolean;
  photoAnnotations: boolean;
  brandedPdf: boolean;

  // Approval
  eSignature: boolean;
  customerApprovalPortal: boolean;
  expirationDates: boolean;

  // Conversion
  autoConvertToJob: boolean;
  autoConvertToInvoice: boolean;

  // Follow-up
  estimateReminders: boolean;
  followUpSequences: boolean;
}

// ============================================
// INVENTORY
// ============================================

export interface InventoryFeatures {
  enabled: boolean;

  // Tracking
  warehouseInventory: boolean;
  truckInventory: boolean;
  serialNumberTracking: boolean;
  lotTracking: boolean;
  barcodeScanning: boolean;

  // Management
  minStockAlerts: boolean;
  autoReorder: boolean;
  purchaseOrders: boolean;
  vendorManagement: boolean;

  // Costing
  fifoCosting: boolean;
  averageCosting: boolean;
  inventoryValuation: boolean;

  // Transfer
  truckToTruckTransfer: boolean;
  warehouseTransfer: boolean;
  transferApprovals: boolean;
}

// ============================================
// FLEET / VEHICLES
// ============================================

export interface FleetFeatures {
  enabled: boolean;

  // Tracking
  gpsTracking: boolean;
  realTimeLocation: boolean;
  geofencing: boolean;
  breadcrumbHistory: boolean;

  // Maintenance
  maintenanceSchedule: boolean;
  maintenanceAlerts: boolean;
  maintenanceHistory: boolean;
  inspectionChecklists: boolean;

  // Fuel
  fuelTracking: boolean;
  fuelCardIntegration: boolean;
  mpgReporting: boolean;

  // Safety
  speedAlerts: boolean;
  harshDrivingAlerts: boolean;
  driverScoring: boolean;

  // Documents
  vehicleDocuments: boolean;
  registrationAlerts: boolean;
  insuranceAlerts: boolean;
}

// ============================================
// CUSTOMER PORTAL
// ============================================

export interface CustomerPortalFeatures {
  enabled: boolean;

  // Access
  portalLogin: boolean;
  ssoIntegration: boolean;

  // Self-Service
  onlineBooking: boolean;
  rescheduleAppointments: boolean;
  cancelAppointments: boolean;
  viewHistory: boolean;
  viewInvoices: boolean;
  makePayments: boolean;
  viewEstimates: boolean;
  approveEstimates: boolean;

  // Documents
  downloadDocuments: boolean;
  uploadDocuments: boolean;
  viewContracts: boolean;
  signContracts: boolean;

  // Communication
  messageTechnician: boolean;
  messageOffice: boolean;
  viewJobPhotos: boolean;
  realTimeTracking: boolean;

  // Branding
  customBranding: boolean;
  customDomain: boolean;
}

// ============================================
// COMMUNICATIONS
// ============================================

export interface CommunicationsFeatures {
  enabled: boolean;

  // Channels
  sms: boolean;
  email: boolean;
  pushNotifications: boolean;
  inAppMessaging: boolean;
  voiceCalls: boolean;

  // Automated Messages
  appointmentReminders: boolean;
  onMyWayAlerts: boolean;
  jobCompleteNotification: boolean;
  invoiceSent: boolean;
  paymentReceived: boolean;
  reviewRequest: boolean;

  // Templates
  customTemplates: boolean;
  dynamicFields: boolean;
  multiLanguage: boolean;

  // Tracking
  deliveryTracking: boolean;
  openTracking: boolean;
  responseTracking: boolean;
}

// ============================================
// REPORTING / ANALYTICS
// ============================================

export interface ReportingFeatures {
  enabled: boolean;

  // Standard Reports
  jobReports: boolean;
  revenueReports: boolean;
  technicianReports: boolean;
  customerReports: boolean;
  inventoryReports: boolean;

  // Advanced Analytics
  customReports: boolean;
  dashboards: boolean;
  kpiTracking: boolean;
  trendAnalysis: boolean;
  forecastingEnabled: boolean;

  // Export
  pdfExport: boolean;
  excelExport: boolean;
  csvExport: boolean;
  scheduledReports: boolean;
  emailReports: boolean;

  // Benchmarking
  industryBenchmarks: boolean;
  multiLocationComparison: boolean;
}

// ============================================
// TIME TRACKING / PAYROLL
// ============================================

export interface TimeTrackingFeatures {
  enabled: boolean;

  // Clock In/Out
  mobileClockIn: boolean;
  gpsClockIn: boolean;
  geofenceClockIn: boolean;
  photoClockIn: boolean;

  // Time Entry
  manualTimeEntry: boolean;
  timeApprovals: boolean;
  overtimeCalculation: boolean;
  breakTracking: boolean;

  // Payroll
  payrollExport: boolean;
  adpIntegration: boolean;
  gusto: boolean;
  customPayrollExport: boolean;

  // Job Costing
  laborCostTracking: boolean;
  jobTimeAllocation: boolean;
  profitabilityReports: boolean;
}

// ============================================
// BETTY AI
// ============================================

export interface BettyFeatures {
  enabled: boolean;

  // Capabilities
  scheduling: boolean;
  customerComms: boolean;
  jobSuggestions: boolean;
  inventoryAlerts: boolean;
  reportGeneration: boolean;

  // Guardrails
  maxConfidence: number;                    // 0.0 - 1.0
  requiresApproval: string[];               // ['invoice.issue', 'contract.sign']
  cannotAccess: string[];                   // ['user.password', 'payment.credentials']

  // Autonomy Levels
  autoSchedule: boolean;
  autoDispatch: boolean;
  autoRespond: boolean;
  autoCreateJob: boolean;

  // Notifications
  aiActionNotifications: boolean;
  aiSuggestionNotifications: boolean;
}

// ============================================
// CRM / CUSTOMER MANAGEMENT
// ============================================

export interface CRMFeatures {
  enabled: boolean;

  // Customer Records
  customerProfiles: boolean;
  propertyProfiles: boolean;
  equipmentTracking: boolean;
  serviceHistory: boolean;

  // Relationships
  multiPropertySupport: boolean;
  commercialAccounts: boolean;
  propertyManagers: boolean;

  // Communication
  communicationLog: boolean;
  callRecording: boolean;
  emailTracking: boolean;

  // Marketing
  customerTags: boolean;
  customFields: boolean;
  customerSegments: boolean;
  marketingLists: boolean;

  // Reviews
  reviewRequests: boolean;
  reviewMonitoring: boolean;
  reviewResponses: boolean;
}

// ============================================
// MEMBERSHIPS / SERVICE AGREEMENTS
// ============================================

export interface MembershipsFeatures {
  enabled: boolean;

  // Plans
  multiplePlans: boolean;
  tieredPricing: boolean;
  familyPlans: boolean;
  commercialPlans: boolean;

  // Billing
  recurringBilling: boolean;
  annualBilling: boolean;
  monthlyBilling: boolean;
  prorating: boolean;
  autoPay: boolean;

  // Benefits
  discountedService: boolean;
  priorityScheduling: boolean;
  freeVisits: boolean;
  partDiscounts: boolean;

  // Management
  renewalReminders: boolean;
  autoRenewal: boolean;
  cancellationWorkflow: boolean;
  membershipReports: boolean;
}

// ============================================
// DOCUMENTS / CONTRACTS
// ============================================

export interface DocumentsFeatures {
  enabled: boolean;

  // Document Types
  contracts: boolean;
  changeOrders: boolean;
  workOrders: boolean;
  permitDocuments: boolean;
  safetyDocuments: boolean;

  // Signatures
  eSignature: boolean;
  multiPartySignature: boolean;
  signingOrder: boolean;
  witnessSignature: boolean;

  // Storage
  documentStorage: boolean;
  maxStorageGB: number;
  documentVersioning: boolean;

  // Compliance
  c2paEnabled: boolean;
  auditRetention: string;           // '7years', '10years'
  gdprCompliance: boolean;

  // Templates
  documentTemplates: boolean;
  customTemplates: boolean;
  templateBuilder: boolean;
}

// ============================================
// MULTI-LOCATION
// ============================================

export interface MultiLocationFeatures {
  enabled: boolean;

  locations: number;                         // Max locations

  // Management
  locationProfiles: boolean;
  locationSpecificPricing: boolean;
  locationSpecificInventory: boolean;
  locationSpecificStaff: boolean;

  // Reporting
  consolidatedReporting: boolean;
  locationComparison: boolean;
  crossLocationBooking: boolean;
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L4_INFRA],
} as const;
