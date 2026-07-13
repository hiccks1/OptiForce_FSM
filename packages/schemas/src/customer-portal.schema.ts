import { z } from 'zod';

// =====================================================
// CONDITIONS (SHARED)
// =====================================================
export const PortalConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(['eq', 'neq', 'gt', 'lt', 'exists']),
  value: z.any().optional(),
});

// =====================================================
// ACCESS & AUTH
// =====================================================
export const PortalRoleSchema = z.object({
  label: z.string(),
  permissions: z.array(z.string()),
});

export const PortalAccessSchema = z.object({
  allowUnauthenticated: z.boolean().optional(),
  authMethods: z.array(z.enum(['magic-link', 'password', 'sso'])),
  roles: z.record(z.string(), PortalRoleSchema),
});

// =====================================================
// NAVIGATION
// =====================================================
export const PortalNavItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  pageRef: z.string(),
  rolesAllowed: z.array(z.string()).optional(),
});

export const PortalNavigationSchema = z.object({
  menu: z.array(PortalNavItemSchema),
});

// =====================================================
// PAGES
// =====================================================
export const PortalSectionSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'data-view', 'form', 'document-viewer', 'action-panel']),
  source: z.string().optional(),
  config: z.record(z.string(), z.any()).optional(),
});

export const PortalPageSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  rolesAllowed: z.array(z.string()).optional(),
  layout: z.enum(['single-column', 'two-column', 'wizard']),
  sections: z.array(PortalSectionSchema),
});

export const PortalPagesSchema = z.record(z.string(), PortalPageSchema);

// =====================================================
// DOCUMENT VISIBILITY
// =====================================================
export const PortalDocumentRuleSchema = z.object({
  documentType: z.enum(['contract', 'change-order', 'invoice', 'receipt']),
  showWhen: PortalConditionSchema.optional(),
});

export const PortalDocumentsSchema = z.object({
  visibilityRules: z.array(PortalDocumentRuleSchema),
});

// =====================================================
// ACTIONS
// =====================================================
export const PortalActionSchema = z.object({
  label: z.string(),
  type: z.enum(['sign', 'approve', 'download', 'upload', 'pay']),
  target: z.string().optional(),
  conditions: PortalConditionSchema.optional(),
});

export const PortalActionsSchema = z.record(z.string(), PortalActionSchema);

// =====================================================
// UI & THEME
// =====================================================
export const PortalUISchema = z.object({
  theme: z.object({
    logoUrl: z.string().optional(),
    primaryColor: z.string().optional(),
  }).optional(),
});

// =====================================================
// AUDIT & SAFETY
// =====================================================
export const PortalAuditSchema = z.object({
  logViews: z.boolean().optional(),
  logDownloads: z.boolean().optional(),
  logSignatures: z.boolean().optional(),
});

// =====================================================
// MAIN CANONICAL PORTAL SCHEMA DEFINITION
// =====================================================
export const CustomerPortalZodSchema = z.object({
  schemaVersion: z.literal('1.0'),
  metadata: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  access: PortalAccessSchema,
  navigation: PortalNavigationSchema,
  pages: PortalPagesSchema,
  documents: PortalDocumentsSchema,
  actions: PortalActionsSchema.optional(),
  ui: PortalUISchema.optional(),
  audit: PortalAuditSchema.optional(),
}).strict(); // Enforces no unknown fields can be snuck into configuration

// =====================================================
// AUTOMATIC TYPE INFERENCE
// =====================================================
// This infers a clean TypeScript type from the Zod Schema, guaranteeing alignment.
export type CustomerPortalConfigPayload = z.infer<typeof CustomerPortalZodSchema>;
