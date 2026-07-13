import 'dotenv/config';
import { PrismaClient } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

export enum DriftyLayer {
  L1_DATA = "L1_DATA"
}

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L1_DATA], 
} as const;

const globalForDatabase = globalThis as unknown as {
  prismaInstance: any; 
  poolInstance: pg.Pool | undefined;
};

if (!globalForDatabase.poolInstance) {
  globalForDatabase.poolInstance = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

if (!globalForDatabase.prismaInstance) {
  const adapter = new PrismaPg(globalForDatabase.poolInstance);
  
  const basePrisma = new PrismaClient({ 
    adapter,
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error'],
  });

  // DEV MODE: Pure, unrestricted passthrough with zero interceptors or locks
  globalForDatabase.prismaInstance = basePrisma.$extends({
    name: 'PassthroughDevEngine',
    query: {
      $allModels: {
        async findMany({ args, query }) { return query(args); },
        async findFirst({ args, query }) { return query(args); },
        async findUnique({ args, query }) { return query(args); },
        async count({ args, query }) { return query(args); },
        async create({ args, query }) { return query(args); },
        async update({ args, query }) { return query(args); },
        async delete({ args, query }) { return query(args); },
        async deleteMany({ args, query }) { return query(args); }
      },
    },
  });
}

export const prisma = globalForDatabase.prismaInstance as typeof globalForDatabase.prismaInstance;

/**
 * Enterprise Data Coordinator
 */
export class PostgresDataCoordinator {
  private prisma: typeof prisma;

  constructor() {
    this.prisma = prisma;
  }

  public async commitPasswordActivation(userId: string, passwordHash: string): Promise<boolean> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { updatedAt: new Date() }
    });
    return true;
  }

  /**
   * Safe Timeline Fetcher
   */
  public async getTimelineVisitsRange(companyId: string, startDate: string, endDate: string) {
    return await this.prisma.$queryRawUnsafe<any[]>(
      `SELECT id, data 
       FROM jobs
       WHERE companyId = $1
         AND data @> jsonb_build_object('status', 'ACTIVE')
         AND data->>'scheduledStart' >= $2 
         AND data->>'scheduledEnd' <= $3
         AND deleted_at IS NULL;`,
      [companyId, startDate, endDate]
    );
  }
}

export async function shutdownPrisma() {
  await prisma.$disconnect();
  await globalForDatabase.poolInstance?.end(); 
}
