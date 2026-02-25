// ============================================
// DRIFTY PLATFORM LAWS — CANONICAL
// Version: 1.0.0
// Scope: Entire Monorepo
// ============================================

export const DRIFTY_VERSION = "1.0.0";

/**
 * These laws are:
 * - Machine-readable
 * - Layer-aware
 * - Non-negotiable
 *
 * Any file claiming "production-ready" MUST:
 * - Declare which DRIFTY layers it participates in
 * - Pass all applicable laws for those layers
 * - Fail fast if non-compliant
 */

// ============================================================
// LAYER ENUMERATION
// ============================================================

export enum DriftyLayer {
  L0_REPO = "L0_REPO",
  L1_DATA = "L1_DATA",
  L2_DOMAIN = "L2_DOMAIN",
  L3_INTEGRATION = "L3_INTEGRATION",
  L4_INFRA = "L4_INFRA",
  L5_AI = "L5_AI",
}

// ============================================================
// FILE DECLARATION CONTRACT
// ============================================================

export interface DriftyFileContract {
  driftyVersion: string;
  layers: DriftyLayer[];
  ownsData?: boolean;
  mutatesData?: boolean;
  usesAI?: boolean;
  exposesHooks?: boolean;
}

// Every production file MUST export this symbol
export const DRIFTY_FILE_DECLARATION_SYMBOL = "DRIFTY_FILE_CONTRACT";

// ============================================================
// L0 — REPO & MONOREPO LAWS
// ============================================================

export const L0_REPO_LAWS = {
  monorepo: {
    tool: "turbo",
    noCircularDependencies: true,
    dependencyDirection: {
      apps: ["packages/*"],
      packages: ["packages/core", "packages/schemas"],
    },
  },

  fileStructure: {
    onePrimaryResponsibility: true,
    noCrossLayerImports: true,
    noHiddenSideEffects: true,
  },

  forbidden: [
    "direct fs writes outside storage package",
    "process.env access outside config layer",
    "implicit globals",
  ],
};

// ============================================================
// L1 — DATA & PERSISTENCE LAWS
// ============================================================

export const L1_DATA_LAWS = {
  prisma: {
    jsonbIsSourceOfTruth: true,
    noDomainNormalization: true,
    softDeletesRequired: true,
    destructiveMigrationsForbidden: true,
  },

  jsonb: {
    immutableUpdatesOnly: true,
    fullObjectReplaceForbidden: true,
    schemaVersionRequired: true,
  },

  hotPaths: {
    mustBeDeclared: true,
    derivedOnly: true,
    neverAuthoritative: true,
  },

  contracts: {
    legalBoundaryEnforced: true,
    immutableAfterExecution: true,
    retentionPolicyRequired: true,
    multiPartySupportRequired: true,
  },
};

// ============================================================
// L2 — DOMAIN MUTATION LAWS
// ============================================================

export const L2_DOMAIN_LAWS = {
  mutations: {
    mustBeExplicit: true,
    mustBeAudited: true,
    mustBeVersioned: true,
    noSilentMerge: true,
  },

  actor: {
    required: true,
    types: ["HUMAN", "SYSTEM", "AI"],
    mustIncludeReason: true,
  },

  hooks: {
    required: true,
    versioned: true,
    beforeAfterRequired: true,
    mustBeNoOpSafe: true,
  },

  invariants: {
    enforcedOnCreate: true,
    enforcedOnUpdate: true,
    configDriven: true,
  },
};

// ============================================================
// L3 — INTEGRATION & IMPORT LAWS
// ============================================================

export const L3_INTEGRATION_LAWS = {
  imports: {
    rawSourcePreserved: true,
    normalizedPatchOnly: true,
    reversibleMappingRequired: true,
  },

  externalSystems: {
    neverTrusted: true,
    neverWriteDirectlyToDomain: true,
    mustTagSourceSystem: true,
  },

  migrations: {
    idempotent: true,
    resumable: true,
    observable: true,
  },
};

// ============================================================
// L4 — INFRA & PERFORMANCE LAWS
// ============================================================

export const L4_INFRA_LAWS = {
  redis: {
    cacheOnly: true,
    ttlRequired: true,
    neverAuthoritative: true,
  },

  minio: {
    blobOnly: true,
    metadataInDb: true,
    noBusinessLogic: true,
  },

  queues: {
    idempotentHandlers: true,
    retrySafe: true,
    deadLetterRequired: true,
  },

  performance: {
    hotPathsJustified: true,
    nPlusOneForbidden: true,
  },
};

// ============================================================
// L5 — AI & AUTOMATION LAWS
// ============================================================

export const L5_AI_LAWS = {
  aiActions: {
    logged: true,
    reasonRequired: true,
    reversible: true,
  },

  mutations: {
    aiCannotMutateDirectly: true,
    patchOnly: true,
    humanOverrideAllowed: true,
  },

  safety: {
    scopeLimited: true,
    configDriven: true,
  },
};

// ============================================================
// LAW REGISTRY (FOR VALIDATORS / LLMS)
// ============================================================

export const DRIFTY_LAW_REGISTRY = {
  version: DRIFTY_VERSION,
  layers: {
    L0_REPO_LAWS,
    L1_DATA_LAWS,
    L2_DOMAIN_LAWS,
    L3_INTEGRATION_LAWS,
    L4_INFRA_LAWS,
    L5_AI_LAWS,
  },
};

// ============================================================
// NON-NEGOTIABLE ASSERTION
// ============================================================

export function assertDriftyCompatibility(
  file: DriftyFileContract
): void {
  if (file.driftyVersion !== DRIFTY_VERSION) {
    throw new Error(
      `Drifty version mismatch. Expected ${DRIFTY_VERSION}, got ${file.driftyVersion}`
    );
  }

  if (!file.layers || file.layers.length === 0) {
    throw new Error("Drifty file must declare at least one layer");
  }
}
