import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/domain/compliance/ChainOfCustody.ts
// Hash Chain & Integrity Verification
// ============================================
// LAYER: Domain
// PURPOSE: Pure logic for chain integrity
// NOTE: Actual crypto (SHA256) is done in service layer
// ============================================

// ============================================
// CHAIN LINK
// ============================================

export interface ChainLink {
  readonly id: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly companyId: string;
  readonly occurredAt: string;
  readonly prevHash: string | null;
  readonly recordHash: string;
  readonly hashAlgorithm: 'sha256' | 'sha384' | 'sha512';
}

// ============================================
// CHAIN VERIFICATION RESULT
// ============================================

export interface ChainVerificationResult {
  readonly valid: boolean;
  readonly chainLength: number;
  readonly firstLink: string;
  readonly lastLink: string;
  readonly brokenAt?: string;       // ID of broken link
  readonly brokenReason?: string;
  readonly verifiedAt: string;
}

// ============================================
// VERIFY CHAIN CONTINUITY
// ============================================

/**
 * Verifies that a chain of records is unbroken.
 * Each record's prevHash must match the previous record's recordHash.
 * 
 * @param links - Chain links in chronological order (oldest first)
 */
export function verifyChainContinuity(
  links: readonly ChainLink[]
): ChainVerificationResult {
  const now = new Date().toISOString();

  if (links.length === 0) {
    return {
      valid: true,
      chainLength: 0,
      firstLink: '',
      lastLink: '',
      verifiedAt: now,
    };
  }

  // First link should have null prevHash
  const first = links[0];
  if (first.prevHash !== null) {
    return {
      valid: false,
      chainLength: links.length,
      firstLink: first.id,
      lastLink: links[links.length - 1].id,
      brokenAt: first.id,
      brokenReason: 'First link has non-null prevHash',
      verifiedAt: now,
    };
  }

  // Each subsequent link's prevHash must match previous recordHash
  for (let i = 1; i < links.length; i++) {
    const prev = links[i - 1];
    const curr = links[i];

    if (curr.prevHash !== prev.recordHash) {
      return {
        valid: false,
        chainLength: links.length,
        firstLink: first.id,
        lastLink: links[links.length - 1].id,
        brokenAt: curr.id,
        brokenReason: `prevHash mismatch: expected ${prev.recordHash}, got ${curr.prevHash}`,
        verifiedAt: now,
      };
    }
  }

  return {
    valid: true,
    chainLength: links.length,
    firstLink: first.id,
    lastLink: links[links.length - 1].id,
    verifiedAt: now,
  };
}

// ============================================
// HASH INPUT BUILDER
// ============================================

export interface HashInputs {
  readonly entityType: string;
  readonly entityId: string;
  readonly companyId: string;
  readonly occurredAt: string;
  readonly prevHash: string | null;
  readonly payload: unknown;
}

/**
 * Builds the canonical input for hashing.
 * This ensures consistent ordering and formatting.
 */
export function buildHashInput(inputs: HashInputs): string {
  const ordered = {
    entityType: inputs.entityType,
    entityId: inputs.entityId,
    companyId: inputs.companyId,
    occurredAt: inputs.occurredAt,
    prevHash: inputs.prevHash,
    payload: inputs.payload,
  };

  return JSON.stringify(ordered, null, 0);
}

// ============================================
// AUDIT ENTRY FOR CHAIN
// ============================================

export interface AuditChainEntry {
  readonly id: string;
  readonly companyId: string;
  readonly entityType: string;
  readonly entityId: string;
  readonly operation: string;
  readonly actorId: string | null;
  readonly actorType: 'HUMAN' | 'AI' | 'SYSTEM';
  readonly occurredAt: string;
  readonly prevRecordHash: string | null;
  readonly recordHash: string;
  readonly payload: unknown;
}

/**
 * Validates that an audit entry can be added to the chain.
 */
export function validateAuditChainEntry(
  entry: Omit<AuditChainEntry, 'recordHash'>,
  lastHash: string | null
): { valid: boolean; error?: string } {
  // First entry in chain
  if (lastHash === null && entry.prevRecordHash !== null) {
    return {
      valid: false,
      error: 'First entry must have null prevRecordHash',
    };
  }

  // Subsequent entries
  if (lastHash !== null && entry.prevRecordHash !== lastHash) {
    return {
      valid: false,
      error: `prevRecordHash mismatch: expected ${lastHash}, got ${entry.prevRecordHash}`,
    };
  }

  // Required fields
  if (!entry.companyId) {
    return { valid: false, error: 'companyId is required' };
  }
  if (!entry.entityType) {
    return { valid: false, error: 'entityType is required' };
  }
  if (!entry.entityId) {
    return { valid: false, error: 'entityId is required' };
  }
  if (!entry.occurredAt) {
    return { valid: false, error: 'occurredAt is required' };
  }

  return { valid: true };
}

// ============================================
// INTEGRITY PROOF
// ============================================

export interface IntegrityProof {
  readonly entityType: string;
  readonly entityId: string;
  readonly companyId: string;
  readonly chainLength: number;
  readonly firstRecordAt: string;
  readonly lastRecordAt: string;
  readonly currentHash: string;
  readonly chainValid: boolean;
  readonly proofGeneratedAt: string;
  readonly proofHash: string;  // Hash of this proof document
}

/**
 * Builds an integrity proof for export/legal purposes.
 * The proof itself gets hashed so it can be verified later.
 */
export function buildIntegrityProof(
  entityType: string,
  entityId: string,
  companyId: string,
  chain: readonly ChainLink[]
): Omit<IntegrityProof, 'proofHash'> {
  const verification = verifyChainContinuity(chain);
  const now = new Date().toISOString();

  return {
    entityType,
    entityId,
    companyId,
    chainLength: chain.length,
    firstRecordAt: chain.length > 0 ? chain[0].occurredAt : now,
    lastRecordAt: chain.length > 0 ? chain[chain.length - 1].occurredAt : now,
    currentHash: chain.length > 0 ? chain[chain.length - 1].recordHash : '',
    chainValid: verification.valid,
    proofGeneratedAt: now,
  };
}

// ============================================
// TAMPER DETECTION
// ============================================

export interface TamperCheckResult {
  readonly tampered: boolean;
  readonly tamperedRecords: readonly string[];
  readonly checkedAt: string;
}

/**
 * Checks if any records have been tampered with.
 * Requires the service layer to recompute hashes and compare.
 * This just structures the comparison.
 */
export function checkForTampering(
  records: readonly { id: string; storedHash: string; computedHash: string }[]
): TamperCheckResult {
  const tamperedRecords: string[] = [];

  for (const record of records) {
    if (record.storedHash !== record.computedHash) {
      tamperedRecords.push(record.id);
    }
  }

  return {
    tampered: tamperedRecords.length > 0,
    tamperedRecords,
    checkedAt: new Date().toISOString(),
  };
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
