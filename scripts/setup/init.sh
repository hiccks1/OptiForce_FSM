#!/bin/bash
# ============================================
# FSM Company Initialization
# Generates CompanyConfigPayload for new tenants
# ============================================
# VERSION: 2.0.0
# MATCHES: CompanyConfigPayload from config/payload.ts
# ============================================

set -e

echo "🏢 FSM Company Initialization v2.0"
echo "==================================="
echo ""

# ============================================
# COLLECT BUSINESS MODEL
# ============================================

read -p "Company Name: " COMPANY_NAME
read -p "Industry (HVAC/Plumbing/Electrical/Roofing/General/Other): " INDUSTRY
read -p "Timezone (e.g., America/New_York): " TIMEZONE
read -p "Currency (USD/CAD/EUR/GBP): " CURRENCY

echo ""
echo "📋 Feature Tiers:"
echo "  1. Starter   - Basic scheduling, jobs, invoicing"
echo "  2. Pro       - + Inventory, fleet, customer portal"
echo "  3. Enterprise - + Betty AI, multi-location, C2PA compliance"
read -p "Select tier (1/2/3): " TIER

# C2PA only for Enterprise
C2PA_ENABLED="false"
if [ "$TIER" = "3" ]; then
  read -p "Enable C2PA Compliance (yes/no): " C2PA_INPUT
  [ "$C2PA_INPUT" = "yes" ] && C2PA_ENABLED="true"
fi

# Betty AI only for Enterprise
BETTY_ENABLED="false"
BETTY_MAX_CONFIDENCE="0.8"
if [ "$TIER" = "3" ]; then
  read -p "Enable Betty AI (yes/no): " BETTY_INPUT
  if [ "$BETTY_INPUT" = "yes" ]; then
    BETTY_ENABLED="true"
    read -p "Betty confidence threshold (0.7/0.8/0.9): " BETTY_MAX_CONFIDENCE
  fi
fi

# Generate company ID
COMPANY_ID=$(uuidgen | tr '[:upper:]' '[:lower:]')
CREATED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo ""
echo "📋 Configuration Summary:"
echo "  Company: $COMPANY_NAME"
echo "  ID: $COMPANY_ID"
echo "  Industry: $INDUSTRY"
echo "  Timezone: $TIMEZONE"
echo "  Currency: $CURRENCY"
echo "  Tier: $TIER"
echo "  C2PA: $C2PA_ENABLED"
echo "  Betty: $BETTY_ENABLED"
echo ""
read -p "Proceed? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ Initialization cancelled"
  exit 1
fi

# ============================================
# GENERATE CONFIG FILE
# ============================================

CONFIG_DIR="config/company-configs"
CONFIG_FILE="${CONFIG_DIR}/${COMPANY_ID}.ts"
mkdir -p "$CONFIG_DIR"

# Determine feature flags based on tier
INVENTORY_ENABLED="false"
FLEET_ENABLED="false"
CUSTOMER_PORTAL_ENABLED="false"
MULTI_LOCATION_ENABLED="false"
ROUTE_OPTIMIZATION="false"
AI_DISPATCH="false"

if [ "$TIER" = "2" ] || [ "$TIER" = "3" ]; then
  INVENTORY_ENABLED="true"
  FLEET_ENABLED="true"
  CUSTOMER_PORTAL_ENABLED="true"
fi

if [ "$TIER" = "3" ]; then
  MULTI_LOCATION_ENABLED="true"
  ROUTE_OPTIMIZATION="true"
  AI_DISPATCH="$BETTY_ENABLED"
fi

cat > "$CONFIG_FILE" << EOF
// ============================================
// Company Config: ${COMPANY_NAME}
// Generated: ${CREATED_AT}
// ID: ${COMPANY_ID}
// ============================================

import type { CompanyConfigPayload } from '@fsm/core/config';

export const companyConfig: CompanyConfigPayload = {
  configVersion: '1.0',

  // ============================================
  // METADATA
  // ============================================
  metadata: {
    companyId: '${COMPANY_ID}',
    name: '${COMPANY_NAME}',
    industry: '${INDUSTRY}',
    timezone: '${TIMEZONE}',
    currency: '${CURRENCY}',
    locale: 'en-US',
    createdAt: '${CREATED_AT}',
  },

  // ============================================
  // SCHEMA (LAW BOOK)
  // ============================================
  schema: {
    schemaVersion: '1.0',
    documents: {
      fieldTypes: {
        text: { type: 'text' },
        number: { type: 'number' },
        currency: { type: 'currency' },
        date: { type: 'date' },
        signature: { type: 'signature' },
        initial: { type: 'initial' },
      },
      commonFields: {
        customerName: {
          label: 'Customer Name',
          type: 'text',
          required: true,
          mutable: 'never',
          visibleTo: ['customer', 'tech', 'sales', 'admin'],
        },
        serviceAddress: {
          label: 'Service Address',
          type: 'text',
          required: true,
          mutable: 'never',
          visibleTo: ['customer', 'tech', 'sales', 'admin'],
        },
        serviceDate: {
          label: 'Service Date',
          type: 'date',
          required: true,
          mutable: 'draft',
          visibleTo: ['customer', 'tech', 'sales', 'admin'],
        },
      },
    },
    contracts: {
      templates: {
        standardService: {
          name: 'Standard Service Contract',
          fields: {
            totalAmount: {
              label: 'Total Amount',
              type: 'currency',
              required: true,
              mutable: 'never',
              visibleTo: ['customer', 'sales', 'admin'],
            },
            workDescription: {
              label: 'Work Description',
              type: 'text',
              required: true,
              mutable: 'never',
              visibleTo: ['customer', 'tech', 'sales', 'admin'],
            },
          },
          legal: 'company-standard',
          signingOrder: ['customer', 'company'],
          materialization: {
            createsDocument: true,
            immutable: true,
          },
        },
      },
    },
    changeOrders: {
      templates: {
        standardChange: {
          name: 'Standard Change Order',
          fields: {
            changeReason: {
              label: 'Reason for Change',
              type: 'text',
              required: true,
              mutable: 'never',
              visibleTo: ['customer', 'sales', 'admin'],
            },
            additionalCost: {
              label: 'Additional Cost',
              type: 'currency',
              required: true,
              mutable: 'never',
              visibleTo: ['customer', 'sales', 'admin'],
            },
          },
          references: 'original-contract',
          legal: 'delta-only',
          materialization: {
            createsDocument: true,
            immutable: true,
          },
        },
      },
    },
  },

  // ============================================
  // HOT COLUMNS (GIN Indexes)
  // ============================================
  hotColumns: {
    strategy: 'balanced',
    indexes: [
      { table: 'jobs', jsonPath: 'status', dataType: 'string' },
      { table: 'jobs', jsonPath: 'scheduledDate', dataType: 'date' },
      { table: 'jobs', jsonPath: 'technicianId', dataType: 'string' },
      { table: 'jobs', jsonPath: 'customerId', dataType: 'string' },
      { table: 'contracts', jsonPath: 'status', dataType: 'string' },
      { table: 'invoices', jsonPath: 'status', dataType: 'string' },
    ],
  },

  // ============================================
  // C2PA COMPLIANCE
  // ============================================
  c2pa: {
    enabled: ${C2PA_ENABLED},
    signAllDocuments: ${C2PA_ENABLED},
    signPhotos: ${C2PA_ENABLED},
    auditRetention: '7years',
    hashAlgorithm: 'sha256',
  },

  // ============================================
  // BRANDING
  // ============================================
  branding: {
    primaryColor: '#1a73e8',
    secondaryColor: '#34a853',
    accentColor: '#ea4335',
  },

  // ============================================
  // INTEGRATIONS
  // ============================================
  integrations: {
    quickbooks: { enabled: false, syncInvoices: false, syncPayments: false, syncCustomers: false },
    stripe: { enabled: false },
    twilio: { enabled: false },
    sendgrid: { enabled: false },
  },

  // ============================================
  // FEATURES
  // ============================================
  features: {
    // SCHEDULING
    scheduling: {
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
      routeOptimization: ${ROUTE_OPTIMIZATION},
      aiDispatch: ${AI_DISPATCH},
      onlineBooking: true,
      realTimeTracking: true,
      appointmentConfirmation: true,
      etaNotifications: true,
      meetingsAndTraining: true,
      ptoManagement: true,
      recurringJobs: true,
      maintenanceContracts: true,
    },

    // JOBS
    jobs: {
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
      videoCapture: false,
      voiceNotes: false,
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
    },

    // INVOICING
    invoicing: {
      enabled: true,
      standardInvoice: true,
      progressBilling: false,
      recurringInvoices: false,
      depositInvoices: false,
      flatRatePricing: true,
      timeAndMaterials: true,
      customPriceBooks: false,
      taxCalculation: true,
      multiTaxRates: false,
      taxExemptions: false,
      onlinePayments: true,
      fieldPayments: true,
      partialPayments: false,
      paymentPlans: false,
      achPayments: false,
      creditCardPayments: true,
      tapToPay: false,
      autoInvoiceOnComplete: false,
      autoPaymentReminders: true,
      lateFeeCalculation: false,
      quickbooksSync: false,
      xeroSync: false,
      customAccountingExport: false,
    },

    // ESTIMATES
    estimates: {
      enabled: true,
      simpleEstimates: true,
      goodBetterBest: false,
      optionalItems: false,
      bundledPackages: false,
      visualEstimates: false,
      photoAnnotations: false,
      brandedPdf: true,
      eSignature: true,
      customerApprovalPortal: false,
      expirationDates: true,
      autoConvertToJob: true,
      autoConvertToInvoice: false,
      estimateReminders: true,
      followUpSequences: false,
    },

    // INVENTORY
    inventory: {
      enabled: ${INVENTORY_ENABLED},
      warehouseInventory: ${INVENTORY_ENABLED},
      truckInventory: ${INVENTORY_ENABLED},
      serialNumberTracking: false,
      lotTracking: false,
      barcodeScanning: false,
      minStockAlerts: ${INVENTORY_ENABLED},
      autoReorder: false,
      purchaseOrders: false,
      vendorManagement: false,
      fifoCosting: false,
      averageCosting: true,
      inventoryValuation: false,
      truckToTruckTransfer: ${INVENTORY_ENABLED},
      warehouseTransfer: ${INVENTORY_ENABLED},
      transferApprovals: false,
    },

    // FLEET
    fleet: {
      enabled: ${FLEET_ENABLED},
      gpsTracking: ${FLEET_ENABLED},
      realTimeLocation: ${FLEET_ENABLED},
      geofencing: false,
      breadcrumbHistory: false,
      maintenanceSchedule: ${FLEET_ENABLED},
      maintenanceAlerts: ${FLEET_ENABLED},
      maintenanceHistory: ${FLEET_ENABLED},
      inspectionChecklists: false,
      fuelTracking: false,
      fuelCardIntegration: false,
      mpgReporting: false,
      speedAlerts: false,
      harshDrivingAlerts: false,
      driverScoring: false,
      vehicleDocuments: ${FLEET_ENABLED},
      registrationAlerts: ${FLEET_ENABLED},
      insuranceAlerts: ${FLEET_ENABLED},
    },

    // CUSTOMER PORTAL
    customerPortal: {
      enabled: ${CUSTOMER_PORTAL_ENABLED},
      portalLogin: ${CUSTOMER_PORTAL_ENABLED},
      ssoIntegration: false,
      onlineBooking: ${CUSTOMER_PORTAL_ENABLED},
      rescheduleAppointments: ${CUSTOMER_PORTAL_ENABLED},
      cancelAppointments: ${CUSTOMER_PORTAL_ENABLED},
      viewHistory: ${CUSTOMER_PORTAL_ENABLED},
      viewInvoices: ${CUSTOMER_PORTAL_ENABLED},
      makePayments: ${CUSTOMER_PORTAL_ENABLED},
      viewEstimates: ${CUSTOMER_PORTAL_ENABLED},
      approveEstimates: ${CUSTOMER_PORTAL_ENABLED},
      downloadDocuments: ${CUSTOMER_PORTAL_ENABLED},
      uploadDocuments: false,
      viewContracts: ${CUSTOMER_PORTAL_ENABLED},
      signContracts: ${CUSTOMER_PORTAL_ENABLED},
      messageTechnician: false,
      messageOffice: ${CUSTOMER_PORTAL_ENABLED},
      viewJobPhotos: ${CUSTOMER_PORTAL_ENABLED},
      realTimeTracking: ${CUSTOMER_PORTAL_ENABLED},
      customBranding: false,
      customDomain: false,
    },

    // COMMUNICATIONS
    communications: {
      enabled: true,
      sms: true,
      email: true,
      pushNotifications: true,
      inAppMessaging: true,
      voiceCalls: false,
      appointmentReminders: true,
      onMyWayAlerts: true,
      jobCompleteNotification: true,
      invoiceSent: true,
      paymentReceived: true,
      reviewRequest: true,
      customTemplates: false,
      dynamicFields: true,
      multiLanguage: false,
      deliveryTracking: true,
      openTracking: false,
      responseTracking: false,
    },

    // REPORTING
    reporting: {
      enabled: true,
      jobReports: true,
      revenueReports: true,
      technicianReports: true,
      customerReports: true,
      inventoryReports: ${INVENTORY_ENABLED},
      customReports: false,
      dashboards: true,
      kpiTracking: true,
      trendAnalysis: false,
      forecastingEnabled: false,
      pdfExport: true,
      excelExport: true,
      csvExport: true,
      scheduledReports: false,
      emailReports: false,
      industryBenchmarks: false,
      multiLocationComparison: ${MULTI_LOCATION_ENABLED},
    },

    // TIME TRACKING
    timeTracking: {
      enabled: true,
      mobileClockIn: true,
      gpsClockIn: true,
      geofenceClockIn: false,
      photoClockIn: false,
      manualTimeEntry: true,
      timeApprovals: true,
      overtimeCalculation: true,
      breakTracking: false,
      payrollExport: true,
      adpIntegration: false,
      gusto: false,
      customPayrollExport: false,
      laborCostTracking: true,
      jobTimeAllocation: true,
      profitabilityReports: false,
    },

    // BETTY AI
    betty: {
      enabled: ${BETTY_ENABLED},
      scheduling: ${BETTY_ENABLED},
      customerComms: ${BETTY_ENABLED},
      jobSuggestions: ${BETTY_ENABLED},
      inventoryAlerts: false,
      reportGeneration: false,
      maxConfidence: ${BETTY_MAX_CONFIDENCE},
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
    },

    // CRM
    crm: {
      enabled: true,
      customerProfiles: true,
      propertyProfiles: true,
      equipmentTracking: true,
      serviceHistory: true,
      multiPropertySupport: false,
      commercialAccounts: false,
      propertyManagers: false,
      communicationLog: true,
      callRecording: false,
      emailTracking: false,
      customerTags: true,
      customFields: true,
      customerSegments: false,
      marketingLists: false,
      reviewRequests: true,
      reviewMonitoring: false,
      reviewResponses: false,
    },

    // MEMBERSHIPS
    memberships: {
      enabled: false,
      multiplePlans: false,
      tieredPricing: false,
      familyPlans: false,
      commercialPlans: false,
      recurringBilling: false,
      annualBilling: false,
      monthlyBilling: false,
      prorating: false,
      autoPay: false,
      discountedService: false,
      priorityScheduling: false,
      freeVisits: false,
      partDiscounts: false,
      renewalReminders: false,
      autoRenewal: false,
      cancellationWorkflow: false,
      membershipReports: false,
    },

    // DOCUMENTS
    documents: {
      enabled: true,
      contracts: true,
      changeOrders: true,
      workOrders: true,
      permitDocuments: false,
      safetyDocuments: false,
      eSignature: true,
      multiPartySignature: true,
      signingOrder: true,
      witnessSignature: false,
      documentStorage: true,
      maxStorageGB: 10,
      documentVersioning: true,
      c2paEnabled: ${C2PA_ENABLED},
      auditRetention: '7years',
      gdprCompliance: false,
      documentTemplates: true,
      customTemplates: false,
      templateBuilder: false,
    },

    // MULTI-LOCATION
    multiLocation: {
      enabled: ${MULTI_LOCATION_ENABLED},
      locations: ${MULTI_LOCATION_ENABLED} ? 10 : 1,
      locationProfiles: ${MULTI_LOCATION_ENABLED},
      locationSpecificPricing: false,
      locationSpecificInventory: ${MULTI_LOCATION_ENABLED},
      locationSpecificStaff: ${MULTI_LOCATION_ENABLED},
      consolidatedReporting: ${MULTI_LOCATION_ENABLED},
      locationComparison: ${MULTI_LOCATION_ENABLED},
      crossLocationBooking: false,
    },
  },
};

export default companyConfig;
EOF

echo "✅ Config file created: $CONFIG_FILE"

# ============================================
# SEED DATABASE
# ============================================

echo ""
echo "📊 Seeding database..."

SEED_FILE="tmp-seed-${COMPANY_ID}.ts"

cat > "$SEED_FILE" << EOF
import { prisma, shutdownPrisma } from '@fsm/db';

const TARGET_COMPANY_ID = "${COMPANY_ID}";
const TARGET_COMPANY_NAME = "${COMPANY_NAME}";

function handleSeedError(error: any) {
  console.error('❌ Seeding Failed:', error);
  process.exit(1);
}

function handleSeedSuccess() {
  console.log('✅ Company seeded successfully:', TARGET_COMPANY_ID);
}

async function seed() {
  const company = await prisma.company.create({
    data: {
      id: TARGET_COMPANY_ID,
      name: TARGET_COMPANY_NAME,
    },
  });

  const configModule = await import("./config/company-configs/" + TARGET_COMPANY_ID);
  const companyConfig = configModule.companyConfig || configModule.default;

  await prisma.companyConfig.create({
    data: {
      companyId: company.id,
      version: 1,
      schema: companyConfig as any,
      isActive: true,
      createdBy: 'init-script',
    },
  });
}

// Clean named functions with NO arrow syntax or empty method dots
seed()
  .then(handleSeedSuccess)
  .catch(handleSeedError)
  .then(shutdownPrisma);
EOF

npx tsx "$SEED_FILE"
rm "$SEED_FILE"

# ============================================
# CREATE HIGH-PERFORMANCE FUNCTIONAL INDEXES
# ============================================

echo ""
echo "🔍 Creating Partial Database Indexes..."

# Safe string replacement for database index naming compliance
DB_PREFIX="idx_${COMPANY_ID//\-/_}"

docker exec -i fsm-postgres psql "postgresql://postgres:postgres@localhost:5432/fsm" << SQL
-- Highly optimized functional partial indexes using your exact camelCase columns

CREATE INDEX IF NOT EXISTS ${DB_PREFIX}_jobs_status
  ON jobs ((data->>'status'))
  WHERE "companyId" = '${COMPANY_ID}';

CREATE INDEX IF NOT EXISTS ${DB_PREFIX}_jobs_scheduled
  ON jobs ((data->>'scheduledDate'))
  WHERE "companyId" = '${COMPANY_ID}';

CREATE INDEX IF NOT EXISTS ${DB_PREFIX}_jobs_tech
  ON jobs ((data->>'technicianId'))
  WHERE "companyId" = '${COMPANY_ID}';

CREATE INDEX IF NOT EXISTS ${DB_PREFIX}_contracts_status
  ON contracts ((data->>'status'))
  WHERE "companyId" = '${COMPANY_ID}';

-- Chronological audit compliance lookup
CREATE INDEX IF NOT EXISTS idx_audit_${COMPANY_ID//\-/_}
  ON audit_logs ("companyId", "occurredAt" DESC)
  WHERE "companyId" = '${COMPANY_ID}';
SQL

echo "✅ Indexes verified and deployed."

# ============================================
# SUMMARY
# ============================================

# Note: Remove any stray 'sed -i ...' lines from down here so they don't throw errors!

echo ""
echo "🎉 Tenant Onboarding Pipeline Complete!"
echo "==================================="
echo "Company ID:  $COMPANY_ID"
echo "Config File: $CONFIG_FILE"
echo "Tier Level:  $TIER"
echo ""
echo "Next platform steps:"
echo "1. Verify configuration integrity: cat $CONFIG_FILE"
echo "2. Spin up monorepo applications: pnpm dev"

