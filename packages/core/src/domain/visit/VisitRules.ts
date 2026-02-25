// ============================================
// packages/core/src/domain/visit/VisitRules.ts
// Visit Business Rules - Pure Domain Logic
// ============================================
// LAYER: Domain
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

import type { VisitData, RegulatedVisitData, ArrivalRecord } from './VisitData';
import type { VisitStatus } from './VisitStatus';
import { isImmutable, canTransition, validateTransition } from './VisitStatus';

import { DriftyLayer } from "../../drifty/laws";
// ============================================
// VALIDATION RESULT
// ============================================

export interface ValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}

const VALID: ValidationResult = { valid: true, errors: [], warnings: [] };

function invalid(...errors: string[]): ValidationResult {
  return { valid: false, errors, warnings: [] };
}

function withWarnings(result: ValidationResult, ...warnings: string[]): ValidationResult {
  return { ...result, warnings: [...result.warnings, ...warnings] };
}

// ============================================
// RULE: Visit requires Job
// ============================================

export function validateParentJob(
  jobId: string | null | undefined
): ValidationResult {
  if (!jobId) {
    return invalid('Visit must be attached to a Job');
  }
  return VALID;
}

// ============================================
// RULE: Visit requires companyId
// ============================================

export function validateTenantIsolation(
  companyId: string | null | undefined
): ValidationResult {
  if (!companyId) {
    return invalid('Visit must have companyId');
  }
  return VALID;
}

// ============================================
// RULE: Cannot modify immutable visit
// ============================================

export function validateNotImmutable(
  status: VisitStatus
): ValidationResult {
  if (isImmutable(status)) {
    return invalid('Visit is immutable and cannot be modified');
  }
  return VALID;
}

// ============================================
// RULE: Arrival requires GPS
// ============================================

export function validateArrival(
  arrival: ArrivalRecord | undefined,
  requireGeofence: boolean = false
): ValidationResult {
  if (!arrival) {
    return invalid('Arrival record is required');
  }

  const errors: string[] = [];

  if (!arrival.arrivedAt) {
    errors.push('Arrival timestamp is required');
  }

  if (arrival.gpsLat === undefined || arrival.gpsLng === undefined) {
    errors.push('GPS coordinates are required for arrival');
  }

  if (arrival.gpsAccuracy === undefined) {
    errors.push('GPS accuracy is required');
  } else if (arrival.gpsAccuracy > 100) {
    // More than 100 meters accuracy is suspicious
    errors.push('GPS accuracy too low (>100m)');
  }

  if (requireGeofence && !arrival.geofenceMatch) {
    if (arrival.method !== 'manual_override') {
      errors.push('Arrival must be within job site geofence');
    } else if (!arrival.overrideReason || !arrival.overrideApprovedBy) {
      errors.push('Manual override requires reason and approval');
    }
  }

  return errors.length > 0 ? invalid(...errors) : VALID;
}

// ============================================
// RULE: Completion requirements
// ============================================

export function validateCompletion(
  data: VisitData,
  requireCustomerSignature: boolean = true
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Must have work performed
  if (!data.workPerformed && !data.completion?.workSummary) {
    errors.push('Work performed description is required');
  }

  // Must have technician signature
  const techSig = data.signatures?.find(s => s.type === 'technician');
  if (!techSig) {
    errors.push('Technician signature is required');
  }

  // Customer signature (conditionally required)
  const custSig = data.signatures?.find(s => s.type === 'customer');
  if (requireCustomerSignature && !custSig) {
    errors.push('Customer signature is required');
  } else if (!custSig) {
    warnings.push('No customer signature captured');
  }

  // Must have arrival record
  if (!data.arrival) {
    errors.push('Arrival must be recorded before completion');
  }

  // Should have at least one photo
  if (!data.photos || data.photos.length === 0) {
    warnings.push('No photos captured for this visit');
  }

  const result = errors.length > 0 ? invalid(...errors) : VALID;
  return warnings.length > 0 ? withWarnings(result, ...warnings) : result;
}

// ============================================
// RULE: Regulated visit completion
// ============================================

export function validateRegulatedCompletion(
  data: RegulatedVisitData
): ValidationResult {
  const errors: string[] = [];

  // Base completion rules
  const baseResult = validateCompletion(data, true);
  if (!baseResult.valid) {
    errors.push(...baseResult.errors);
  }

  // === TECHNICIAN CREDENTIALS ===
  if (!data.technician) {
    errors.push('Technician credentials are required for regulated work');
  } else {
    if (!data.technician.licenseNumber) {
      errors.push('Technician license number is required');
    }
    if (!data.technician.licenseValidAtTimeOfWork) {
      errors.push('Technician license was expired at time of work');
    }
    
    // Check certifications
    const invalidCerts = data.technician.certifications.filter(
      c => !c.validAtTimeOfWork
    );
    if (invalidCerts.length > 0) {
      errors.push(
        `Expired certifications: ${invalidCerts.map(c => c.type).join(', ')}`
      );
    }
  }

  // === TEST EQUIPMENT ===
  if (data.testEquipment) {
    const invalidEquipment = data.testEquipment.filter(
      e => !e.calibrationValidAtTimeOfWork
    );
    if (invalidEquipment.length > 0) {
      errors.push(
        `Equipment calibration expired: ${invalidEquipment.map(e => e.serialNumber).join(', ')}`
      );
    }
  }

  // === TEST RESULTS ===
  if (data.testResults) {
    const failedTests = data.testResults.filter(
      t => t.overallResult === 'fail'
    );
    if (failedTests.length > 0) {
      // Failed tests don't prevent completion, but must be acknowledged
      // This would typically trigger a different workflow
    }
  }

  // === PHOTOS with C2PA ===
  if (data.photos) {
    const photosWithoutC2PA = data.photos.filter(p => !p.c2pa);
    if (photosWithoutC2PA.length > 0) {
      errors.push('All photos must have C2PA manifest for regulated work');
    }
  }

  // === CHAIN OF CUSTODY ===
  if (!data.chainOfCustody) {
    errors.push('Chain of custody record is required');
  } else {
    if (!data.chainOfCustody.recordHash) {
      errors.push('Chain of custody hash is required');
    }
    if (!data.chainOfCustody.prevAuditHash) {
      errors.push('Previous audit hash is required for chain integrity');
    }
  }

  return errors.length > 0 ? invalid(...errors) : VALID;
}

// ============================================
// RULE: Time overlap detection
// ============================================

export interface TimeSlot {
  readonly visitId: string;
  readonly technicianId: string;
  readonly start: Date;
  readonly end: Date;
}

export function detectOverlap(
  newSlot: Omit<TimeSlot, 'visitId'> & { visitId?: string },
  existingSlots: readonly TimeSlot[]
): TimeSlot | null {
  for (const existing of existingSlots) {
    // Skip self
    if (newSlot.visitId && existing.visitId === newSlot.visitId) {
      continue;
    }
    
    // Same technician?
    if (existing.technicianId !== newSlot.technicianId) {
      continue;
    }

    // Check overlap: NOT (new ends before existing starts OR new starts after existing ends)
    const overlaps = !(
      newSlot.end <= existing.start || 
      newSlot.start >= existing.end
    );

    if (overlaps) {
      return existing;
    }
  }

  return null;
}

// ============================================
// RULE: Capacity check
// ============================================

export function checkTechnicianCapacity(
  technicianId: string,
  date: Date,
  existingVisits: readonly { technicianId: string; scheduledDate: Date }[],
  maxJobsPerDay: number
): ValidationResult {
  const dateStr = date.toISOString().split('T')[0];
  
  const visitsOnDay = existingVisits.filter(v => {
    const visitDateStr = v.scheduledDate.toISOString().split('T')[0];
    return v.technicianId === technicianId && visitDateStr === dateStr;
  });

  if (visitsOnDay.length >= maxJobsPerDay) {
    return invalid(
      `Technician has reached maximum capacity (${maxJobsPerDay}) for ${dateStr}`
    );
  }

  return VALID;
}

// ============================================
// RULE: Cancellation
// ============================================

export function validateCancellation(
  status: VisitStatus,
  reason: string | undefined
): ValidationResult {
  const transitionResult = validateTransition(status, 'CANCELLED');
  if (!transitionResult.valid) {
    return invalid(transitionResult.reason);
  }

  if (!reason || reason.trim().length < 5) {
    return invalid('Cancellation reason is required (min 5 characters)');
  }

  return VALID;
}

// ============================================
// COMBINED VALIDATION
// ============================================

export function validateVisitCreate(params: {
  jobId: string | null | undefined;
  companyId: string | null | undefined;
  data: VisitData;
}): ValidationResult {
  const results: ValidationResult[] = [
    validateParentJob(params.jobId),
    validateTenantIsolation(params.companyId),
  ];

  const errors = results.flatMap(r => r.errors);
  const warnings = results.flatMap(r => r.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateVisitUpdate(params: {
  currentStatus: VisitStatus;
  companyId: string | null | undefined;
}): ValidationResult {
  const results: ValidationResult[] = [
    validateTenantIsolation(params.companyId),
    validateNotImmutable(params.currentStatus),
  ];

  const errors = results.flatMap(r => r.errors);
  const warnings = results.flatMap(r => r.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
