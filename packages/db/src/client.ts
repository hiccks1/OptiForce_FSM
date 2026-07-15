import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { PrismaClient } from './generated/prisma/client';

const globalForDatabase = globalThis as unknown as {
  prismaInstance: PrismaClient | undefined;
  poolInstance: pg.Pool | undefined;
};

if (!globalForDatabase.poolInstance) {
  globalForDatabase.poolInstance = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

if (!globalForDatabase.prismaInstance) {
  const adapter = new PrismaPg(globalForDatabase.poolInstance);

  const globalForDatabase = globalThis as unknown as {
  prismaInstance: any; 
  poolInstance: pg.Pool | undefined;
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma = globalForDatabase.prismaInstance;

export async function shutdownPrisma() {
  await prisma.$disconnect();
  await globalForDatabase.poolInstance?.end();
}
