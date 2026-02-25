// ============================================
// packages/core/src/errors/configuration.ts
// Configuration Errors
// ============================================

import { DomainError } from './base';

import { DriftyLayer } from "../../drifty/laws";
/**
 * Thrown when company/system configuration is invalid or missing.
 * 
 * Use for:
 * - Missing company config
 * - Invalid config schema
 * - Feature flag issues
 * - Missing required settings
 */
export class ConfigurationError extends DomainError {
  constructor(
    message: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'CONFIGURATION_ERROR', 500, details);
  }

  /**
   * Factory for missing company config
   */
  static missingCompanyConfig(companyId: string): ConfigurationError {
    return new ConfigurationError(
      'Company configuration not found',
      { companyId, reason: 'missing_config' }
    );
  }

  /**
   * Factory for missing feature flag
   */
  static featureDisabled(
    feature: string,
    companyId: string
  ): ConfigurationError {
    return new ConfigurationError(
      `Feature "${feature}" is not enabled`,
      {
        feature,
        companyId,
        reason: 'feature_disabled',
      }
    );
  }

  /**
   * Factory for invalid config value
   */
  static invalidValue(
    path: string,
    expected: string,
    received: unknown
  ): ConfigurationError {
    return new ConfigurationError(
      `Invalid configuration at ${path}: expected ${expected}`,
      {
        path,
        expected,
        received: String(received),
        reason: 'invalid_value',
      }
    );
  }

  /**
   * Factory for schema version incompatibility
   */
  static incompatibleSchema(
    current: string,
    required: string
  ): ConfigurationError {
    return new ConfigurationError(
      `Configuration schema incompatible: requires ${required}, found ${current}`,
      {
        currentVersion: current,
        requiredVersion: required,
        reason: 'incompatible_schema',
      }
    );
  }
}


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L0_REPO],
} as const;
