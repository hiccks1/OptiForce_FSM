import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

// Prisma 7 Global Type declaration pattern for hot-reloading environments
declare global {
  var prismaInstance: PrismaClient | undefined;
}

const logLevels: ('query' | 'info' | 'warn' | 'error')[] = 
  process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'];

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Prisma 7 Standard: Pass the connection payload directly into PrismaPg
  const adapter = new PrismaPg({ 
    connectionString: process.env.DATABASE_URL 
  });
  
  prisma = new PrismaClient({ adapter, log: logLevels });
} else {
  // Prevent duplicate client generation loops during hot-reloading (Gin/Vite/Next)
  if (!globalThis.prismaInstance) {
    const adapter = new PrismaPg({ 
      connectionString: process.env.DATABASE_URL 
    });
    
    globalThis.prismaInstance = new PrismaClient({ adapter, log: logLevels });
  }
  prisma = globalThis.prismaInstance;
}

export { prisma };

export async function shutdownPrisma() {
  await prisma.$disconnect();
}
