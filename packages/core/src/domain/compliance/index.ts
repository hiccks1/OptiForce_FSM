// ============================================
// packages/core/src/domain/compliance/index.ts
// Compliance Domain Barrel Export
// ============================================

// Chain of Custody
export {
  type ChainLink,
  type ChainVerificationResult,
  type HashInputs,
  type AuditChainEntry,
  type IntegrityProof,
  type TamperCheckResult,
  verifyChainContinuity,
  buildHashInput,
  validateAuditChainEntry,
  buildIntegrityProof,
  checkForTampering,
} from './ChainOfCustody';

// License Validation
export {
  type LicenseType,
  type CertificationType,
  type LicenseRecord,
  type CertificationRecord,
  type LicenseValidationResult,
  type CredentialRequirement,
  type FullCredentialValidation,
  validateLicenseAtTime,
  validateCertificationAtTime,
  getRequiredCredentials,
  validateCredentialsForJob,
} from './LicenseValidation';

// Test Equipment
export {
  type TestEquipmentType,
  type CalibrationRecord,
  type CalibrationValidationResult,
  type EquipmentRequirement,
  type FullEquipmentValidation,
  type CalibrationScheduleItem,
  validateCalibrationAtTime,
  getRequiredEquipment,
  validateEquipmentForTest,
  buildCalibrationSchedule,
} from './TestEquipment';

// C2PA Manifests
export {
  type C2PAClaim,
  type C2PAClaimType,
  type C2PAManifest,
  type PhotoCaptureContext,
  type ManifestValidationResult,
  type ManifestSummary,
  buildC2PAClaims,
  validateManifestStructure,
  summarizeManifest,
} from './C2PAManifest';


