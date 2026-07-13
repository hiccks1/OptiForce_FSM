// ============================================
// packages/core/src/domain/index.ts
// Domain Layer Barrel Export
// ============================================
// LAYER: Domain
// VERSION: 1.0.0
//
// This layer contains PURE BUSINESS LOGIC:
// - No I/O
// - No Prisma
// - No side effects
// - Only pure functions and types
// ============================================

// Job Domain
export * from './job';

// Visit Domain
export * from './visit';

// Compliance Domain (Regulated Industries)
export * from './compliance';

// TODO: Add these domains as needed:
// export * from './contract';
// export * from './changeOrder';
// export * from './invoice';
// export * from './estimate';
// export * from './customer';
// export * from './technician';


