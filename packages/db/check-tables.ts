export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L1_DATA"],
};

import { PrismaClient } from './src/client';

const prisma = new PrismaClient();

async function main() {
  // Query the list of tables from Postgres
  const tables = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public';`;

  console.log('Tables in "fsm" database:');
  tables.forEach((t) => console.log(`- ${t.tablename}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
