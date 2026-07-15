// ============================================
// packages/core/src/domain/compliance/TestEquipment.ts
// Test Equipment Calibration Validation
// ============================================
// LAYER: Domain
// PURPOSE: Validate equipment was calibrated at time of use
// ============================================

// ============================================
// EQUIPMENT TYPES
// ============================================

export type TestEquipmentType =
  | 'PRESSURE_GAUGE'
  | 'VACUUM_GAUGE'
  | 'MULTIMETER'
  | 'MEGOHMMETER'
  | 'BACKFLOW_TEST_KIT'
  | 'COMBUSTION_ANALYZER'
  | 'REFRIGERANT_SCALE'
  | 'REFRIGERANT_LEAK_DETECTOR'
  | 'MANOMETER'
  | 'THERMOMETER'
  | 'FLOW_METER'
  | 'NITROGEN_REGULATOR'
  | 'OXYGEN_ANALYZER'
  | 'MEDICAL_GAS_ANALYZER';

// ============================================
// CALIBRATION RECORD
// ============================================

export interface CalibrationRecord {
  readonly deviceId: string;
  readonly deviceType: TestEquipmentType;
  readonly manufacturer: string;
  readonly model: string;
  readonly serialNumber: string;
  readonly calibrationDate: string;
  readonly calibrationDueDate: string;
  readonly calibrationCertificateId?: string;
  readonly calibratedBy: string;
  readonly calibrationStandard?: string;  // e.g., "NIST Traceable"
  readonly accuracy?: string;              // e.g., "±0.5%"
}

// ============================================
// VALIDATION RESULT
// ============================================

export interface CalibrationValidationResult {
  readonly valid: boolean;
  readonly validAtUseTime: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly daysUntilDue: number;
  readonly overdue: boolean;
}

// ============================================
// VALIDATE CALIBRATION AT TIME OF USE
// ============================================

export function validateCalibrationAtTime(
  record: CalibrationRecord,
  usedAt: Date
): CalibrationValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const calibrationDate = new Date(record.calibrationDate);
  const dueDate = new Date(record.calibrationDueDate);
  const now = new Date();

  // Was equipment calibrated before use?
  if (calibrationDate > usedAt) {
    errors.push(
      `Equipment was not yet calibrated at time of use (calibrated: ${record.calibrationDate})`
    );
  }

  // Was calibration valid at time of use?
  const validAtUseTime = dueDate >= usedAt && calibrationDate <= usedAt;
  if (!validAtUseTime) {
    errors.push(
      `Equipment calibration was expired at time of use (due: ${record.calibrationDueDate})`
    );
  }

  // Current status
  const daysUntilDue = Math.floor(
    (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const overdue = daysUntilDue < 0;

  if (overdue) {
    warnings.push(`Equipment calibration is overdue by ${Math.abs(daysUntilDue)} days`);
  } else if (daysUntilDue <= 30) {
    warnings.push(`Equipment calibration due in ${daysUntilDue} days`);
  } else if (daysUntilDue <= 60) {
    warnings.push(`Equipment calibration due in ${daysUntilDue} days`);
  }

  // Missing certificate
  if (!record.calibrationCertificateId) {
    warnings.push('No calibration certificate on file');
  }

  return {
    valid: errors.length === 0,
    validAtUseTime,
    errors,
    warnings,
    daysUntilDue,
    overdue,
  };
}

// ============================================
// JOB TYPE → REQUIRED EQUIPMENT
// ============================================

export interface EquipmentRequirement {
  readonly testType: string;
  readonly requiredEquipment: readonly TestEquipmentType[];
  readonly optional: readonly TestEquipmentType[];
  readonly calibrationRequired: boolean;
}

export function getRequiredEquipment(testType: string): EquipmentRequirement {
  switch (testType) {
    case 'backflow_test':
      return {
        testType,
        requiredEquipment: ['BACKFLOW_TEST_KIT'],
        optional: ['PRESSURE_GAUGE'],
        calibrationRequired: true,
      };

    case 'pressure_test':
      return {
        testType,
        requiredEquipment: ['PRESSURE_GAUGE', 'NITROGEN_REGULATOR'],
        optional: [],
        calibrationRequired: true,
      };

    case 'vacuum_test':
      return {
        testType,
        requiredEquipment: ['VACUUM_GAUGE'],
        optional: ['MICRON_GAUGE' as TestEquipmentType],
        calibrationRequired: true,
      };

    case 'medical_gas_purity':
      return {
        testType,
        requiredEquipment: ['MEDICAL_GAS_ANALYZER', 'OXYGEN_ANALYZER'],
        optional: ['FLOW_METER'],
        calibrationRequired: true,
      };

    case 'combustion_analysis':
      return {
        testType,
        requiredEquipment: ['COMBUSTION_ANALYZER'],
        optional: ['MANOMETER'],
        calibrationRequired: true,
      };

    case 'electrical_safety':
      return {
        testType,
        requiredEquipment: ['MULTIMETER', 'MEGOHMMETER'],
        optional: [],
        calibrationRequired: true,
      };

    case 'refrigerant_charge':
      return {
        testType,
        requiredEquipment: ['REFRIGERANT_SCALE', 'PRESSURE_GAUGE'],
        optional: ['REFRIGERANT_LEAK_DETECTOR'],
        calibrationRequired: true,
      };

    default:
      return {
        testType,
        requiredEquipment: [],
        optional: [],
        calibrationRequired: false,
      };
  }
}

// ============================================
// VALIDATE ALL EQUIPMENT FOR TEST
// ============================================

export interface FullEquipmentValidation {
  readonly valid: boolean;
  readonly missingEquipment: readonly TestEquipmentType[];
  readonly expiredAtUseTime: readonly string[];
  readonly currentlyExpired: readonly string[];
  readonly warnings: readonly string[];
}

export function validateEquipmentForTest(
  testType: string,
  equipment: readonly CalibrationRecord[],
  usedAt: Date
): FullEquipmentValidation {
  const requirements = getRequiredEquipment(testType);
  const missingEquipment: TestEquipmentType[] = [];
  const expiredAtUseTime: string[] = [];
  const currentlyExpired: string[] = [];
  const warnings: string[] = [];

  for (const requiredType of requirements.requiredEquipment) {
    const found = equipment.find(e => e.deviceType === requiredType);
    
    if (!found) {
      missingEquipment.push(requiredType);
    } else if (requirements.calibrationRequired) {
      const validation = validateCalibrationAtTime(found, usedAt);
      
      if (!validation.validAtUseTime) {
        expiredAtUseTime.push(`${requiredType}: ${found.serialNumber}`);
      }
      if (validation.overdue) {
        currentlyExpired.push(`${requiredType}: ${found.serialNumber}`);
      }
      warnings.push(...validation.warnings.map(w => `${requiredType}: ${w}`));
    }
  }

  return {
    valid:
      missingEquipment.length === 0 &&
      expiredAtUseTime.length === 0,
    missingEquipment,
    expiredAtUseTime,
    currentlyExpired,
    warnings,
  };
}

// ============================================
// CALIBRATION SCHEDULE
// ============================================

export interface CalibrationScheduleItem {
  readonly deviceId: string;
  readonly deviceType: TestEquipmentType;
  readonly serialNumber: string;
  readonly lastCalibration: string;
  readonly nextDue: string;
  readonly daysUntilDue: number;
  readonly status: 'current' | 'due_soon' | 'overdue';
}

export function buildCalibrationSchedule(
  equipment: readonly CalibrationRecord[]
): readonly CalibrationScheduleItem[] {
  const now = new Date();

  return equipment.map(e => {
    const dueDate = new Date(e.calibrationDueDate);
    const daysUntilDue = Math.floor(
      (dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    let status: 'current' | 'due_soon' | 'overdue';
    if (daysUntilDue < 0) {
      status = 'overdue';
    } else if (daysUntilDue <= 30) {
      status = 'due_soon';
    } else {
      status = 'current';
    }

    return {
      deviceId: e.deviceId,
      deviceType: e.deviceType,
      serialNumber: e.serialNumber,
      lastCalibration: e.calibrationDate,
      nextDue: e.calibrationDueDate,
      daysUntilDue,
      status,
    };
  }).sort((a, b) => a.daysUntilDue - b.daysUntilDue);
}


