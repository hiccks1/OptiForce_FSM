import { describe, it, expect } from 'vitest';
import { CompanyConfigPayloadSchema } from './company.schema';

/**
 * Builds a minimal, valid CompanyConfig payload. Tests clone and mutate this
 * to exercise individual validation rules in isolation.
 */
function validPayload() {
  return {
    configVersion: '1.0' as const,
    metadata: {
      companyId: 'company-123',
      name: 'Acme Field Services',
      industry: 'HVAC' as const,
      timezone: 'America/New_York',
      currency: 'USD' as const,
      locale: 'en-US',
      createdAt: '2024-01-01T00:00:00.000Z',
    },
    schema: {
      schemaVersion: '1.0' as const,
      documents: {
        fieldTypes: {
          money: { type: 'currency' as const, validation: { min: 0 } },
        },
        commonFields: {
          customerName: {
            label: 'Customer Name',
            type: 'text' as const,
            mutable: 'draft' as const,
            visibleTo: ['tech', 'admin'] as const,
          },
        },
      },
      contracts: {
        templates: {
          standard: {
            name: 'Standard Contract',
            fields: {},
            legal: 'full' as const,
            signingOrder: ['customer', 'company'] as const,
            materialization: { createsDocument: true as const, immutable: true as const },
          },
        },
      },
      changeOrders: {
        templates: {
          upgrade: {
            name: 'Upgrade Change Order',
            fields: {},
            references: 'original-contract' as const,
            legal: 'delta-only' as const,
            materialization: { createsDocument: true as const, immutable: true as const },
          },
        },
      },
    },
    hotColumns: {
      strategy: 'kpi' as const,
      indexes: [
        { table: 'jobs', jsonPath: 'data.status', dataType: 'string' as const },
      ],
    },
    c2pa: {
      enabled: true,
      signAllDocuments: true,
      signPhotos: false,
      auditRetention: '7years' as const,
      hashAlgorithm: 'sha256' as const,
    },
    branding: {
      primaryColor: '#111111',
      secondaryColor: '#222222',
      accentColor: '#333333',
    },
    integrations: {
      quickbooks: { enabled: true, syncInvoices: true, syncPayments: false, syncCustomers: true },
    },
    features: { customerPortal: true },
  };
}

describe('CompanyConfigPayloadSchema', () => {
  it('accepts a fully-populated valid payload', () => {
    const result = CompanyConfigPayloadSchema.safeParse(validPayload());
    expect(result.success).toBe(true);
  });

  it('accepts empty optional integrations object', () => {
    const payload = validPayload();
    payload.integrations = {} as typeof payload.integrations;
    expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(true);
  });

  describe('configVersion', () => {
    it('rejects a version other than the "1.0" literal', () => {
      const payload = { ...validPayload(), configVersion: '2.0' as unknown as '1.0' };
      const result = CompanyConfigPayloadSchema.safeParse(payload);
      expect(result.success).toBe(false);
    });
  });

  describe('metadata', () => {
    it('rejects an unknown industry', () => {
      const payload = validPayload();
      payload.metadata.industry = 'Landscaping' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects an unsupported currency', () => {
      const payload = validPayload();
      payload.metadata.currency = 'JPY' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects when a required metadata field is missing', () => {
      const payload = validPayload();
      // @ts-expect-error intentional deletion for validation test
      delete payload.metadata.timezone;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('accepts every allowed industry value', () => {
      for (const industry of ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'General', 'Other']) {
        const payload = validPayload();
        payload.metadata.industry = industry as never;
        expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(true);
      }
    });
  });

  describe('field definitions', () => {
    it('rejects a field with an invalid field type', () => {
      const payload = validPayload();
      payload.schema.documents.commonFields.customerName.type = 'email' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects a field with an invalid "mutable" flag', () => {
      const payload = validPayload();
      payload.schema.documents.commonFields.customerName.mutable = 'always' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects a field with an unknown visibleTo role', () => {
      const payload = validPayload();
      payload.schema.documents.commonFields.customerName.visibleTo = ['manager'] as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });

  describe('contracts / change orders', () => {
    it('rejects a contract whose materialization is not immutable', () => {
      const payload = validPayload();
      payload.schema.contracts.templates.standard.materialization.immutable = false as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects a change order with a non "delta-only" legal value', () => {
      const payload = validPayload();
      payload.schema.changeOrders.templates.upgrade.legal = 'full' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });

  describe('hotColumns', () => {
    it('rejects an unknown strategy', () => {
      const payload = validPayload();
      payload.hotColumns.strategy = 'aggressive' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects an index with an unsupported dataType', () => {
      const payload = validPayload();
      payload.hotColumns.indexes[0]!.dataType = 'json' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });

  describe('c2pa', () => {
    it('rejects an unsupported hash algorithm', () => {
      const payload = validPayload();
      payload.c2pa.hashAlgorithm = 'md5' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });

    it('rejects an unsupported audit retention window', () => {
      const payload = validPayload();
      payload.c2pa.auditRetention = '2years' as never;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });

  describe('branding', () => {
    it('rejects when a required color is missing', () => {
      const payload = validPayload();
      // @ts-expect-error intentional deletion for validation test
      delete payload.branding.accentColor;
      expect(CompanyConfigPayloadSchema.safeParse(payload).success).toBe(false);
    });
  });
});
