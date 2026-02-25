import { DriftyLayer } from "../../drifty/laws";
// packages/db/src/index.ts

export * from './generated/prisma/client';
export { prisma, shutdownPrisma } from './prisma';


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L1_DATA],
} as const;
