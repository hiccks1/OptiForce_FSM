/* eslint-disable no-console */
import 'dotenv/config'; 
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Clean workspace root import—no deep relative nesting
import { PrismaClient } from '@fsm/db';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const COMPANY_ID = 'comp_demo_123';

function at(dayOffset: number, hour: number, minutes = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minutes, 0, 0);
  return d.toISOString();
}


// Add your seed logic execution down here...


function plusHours(iso: string, hours: number): string {
  return new Date(new Date(iso).getTime() + hours * 3600_000).toISOString();
}

const TECHS = [
  { id: 'tech_amir', name: 'Amir Kaplan' },
  { id: 'tech_dana', name: 'Dana Ruiz' },
  { id: 'tech_leo', name: 'Leo Chen' },
];

type SeedCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: { line1: string; city: string; state: string; postalCode: string };
  serviceType: string;
  priority: 'low' | 'normal' | 'urgent';
  visits: Array<{ dayOffset: number; hour: number; durationH: number; tech: number; title: string; status?: string }>;
};

const CUSTOMERS: SeedCustomer[] = [
  {
    id: 'cust_hendricks',
    name: 'Hendricks Residence',
    email: 'sara.hendricks@example.com',
    phone: '(512) 555-0148',
    address: { line1: '1420 Oak Meadow Dr', city: 'Austin', state: 'TX', postalCode: '78745' },
    serviceType: 'HVAC',
    priority: 'urgent',
    visits: [
      { dayOffset: 0, hour: 9, durationH: 2, tech: 0, title: 'AC not cooling — diagnostic' },
      { dayOffset: 3, hour: 13, durationH: 3, tech: 0, title: 'Compressor replacement' },
    ],
  },
  {
    id: 'cust_bright',
    name: 'Bright Cafe',
    email: 'ops@brightcafe.example.com',
    phone: '(512) 555-0192',
    address: { line1: '88 Congress Ave', city: 'Austin', state: 'TX', postalCode: '78701' },
    serviceType: 'Refrigeration',
    priority: 'normal',
    visits: [
      { dayOffset: 1, hour: 8, durationH: 2, tech: 1, title: 'Walk-in cooler maintenance' },
      { dayOffset: 8, hour: 10, durationH: 1, tech: 1, title: 'Follow-up inspection' },
    ],
  },
  {
    id: 'cust_pratt',
    name: 'Pratt Manufacturing',
    email: 'facilities@pratt.example.com',
    phone: '(512) 555-0110',
    address: { line1: '3200 Industrial Blvd', city: 'Round Rock', state: 'TX', postalCode: '78664' },
    serviceType: 'Electrical',
    priority: 'normal',
    visits: [
      { dayOffset: 2, hour: 14, durationH: 4, tech: 2, title: 'Panel upgrade — phase 1' },
      { dayOffset: -4, hour: 9, durationH: 3, tech: 2, title: 'Site survey', status: 'COMPLETED' },
    ],
  },
  {
    id: 'cust_okafor',
    name: 'Okafor Family',
    email: 'n.okafor@example.com',
    phone: '(512) 555-0177',
    address: { line1: '705 Cedar Ln', city: 'Cedar Park', state: 'TX', postalCode: '78613' },
    serviceType: 'Plumbing',
    priority: 'low',
    visits: [{ dayOffset: 5, hour: 11, durationH: 2, tech: 1, title: 'Water heater install' }],
  },
  {
    id: 'cust_riverside',
    name: 'Riverside Apartments',
    email: 'manager@riverside.example.com',
    phone: '(512) 555-0133',
    address: { line1: '50 Riverwalk Pkwy', city: 'Austin', state: 'TX', postalCode: '78704' },
    serviceType: 'HVAC',
    priority: 'normal',
    visits: [
      { dayOffset: 4, hour: 9, durationH: 2, tech: 0, title: 'Unit 12B — thermostat' },
      { dayOffset: 4, hour: 13, durationH: 2, tech: 2, title: 'Unit 4A — filter service' },
    ],
  },
  {
    id: 'cust_lopez',
    name: 'Lopez Bakery',
    email: 'hello@lopezbakery.example.com',
    phone: '(512) 555-0166',
    address: { line1: '212 E 6th St', city: 'Austin', state: 'TX', postalCode: '78701' },
    serviceType: 'Refrigeration',
    priority: 'normal',
    visits: [],
  },
];

async function main() {
  console.log('🌱 Seeding OptiForce FSM demo data...');

  // 1) Company
  await prisma.company.upsert({
    where: { id: COMPANY_ID },
    update: { name: 'OptiForce Field Services' },
    create: { id: COMPANY_ID, name: 'OptiForce Field Services', subdomain: 'demo' },
  });

  // 2) Company config (incl. customer portal config)
  await prisma.companyConfig.upsert({
    where: { companyId_version: { companyId: COMPANY_ID, version: 1 } },
    update: {
      isActive: true,
      schema: {
        version: '1.0',
        features: ['scheduling', 'documents', 'customer-portal'],
        customerPortal: {
          title: 'OptiForce Customer Portal',
          description: 'View your upcoming service appointments and reschedule if needed.',
          primaryColor: '#4f46e5',
          allowReschedule: true,
        },
      },
    },
    create: {
      id: 'config_demo_001',
      companyId: COMPANY_ID,
      version: 1,
      isActive: true,
      contentHash: 'config-v1',
      schema: {
        version: '1.0',
        features: ['scheduling', 'documents', 'customer-portal'],
        customerPortal: {
          title: 'OptiForce Customer Portal',
          description: 'View your upcoming service appointments and reschedule if needed.',
          primaryColor: '#4f46e5',
          allowReschedule: true,
        },
      },
    },
  });

  // 3) Users (CSR + techs + owner)
  const users = [
    { id: 'user_owner', email: 'owner@optiforce.demo', name: 'Morgan Vale', role: 'OWNER' as const },
    { id: 'user_csr', email: 'csr@optiforce.demo', name: 'Jamie Fields', role: 'CSR' as const },
    { id: TECHS[0]!.id, email: 'amir@optiforce.demo', name: TECHS[0]!.name, role: 'FIELD' as const },
    { id: TECHS[1]!.id, email: 'dana@optiforce.demo', name: TECHS[1]!.name, role: 'FIELD' as const },
    { id: TECHS[2]!.id, email: 'leo@optiforce.demo', name: TECHS[2]!.name, role: 'FIELD' as const },
  ];
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, companyId: COMPANY_ID },
      create: { ...u, companyId: COMPANY_ID },
    });
  }

  // 4) Jobs (one per customer, visits embedded in data) — reset for idempotency
  await prisma.job.deleteMany({ where: { companyId: COMPANY_ID } });
  await prisma.document.deleteMany({ where: { companyId: COMPANY_ID } });

  for (const c of CUSTOMERS) {
    const visits = c.visits.map((v, i) => {
      const start = at(v.dayOffset, v.hour);
      const tech = TECHS[v.tech]!;
      return {
        id: `visit_${c.id}_${i}`,
        title: v.title,
        technicianId: tech.id,
        technicianName: tech.name,
        start,
        end: plusHours(start, v.durationH),
        status: v.status ?? 'SCHEDULED',
        notes: '',
      };
    });

    const status = visits.length === 0 ? 'NEW' : visits.every((v) => v.status === 'COMPLETED') ? 'COMPLETED' : 'SCHEDULED';

    await prisma.job.create({
      data: {
        companyId: COMPANY_ID,
        createdBy: 'user_csr',
        data: {
          title: `${c.serviceType} — ${c.name}`,
          serviceType: c.serviceType,
          priority: c.priority,
          status,
          customer: { id: c.id, name: c.name, email: c.email, phone: c.phone, address: c.address },
          visits,
        },
      },
    });
  }

  // 5) Documents
  const docs = [
    { id: 'doc_contract_hendricks', title: 'Service Agreement — Hendricks', status: 'PUBLISHED' as const, type: 'contract' },
    { id: 'doc_invoice_pratt', title: 'Invoice #1042 — Pratt Manufacturing', status: 'APPROVED' as const, type: 'invoice' },
    { id: 'doc_estimate_okafor', title: 'Estimate — Water Heater Install', status: 'PENDING_REVIEW' as const, type: 'estimate' },
    { id: 'doc_report_riverside', title: 'Inspection Report — Riverside', status: 'DRAFT' as const, type: 'report' },
  ];
  for (const d of docs) {
    await prisma.document.create({
      data: {
        id: d.id,
        companyId: COMPANY_ID,
        title: d.title,
        status: d.status,
        mimeType: 'application/pdf',
        fileSize: 240_000,
        createdBy: 'user_csr',
        metadata: { documentType: d.type, version: '1.0' },
      },
    });
  }

  console.log('🎉 Seed complete: 1 company, 5 users, 6 customers/jobs, 4 documents.');
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
