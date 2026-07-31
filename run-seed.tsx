// run-seed.ts
import { seedDemoMatrix } from '@fsm/db';

// Extract flags from the dynamic terminal execution arguments array
const args = process.argv.slice(2);
const companyId = args.find(a => a.startsWith('--companyId='))?.split('=')[1];
const profile = args.find(a => a.startsWith('--profile='))?.split('=')[1];

if (companyId && profile) {
  seedDemoMatrix(companyId, profile).catch(err => {
    console.error("❌ Workspace Execution Failure:", err);
    process.exit(1);
  });
} else {
  console.error("❌ Error: Missing execution variables.");
  process.exit(1);
}
