// ============================================
// packages/core/src/domain/job/JobRules.ts
// Job Business Rules - Pure Domain Logic
// ============================================
// LAYER: Domain
// NO I/O, NO PRISMA, NO SIDE EFFECTS
// ============================================

import type { JobData, LineItem } from './JobData';
import type { JobStatus } from './JobStatus';
import { isLocked, canEditPricing, checkJobCompletion } from './JobStatus';

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
// RULE: Job requires companyId
// ============================================

export function validateTenantIsolation(
  companyId: string | null | undefined
): ValidationResult {
  if (!companyId) {
    return invalid('Job must have companyId');
  }
  return VALID;
}

// ============================================
// RULE: Cannot modify locked job
// ============================================

export function validateNotLocked(status: JobStatus): ValidationResult {
  if (isLocked(status)) {
    return invalid(`Job is locked in ${status} status`);
  }
  return VALID;
}

// ============================================
// RULE: Required fields for creation
// ============================================

export function validateJobCreate(data: Partial<JobData>): ValidationResult {
  const errors: string[] = [];

  if (!data.customerId) {
    errors.push('Customer is required');
  }

  if (!data.serviceAddress) {
    errors.push('Service address is required');
  } else {
    if (!data.serviceAddress.street1) {
      errors.push('Service address street is required');
    }
    if (!data.serviceAddress.city) {
      errors.push('Service address city is required');
    }
    if (!data.serviceAddress.state) {
      errors.push('Service address state is required');
    }
    if (!data.serviceAddress.postalCode) {
      errors.push('Service address postal code is required');
    }
  }

  if (!data.jobType) {
    errors.push('Job type is required');
  }

  if (!data.title) {
    errors.push('Job title is required');
  }

  return errors.length > 0 ? invalid(...errors) : VALID;
}

// ============================================
// RULE: Line item validation
// ============================================

export function validateLineItem(item: Partial<LineItem>): ValidationResult {
  const errors: string[] = [];

  if (!item.type) {
    errors.push('Line item type is required');
  }

  if (!item.description) {
    errors.push('Line item description is required');
  }

  if (item.quantity === undefined || item.quantity <= 0) {
    errors.push('Line item quantity must be positive');
  }

  if (!item.unitPrice) {
    errors.push('Line item unit price is required');
  } else if (item.unitPrice.amount < 0 && item.type !== 'discount') {
    errors.push('Line item price cannot be negative (use discount type)');
  }

  return errors.length > 0 ? invalid(...errors) : VALID;
}

// ============================================
// RULE: Pricing modification
// ============================================

export function validatePricingChange(
  status: JobStatus,
  currentTotal: number,
  newTotal: number
): ValidationResult {
  if (!canEditPricing(status)) {
    return invalid(`Cannot modify pricing in ${status} status`);
  }

  const warnings: string[] = [];

  // Large price change warning
  if (currentTotal > 0) {
    const changePercent = Math.abs((newTotal - currentTotal) / currentTotal) * 100;
    if (changePercent > 25) {
      warnings.push(`Price change of ${changePercent.toFixed(1)}% - consider documenting reason`);
    }
  }

  return warnings.length > 0 ? withWarnings(VALID, ...warnings) : VALID;
}

// ============================================
// RULE: Job completion
// ============================================

export function validateJobCompletion(
  status: JobStatus,
  visitStatuses: readonly string[],
  data: JobData
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check status
  if (status !== 'IN_PROGRESS') {
    errors.push(`Job must be IN_PROGRESS to complete (current: ${status})`);
  }

  // Check visits
  const visitCheck = checkJobCompletion(visitStatuses);
  if (!visitCheck.canComplete) {
    errors.push(...visitCheck.reasons);
  }

  // Check line items
  if (data.lineItems.length === 0) {
    warnings.push('Job has no line items');
  }

  // Check regulated jobs
  if (data.regulated?.inspectionRequired && !data.regulated.permitNumber) {
    warnings.push('Regulated job may require inspection - no permit on file');
  }

  const result = errors.length > 0 ? invalid(...errors) : VALID;
  return warnings.length > 0 ? withWarnings(result, ...warnings) : result;
}

// ============================================
// RULE: Job cancellation
// ============================================

export function validateJobCancellation(
  status: JobStatus,
  visitStatuses: readonly string[],
  reason: string | undefined
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check status allows cancellation
  if (isLocked(status)) {
    errors.push(`Cannot cancel job in ${status} status`);
  }

  // Require reason
  if (!reason || reason.trim().length < 5) {
    errors.push('Cancellation reason is required (min 5 characters)');
  }

  // Check for in-progress visits
  const inProgressVisits = visitStatuses.filter(s =>
    ['EN_ROUTE', 'ON_SITE'].includes(s)
  ).length;

  if (inProgressVisits > 0) {
    errors.push(`Cannot cancel job with ${inProgressVisits} in-progress visit(s)`);
  }

  // Warn about completed visits
  const completedVisits = visitStatuses.filter(s => s === 'COMPLETED').length;
  if (completedVisits > 0) {
    warnings.push(`Job has ${completedVisits} completed visit(s) - may need billing`);
  }

  const result = errors.length > 0 ? invalid(...errors) : VALID;
  return warnings.length > 0 ? withWarnings(result, ...warnings) : result;
}

// ============================================
// RULE: Add visit to job
// ============================================

export function validateAddVisit(
  status: JobStatus,
  existingVisitCount: number,
  maxVisitsPerJob: number
): ValidationResult {
  if (isLocked(status)) {
    return invalid(`Cannot add visits to job in ${status} status`);
  }

  if (existingVisitCount >= maxVisitsPerJob) {
    return invalid(`Job has reached maximum visits (${maxVisitsPerJob})`);
  }

  return VALID;
}

// ============================================
// COMBINED VALIDATION
// ============================================

export function validateJobUpdate(params: {
  companyId: string | null | undefined;
  currentStatus: JobStatus;
}): ValidationResult {
  const results: ValidationResult[] = [
    validateTenantIsolation(params.companyId),
    validateNotLocked(params.currentStatus),
  ];

  const errors = results.flatMap(r => r.errors);
  const warnings = results.flatMap(r => r.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}


