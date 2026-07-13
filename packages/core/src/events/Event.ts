// ============================================
// packages/core/src/events/Event.ts
// Domain Event System
// ============================================

import { randomUUID } from 'node:crypto';
import type { PrismaClient } from '@prisma/client';
import type { RequestContext } from '../types';

// ============================================================
// DOMAIN EVENT TYPES
// ============================================================

export interface DomainEvent {
  readonly id: string;
  readonly type: string;
  readonly version: number;
  readonly timestamp: Date;
  readonly context: RequestContext;
  readonly payload: Record<string, unknown>;
}

export type EventHandler = (event: DomainEvent) => Promise<void>;

// ============================================================
// EVENT EMITTER
// ============================================================

export class EventEmitter {
  private readonly handlers = new Map<string, readonly EventHandler[]>();

  constructor(private readonly prisma: PrismaClient) {}

  // ============================================================
  // REGISTER HANDLER
  // ============================================================

  on(eventType: string, handler: EventHandler): void {
    const existing = this.handlers.get(eventType) || [];
    this.handlers.set(eventType, [...existing, handler]);
  }

  // ============================================================
  // EMIT EVENT (WITH AUDIT & ERROR HANDLING)
  // ============================================================

  async emit(
    ctx: RequestContext,
    eventType: string,
    payload: Record<string, unknown>
  ): Promise<void> {
    const event: DomainEvent = Object.freeze({
      id: randomUUID(),
      type: eventType,
      version: 1,
      timestamp: new Date(),
      context: ctx,
      payload,
    });

    // Persist event for audit trail
    await this.persistEvent(event);

    // Execute handlers with individual error handling
    const handlers = this.handlers.get(eventType) || [];
    
    await Promise.allSettled(
      handlers.map(async (handler) => {
        try {
          await handler(event);
          await this.auditHandlerSuccess(event, handler.name);
        } catch (error) {
          await this.auditHandlerFailure(event, handler.name, error);
          // Don't throw - allow other handlers to continue
        }
      })
    );
  }

  // ============================================================
  // PERSISTENCE & AUDIT
  // ============================================================

  private async persistEvent(event: DomainEvent): Promise<void> {
    await this.ctx.prisma.domainEvent.create({
      data: {
        id: event.id,
        type: event.type,
        version: event.version,
        companyId: event.context.companyId,
        actorId: event.context.userId,
        actorType: event.context.actorType,
        payload: event.payload as any,
        timestamp: event.timestamp,
      },
    });
  }

  private async auditHandlerSuccess(
    event: DomainEvent,
    handlerName: string
  ): Promise<void> {
    const handlerId = handlerName || 'anonymous';
    
    try {
      await this.ctx.prisma.aiActionLog.create({
        data: {
          companyId: event.context.companyId,
          actorId: event.context.userId,
          actorType: event.context.actorType,
          action: `event.handler.${event.type}.${handlerId}`,
          input: { eventId: event.id },
          outcome: { success: true },
          allowed: true,
        },
      });
    } catch (error) {
      // Silent failure - don't let audit errors break event flow
      console.error('Failed to audit handler success:', error);
    }
  }

  private async auditHandlerFailure(
    event: DomainEvent,
    handlerName: string,
    error: unknown
  ): Promise<void> {
    const handlerId = handlerName || 'anonymous';
    
    try {
      await this.ctx.prisma.aiActionLog.create({
        data: {
          companyId: event.context.companyId,
          actorId: event.context.userId,
          actorType: event.context.actorType,
          action: `event.handler.${event.type}.${handlerId}`,
          input: { eventId: event.id },
          outcome: {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          },
          allowed: true,
        },
      });
    } catch (auditError) {
      // Silent failure - don't let audit errors break event flow
      console.error('Failed to audit handler failure:', auditError);
    }
  }
}


