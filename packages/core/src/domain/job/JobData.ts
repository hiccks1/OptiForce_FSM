// ============================================
// packages/core/src/domain/job/JobData.ts
// Job JSONB Data Shapes
// ============================================
// LAYER: Domain
// PURPOSE: Define what goes in job.data column
// ============================================

import type { JobStatus } from './JobStatus';
import type { Address, Money, TimeWindow } from '../../types';

// ============================================
// SCHEMA VERSION
// ============================================

export const JOB_SCHEMA_VERSION = 1;

// ============================================
// JOB DATA
// ============================================

export interface JobData {
  readonly schemaVersion: typeof JOB_SCHEMA_VERSION;

  // === CUSTOMER ===
  readonly customerId: string;
  readonly customerName: string;
  readonly customerPhone?: string;
  readonly customerEmail?: string;

  // === LOCATION ===
  readonly serviceAddress: Address;
  readonly billingAddress?: Address;
  readonly zoneId?: string;

  // === JOB TYPE ===
  readonly jobType: string;
  readonly jobCategory?: string;
  readonly priority: 'low' | 'normal' | 'high' | 'urgent';
  readonly source: 'phone' | 'web' | 'portal' | 'referral' | 'recurring' | 'warranty';

  // === DESCRIPTION ===
  readonly title: string;
  readonly description?: string;
  readonly customerNotes?: string;
  readonly internalNotes?: string;

  // === SCHEDULING ===
  readonly requestedWindow?: TimeWindow;
  readonly scheduledWindow?: TimeWindow;
  readonly estimatedDuration?: number;  // minutes

  // === ASSIGNMENT ===
  readonly assignedTechnicianId?: string;
  readonly assignedCrewIds?: readonly string[];
  readonly skillsRequired?: readonly string[];

  // === PRICING ===
  readonly pricing: JobPricing;

  // === LINE ITEMS ===
  readonly lineItems: readonly LineItem[];

  // === EQUIPMENT ===
  readonly equipment?: readonly EquipmentRecord[];

  // === ATTACHMENTS ===
  readonly attachments?: readonly Attachment[];

  // === HISTORY ===
  readonly statusHistory: readonly StatusChange[];

  // === RELATIONSHIPS ===
  readonly contractId?: string;
  readonly estimateId?: string;
  readonly invoiceId?: string;
  readonly parentJobId?: string;       // For follow-up jobs
  readonly recurringScheduleId?: string;

  // === COMPLETION ===
  readonly completion?: JobCompletionData;

  // === CANCELLATION ===
  readonly cancellation?: JobCancellationData;

  // === CUSTOM FIELDS ===
  readonly customFields?: Readonly<Record<string, unknown>>;

  // === REGULATED (Optional) ===
  readonly regulated?: {
    readonly industry: string;
    readonly permitRequired: boolean;
    readonly permitNumber?: string;
    readonly inspectionRequired: boolean;
    readonly complianceCode?: string;
  };
}

// ============================================
// PRICING
// ============================================

export interface JobPricing {
  readonly type: 'flat_rate' | 'time_and_materials' | 'estimate' | 'not_to_exceed';
  readonly laborRate?: Money;
  readonly minimumCharge?: Money;
  readonly notToExceed?: Money;
  readonly discount?: {
    readonly type: 'percentage' | 'fixed';
    readonly value: number;
    readonly reason?: string;
  };
  readonly taxRate?: number;
  readonly taxExempt?: boolean;
}

// ============================================
// LINE ITEMS
// ============================================

export interface LineItem {
  readonly id: string;
  readonly type: 'labor' | 'part' | 'material' | 'equipment' | 'fee' | 'discount';
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly total: Money;
  readonly taxable: boolean;
  
  // For parts
  readonly partId?: string;
  readonly partNumber?: string;
  readonly serialNumber?: string;

  // For labor
  readonly laborType?: 'regular' | 'overtime' | 'emergency';
  readonly technicianId?: string;
  readonly hours?: number;

  // Audit
  readonly addedBy: string;
  readonly addedAt: string;
  readonly modifiedBy?: string;
  readonly modifiedAt?: string;
}

// ============================================
// EQUIPMENT RECORD
// ============================================

export interface EquipmentRecord {
  readonly equipmentId: string;
  readonly type: string;
  readonly manufacturer?: string;
  readonly model?: string;
  readonly serialNumber?: string;
  readonly location?: string;       // "Basement", "Roof"
  readonly warrantyExpires?: string;
  readonly lastServiceDate?: string;
  readonly notes?: string;
}

// ============================================
// ATTACHMENT
// ============================================

export interface Attachment {
  readonly id: string;
  readonly type: 'document' | 'photo' | 'video' | 'audio' | 'signature';
  readonly name: string;
  readonly url: string;
  readonly mimeType: string;
  readonly size: number;
  readonly uploadedBy: string;
  readonly uploadedAt: string;
  readonly hash?: string;           // For C2PA chain
}

// ============================================
// STATUS CHANGE
// ============================================

export interface StatusChange {
  readonly from: JobStatus;
  readonly to: JobStatus;
  readonly changedBy: string;
  readonly changedAt: string;
  readonly reason?: string;
}

// ============================================
// COMPLETION DATA
// ============================================

export interface JobCompletionData {
  readonly completedAt: string;
  readonly completedBy: string;
  readonly summary: string;
  readonly laborTotal: Money;
  readonly partsTotal: Money;
  readonly subtotal: Money;
  readonly tax: Money;
  readonly total: Money;
  readonly customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
  readonly followUpRequired: boolean;
  readonly followUpReason?: string;
}

// ============================================
// CANCELLATION DATA
// ============================================

export interface JobCancellationData {
  readonly cancelledAt: string;
  readonly cancelledBy: string;
  readonly reason: string;
  readonly reasonCode: 'customer_request' | 'no_access' | 'duplicate' | 'rescheduled' | 'other';
  readonly billable: boolean;
  readonly cancellationFee?: Money;
  readonly rescheduledToJobId?: string;
}

// ============================================
// TOTALS CALCULATION (Pure)
// ============================================

export interface JobTotals {
  readonly laborTotal: Money;
  readonly partsTotal: Money;
  readonly materialsTotal: Money;
  readonly feesTotal: Money;
  readonly discountTotal: Money;
  readonly subtotal: Money;
  readonly taxableAmount: Money;
  readonly tax: Money;
  readonly total: Money;
}

export function calculateJobTotals(
  lineItems: readonly LineItem[],
  taxRate: number = 0
): JobTotals {
  const currency = lineItems[0]?.total.currency ?? 'USD';
  
  let laborTotal = 0;
  let partsTotal = 0;
  let materialsTotal = 0;
  let feesTotal = 0;
  let discountTotal = 0;
  let taxableAmount = 0;

  for (const item of lineItems) {
    const amount = item.total.amount;
    
    switch (item.type) {
      case 'labor':
        laborTotal += amount;
        break;
      case 'part':
        partsTotal += amount;
        break;
      case 'material':
        materialsTotal += amount;
        break;
      case 'fee':
      case 'equipment':
        feesTotal += amount;
        break;
      case 'discount':
        discountTotal += Math.abs(amount);
        break;
    }

    if (item.taxable) {
      taxableAmount += amount;
    }
  }

  const subtotal = laborTotal + partsTotal + materialsTotal + feesTotal - discountTotal;
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;
  const total = subtotal + tax;

  const money = (amount: number): Money => ({ amount, currency });

  return {
    laborTotal: money(laborTotal),
    partsTotal: money(partsTotal),
    materialsTotal: money(materialsTotal),
    feesTotal: money(feesTotal),
    discountTotal: money(discountTotal),
    subtotal: money(subtotal),
    taxableAmount: money(taxableAmount),
    tax: money(tax),
    total: money(total),
  };
}

// ============================================
// FACTORY
// ============================================

export function createJobData(params: {
  customerId: string;
  customerName: string;
  serviceAddress: Address;
  jobType: string;
  title: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  source?: JobData['source'];
  description?: string;
}): JobData {
  return {
    schemaVersion: JOB_SCHEMA_VERSION,
    customerId: params.customerId,
    customerName: params.customerName,
    serviceAddress: params.serviceAddress,
    jobType: params.jobType,
    title: params.title,
    priority: params.priority ?? 'normal',
    source: params.source ?? 'phone',
    description: params.description,
    pricing: {
      type: 'time_and_materials',
    },
    lineItems: [],
    statusHistory: [],
  };
}


