// ============================================
// packages/core/src/errors/index.ts
// Error Classes Barrel Export
// ============================================
// LAYER: Errors
// VERSION: 1.0.0
// ============================================

export { DomainError } from './base';
export { ValidationError } from './validation';
export { NotFoundError } from './notFound';
export { AuthorizationError } from './authorization';
export { ConflictError } from './conflict';
export { ConfigurationError } from './configuration';

// ============================================
// ERROR TYPE GUARDS
// ============================================

import { DomainError } from './base';
import { ValidationError } from './validation';
import { NotFoundError } from './notFound';
import { AuthorizationError } from './authorization';
import { ConflictError } from './conflict';
import { ConfigurationError } from './configuration';

export const isDomainError = (error: unknown): error is DomainError =>
  error instanceof DomainError;

export const isValidationError = (error: unknown): error is ValidationError =>
  error instanceof ValidationError;

export const isNotFoundError = (error: unknown): error is NotFoundError =>
  error instanceof NotFoundError;

export const isAuthorizationError = (error: unknown): error is AuthorizationError =>
  error instanceof AuthorizationError;

export const isConflictError = (error: unknown): error is ConflictError =>
  error instanceof ConflictError;

export const isConfigurationError = (error: unknown): error is ConfigurationError =>
  error instanceof ConfigurationError;

// ============================================
// ERROR CODE CONSTANTS
// ============================================

export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  CONFLICT_ERROR: 'CONFLICT_ERROR',
  CONFIGURATION_ERROR: 'CONFIGURATION_ERROR',
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];


