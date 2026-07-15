// /FSM/packages/db/scripts/test-database.ts

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L1_DATA"],
};

import "dotenv/config";
import { prisma } from "../src/client.js";

async function testDatabase() {
  console.log("🔌 Testing database connection...\n");

  try {
    // Test connection
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL\n");

    // Test query
    const result = await prisma.$queryRaw`SELECT version()`;
    console.log("📊 Database version:", result);

    console.log("\n🎉 Database connection successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
