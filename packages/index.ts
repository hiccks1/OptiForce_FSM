// @fsm/db package index.ts
// Single source of truth. Prisma 7 maps clean enums directly.
export { UserRole, ActorType } from '@fsm/db';

// If you need explicit, non-colliding TS type aliases:
export type { UserRole as UserRoleType, ActorType as ActorTypeType } from '@fsm/db';
