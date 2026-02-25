// /FSM/packages/db/src/client.ts
import { PrismaClient } from "./generated/prisma/client.ts";

import { DriftyLayer } from "../../drifty/laws";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Client for Drifty / FSM stack
 * - Uses Postgres provider
 * - Logs queries in development
 * - Global singleton to avoid multiple instances in dev
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export { PrismaClient };


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L1_DATA],
} as const;
