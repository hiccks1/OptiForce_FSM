import { describe, it, expect } from 'vitest';
import {
  CustomerPortalZodSchema,
  PortalConditionSchema,
  PortalAccessSchema,
  PortalPageSchema,
  PortalActionSchema,
} from './customer-portal.schema';

function validPortal() {
  return {
    schemaVersion: '1.0' as const,
    access: {
      authMethods: ['magic-link' as const, 'password' as const],
      roles: {
        customer: { label: 'Customer', permissions: ['view', 'sign'] },
      },
    },
    navigation: {
      menu: [{ id: 'home', label: 'Home', pageRef: 'home' }],
    },
    pages: {
      home: {
        title: 'Welcome',
        layout: 'single-column' as const,
        sections: [{ id: 'intro', type: 'text' as const }],
      },
    },
    documents: {
      visibilityRules: [
        { documentType: 'contract' as const, showWhen: { field: 'status', operator: 'eq' as const, value: 'active' } },
      ],
    },
  };
}

describe('CustomerPortalZodSchema', () => {
  it('accepts a minimal valid portal config', () => {
    expect(CustomerPortalZodSchema.safeParse(validPortal()).success).toBe(true);
  });

  it('accepts optional metadata, actions, ui and audit blocks', () => {
    const portal = {
      ...validPortal(),
      metadata: { name: 'Portal', description: 'desc', tags: ['a', 'b'] },
      actions: { pay: { label: 'Pay', type: 'pay' as const } },
      ui: { theme: { primaryColor: '#fff' } },
      audit: { logViews: true, logDownloads: false },
    };
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(true);
  });

  it('rejects unknown top-level keys because the schema is strict', () => {
    const portal = { ...validPortal(), unexpected: true };
    const result = CustomerPortalZodSchema.safeParse(portal);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.code === 'unrecognized_keys')).toBe(true);
    }
  });

  it('rejects a schemaVersion other than "1.0"', () => {
    const portal = { ...validPortal(), schemaVersion: '2.0' as unknown as '1.0' };
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });

  it('rejects an invalid auth method', () => {
    const portal = validPortal();
    portal.access.authMethods = ['carrier-pigeon'] as never;
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });

  it('rejects an invalid page layout', () => {
    const portal = validPortal();
    portal.pages.home.layout = 'three-column' as never;
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });

  it('rejects an invalid section type', () => {
    const portal = validPortal();
    portal.pages.home.sections[0]!.type = 'carousel' as never;
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });

  it('rejects a document rule with an unknown document type', () => {
    const portal = validPortal();
    portal.documents.visibilityRules[0]!.documentType = 'estimate' as never;
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });

  it('requires the access block', () => {
    const portal = validPortal();
    // @ts-expect-error intentional deletion for validation test
    delete portal.access;
    expect(CustomerPortalZodSchema.safeParse(portal).success).toBe(false);
  });
});

describe('PortalConditionSchema', () => {
  it.each(['eq', 'neq', 'gt', 'lt', 'exists'])('accepts the "%s" operator', (operator) => {
    expect(PortalConditionSchema.safeParse({ field: 'x', operator }).success).toBe(true);
  });

  it('rejects an unsupported operator', () => {
    expect(PortalConditionSchema.safeParse({ field: 'x', operator: 'contains' }).success).toBe(false);
  });

  it('requires the field property', () => {
    expect(PortalConditionSchema.safeParse({ operator: 'eq' }).success).toBe(false);
  });
});

describe('PortalAccessSchema', () => {
  it('accepts allowUnauthenticated when provided', () => {
    const result = PortalAccessSchema.safeParse({
      allowUnauthenticated: true,
      authMethods: ['sso'],
      roles: {},
    });
    expect(result.success).toBe(true);
  });

  it('rejects a role missing its permissions array', () => {
    const result = PortalAccessSchema.safeParse({
      authMethods: ['password'],
      roles: { admin: { label: 'Admin' } },
    });
    expect(result.success).toBe(false);
  });
});

describe('PortalActionSchema', () => {
  it.each(['sign', 'approve', 'download', 'upload', 'pay'])('accepts the "%s" action type', (type) => {
    expect(PortalActionSchema.safeParse({ label: 'Do it', type }).success).toBe(true);
  });

  it('rejects an unknown action type', () => {
    expect(PortalActionSchema.safeParse({ label: 'Do it', type: 'delete' }).success).toBe(false);
  });
});

describe('PortalPageSchema', () => {
  it('defaults optional fields and validates nested sections', () => {
    const result = PortalPageSchema.safeParse({
      title: 'Docs',
      layout: 'two-column',
      sections: [{ id: 's1', type: 'document-viewer', source: 'docs', config: { limit: 5 } }],
    });
    expect(result.success).toBe(true);
  });
});
