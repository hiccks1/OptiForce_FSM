// packages/db/prisma/seed.ts  
/* eslint-disable no-console */  
import { config } from 'dotenv';  
import { resolve } from 'node:path';  
import { Pool } from 'pg';  
  
import { PrismaPg } from '@prisma/adapter-pg';  
import { PrismaClient } from '../src/generated/prisma/client';  
  
const connectionString =  
  process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/fsm';  
const pool = new Pool({ connectionString });  
const adapter = new PrismaPg(pool);  
const prisma = new PrismaClient({ adapter });

// ---------- helpers ----------  
function at(dayOffset: number, hour: number, minutes = 0): string {  
  const d = new Date();  
  d.setDate(d.getDate() + dayOffset);  
  d.setHours(hour, minutes, 0, 0);  
  return d.toISOString();  
}  
function plusHours(iso: string, hours: number): string {  
  return new Date(new Date(iso).getTime() + hours * 3600_000).toISOString();  
}  
  
// 10 companies. comp_demo_123 is first so the hardcoded web client lands on real data.  
const COMPANIES = [  
  { id: 'comp_demo_123', name: 'OptiForce Field Services', subdomain: 'demo', color: '#4f46e5' },  
  { id: 'comp_demo_002', name: 'Newport Smart Automation', subdomain: 'newport', color: '#0ea5e9' },  
  { id: 'comp_demo_003', name: 'South Bay Elite Plumbing', subdomain: 'southbay', color: '#059669' },  
  { id: 'comp_demo_004', name: 'North County Industrial Electrical', subdomain: 'northcounty', color: '#d97706' },  
  { id: 'comp_demo_005', name: 'Harbor HVAC & Refrigeration', subdomain: 'harbor', color: '#dc2626' },  
  { id: 'comp_demo_006', name: 'Summit Mechanical Group', subdomain: 'summit', color: '#7c3aed' },  
  { id: 'comp_demo_007', name: 'Greenline Facilities Services', subdomain: 'greenline', color: '#16a34a' },  
  { id: 'comp_demo_008', name: 'Metro Fire & Safety', subdomain: 'metro', color: '#ea580c' },  
  { id: 'comp_demo_009', name: 'Coastal Solar & Roofing', subdomain: 'coastal', color: '#0891b2' },  
  { id: 'comp_demo_010', name: 'Valley Pro Appliance Repair', subdomain: 'valley', color: '#be185d' },  
];  
  
const FIRST = ['Amir', 'Dana', 'Leo', 'Sara', 'Ravi', 'Nina', 'Owen', 'Mia', 'Carlos', 'Priya'];  
const LAST = ['Kaplan', 'Ruiz', 'Chen', 'Hendricks', 'Okafor', 'Pratt', 'Lopez', 'Nguyen', 'Feld', 'Ramos'];  
  
type Cust = { name: string; serviceType: string; line1: string; city: string; state: string; postalCode: string };  
const CUSTOMER_POOL: Cust[] = [  
  { name: 'Hendricks Residence', serviceType: 'HVAC', line1: '1420 Oak Meadow Dr', city: 'Austin', state: 'TX', postalCode: '78745' },  
  { name: 'Bright Cafe', serviceType: 'Refrigeration', line1: '88 Congress Ave', city: 'Austin', state: 'TX', postalCode: '78701' },  
  { name: 'Pratt Manufacturing', serviceType: 'Electrical', line1: '3200 Industrial Blvd', city: 'Round Rock', state: 'TX', postalCode: '78664' },  
  { name: 'Okafor Family', serviceType: 'Plumbing', line1: '705 Cedar Ln', city: 'Cedar Park', state: 'TX', postalCode: '78613' },  
  { name: 'Riverside Apartments', serviceType: 'HVAC', line1: '50 Riverwalk Pkwy', city: 'Austin', state: 'TX', postalCode: '78704' },  
  { name: 'Lopez Bakery', serviceType: 'Refrigeration', line1: '212 E 6th St', city: 'Austin', state: 'TX', postalCode: '78701' },  
  { name: 'Summit Dental Group', serviceType: 'HVAC', line1: '900 Medical Pkwy', city: 'Pflugerville', state: 'TX', postalCode: '78660' },  
  { name: 'Blue Harbor Hotel', serviceType: 'Plumbing', line1: '17 Lakeshore Dr', city: 'Austin', state: 'TX', postalCode: '78703' },  
  { name: 'Nguyen Residence', serviceType: 'Electrical', line1: '640 Maple Ct', city: 'Leander', state: 'TX', postalCode: '78641' },  
  { name: 'Ramos Auto Center', serviceType: 'HVAC', line1: '2200 Service Rd', city: 'Austin', state: 'TX', postalCode: '78744' },  
  { name: 'Greenfield School', serviceType: 'Electrical', line1: '400 Learning Way', city: 'Round Rock', state: 'TX', postalCode: '78665' },  
  { name: 'Harborview Offices', serviceType: 'HVAC', line1: '1 Harbor Plaza', city: 'Austin', state: 'TX', postalCode: '78702' },  
  { name: 'Delgado Residence', serviceType: 'Plumbing', line1: '318 Sunset Blvd', city: 'Cedar Park', state: 'TX', postalCode: '78613' },  
  { name: 'Peak Fitness Club', serviceType: 'Refrigeration', line1: '55 Fitness Dr', city: 'Austin', state: 'TX', postalCode: '78745' },  
  { name: 'Willow Creek HOA', serviceType: 'HVAC', line1: '77 Willow Creek Rd', city: 'Georgetown', state: 'TX', postalCode: '78626' },  
  { name: 'Sunrise Diner', serviceType: 'Refrigeration', line1: '9 Morning Ln', city: 'Austin', state: 'TX', postalCode: '78702' },  
  { name: 'Feld Residence', serviceType: 'Plumbing', line1: '145 Birch St', city: 'Leander', state: 'TX', postalCode: '78641' },  
  { name: 'Cross Logistics', serviceType: 'Electrical', line1: '4100 Freight Way', city: 'Austin', state: 'TX', postalCode: '78744' },  
  { name: 'Vale Medical Center', serviceType: 'HVAC', line1: '600 Health Dr', city: 'Pflugerville', state: 'TX', postalCode: '78660' },  
  { name: 'Chen Residence', serviceType: 'Plumbing', line1: '222 Pine Ct', city: 'Cedar Park', state: 'TX', postalCode: '78613' },  
];  
  
const HOURS = [8, 10, 13, 15, 17]; // 5 visit slots per working day  
const VISIT_TITLES: Record<string, string[]> = {  
  HVAC: ['AC diagnostic', 'Furnace tune-up', 'Thermostat install', 'Filter service', 'Compressor check'],  
  Refrigeration: ['Walk-in cooler service', 'Compressor check', 'Gasket replacement', 'Temp calibration', 'Coil cleaning'],  
  Electrical: ['Panel inspection', 'Outlet repair', 'Lighting install', 'Breaker replacement', 'Wiring survey'],  
  Plumbing: ['Leak repair', 'Water heater service', 'Drain cleaning', 'Fixture install', 'Pipe inspection'],  
};  
  
function portalSchema(name: string, color: string) {  
  return {  
    version: '1.0',  
    features: ['scheduling', 'documents', 'customer-portal'],  
    customerPortal: {  
      title: `${name} Customer Portal`,  
      description: 'View your upcoming service appointments, documents, and account balance.',  
      primaryColor: color,  
      allowReschedule: true,  
    },  
  };  
}  
  
async function seedCompany(co: (typeof COMPANIES)[number], index: number) {  
  const { id: companyId, name, subdomain, color } = co;  
  
  await prisma.company.upsert({  
    where: { id: companyId },  
    update: { name, subdomain },  
    create: { id: companyId, name, subdomain },  
  });  
  
  await prisma.companyConfig.upsert({  
    where: { companyId_version: { companyId, version: 1 } },  
    update: { isActive: true, schema: portalSchema(name, color) },  
    create: { companyId, version: 1, isActive: true, contentHash: `cfg-${companyId}`, schema: portalSchema(name, color), createdBy: 'seed' },  
  });  
  
  // Users: owner + csr + manager + 7 field techs (>= 10 employees, 7 field)  
  const office = [  
    { suffix: 'owner', role: 'OWNER' as const, label: 'Owner' },  
    { suffix: 'csr', role: 'CSR' as const, label: 'CSR' },  
    { suffix: 'manager', role: 'MANAGER' as const, label: 'Manager' },  
  ];  
  for (const o of office) {  
    const email = `${o.suffix}@${subdomain}.demo`;  
    await prisma.user.upsert({  
      where: { email },  
      update: { name: `${o.label} — ${name}`, role: o.role, companyId },  
      create: { id: `user_${companyId}_${o.suffix}`, email, name: `${o.label} — ${name}`, role: o.role, companyId },  
    });  
  }  
  
  const techs: { id: string; name: string }[] = [];  
  for (let t = 0; t < 7; t++) {  
    const tName = `${FIRST[(index + t) % FIRST.length]} ${LAST[(index + t) % LAST.length]}`;  
    const tid = `user_${companyId}_tech${t}`;  
    const email = `tech${t}@${subdomain}.demo`;  
    await prisma.user.upsert({  
      where: { email },  
      update: { name: tName, role: 'FIELD', companyId },  
      create: { id: tid, email, name: tName, role: 'FIELD', companyId },  
    });  
    techs.push({ id: tid, name: tName });  
  }  
  
  // reset operational data (idempotent)  
  await prisma.job.deleteMany({ where: { companyId } });  
  await prisma.document.deleteMany({ where: { companyId } });  
  
  // one job per customer, visits accumulate into each  
  const customers = CUSTOMER_POOL.map((c, i) => ({  
    id: `cust_${companyId}_${i}`,  
    name: c.name,  
    email: `contact${i}@${subdomain}.example.com`,  
    phone: `(512) 555-${String(1000 + i).slice(-4)}`,  
    address: { line1: c.line1, city: c.city, state: c.state, postalCode: c.postalCode },  
    serviceType: c.serviceType,  
    visits: [] as any[],  
  }));  
  
  const now = Date.now();  
  let counter = 0;  
  // Fill Mon–Sat, day offsets -14..+30, 5 visits/day per tech  
  for (let ti = 0; ti < techs.length; ti++) {  
    const tech = techs[ti]!;  
    for (let off = -14; off <= 30; off++) {  
      const dow = new Date(at(off, 0)).getDay();  
      if (dow === 0) continue; // skip Sundays  
      for (let s = 0; s < HOURS.length; s++) {  
        const cust = customers[counter % customers.length]!;  
        counter++;  
        const start = at(off, HOURS[s]! + (ti % 2)); // stagger techs slightly  
        const end = plusHours(start, 2);  
        const titles = VISIT_TITLES[cust.serviceType] ?? ['Service visit'];  
        cust.visits.push({  
          id: `visit_${companyId}_${tech.id}_${off}_${s}`,  
          title: `${titles[counter % titles.length]} — ${cust.name}`,  
          technicianId: tech.id,  
          technicianName: tech.name,  
          start,  
          end,  
          status: +new Date(start) < now ? 'COMPLETED' : 'SCHEDULED',  
          notes: '',  
        });  
      }  
    }  
  }  
  
  for (const c of customers) {  
    const hasFuture = c.visits.some((v) => v.status !== 'COMPLETED');  
    const status = c.visits.length === 0 ? 'NEW' : hasFuture ? 'SCHEDULED' : 'COMPLETED';  
    await prisma.job.create({  
      data: {  
        companyId,  
        createdBy: `user_${companyId}_csr`,  
        data: {  
          title: `${c.serviceType} — ${c.name}`,  
          serviceType: c.serviceType,  
          priority: 'normal',  
          status,  
          customer: { id: c.id, name: c.name, email: c.email, phone: c.phone, address: c.address },  
          visits: c.visits,  
        },  
      },  
    });  
  }  
  
  // Documents (metadata rows; storageUrl points at static PDFs served by the web app)  
  const docs = [  
    { title: `Service Agreement — ${name}`, status: 'PUBLISHED' as const, type: 'contract', url: '/docs/service-agreement.pdf' },  
    { title: `Invoice #10${index}2 — ${name}`, status: 'APPROVED' as const, type: 'invoice', url: '/docs/invoice.pdf' },  
    { title: `Estimate — Equipment Install`, status: 'PENDING_REVIEW' as const, type: 'estimate', url: '/docs/estimate.pdf' },  
    { title: `Annual Inspection Report`, status: 'DRAFT' as const, type: 'report', url: '/docs/inspection-report.pdf' },  
  ];  
  for (let i = 0; i < docs.length; i++) {  
    const d = docs[i]!;  
    await prisma.document.create({  
      data: {  
        id: `doc_${companyId}_${i}`,  
        companyId,  
        title: d.title,  
        status: d.status,  
        mimeType: 'application/pdf',  
        fileSize: 240_000,  
        storageUrl: d.url,  
        createdBy: `user_${companyId}_csr`,  
        metadata: { documentType: d.type, version: '1.0' },  
      },  
    });  
  }  
  
  const visitCount = customers.reduce((n, c) => n + c.visits.length, 0);  
  console.log(`  ✅ ${name}: 10 users (7 field), ${customers.length} customers, ${visitCount} visits, ${docs.length} docs`);  
}  
  
async function main() {  
  console.log('🌱 Seeding OptiForce FSM demo data (10 companies)...');  
  for (let i = 0; i < COMPANIES.length; i++) {  
    await seedCompany(COMPANIES[i]!, i);  
  }  
  console.log('🎉 Seed complete: 10 companies fully populated.');  
}  
  
main()  
  .catch((e) => {  
    console.error('❌ Seed failed:', e);  
    process.exit(1);  
  })  
  .finally(async () => {  
    await prisma.$disconnect();  
    await pool.end();  
  });
