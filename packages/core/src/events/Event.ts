// ============================================
// packages/core/src/events/Event.ts
// Domain Event System
// ============================================

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: '1.0.0',
  layers: ['L1_DATA'],
};

import { randomUUID } from 'node:crypto';
import type { PrismaClient } from '@prisma/client';
import type { RequestContext } from '../context/RequestContext';
import { writeAuditLog } from '../audit/writeAuditLog';

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

    const handlers = this.handlers.get(eventType) || [];
    const results = await Promise.allSettled(
      handlers.map(async (handler) => {
        try {
          await handler(event);
        } catch (error) {
          try {
            await this.auditHandlerFailure(event, handler.name, error);
          } catch (auditError) {
            throw new AggregateError(
              [error, auditError],
              `Event handler and failure audit both failed: ${handler.name || 'anonymous'}`
            );
          }
          throw error;
        }

        await this.auditHandlerSuccess(event, handler.name);
      })
    );

    const failures = results.flatMap((result) =>
      result.status === 'rejected' ? [result.reason] : []
    );

    if (failures.length > 0) {
      throw new AggregateError(
        failures,
        `${failures.length} handler(s) failed for event ${eventType}`
      );
    }
  }

  // ============================================================
  // PERSISTENCE & AUDIT
  // ============================================================

  private async persistEvent(event: DomainEvent): Promise<void> {
    await writeAuditLog(this.prisma, {
      companyId: event.context.companyId,
      actorId: event.context.actorId,
      actorType: event.context.actorType,
      entityType: 'domainEvent',
      entityId: event.id,
      action: event.type,
      payload: {
        version: event.version,
        timestamp: event.timestamp.toISOString(),
        data: event.payload,
      },
    });
  }

  private async auditHandlerSuccess(
    event: DomainEvent,
    handlerName: string
  ): Promise<void> {
    const handlerId = handlerName || 'anonymous';
    
    await writeAuditLog(this.prisma, {
      companyId: event.context.companyId,
      actorId: event.context.actorId,
      actorType: event.context.actorType,
      entityType: 'domainEvent',
      entityId: event.id,
      action: `event.handler.${event.type}.${handlerId}`,
      payload: { success: true },
    });
  }

  private async auditHandlerFailure(
    event: DomainEvent,
    handlerName: string,
    error: unknown
  ): Promise<void> {
    const handlerId = handlerName || 'anonymous';
    
    await writeAuditLog(this.prisma, {
      companyId: event.context.companyId,
      actorId: event.context.actorId,
      actorType: event.context.actorType,
      entityType: 'domainEvent',
      entityId: event.id,
      action: `event.handler.${event.type}.${handlerId}`,
      payload: {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
  }
}
