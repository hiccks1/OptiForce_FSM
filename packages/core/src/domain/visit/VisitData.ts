// ============================================
// packages/core/src/domain/visit/VisitData.ts
// Visit JSONB Data Shapes
// ============================================
// LAYER: Domain
// PURPOSE: Define what goes in visit.data column
// ============================================

import type { VisitStatus } from './VisitStatus';
import type { Address, TimeWindow, ArrivalWindow, Money } from '../../types';

// ============================================
// SCHEMA VERSION
// ============================================

export const VISIT_SCHEMA_VERSION = 1;

// ============================================
// BASE VISIT DATA (All visits have this)
// ============================================

export interface VisitData {
  readonly schemaVersion: typeof VISIT_SCHEMA_VERSION;

  // === SCHEDULING ===
  readonly scheduledWindow: TimeWindow;
  readonly arrivalWindow?: ArrivalWindow;
  readonly estimatedDuration: number;  // minutes
  readonly actualDuration?: number;    // minutes (set on completion)

  // === ASSIGNMENT ===
  readonly technicianId: string | null;
  readonly technicianName?: string;
  readonly crewIds?: readonly string[];  // Multi-tech jobs

  // === LOCATION ===
  readonly serviceAddress: Address;
  readonly zoneId?: string;
  readonly zoneColor?: string;

  // === WORK ===
  readonly workType: string;
  readonly description?: string;
  readonly instructions?: string;
  readonly partsNeeded?: readonly PartNeeded[];

  // === TRACKING ===
  readonly dispatch?: DispatchRecord;
  readonly arrival?: ArrivalRecord;
  readonly departure?: DepartureRecord;

  // === WORK LOG ===
  readonly workPerformed?: string;
  readonly technicianNotes?: string;
  readonly partsUsed?: readonly PartUsed[];
  readonly laborEntries?: readonly LaborEntry[];

  // === EVIDENCE ===
  readonly photos?: readonly PhotoRecord[];
  readonly signatures?: readonly SignatureRecord[];

  // === COMPLETION ===
  readonly completion?: CompletionRecord;

  // === CANCELLATION ===
  readonly cancellation?: CancellationRecord;

  // === CUSTOM FIELDS ===
  readonly customFields?: Readonly<Record<string, unknown>>;
}

// ============================================
// PARTS
// ============================================

export interface PartNeeded {
  readonly partId: string;
  readonly partNumber: string;
  readonly description: string;
  readonly quantity: number;
}

export interface PartUsed {
  readonly partId: string;
  readonly partNumber: string;
  readonly description: string;
  readonly quantity: number;
  readonly unitCost: Money;
  readonly totalCost: Money;
  readonly serialNumber?: string;
  readonly warrantyInfo?: string;
}

// ============================================
// LABOR
// ============================================

export interface LaborEntry {
  readonly technicianId: string;
  readonly startedAt: string;
  readonly endedAt: string;
  readonly durationMinutes: number;
  readonly laborType: 'regular' | 'overtime' | 'travel';
  readonly rate: Money;
  readonly total: Money;
}

// ============================================
// TRACKING RECORDS
// ============================================

export interface DispatchRecord {
  readonly dispatchedAt: string;
  readonly dispatchedBy: string;
  readonly method: 'manual' | 'auto' | 'betty';
  readonly etaMinutes?: number;
}

export interface ArrivalRecord {
  readonly arrivedAt: string;
  readonly gpsLat: number;
  readonly gpsLng: number;
  readonly gpsAccuracy: number;
  readonly geofenceMatch: boolean;
  readonly geofenceId?: string;
  readonly method: 'gps' | 'manual_override';
  readonly overrideReason?: string;
  readonly overrideApprovedBy?: string;
}

export interface DepartureRecord {
  readonly departedAt: string;
  readonly gpsLat: number;
  readonly gpsLng: number;
}

// ============================================
// PHOTO RECORD
// ============================================

export interface PhotoRecord {
  readonly id: string;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly hash: string;
  readonly capturedAt: string;
  readonly capturedBy: string;
  readonly gpsLat?: number;
  readonly gpsLng?: number;
  readonly description?: string;
  readonly category: 'before' | 'during' | 'after' | 'issue' | 'signature';
  
  // C2PA (regulated industries)
  readonly c2pa?: {
    readonly enabled: true;
    readonly manifestHash: string;
    readonly signedAt: string;
    readonly signedBy: string;
  };
}

// ============================================
// SIGNATURE RECORD
// ============================================

export interface SignatureRecord {
  readonly id: string;
  readonly type: 'customer' | 'technician' | 'witness';
  readonly signedAt: string;
  readonly signerName: string;
  readonly signerTitle?: string;
  readonly signatureHash: string;
  readonly signatureUrl: string;
  readonly gpsLat?: number;
  readonly gpsLng?: number;
  readonly attestation?: string;  // What they're attesting to
}

// ============================================
// COMPLETION RECORD
// ============================================

export interface CompletionRecord {
  readonly completedAt: string;
  readonly completedBy: string;
  readonly workSummary: string;
  readonly customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
  readonly followUpRequired: boolean;
  readonly followUpReason?: string;
  
  // Billing
  readonly billable: boolean;
  readonly laborTotal: Money;
  readonly partsTotal: Money;
  readonly total: Money;
}

// ============================================
// CANCELLATION RECORD
// ============================================

export interface CancellationRecord {
  readonly cancelledAt: string;
  readonly cancelledBy: string;
  readonly reason: string;
  readonly reasonCode: 'customer_request' | 'no_show' | 'weather' | 'reschedule' | 'other';
  readonly billable: boolean;
  readonly cancellationFee?: Money;
}

// ============================================
// REGULATED VISIT DATA (Extends base)
// ============================================

export interface RegulatedVisitData extends VisitData {
  // === TECHNICIAN CREDENTIALS ===
  readonly technician: TechnicianCredentials;
  
  // === TEST EQUIPMENT ===
  readonly testEquipment?: readonly TestEquipmentRecord[];
  
  // === TEST RESULTS ===
  readonly testResults?: readonly TestResultRecord[];
  
  // === CHAIN OF CUSTODY ===
  readonly chainOfCustody: ChainOfCustodyRecord;
  
  // === REGULATORY ===
  readonly regulatory?: {
    readonly permitNumber?: string;
    readonly inspectionRequired: boolean;
    readonly inspectionScheduled?: string;
    readonly complianceCode?: string;
  };
}

// ============================================
// TECHNICIAN CREDENTIALS (Regulated)
// ============================================

export interface TechnicianCredentials {
  readonly technicianId: string;
  readonly fullName: string;
  readonly licenseNumber: string;
  readonly licenseState: string;
  readonly licenseType: string;
  readonly licenseExpiry: string;
  readonly licenseValidAtTimeOfWork: boolean;  // Computed at completion
  readonly certifications: readonly Certification[];
}

export interface Certification {
  readonly type: string;  // 'EPA_608', 'MEDICAL_GAS', 'BACKFLOW'
  readonly number: string;
  readonly issuedBy: string;
  readonly issuedDate: string;
  readonly expiryDate: string;
  readonly validAtTimeOfWork: boolean;  // Computed at completion
}

// ============================================
// TEST EQUIPMENT (Regulated)
// ============================================

export interface TestEquipmentRecord {
  readonly deviceId: string;
  readonly deviceType: string;
  readonly manufacturer: string;
  readonly model: string;
  readonly serialNumber: string;
  readonly calibrationDate: string;
  readonly calibrationDueDate: string;
  readonly calibrationCertificate?: string;
  readonly calibrationValidAtTimeOfWork: boolean;  // Computed at completion
}

// ============================================
// TEST RESULTS (Regulated)
// ============================================

export interface TestResultRecord {
  readonly id: string;
  readonly testType: string;  // 'pressure_test', 'vacuum_test', 'flow_test'
  readonly deviceId: string;
  readonly performedAt: string;
  readonly performedBy: string;
  
  // Readings
  readonly readings: readonly TestReading[];
  
  // Result
  readonly overallResult: 'pass' | 'fail' | 'conditional';
  readonly notes?: string;
}

export interface TestReading {
  readonly parameter: string;
  readonly value: number;
  readonly unit: string;
  readonly minThreshold?: number;
  readonly maxThreshold?: number;
  readonly passThreshold: number;
  readonly result: 'pass' | 'fail';
  readonly timestamp: string;
}

// ============================================
// CHAIN OF CUSTODY (Regulated)
// ============================================

export interface ChainOfCustodyRecord {
  // Previous links
  readonly prevVisitHash: string | null;
  readonly prevAuditHash: string;
  
  // This record
  readonly recordHash: string;
  readonly hashAlgorithm: 'sha256' | 'sha384' | 'sha512';
  readonly hashedAt: string;
  readonly hashedBy: 'system';
  
  // What was included in hash
  readonly hashInputs: readonly string[];
  
  // Immutability
  readonly immutable: true;
  readonly lockedAt: string;
  readonly lockReason: 'visit_completed';
}

// ============================================
// TYPE GUARDS
// ============================================

export function isRegulatedVisitData(
  data: VisitData
): data is RegulatedVisitData {
  return 'chainOfCustody' in data && 'technician' in data;
}

export function hasCompletion(
  data: VisitData
): data is VisitData & { completion: CompletionRecord } {
  return data.completion !== undefined;
}

export function hasCancellation(
  data: VisitData
): data is VisitData & { cancellation: CancellationRecord } {
  return data.cancellation !== undefined;
}

// ============================================
// FACTORY: Create empty visit data
// ============================================

export function createVisitData(
  params: {
    scheduledWindow: TimeWindow;
    estimatedDuration: number;
    serviceAddress: Address;
    workType: string;
    technicianId?: string;
    description?: string;
  }
): VisitData {
  return {
    schemaVersion: VISIT_SCHEMA_VERSION,
    scheduledWindow: params.scheduledWindow,
    estimatedDuration: params.estimatedDuration,
    serviceAddress: params.serviceAddress,
    workType: params.workType,
    technicianId: params.technicianId ?? null,
    description: params.description,
  };
}


