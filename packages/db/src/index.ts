export * from './client';
export * from './transactions';

// Re-export runtime enums, the namespace, AND the concrete PrismaClient class
export { UserRole, ActorType, DocumentStatus, Prisma, PrismaClient } from './generated/prisma/client';
