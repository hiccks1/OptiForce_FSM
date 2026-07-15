// ============================================
// packages/core/src/context/RequestContext.ts
// Request Context - WHO is doing WHAT
// ============================================
// LAYER: Context
// IMPORTS FROM: types, @prisma/client
// EXPORTS TO: services, domain
// ============================================

import { randomUUID } from 'node:crypto';
import type { ActorType, UserRole } from '@prisma/client';
import type { CompanyId, UserId } from '../types';

// ============================================
// REQUEST CONTEXT (IMMUTABLE)
// ============================================

export interface RequestContext {
  // Trace
  readonly requestId: string;
  readonly timestamp: Date;

  // Tenant isolation (REQUIRED)
  readonly companyId: CompanyId;

  // Actor identification
  readonly actorId: UserId | null;
  readonly actorType: ActorType;

  // Human-specific
  readonly userRole?: UserRole;
  readonly userEmail?: string;

  // AI-specific (Betty)
  readonly ai?: {
    readonly sessionId: string;
    readonly intent?: string;
    readonly confidence: number;
    readonly model: string;
  };

  // Request metadata
  readonly source: 'api' | 'worker' | 'cron' | 'betty' | 'webhook' | 'migration';
  readonly ipAddress?: string;
  readonly userAgent?: string;

  // Custom metadata (for hooks, logging)
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ============================================
// FACTORY: Human User Context
// ============================================

export interface CreateUserContextParams {
  companyId: CompanyId;
  userId: UserId;
  userRole: UserRole;
  userEmail?: string;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export function createUserContext(
  params: CreateUserContextParams
): RequestContext {
  return Object.freeze({
    requestId: params.requestId ?? randomUUID(),
    timestamp: new Date(),
    companyId: params.companyId,
    actorId: params.userId,
    actorType: 'HUMAN' as ActorType,
    userRole: params.userRole,
    userEmail: params.userEmail,
    source: 'api',
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    metadata: params.metadata ? Object.freeze(params.metadata) : undefined,
  });
}

// ============================================
// FACTORY: Betty AI Context
// ============================================

export interface CreateBettyContextParams {
  companyId: CompanyId;
  sessionId: string;
  intent?: string;
  confidence: number;
  model: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export function createBettyContext(
  params: CreateBettyContextParams
): RequestContext {
  return Object.freeze({
    requestId: params.requestId ?? randomUUID(),
    timestamp: new Date(),
    companyId: params.companyId,
    actorId: null,
    actorType: 'AI' as ActorType,
    source: 'betty',
    ai: Object.freeze({
      sessionId: params.sessionId,
      intent: params.intent,
      confidence: params.confidence,
      model: params.model,
    }),
    metadata: params.metadata ? Object.freeze(params.metadata) : undefined,
  });
}

// ============================================
// FACTORY: System Context (cron, workers)
// ============================================

export interface CreateSystemContextParams {
  companyId: CompanyId;
  source: 'worker' | 'cron' | 'migration' | 'webhook';
  jobName?: string;
  requestId?: string;
  metadata?: Record<string, unknown>;
}

export function createSystemContext(
  params: CreateSystemContextParams
): RequestContext {
  return Object.freeze({
    requestId: params.requestId ?? `${params.source}-${params.jobName ?? 'unknown'}-${Date.now()}`,
    timestamp: new Date(),
    companyId: params.companyId,
    actorId: null,
    actorType: 'SYSTEM' as ActorType,
    source: params.source,
    metadata: params.metadata
      ? Object.freeze({ ...params.metadata, jobName: params.jobName })
      : params.jobName
        ? Object.freeze({ jobName: params.jobName })
        : undefined,
  });
}

// ============================================
// TYPE GUARDS
// ============================================

export function isHumanActor(ctx: RequestContext): boolean {
  return ctx.actorType === 'HUMAN';
}

export function isAIActor(ctx: RequestContext): boolean {
  return ctx.actorType === 'AI';
}

export function isSystemActor(ctx: RequestContext): boolean {
  return ctx.actorType === 'SYSTEM';
}

export function hasUserId(ctx: RequestContext): ctx is RequestContext & { actorId: UserId } {
  return ctx.actorId !== null;
}

// ============================================
// CONTEXT ASSERTIONS
// ============================================

export function assertHumanActor(ctx: RequestContext): asserts ctx is RequestContext & {
  actorType: 'HUMAN';
  actorId: UserId;
  userRole: UserRole;
} {
  if (ctx.actorType !== 'HUMAN') {
    throw new Error(`Expected HUMAN actor, got ${ctx.actorType}`);
  }
  if (!ctx.actorId) {
    throw new Error('Human actor must have actorId');
  }
  if (!ctx.userRole) {
    throw new Error('Human actor must have userRole');
  }
}

export function assertAIActor(ctx: RequestContext): asserts ctx is RequestContext & {
  actorType: 'AI';
  ai: NonNullable<RequestContext['ai']>;
} {
  if (ctx.actorType !== 'AI') {
    throw new Error(`Expected AI actor, got ${ctx.actorType}`);
  }
  if (!ctx.ai) {
    throw new Error('AI actor must have ai metadata');
  }
}


