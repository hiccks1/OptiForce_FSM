// packages/schemas/src/company.schema.ts
import { z } from 'zod';

const Industry = z.enum(['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'General', 'Other']);
const Currency = z.enum(['USD', 'CAD', 'EUR', 'GBP']);

const FieldType = z.enum([
  'text',
  'number',
  'currency',
  'boolean',
  'date',
  'datetime',
  'select',
  'multiselect',
  'signature',
  'initial',
  'computed',
]);

const FieldTypeDefinition = z.object({
  type: FieldType,
  options: z.array(z.string()).optional(),
  computedFrom: z.array(z.string()).optional(),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      regex: z.string().optional(),
    })
    .optional(),
});

const FieldDefinition = z.object({
  label: z.string(),
  description: z.string().optional(),
  type: FieldType,
  required: z.boolean().optional(),
  mutable: z.enum(['draft', 'never']),
  visibleTo: z.array(z.enum(['customer', 'tech', 'sales', 'admin'])),
  requiresInitial: z.boolean().optional(),
  requiresSignature: z.boolean().optional(),
  defaultValue: z.unknown().optional(),
});

const DocumentDefinitions = z.object({
  fieldTypes: z.record(FieldTypeDefinition),
  commonFields: z.record(FieldDefinition),
});

const ContractTemplate = z.object({
  name: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fields: z.record(FieldDefinition),
  legal: z.enum(['full', 'state-required', 'company-standard']),
  signingOrder: z.array(z.enum(['customer', 'company'])),
  materialization: z.object({
    createsDocument: z.literal(true),
    immutable: z.literal(true),
  }),
});

const ChangeOrderTemplate = z.object({
  name: z.string(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  fields: z.record(FieldDefinition),
  references: z.enum(['original-contract', 'previous-change-order']),
  legal: z.literal('delta-only'),
  materialization: z.object({
    createsDocument: z.literal(true),
    immutable: z.literal(true),
  }),
});

const CompanySchema = z.object({
  schemaVersion: z.literal('1.0'),
  documents: DocumentDefinitions,
  contracts: z.object({
    templates: z.record(ContractTemplate),
  }),
  changeOrders: z.object({
    templates: z.record(ChangeOrderTemplate),
  }),
});

const HotColumnsConfig = z.object({
  strategy: z.enum(['kpi', 'automation', 'balanced', 'custom']),
  indexes: z.array(
    z.object({
      table: z.string(),
      jsonPath: z.string(),
      dataType: z.enum(['string', 'number', 'date', 'boolean']),
      indexName: z.string().optional(),
    })
  ),
});

const C2PAConfig = z.object({
  enabled: z.boolean(),
  signAllDocuments: z.boolean(),
  signPhotos: z.boolean(),
  auditRetention: z.enum(['1year', '3years', '7years', '10years', 'forever']),
  hashAlgorithm: z.enum(['sha256', 'sha384', 'sha512']),
});

const BrandingConfig = z.object({
  logoUrl: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  fontFamily: z.string().optional(),
  customCss: z.string().optional(),
});

const IntegrationsConfig = z.object({
  quickbooks: z
    .object({
      enabled: z.boolean(),
      syncInvoices: z.boolean(),
      syncPayments: z.boolean(),
      syncCustomers: z.boolean(),
    })
    .optional(),
  xero: z
    .object({
      enabled: z.boolean(),
      syncInvoices: z.boolean(),
      syncPayments: z.boolean(),
    })
    .optional(),
  stripe: z
    .object({
      enabled: z.boolean(),
      accountId: z.string().optional(),
    })
    .optional(),
  square: z
    .object({
      enabled: z.boolean(),
      locationId: z.string().optional(),
    })
    .optional(),
  twilio: z
    .object({
      enabled: z.boolean(),
      phoneNumber: z.string().optional(),
    })
    .optional(),
  sendgrid: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  samsara: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  verizonConnect: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  googleAds: z
    .object({
      enabled: z.boolean(),
      conversionTracking: z.boolean(),
    })
    .optional(),
  salesforce: z
    .object({
      enabled: z.boolean(),
      syncCustomers: z.boolean(),
    })
    .optional(),
});

const CompanyMetadata = z.object({
  companyId: z.string(),
  name: z.string(),
  industry: Industry,
  timezone: z.string(),
  currency: Currency,
  locale: z.string(),
  createdAt: z.string(),
});

export const CompanyConfigPayloadSchema = z.object({
  configVersion: z.literal('1.0'),
  metadata: CompanyMetadata,
  schema: CompanySchema,
  hotColumns: HotColumnsConfig,
  c2pa: C2PAConfig,
  branding: BrandingConfig,
  integrations: IntegrationsConfig,
  features: z.record(z.unknown()), // keep flexible for now; feature modules can be tightened later
});

export type CompanyConfigPayloadZod = z.infer<typeof CompanyConfigPayloadSchema>;


