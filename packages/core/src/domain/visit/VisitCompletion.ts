// ============================================
// packages/core/src/domain/visit/VisitCompletion.ts
// Visit Completion & Hash Computation
// ============================================
// LAYER: Domain
// PURPOSE: Compute completion hash, lock record
// ============================================

import type {
  VisitData,
  RegulatedVisitData,
  CompletionRecord,
  ChainOfCustodyRecord,
} from './VisitData';
import type { Money } from '../../types';

// ============================================
// COMPLETION INPUT
// ============================================

export interface CompleteVisitInput {
  readonly visitId: string;
  readonly jobId: string;
  readonly companyId: string;
  readonly completedBy: string;
  readonly completedAt: string;
  readonly workSummary: string;
  readonly customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
  readonly followUpRequired: boolean;
  readonly followUpReason?: string;
  readonly billable: boolean;
  readonly laborTotal: Money;
  readonly partsTotal: Money;
  readonly total: Money;
}

// ============================================
// BUILD COMPLETION RECORD
// ============================================

export function buildCompletionRecord(
  input: CompleteVisitInput
): CompletionRecord {
  return Object.freeze({
    completedAt: input.completedAt,
    completedBy: input.completedBy,
    workSummary: input.workSummary,
    customerSatisfaction: input.customerSatisfaction,
    followUpRequired: input.followUpRequired,
    followUpReason: input.followUpReason,
    billable: input.billable,
    laborTotal: input.laborTotal,
    partsTotal: input.partsTotal,
    total: input.total,
  });
}

// ============================================
// HASH INPUT COLLECTOR
// ============================================

/**
 * Collects all data that should be included in the completion hash.
 * Order matters for reproducibility!
 */
export function collectHashInputs(
  visitId: string,
  jobId: string,
  companyId: string,
  data: VisitData
): Record<string, unknown> {
  const inputs: Record<string, unknown> = {
    // Identity (always first)
    visitId,
    jobId,
    companyId,
    schemaVersion: data.schemaVersion,

    // Schedule
    scheduledWindow: data.scheduledWindow,
    
    // Assignment
    technicianId: data.technicianId,

    // Location
    serviceAddress: data.serviceAddress,

    // Arrival proof
    arrival: data.arrival ? {
      arrivedAt: data.arrival.arrivedAt,
      gpsLat: data.arrival.gpsLat,
      gpsLng: data.arrival.gpsLng,
      gpsAccuracy: data.arrival.gpsAccuracy,
      geofenceMatch: data.arrival.geofenceMatch,
      method: data.arrival.method,
    } : null,

    // Departure
    departure: data.departure ? {
      departedAt: data.departure.departedAt,
      gpsLat: data.departure.gpsLat,
      gpsLng: data.departure.gpsLng,
    } : null,

    // Work
    workType: data.workType,
    workPerformed: data.workPerformed,
    partsUsed: data.partsUsed ?? [],
    laborEntries: data.laborEntries ?? [],

    // Evidence - photo hashes only
    photoHashes: (data.photos ?? []).map(p => p.hash).sort(),

    // Signatures - signature hashes only
    signatureHashes: (data.signatures ?? []).map(s => ({
      type: s.type,
      hash: s.signatureHash,
      signedAt: s.signedAt,
    })).sort((a, b) => a.type.localeCompare(b.type)),

    // Completion
    completion: data.completion,
  };

  return inputs;
}

/**
 * Collects additional inputs for regulated visits
 */
export function collectRegulatedHashInputs(
  visitId: string,
  jobId: string,
  companyId: string,
  data: RegulatedVisitData
): Record<string, unknown> {
  const baseInputs = collectHashInputs(visitId, jobId, companyId, data);

  return {
    ...baseInputs,

    // Technician credentials
    technician: {
      technicianId: data.technician.technicianId,
      licenseNumber: data.technician.licenseNumber,
      licenseState: data.technician.licenseState,
      licenseExpiry: data.technician.licenseExpiry,
      licenseValidAtTimeOfWork: data.technician.licenseValidAtTimeOfWork,
      certifications: data.technician.certifications.map(c => ({
        type: c.type,
        number: c.number,
        expiryDate: c.expiryDate,
        validAtTimeOfWork: c.validAtTimeOfWork,
      })),
    },

    // Test equipment
    testEquipment: (data.testEquipment ?? []).map(e => ({
      deviceId: e.deviceId,
      serialNumber: e.serialNumber,
      calibrationDate: e.calibrationDate,
      calibrationValidAtTimeOfWork: e.calibrationValidAtTimeOfWork,
    })),

    // Test results
    testResults: (data.testResults ?? []).map(t => ({
      id: t.id,
      testType: t.testType,
      performedAt: t.performedAt,
      overallResult: t.overallResult,
      readings: t.readings,
    })),

    // C2PA manifests from photos
    c2paManifests: (data.photos ?? [])
      .filter(p => p.c2pa)
      .map(p => p.c2pa!.manifestHash)
      .sort(),

    // Regulatory
    regulatory: data.regulatory,
  };
}

// ============================================
// CANONICAL JSON (For hash reproducibility)
// ============================================

/**
 * Converts object to canonical JSON string for hashing.
 * - Keys sorted alphabetically at all levels
 * - No whitespace
 * - Consistent handling of undefined/null
 */
export function toCanonicalJSON(obj: unknown): string {
  return JSON.stringify(obj, (_, value) => {
    if (value === undefined) {
      return null;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      // Sort keys
      const sorted: Record<string, unknown> = {};
      for (const key of Object.keys(value).sort()) {
        sorted[key] = (value as Record<string, unknown>)[key];
      }
      return sorted;
    }
    return value;
  });
}

// ============================================
// CHAIN OF CUSTODY BUILDER
// ============================================

export interface BuildChainOfCustodyInput {
  readonly prevVisitHash: string | null;
  readonly prevAuditHash: string;
  readonly recordHash: string;
  readonly hashAlgorithm: 'sha256' | 'sha384' | 'sha512';
  readonly hashedAt: string;
  readonly hashInputKeys: readonly string[];
}

export function buildChainOfCustody(
  input: BuildChainOfCustodyInput
): ChainOfCustodyRecord {
  return Object.freeze({
    prevVisitHash: input.prevVisitHash,
    prevAuditHash: input.prevAuditHash,
    recordHash: input.recordHash,
    hashAlgorithm: input.hashAlgorithm,
    hashedAt: input.hashedAt,
    hashedBy: 'system',
    hashInputs: input.hashInputKeys,
    immutable: true,
    lockedAt: input.hashedAt,
    lockReason: 'visit_completed',
  });
}

// ============================================
// COMPLETION RESULT
// ============================================

export interface VisitCompletionResult {
  readonly completion: CompletionRecord;
  readonly hashInputs: Record<string, unknown>;
  readonly canonicalJSON: string;
  readonly chainOfCustody?: ChainOfCustodyRecord;
}

/**
 * Prepares visit for completion.
 * Does NOT perform the actual hash - that requires crypto which is I/O.
 * Returns everything needed for the service layer to compute hash.
 */
export function prepareCompletion(
  visitId: string,
  jobId: string,
  companyId: string,
  data: VisitData,
  input: CompleteVisitInput
): VisitCompletionResult {
  // Build completion record
  const completion = buildCompletionRecord(input);

  // Add completion to data for hash
  const dataWithCompletion: VisitData = {
    ...data,
    completion,
  };

  // Collect hash inputs
  const hashInputs = collectHashInputs(
    visitId,
    jobId,
    companyId,
    dataWithCompletion
  );

  // Convert to canonical JSON
  const canonicalJSON = toCanonicalJSON(hashInputs);

  return {
    completion,
    hashInputs,
    canonicalJSON,
  };
}

/**
 * Prepares regulated visit for completion with full chain of custody.
 */
export function prepareRegulatedCompletion(
  visitId: string,
  jobId: string,
  companyId: string,
  data: RegulatedVisitData,
  input: CompleteVisitInput,
  prevVisitHash: string | null,
  prevAuditHash: string
): VisitCompletionResult & { chainOfCustody: ChainOfCustodyRecord } {
  // Build completion record
  const completion = buildCompletionRecord(input);

  // Add completion to data for hash
  const dataWithCompletion: RegulatedVisitData = {
    ...data,
    completion,
  };

  // Collect hash inputs (regulated version)
  const hashInputs = collectRegulatedHashInputs(
    visitId,
    jobId,
    companyId,
    dataWithCompletion
  );

  // Convert to canonical JSON
  const canonicalJSON = toCanonicalJSON(hashInputs);

  // Build chain of custody (hash will be computed by service layer)
  const chainOfCustody = buildChainOfCustody({
    prevVisitHash,
    prevAuditHash,
    recordHash: '', // Placeholder - service layer computes
    hashAlgorithm: 'sha256',
    hashedAt: input.completedAt,
    hashInputKeys: Object.keys(hashInputs),
  });

  return {
    completion,
    hashInputs,
    canonicalJSON,
    chainOfCustody,
  };
}


