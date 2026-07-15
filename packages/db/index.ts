export * from './client';
export * from './transactions';

// 1. Manually export the runtime enums as browser-safe plain objects
export const UserRole = {
  admin: 'admin',
  tech: 'tech',
  USER: 'USER', // Add all string keys exactly as defined in your schema.prisma
} as const;
export type UserRole = typeof UserRole[keyof typeof UserRole];

export const ActorType = {
  SYSTEM: 'SYSTEM',
  USER: 'USER',
} as const;
export type ActorType = typeof ActorType[keyof typeof ActorType];

// 2. Export remaining Prisma client types safely without crashing Vite
export type { Prisma } from './generated/prisma';
