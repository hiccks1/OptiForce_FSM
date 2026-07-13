// ============================================
// Company Config: Dev
// Generated: 2026-07-11T15:35:42Z
// ID: 4aaebcd6-a3b9-4c8c-9944-6d8b27e6b44a
// ============================================

import type { CompanyConfigPayload } from '@fsm/core/config';

export const companyConfig: CompanyConfigPayload = {
  configVersion: '1.0',

  // ============================================
  // METADATA
  // ============================================
  metadata: {
    companyId: '4aaebcd6-a3b9-4c8c-9944-6d8b27e6b44a',
    name: 'Dev',
    industry: 'HVAC',
    timezone: 'Los_Angeles',
    currency: 'USD',
    locale: 'en-US',
    createdAt: '2026-07-11T15:35:42Z',
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
    enabled: false,
    signAllDocuments: false,
    signPhotos: false,
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
      routeOptimization: false,
      aiDispatch: false,
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
      enabled: false,
      warehouseInventory: false,
      truckInventory: false,
      serialNumberTracking: false,
      lotTracking: false,
      barcodeScanning: false,
      minStockAlerts: false,
      autoReorder: false,
      purchaseOrders: false,
      vendorManagement: false,
      fifoCosting: false,
      averageCosting: true,
      inventoryValuation: false,
      truckToTruckTransfer: false,
      warehouseTransfer: false,
      transferApprovals: false,
    },

    // FLEET
    fleet: {
      enabled: false,
      gpsTracking: false,
      realTimeLocation: false,
      geofencing: false,
      breadcrumbHistory: false,
      maintenanceSchedule: false,
      maintenanceAlerts: false,
      maintenanceHistory: false,
      inspectionChecklists: false,
      fuelTracking: false,
      fuelCardIntegration: false,
      mpgReporting: false,
      speedAlerts: false,
      harshDrivingAlerts: false,
      driverScoring: false,
      vehicleDocuments: false,
      registrationAlerts: false,
      insuranceAlerts: false,
    },

    // CUSTOMER PORTAL
    customerPortal: {
      enabled: false,
      portalLogin: false,
      ssoIntegration: false,
      onlineBooking: false,
      rescheduleAppointments: false,
      cancelAppointments: false,
      viewHistory: false,
      viewInvoices: false,
      makePayments: false,
      viewEstimates: false,
      approveEstimates: false,
      downloadDocuments: false,
      uploadDocuments: false,
      viewContracts: false,
      signContracts: false,
      messageTechnician: false,
      messageOffice: false,
      viewJobPhotos: false,
      realTimeTracking: false,
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
      inventoryReports: false,
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
      multiLocationComparison: false,
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
      c2paEnabled: false,
      auditRetention: '7years',
      gdprCompliance: false,
      documentTemplates: true,
      customTemplates: false,
      templateBuilder: false,
    },

    // MULTI-LOCATION
    multiLocation: {
      enabled: false,
      locations: false ? 10 : 1,
      locationProfiles: false,
      locationSpecificPricing: false,
      locationSpecificInventory: false,
      locationSpecificStaff: false,
      consolidatedReporting: false,
      locationComparison: false,
      crossLocationBooking: false,
    },
  },
};

export default companyConfig;
