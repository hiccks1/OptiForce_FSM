import { prisma } from '@fsm/db';

async function main() {
  console.log('🚀 Testing Prisma 7 Monorepo Client Connection...');
  
  // A simple baseline query that doesn't rely on mock data shapes
  const companyId = process.env.SEED_COMPANY_ID || 'test-seed-company';

  console.log('🏢 Attempting to upsert a baseline test company record...');
  
  const testCompany = await prisma.company.upsert({
    where: { id: companyId },
    update: { 
      name: 'FSM Test Baseline',
    },
    create: { 
      id: companyId, 
      name: 'FSM Test Baseline',
    },
  });

  console.log('✅ Connection verification complete! Record updated:', testCompany.id);
}

main()
  .catch((e) => {
    console.error('❌ Connection or query failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    // Gracefully clean up and close open pg socket pools
    const { shutdownPrisma } = await import('@fsm/db');
    await shutdownPrisma();
    console.log('🔌 Open database sockets closed cleanly.');
  });
