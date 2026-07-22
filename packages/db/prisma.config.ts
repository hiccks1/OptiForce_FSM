import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'prisma/config'; 

// 💡 Guarantees your .env file at the monorepo root is read perfectly 
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export default defineConfig({
  schema: 'prisma/schema.prisma', 

  migrations: {
    path: 'prisma/migrations',
    seed: 'pnpm tsx prisma/seed-data.ts', 
  },

  datasource: {
    // 💡 Connects to your Docker container via localhost forward
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/fsm',
  },
});
