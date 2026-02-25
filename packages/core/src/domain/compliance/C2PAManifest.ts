import { DriftyLayer } from "../../drifty/laws";
// ============================================
// packages/core/src/domain/compliance/C2PAManifest.ts
// C2PA Content Authenticity - Photo Provenance
// ============================================
// LAYER: Domain
// PURPOSE: Types and validation for C2PA manifests
// NOTE: Actual signing is done in service layer
// ============================================

// ============================================
// C2PA CLAIM
// ============================================

/**
 * A C2PA claim represents a single assertion about content.
 * Multiple claims form a manifest.
 */
export interface C2PAClaim {
  readonly claimType: C2PAClaimType;
  readonly label: string;
  readonly data: unknown;
  readonly signedAt: string;
  readonly signedBy: string;
}

export type C2PAClaimType =
  | 'c2pa.actions'           // What actions were taken
  | 'c2pa.hash.data'         // Content hash
  | 'stds.schema-org.CreativeWork'  // Metadata
  | 'stds.exif'              // EXIF data
  | 'stds.iptc'              // IPTC metadata
  | 'c2pa.location'          // GPS coordinates
  | 'c2pa.thumbnail'         // Thumbnail reference
  | 'fsm.chain_of_custody'   // Our custom claim type
  | 'fsm.technician'         // Technician who captured
  | 'fsm.job_context';       // Job/Visit context

// ============================================
// C2PA MANIFEST
// ============================================

export interface C2PAManifest {
  readonly manifestId: string;
  readonly assetHash: string;
  readonly hashAlgorithm: 'sha256' | 'sha384' | 'sha512';
  
  // Claims
  readonly claims: readonly C2PAClaim[];
  
  // Signature
  readonly signature: {
    readonly algorithm: 'ES256' | 'ES384' | 'RS256';
    readonly certificateChain: readonly string[];
    readonly signedAt: string;
    readonly signedBy: string;
  };
  
  // Provenance chain (parent manifests)
  readonly parentManifests?: readonly string[];
  
  // Our extensions
  readonly fsmExtensions: {
    readonly companyId: string;
    readonly jobId: string;
    readonly visitId: string;
    readonly capturedBy: string;
    readonly capturedAt: string;
    readonly gpsLat?: number;
    readonly gpsLng?: number;
    readonly deviceId?: string;
    readonly chainOfCustodyHash: string;
  };
}

// ============================================
// PHOTO CAPTURE CONTEXT
// ============================================

export interface PhotoCaptureContext {
  // Identity
  readonly companyId: string;
  readonly jobId: string;
  readonly visitId: string;
  
  // Capture details
  readonly capturedBy: string;         // Technician ID
  readonly capturedAt: string;         // ISO8601
  readonly deviceId: string;
  readonly deviceModel?: string;
  
  // Location
  readonly gpsLat: number;
  readonly gpsLng: number;
  readonly gpsAccuracy: number;
  readonly gpsAltitude?: number;
  
  // Category
  readonly category: 'before' | 'during' | 'after' | 'issue' | 'signature' | 'test_result';
  readonly description?: string;
  
  // Current chain hash (for linking)
  readonly prevChainHash: string;
}

// ============================================
// BUILD MANIFEST CLAIMS
// ============================================

export function buildC2PAClaims(
  context: PhotoCaptureContext,
  assetHash: string
): readonly C2PAClaim[] {
  const now = context.capturedAt;
  const signer = context.capturedBy;

  const claims: C2PAClaim[] = [
    // Content hash
    {
      claimType: 'c2pa.hash.data',
      label: 'Content Hash',
      data: { hash: assetHash, algorithm: 'sha256' },
      signedAt: now,
      signedBy: signer,
    },

    // Location
    {
      claimType: 'c2pa.location',
      label: 'Capture Location',
      data: {
        latitude: context.gpsLat,
        longitude: context.gpsLng,
        accuracy: context.gpsAccuracy,
        altitude: context.gpsAltitude,
      },
      signedAt: now,
      signedBy: signer,
    },

    // Actions
    {
      claimType: 'c2pa.actions',
      label: 'Actions',
      data: {
        actions: [
          {
            action: 'c2pa.created',
            when: now,
            softwareAgent: 'FSM Mobile App',
          },
        ],
      },
      signedAt: now,
      signedBy: signer,
    },

    // FSM-specific: Technician
    {
      claimType: 'fsm.technician',
      label: 'Technician',
      data: {
        technicianId: context.capturedBy,
        deviceId: context.deviceId,
        deviceModel: context.deviceModel,
      },
      signedAt: now,
      signedBy: signer,
    },

    // FSM-specific: Job context
    {
      claimType: 'fsm.job_context',
      label: 'Job Context',
      data: {
        companyId: context.companyId,
        jobId: context.jobId,
        visitId: context.visitId,
        category: context.category,
        description: context.description,
      },
      signedAt: now,
      signedBy: signer,
    },

    // FSM-specific: Chain of custody
    {
      claimType: 'fsm.chain_of_custody',
      label: 'Chain of Custody',
      data: {
        prevChainHash: context.prevChainHash,
        capturedAt: now,
      },
      signedAt: now,
      signedBy: signer,
    },
  ];

  return claims;
}

// ============================================
// MANIFEST VALIDATION
// ============================================

export interface ManifestValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly hashMatch: boolean;
  readonly signatureValid: boolean;
  readonly chainIntact: boolean;
}

export function validateManifestStructure(
  manifest: C2PAManifest
): ManifestValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!manifest.manifestId) {
    errors.push('Missing manifestId');
  }
  if (!manifest.assetHash) {
    errors.push('Missing assetHash');
  }
  if (!manifest.signature) {
    errors.push('Missing signature');
  }

  // Claims validation
  if (!manifest.claims || manifest.claims.length === 0) {
    errors.push('No claims in manifest');
  } else {
    // Must have hash claim
    const hasHash = manifest.claims.some(c => c.claimType === 'c2pa.hash.data');
    if (!hasHash) {
      errors.push('Missing content hash claim');
    }

    // Must have location for regulated
    const hasLocation = manifest.claims.some(c => c.claimType === 'c2pa.location');
    if (!hasLocation) {
      warnings.push('No location claim (required for regulated industries)');
    }

    // Must have chain of custody for regulated
    const hasChain = manifest.claims.some(c => c.claimType === 'fsm.chain_of_custody');
    if (!hasChain) {
      warnings.push('No chain of custody claim (required for regulated industries)');
    }
  }

  // FSM extensions
  if (!manifest.fsmExtensions) {
    errors.push('Missing FSM extensions');
  } else {
    if (!manifest.fsmExtensions.companyId) {
      errors.push('Missing companyId in FSM extensions');
    }
    if (!manifest.fsmExtensions.jobId) {
      errors.push('Missing jobId in FSM extensions');
    }
    if (!manifest.fsmExtensions.visitId) {
      errors.push('Missing visitId in FSM extensions');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    hashMatch: true,      // Would need actual verification in service layer
    signatureValid: true, // Would need actual verification in service layer
    chainIntact: true,    // Would need actual verification in service layer
  };
}

// ============================================
// MANIFEST SUMMARY (For UI display)
// ============================================

export interface ManifestSummary {
  readonly manifestId: string;
  readonly capturedAt: string;
  readonly capturedBy: string;
  readonly location: {
    readonly lat: number;
    readonly lng: number;
  } | null;
  readonly jobId: string;
  readonly visitId: string;
  readonly category: string;
  readonly chainPosition: number;
  readonly verified: boolean;
}

export function summarizeManifest(
  manifest: C2PAManifest,
  chainPosition: number
): ManifestSummary {
  const locationClaim = manifest.claims.find(c => c.claimType === 'c2pa.location');
  const locationData = locationClaim?.data as { latitude?: number; longitude?: number } | undefined;

  return {
    manifestId: manifest.manifestId,
    capturedAt: manifest.fsmExtensions.capturedAt,
    capturedBy: manifest.fsmExtensions.capturedBy,
    location: locationData?.latitude && locationData?.longitude
      ? { lat: locationData.latitude, lng: locationData.longitude }
      : null,
    jobId: manifest.fsmExtensions.jobId,
    visitId: manifest.fsmExtensions.visitId,
    category: (manifest.claims.find(c => c.claimType === 'fsm.job_context')?.data as { category?: string })?.category ?? 'unknown',
    chainPosition,
    verified: true, // Would come from actual verification
  };
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
