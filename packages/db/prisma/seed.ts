// FSM/packages/db/prisma/seed.ts
// Seeds relational rows + JSONB job.data. No hashing / no audit chain.
// Safe to re-run: won’t duplicate demo jobs once they exist.
/* eslint-disable no-console */

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L1_DATA"],
};

import 'dotenv/config';

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient, UserRole, DocumentStatus } from '../src/generated/prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

type Money = { amount: number; currency: 'USD' | 'CAD' | 'EUR' | 'GBP' };
type Address = {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
};
type TimeWindow = { start: string; end: string };
type JobStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'DISPATCHED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'INVOICED'
  | 'CANCELLED';

type StatusChange = {
  from: JobStatus;
  to: JobStatus;
  changedBy: string;
  changedAt: string;
  reason?: string;
};

type JobData = {
  schemaVersion: 1;

  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;

  serviceAddress: Address;
  billingAddress?: Address;
  zoneId?: string;

  jobType: string;
  jobCategory?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  source: 'phone' | 'web' | 'portal' | 'referral' | 'recurring' | 'warranty';

  title: string;
  description?: string;
  customerNotes?: string;
  internalNotes?: string;

  requestedWindow?: TimeWindow;
  scheduledWindow?: TimeWindow;
  estimatedDuration?: number;

  assignedTechnicianId?: string;
  assignedCrewIds?: readonly string[];
  skillsRequired?: readonly string[];

  pricing: {
    type: 'flat_rate' | 'time_and_materials' | 'estimate' | 'not_to_exceed';
    laborRate?: Money;
    minimumCharge?: Money;
    notToExceed?: Money;
    discount?: { type: 'percentage' | 'fixed'; value: number; reason?: string };
    taxRate?: number;
    taxExempt?: boolean;
  };

  lineItems: readonly Array<{
    id: string;
    type: 'labor' | 'part' | 'material' | 'equipment' | 'fee' | 'discount';
    description: string;
    quantity: number;
    unitPrice: Money;
    total: Money;
    taxable: boolean;

    partId?: string;
    partNumber?: string;
    serialNumber?: string;

    laborType?: 'regular' | 'overtime' | 'emergency';
    technicianId?: string;
    hours?: number;

    addedBy: string;
    addedAt: string;
    modifiedBy?: string;
    modifiedAt?: string;
  }>;

  equipment?: readonly Array<{
    equipmentId: string;
    type: string;
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    location?: string;
    warrantyExpires?: string;
    lastServiceDate?: string;
    notes?: string;
  }>;

  attachments?: readonly Array<{
    id: string;
    type: 'document' | 'photo' | 'video' | 'audio' | 'signature';
    name: string;
    url: string;
    mimeType: string;
    size: number;
    uploadedBy: string;
    uploadedAt: string;
    hash?: string;
  }>;

  statusHistory: readonly StatusChange[];

  contractId?: string;
  estimateId?: string;
  invoiceId?: string;
  parentJobId?: string;
  recurringScheduleId?: string;

  completion?: {
    completedAt: string;
    completedBy: string;
    summary: string;
    laborTotal: Money;
    partsTotal: Money;
    subtotal: Money;
    tax: Money;
    total: Money;
    customerSatisfaction?: 1 | 2 | 3 | 4 | 5;
    followUpRequired: boolean;
    followUpReason?: string;
  };

  cancellation?: {
    cancelledAt: string;
    cancelledBy: string;
    reason: string;
    reasonCode: 'customer_request' | 'no_access' | 'duplicate' | 'rescheduled' | 'other';
    billable: boolean;
    cancellationFee?: Money;
    rescheduledToJobId?: string;
  };

  customFields?: Readonly<Record<string, unknown>>;

  regulated?: {
    industry: string;
    permitRequired: boolean;
    permitNumber?: string;
    inspectionRequired: boolean;
    complianceCode?: string;
  };
};


const iso = (d: Date) => d.toISOString();
const money = (amount: number, currency: Money['currency'] = 'USD'): Money => ({ amount, currency });

const addr = (o: Partial<Address> = {}): Address => ({
  street1: '123 Main St',
  city: 'Los Angeles',
  state: 'CA',
  postalCode: '90001',
  country: 'US',
  ...o,
});

const timeWindow = (start: Date, minutes: number): TimeWindow => {
  const end = new Date(start.getTime() + minutes * 60_000);
  return { start: iso(start), end: iso(end) };
};

const plusDays = (days: number, hour = 9): Date => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
};

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomStartWithinDays = (dayMin: number, dayMax: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + rand(dayMin, dayMax));
  d.setHours(rand(8, 16), [0, 15, 30, 45][rand(0, 3)], 0, 0);
  return d;
};

function status(from: JobStatus, to: JobStatus, by: string, at: Date, reason?: string): StatusChange {
  return { from, to, changedBy: by, changedAt: iso(at), reason };
}

function lineItem(params: {
  id: string;
  type: 'labor' | 'part' | 'material' | 'equipment' | 'fee' | 'discount';
  description: string;
  quantity: number;
  unitPrice: Money;
  taxable: boolean;
  addedBy: string;
  addedAt: string;
  technicianId?: string;
  hours?: number;
  laborType?: 'regular' | 'overtime' | 'emergency';
}): JobData['lineItems'][number] {
  const totalAmount = Math.round(params.unitPrice.amount * params.quantity * 100) / 100;
  return {
    id: params.id,
    type: params.type,
    description: params.description,
    quantity: params.quantity,
    unitPrice: params.unitPrice,
    total: money(totalAmount, params.unitPrice.currency),
    taxable: params.taxable,
    technicianId: params.technicianId,
    hours: params.hours,
    laborType: params.laborType,
    addedBy: params.addedBy,
    addedAt: params.addedAt,
  };
}

function jobDataBase(p: {
  customerId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceAddress: Address;
  jobType: string;
  title: string;
  priority?: JobData['priority'];
  source?: JobData['source'];
  description?: string;
}): JobData {
  return {
    schemaVersion: 1,
    customerId: p.customerId,
    customerName: p.customerName,
    customerPhone: p.customerPhone,
    customerEmail: p.customerEmail,
    serviceAddress: p.serviceAddress,
    jobType: p.jobType,
    title: p.title,
    priority: p.priority ?? 'normal',
    source: p.source ?? 'phone',
    description: p.description,
    pricing: { type: 'time_and_materials', taxRate: 0.095 },
    lineItems: [],
    statusHistory: [],
  };
}

async function main() {
  const DEMO_SUBDOMAIN = 'demo';
  const now = new Date();

  // 1) Company
  const company = await prisma.company.upsert({
    where: { subdomain: DEMO_SUBDOMAIN },
    update: { name: 'FSM Demo Company' },
    create: { name: 'FSM Demo Company', subdomain: DEMO_SUBDOMAIN },
  });

  // 2) Users (upsert by unique email)
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'owner@demo.fsm' },
      update: { name: 'Demo Owner', role: UserRole.OWNER, companyId: company.id },
      create: { email: 'owner@demo.fsm', name: 'Demo Owner', role: UserRole.OWNER, companyId: company.id },
    }),
    prisma.user.upsert({
      where: { email: 'admin@demo.fsm' },
      update: { name: 'Demo Admin', role: UserRole.ADMIN, companyId: company.id },
      create: { email: 'admin@demo.fsm', name: 'Demo Admin', role: UserRole.ADMIN, companyId: company.id },
    }),
    prisma.user.upsert({
      where: { email: 'csr@demo.fsm' },
      update: { name: 'Demo CSR', role: UserRole.CSR, companyId: company.id },
      create: { email: 'csr@demo.fsm', name: 'Demo CSR', role: UserRole.CSR, companyId: company.id },
    }),
    prisma.user.upsert({
      where: { email: 'tech1@demo.fsm' },
      update: { name: 'Tech One', role: UserRole.FIELD, companyId: company.id },
      create: { email: 'tech1@demo.fsm', name: 'Tech One', role: UserRole.FIELD, companyId: company.id },
    }),
    prisma.user.upsert({
      where: { email: 'tech2@demo.fsm' },
      update: { name: 'Tech Two', role: UserRole.FIELD, companyId: company.id },
      create: { email: 'tech2@demo.fsm', name: 'Tech Two', role: UserRole.FIELD, companyId: company.id },
    }),
  ]);

  const owner = users[0];
  const csr = users[2];
  const tech1 = users[3];
  const tech2 = users[4];

  // 3) CompanyConfig v1
  await prisma.companyConfig.upsert({
    where: { companyId_version: { companyId: company.id, version: 1 } },
    update: {
      isActive: true,
      schema: {
        version: 1,
        name: 'Demo Config',
        scheduling: { timezone: 'America/Los_Angeles' },
      },
      createdBy: owner.id,
    },
    create: {
      companyId: company.id,
      version: 1,
      isActive: true,
      schema: {
        version: 1,
        name: 'Demo Config',
        scheduling: { timezone: 'America/Los_Angeles' },
      },
      createdBy: owner.id,
    },
  });

  // Don’t duplicate demo jobs if they already exist
  const existingJobs = await prisma.job.count({ where: { companyId: company.id } });
 const TARGET_JOBS = 120;
if (existingJobs >= TARGET_JOBS) {
  console.log(`Seed: company already has ${existingJobs} job(s). Skipping job seed.`);
  return;
}
   
  // 4) Optional Contract + Document to reference
  const contract = await prisma.contract.create({
    data: {
      companyId: company.id,
      createdBy: owner.id,
      data: {
        schemaVersion: 1,
        title: 'Demo Service Agreement',
        customer: { name: 'Acme Property Mgmt' },
        terms: { paymentNetDays: 15 },
      },
    },
  });

  const document = await prisma.document.create({
    data: {
      companyId: company.id,
      title: 'Demo Work Order PDF',
      status: DocumentStatus.DRAFT,
      metadata: {
        kind: 'work_order',
        note: 'Example document metadata only (MinIO not required for seed).',
      },
      mimeType: 'application/pdf',
      fileSize: 245_120,
      storagePath: 'demo/work-orders/wo-0001.pdf',
      storageUrl: 'http://localhost:9000/demo/work-orders/wo-0001.pdf',
      createdBy: csr.id,
    },
  });

  // Helper to create a job
  const createJob = async (data: JobData) => {
    return prisma.job.create({
      data: {
        companyId: company.id,
        createdBy: csr.id,
        data,
      },
    });
  };

  // 5) Jobs (10)
  const jobStarts = [
    plusDays(0, 10),
    plusDays(0, 13),
    plusDays(1, 9),
    plusDays(1, 14),
    plusDays(2, 11),
    plusDays(3, 9),
    plusDays(4, 12),
    plusDays(-1, 15),
    plusDays(-2, 10),
    plusDays(-3, 9),
  ];

  const jobs: JobData[] = [];

  // A) Scheduled (future)
  {
    const start = jobStarts[0];
    const jd = jobDataBase({
      customerId: 'cust_demo_001',
      customerName: 'John Rivera',
      customerPhone: '555-0101',
      customerEmail: 'john.rivera@example.com',
      serviceAddress: addr({ street1: '221B Baker St', postalCode: '90012' }),
      jobType: 'HVAC',
      title: 'No cooling - thermostat on but warm air',
      priority: 'high',
      source: 'web',
      description: 'Customer reports AC blowing warm air since yesterday.',
    });

    const sched = timeWindow(start, 120);
    jobs.push({
      ...jd,
      requestedWindow: timeWindow(plusDays(0, 9), 180),
      scheduledWindow: sched,
      estimatedDuration: 120,
      assignedTechnicianId: tech1.id,
      skillsRequired: ['hvac', 'diagnostics'],
      contractId: contract.id,
      attachments: [
        {
          id: 'att_demo_001',
          type: 'document',
          name: 'Work Order',
          url: document.storageUrl ?? '',
          mimeType: document.mimeType ?? 'application/pdf',
          size: document.fileSize ?? 0,
          uploadedBy: csr.id,
          uploadedAt: iso(now),
        },
      ],
      statusHistory: [status('DRAFT', 'SCHEDULED', csr.id, now, 'Scheduled via web request')],
      lineItems: [],
      pricing: { ...jd.pricing, laborRate: money(149, 'USD'), minimumCharge: money(89, 'USD') },
    });
  }

  // B) In progress (today)
  {
    const start = jobStarts[1];
    const jd = jobDataBase({
      customerId: 'cust_demo_002',
      customerName: 'Maria Chen',
      customerPhone: '555-0102',
      serviceAddress: addr({ street1: '88 Sunset Blvd', postalCode: '90028' }),
      jobType: 'Plumbing',
      title: 'Kitchen sink leak under cabinet',
      priority: 'normal',
      source: 'phone',
      description: 'Slow drip, worse when disposal runs.',
    });

    const sched = timeWindow(start, 90);
    const at1 = new Date(start.getTime() - 60 * 60_000);
    const at2 = new Date(start.getTime() - 10 * 60_000);
    jobs.push({
      ...jd,
      scheduledWindow: sched,
      estimatedDuration: 90,
      assignedTechnicianId: tech2.id,
      statusHistory: [
        status('DRAFT', 'SCHEDULED', csr.id, at1, 'Booked by CSR'),
        status('SCHEDULED', 'DISPATCHED', csr.id, at2, 'Tech en route'),
        status('DISPATCHED', 'IN_PROGRESS', tech2.id, start, 'Arrived on site'),
      ],
      lineItems: [
        lineItem({
          id: 'li_demo_002_labor',
          type: 'labor',
          description: 'Leak diagnostics',
          quantity: 1,
          unitPrice: money(149),
          taxable: false,
          technicianId: tech2.id,
          hours: 1,
          laborType: 'regular',
          addedBy: tech2.id,
          addedAt: iso(start),
        }),
      ],
      pricing: { ...jd.pricing, laborRate: money(149) },
    });
  }

  // C) Completed (past)
  {
    const start = jobStarts[8];
    const jd = jobDataBase({
      customerId: 'cust_demo_003',
      customerName: 'Acme Property Mgmt',
      customerEmail: 'ops@acmepm.example',
      serviceAddress: addr({ street1: '1000 Wilshire Blvd', postalCode: '90017' }),
      jobType: 'Electrical',
      title: 'Breaker trips intermittently - Unit 12C',
      priority: 'urgent',
      source: 'portal',
      description: 'Tenant reports breaker trips when microwave used.',
    });

    const sched = timeWindow(start, 120);
    const at1 = new Date(start.getTime() - 24 * 60 * 60_000);
    const at2 = new Date(start.getTime() - 2 * 60 * 60_000);
    const completedAt = new Date(start.getTime() + 110 * 60_000);

    const items = [
      lineItem({
        id: 'li_demo_003_labor',
        type: 'labor',
        description: 'Electrical troubleshooting',
        quantity: 2,
        unitPrice: money(165),
        taxable: false,
        technicianId: tech1.id,
        hours: 2,
        laborType: 'emergency',
        addedBy: tech1.id,
        addedAt: iso(start),
      }),
      lineItem({
        id: 'li_demo_003_part',
        type: 'part',
        description: '20A breaker replacement',
        quantity: 1,
        unitPrice: money(24.5),
        taxable: true,
        addedBy: tech1.id,
        addedAt: iso(start),
        partNumber: 'BRK-20A',
      }) as any,
    ];

    const laborTotal = money(330);
    const partsTotal = money(24.5);
    const subtotal = money(354.5);
    const tax = money(Math.round(24.5 * 0.095 * 100) / 100);
    const total = money(Math.round((subtotal.amount + tax.amount) * 100) / 100);

    jobs.push({
      ...jd,
      scheduledWindow: sched,
      estimatedDuration: 120,
      assignedTechnicianId: tech1.id,
      statusHistory: [
        status('DRAFT', 'SCHEDULED', csr.id, at1, 'Scheduled via portal'),
        status('SCHEDULED', 'DISPATCHED', csr.id, at2, 'Dispatched'),
        status('DISPATCHED', 'IN_PROGRESS', tech1.id, start, 'On site'),
        status('IN_PROGRESS', 'COMPLETED', tech1.id, completedAt, 'Work complete'),
      ],
      lineItems: items,
      pricing: { ...jd.pricing, laborRate: money(165) },
      completion: {
        completedAt: iso(completedAt),
        completedBy: tech1.id,
        summary: 'Replaced failing breaker; verified load behavior with tenant.',
        laborTotal,
        partsTotal,
        subtotal,
        tax,
        total,
        customerSatisfaction: 5,
        followUpRequired: false,
      },
      regulated: {
        industry: 'multifamily',
        permitRequired: false,
        inspectionRequired: false,
      },
    });
  }

  // D) Cancelled
  {
    const start = jobStarts[2];
    const jd = jobDataBase({
      customerId: 'cust_demo_004',
      customerName: 'Liam Patel',
      customerPhone: '555-0104',
      serviceAddress: addr({ street1: '400 Ocean Ave', postalCode: '90401', city: 'Santa Monica' }),
      jobType: 'Appliance',
      title: 'Washer not draining',
      priority: 'normal',
      source: 'phone',
      description: 'Water remains after cycle ends.',
    });

    const at1 = new Date(start.getTime() - 2 * 60 * 60_000);
    jobs.push({
      ...jd,
      requestedWindow: timeWindow(start, 180),
      statusHistory: [
        status('DRAFT', 'SCHEDULED', csr.id, at1, 'Booked by CSR'),
        status('SCHEDULED', 'CANCELLED', csr.id, now, 'Customer cancelled'),
      ],
      cancellation: {
        cancelledAt: iso(now),
        cancelledBy: csr.id,
        reason: 'Customer resolved issue independently',
        reasonCode: 'customer_request',
        billable: false,
      },
      lineItems: [],
      pricing: { ...jd.pricing, type: 'estimate' },
    });
  }
  
// E) Calendar-heavy jobs (most scheduled)
const remaining = Math.max(0, TARGET_JOBS - jobs.length);

for (let i = 0; i < remaining; i++) {
  const start = randomStartWithinDays(-14, 45);
  const duration = [60, 90, 120, 180][rand(0, 3)];
  const sched = timeWindow(start, duration);

  const isDraft = i % 12 === 0;       // some drafts
  const isCancelled = i % 20 === 0;   // some cancelled
  const techId = i % 2 === 0 ? tech1.id : tech2.id;

  const jd = jobDataBase({
    customerId: `cust_seed_${String(i + 10).padStart(4, '0')}`,
    customerName: ['Taylor Brooks', 'Jordan Kim', 'Avery Nguyen', 'Sam Rivera'][rand(0, 3)],
    customerPhone: `555-${rand(1000, 9999)}`,
    serviceAddress: addr({
      street1: `${rand(100, 999)} ${['Market', 'Oak', 'Pine', 'Cedar'][rand(0, 3)]} St`,
      city: ['Los Angeles', 'Santa Monica', 'Pasadena', 'Long Beach'][rand(0, 3)],
      postalCode: `9${rand(1000, 9999)}`,
    }),
    jobType: ['HVAC', 'Plumbing', 'Electrical', 'Appliance'][rand(0, 3)],
    title: ['Maintenance', 'Service call', 'Repair', 'Inspection'][rand(0, 3)],
    priority: (['low', 'normal', 'high', 'urgent'] as const)[rand(0, 3)],
    source: (['phone', 'web', 'portal', 'referral', 'recurring', 'warranty'] as const)[rand(0, 5)],
    description: 'Seeded calendar job.',
  });

  const baseStatusAt = new Date(start.getTime() - rand(2, 48) * 60 * 60_000);

  let statusHistory: StatusChange[] = [];
  let cancellation: JobData['cancellation'] | undefined;

  if (!isDraft) {
    statusHistory.push(status('DRAFT', 'SCHEDULED', csr.id, baseStatusAt, 'Seed schedule'));
  }

  if (!isDraft && !isCancelled) {
    // some jobs progress a bit for realism
    if (i % 5 === 0) statusHistory.push(status('SCHEDULED', 'DISPATCHED', csr.id, new Date(start.getTime() - 30 * 60_000), 'Dispatch'));
    if (i % 9 === 0) statusHistory.push(status('DISPATCHED', 'IN_PROGRESS', techId, start, 'Arrived'));
  }

  if (!isDraft && isCancelled) {
    statusHistory.push(status('SCHEDULED', 'CANCELLED', csr.id, new Date(start.getTime() - 60 * 60_000), 'Cancelled'));
    cancellation = {
      cancelledAt: iso(new Date(start.getTime() - 60 * 60_000)),
      cancelledBy: csr.id,
      reason: 'Seed cancellation',
      reasonCode: 'other',
      billable: false,
    };
  }

  jobs.push({
    ...jd,
    scheduledWindow: isDraft ? undefined : sched,
    estimatedDuration: isDraft ? undefined : duration,
    assignedTechnicianId: isDraft ? undefined : techId,
    statusHistory,
    cancellation,
    pricing: { ...jd.pricing, laborRate: money(149) },
    customFields: { seed: true, calendar: true, n: i },
  });
}


  // Insert jobs
  for (const jd of jobs.slice(0, TARGET_JOBS)) {
  await createJob(jd);
} {
    await createJob(jd);
  }

  console.log(`Seed complete:
- Company: ${company.id} (${company.subdomain})
- Users: ${users.length}
- Jobs created: ${jobs.slice(0, 10).length}
- Contract: ${contract.id}
- Document: ${document.id}`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exitCode = 1;
  })
 .finally(async () => {
   await prisma.$disconnect();
   await pool.end();
});
