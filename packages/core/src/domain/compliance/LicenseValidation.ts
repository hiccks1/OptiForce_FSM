// ============================================
// packages/core/src/domain/compliance/LicenseValidation.ts
// Technician License & Certification Validation
// ============================================
// LAYER: Domain
// PURPOSE: Validate credentials were valid at time of work
// ============================================

// ============================================
// LICENSE TYPES
// ============================================

export type LicenseType =
  | 'HVAC'
  | 'PLUMBING'
  | 'ELECTRICAL'
  | 'MEDICAL_GAS'
  | 'FIRE_SUPPRESSION'
  | 'BACKFLOW'
  | 'REFRIGERATION'
  | 'ELEVATOR'
  | 'GENERAL_CONTRACTOR';

export type CertificationType =
  | 'EPA_608'               // Refrigerant handling
  | 'EPA_609'               // Motor vehicle AC
  | 'ASSE_5110'             // Backflow prevention
  | 'ASSE_5120'             // Backflow repair
  | 'ASSE_6010'             // Medical gas installer
  | 'ASSE_6020'             // Medical gas inspector
  | 'ASSE_6030'             // Medical gas verifier
  | 'ASSE_6040'             // Medical gas maintenance
  | 'NFPA_NICET'            // Fire protection
  | 'OSHA_10'               // Safety
  | 'OSHA_30'               // Safety
  | 'CPR_AED'               // First aid
  | 'MANUFACTURER_CERT';    // Equipment-specific

// ============================================
// LICENSE RECORD
// ============================================

export interface LicenseRecord {
  readonly licenseNumber: string;
  readonly licenseType: LicenseType;
  readonly state: string;
  readonly issuedDate: string;
  readonly expiryDate: string;
  readonly status: 'active' | 'expired' | 'suspended' | 'revoked';
  readonly restrictions?: readonly string[];
}

export interface CertificationRecord {
  readonly certType: CertificationType;
  readonly certNumber: string;
  readonly issuedBy: string;
  readonly issuedDate: string;
  readonly expiryDate: string;
  readonly status: 'active' | 'expired' | 'revoked';
  readonly level?: string;  // e.g., "Type I", "Type II", "Universal"
}

// ============================================
// VALIDATION RESULT
// ============================================

export interface LicenseValidationResult {
  readonly valid: boolean;
  readonly validAtWorkTime: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly expiresWithin30Days: boolean;
  readonly expiresWithin90Days: boolean;
}

// ============================================
// VALIDATE LICENSE AT TIME OF WORK
// ============================================

/**
 * Validates that a license was active at the time work was performed.
 * This is the critical check for regulatory compliance.
 */
export function validateLicenseAtTime(
  license: LicenseRecord,
  workPerformedAt: Date
): LicenseValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  const expiry = new Date(license.expiryDate);
  const issued = new Date(license.issuedDate);
  const now = new Date();

  // Was license issued before work?
  if (issued > workPerformedAt) {
    errors.push(
      `License was not yet issued at time of work (issued: ${license.issuedDate})`
    );
  }

  // Was license valid at time of work?
  const validAtWorkTime = expiry >= workPerformedAt && issued <= workPerformedAt;
  if (!validAtWorkTime) {
    errors.push(
      `License was expired at time of work (expired: ${license.expiryDate})`
    );
  }

  // Current status
  if (license.status !== 'active') {
    errors.push(`License is currently ${license.status}`);
  }

  // Warnings for upcoming expiry
  const daysUntilExpiry = Math.floor(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const expiresWithin30Days = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const expiresWithin90Days = daysUntilExpiry <= 90 && daysUntilExpiry > 0;

  if (expiresWithin30Days) {
    warnings.push(`License expires in ${daysUntilExpiry} days`);
  } else if (expiresWithin90Days) {
    warnings.push(`License expires in ${daysUntilExpiry} days`);
  }

  // Check restrictions
  if (license.restrictions && license.restrictions.length > 0) {
    warnings.push(`License has restrictions: ${license.restrictions.join(', ')}`);
  }

  return {
    valid: errors.length === 0,
    validAtWorkTime,
    errors,
    warnings,
    expiresWithin30Days,
    expiresWithin90Days,
  };
}

// ============================================
// VALIDATE CERTIFICATION AT TIME OF WORK
// ============================================

export function validateCertificationAtTime(
  cert: CertificationRecord,
  workPerformedAt: Date
): LicenseValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const expiry = new Date(cert.expiryDate);
  const issued = new Date(cert.issuedDate);
  const now = new Date();

  // Was cert issued before work?
  if (issued > workPerformedAt) {
    errors.push(
      `Certification was not yet issued at time of work (issued: ${cert.issuedDate})`
    );
  }

  // Was cert valid at time of work?
  const validAtWorkTime = expiry >= workPerformedAt && issued <= workPerformedAt;
  if (!validAtWorkTime) {
    errors.push(
      `Certification was expired at time of work (expired: ${cert.expiryDate})`
    );
  }

  // Current status
  if (cert.status !== 'active') {
    errors.push(`Certification is currently ${cert.status}`);
  }

  // Warnings
  const daysUntilExpiry = Math.floor(
    (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const expiresWithin30Days = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  const expiresWithin90Days = daysUntilExpiry <= 90 && daysUntilExpiry > 0;

  if (expiresWithin30Days) {
    warnings.push(`Certification expires in ${daysUntilExpiry} days`);
  } else if (expiresWithin90Days) {
    warnings.push(`Certification expires in ${daysUntilExpiry} days`);
  }

  return {
    valid: errors.length === 0,
    validAtWorkTime,
    errors,
    warnings,
    expiresWithin30Days,
    expiresWithin90Days,
  };
}

// ============================================
// JOB TYPE → REQUIRED CREDENTIALS
// ============================================

export interface CredentialRequirement {
  readonly jobType: string;
  readonly industry: string;
  readonly requiredLicenses: readonly LicenseType[];
  readonly requiredCertifications: readonly CertificationType[];
  readonly optional: readonly CertificationType[];
}

/**
 * Returns required credentials for a job type.
 * This is the "law book" for what's needed.
 */
export function getRequiredCredentials(
  jobType: string,
  industry: string
): CredentialRequirement {
  // Medical Gas
  if (industry === 'MEDICAL_GAS' || jobType.includes('medical_gas')) {
    return {
      jobType,
      industry: 'MEDICAL_GAS',
      requiredLicenses: ['PLUMBING', 'MEDICAL_GAS'],
      requiredCertifications: ['ASSE_6010', 'OSHA_10'],
      optional: ['ASSE_6020', 'ASSE_6030'],
    };
  }

  // Backflow Prevention
  if (jobType.includes('backflow')) {
    return {
      jobType,
      industry: 'PLUMBING',
      requiredLicenses: ['PLUMBING'],
      requiredCertifications: ['ASSE_5110'],
      optional: ['ASSE_5120'],
    };
  }

  // Fire Suppression
  if (industry === 'FIRE_SUPPRESSION' || jobType.includes('fire') || jobType.includes('sprinkler')) {
    return {
      jobType,
      industry: 'FIRE_SUPPRESSION',
      requiredLicenses: ['FIRE_SUPPRESSION'],
      requiredCertifications: ['NFPA_NICET', 'OSHA_10'],
      optional: ['OSHA_30'],
    };
  }

  // HVAC with refrigerant
  if (jobType.includes('refrigerant') || jobType.includes('ac_install') || jobType.includes('ac_repair')) {
    return {
      jobType,
      industry: 'HVAC',
      requiredLicenses: ['HVAC'],
      requiredCertifications: ['EPA_608'],
      optional: ['OSHA_10', 'MANUFACTURER_CERT'],
    };
  }

  // Standard HVAC
  if (industry === 'HVAC') {
    return {
      jobType,
      industry: 'HVAC',
      requiredLicenses: ['HVAC'],
      requiredCertifications: [],
      optional: ['EPA_608', 'OSHA_10'],
    };
  }

  // Standard Plumbing
  if (industry === 'Plumbing') {
    return {
      jobType,
      industry: 'PLUMBING',
      requiredLicenses: ['PLUMBING'],
      requiredCertifications: [],
      optional: ['OSHA_10'],
    };
  }

  // Standard Electrical
  if (industry === 'Electrical') {
    return {
      jobType,
      industry: 'ELECTRICAL',
      requiredLicenses: ['ELECTRICAL'],
      requiredCertifications: [],
      optional: ['OSHA_10'],
    };
  }

  // Default - no specific requirements
  return {
    jobType,
    industry,
    requiredLicenses: [],
    requiredCertifications: [],
    optional: [],
  };
}

// ============================================
// VALIDATE ALL CREDENTIALS FOR JOB
// ============================================

export interface FullCredentialValidation {
  readonly valid: boolean;
  readonly missingLicenses: readonly LicenseType[];
  readonly missingCertifications: readonly CertificationType[];
  readonly expiredAtWorkTime: readonly string[];
  readonly currentlyExpired: readonly string[];
  readonly warnings: readonly string[];
}

export function validateCredentialsForJob(
  jobType: string,
  industry: string,
  licenses: readonly LicenseRecord[],
  certifications: readonly CertificationRecord[],
  workPerformedAt: Date
): FullCredentialValidation {
  const requirements = getRequiredCredentials(jobType, industry);
  const missingLicenses: LicenseType[] = [];
  const missingCertifications: CertificationType[] = [];
  const expiredAtWorkTime: string[] = [];
  const currentlyExpired: string[] = [];
  const warnings: string[] = [];

  // Check required licenses
  for (const requiredType of requirements.requiredLicenses) {
    const found = licenses.find(l => l.licenseType === requiredType);
    if (!found) {
      missingLicenses.push(requiredType);
    } else {
      const validation = validateLicenseAtTime(found, workPerformedAt);
      if (!validation.validAtWorkTime) {
        expiredAtWorkTime.push(`License: ${requiredType}`);
      }
      if (!validation.valid) {
        currentlyExpired.push(`License: ${requiredType}`);
      }
      warnings.push(...validation.warnings);
    }
  }

  // Check required certifications
  for (const requiredType of requirements.requiredCertifications) {
    const found = certifications.find(c => c.certType === requiredType);
    if (!found) {
      missingCertifications.push(requiredType);
    } else {
      const validation = validateCertificationAtTime(found, workPerformedAt);
      if (!validation.validAtWorkTime) {
        expiredAtWorkTime.push(`Certification: ${requiredType}`);
      }
      if (!validation.valid) {
        currentlyExpired.push(`Certification: ${requiredType}`);
      }
      warnings.push(...validation.warnings);
    }
  }

  return {
    valid:
      missingLicenses.length === 0 &&
      missingCertifications.length === 0 &&
      expiredAtWorkTime.length === 0,
    missingLicenses,
    missingCertifications,
    expiredAtWorkTime,
    currentlyExpired,
    warnings,
  };
}


