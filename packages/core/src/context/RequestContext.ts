// ============================================
// packages/core/src/context/RequestContext.ts
// Context Creation & Validation
// ============================================

import { randomUUID } from 'node:crypto';
import type { RequestContext } from '../types';

export interface CreateContextParams {
  userId: string;
  companyId: string;
  actorType: ActorType;
  userRole?: UserRole;
  userEmail?: string;
  bettySessionId?: string;
  bettyConfidence?: number;
  bettyIntent?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

export function createContext(params: CreateContextParams): RequestContext {
  return {
    requestId: randomUUID(),
    userId: params.userId,
    companyId: params.companyId,
    actorType: params.actorType,
    userRole: params.userRole,
    userEmail: params.userEmail,
    bettySessionId: params.bettySessionId,
    bettyConfidence: params.bettyConfidence,
    bettyIntent: params.bettyIntent,
    timestamp: new Date(),
    ipAddress: params.ipAddress,
    userAgent: params.userAgent,
    metadata: params.metadata,
  };
}

// Type guards
export function isHuman(context: RequestContext): boolean {
  return context.actorType === 'HUMAN';
}

export function isAI(context: RequestContext): boolean {
  return context.actorType === 'AI';
}

export function isSystem(context: RequestContext): boolean {
  return context.actorType === 'SYSTEM';
}
