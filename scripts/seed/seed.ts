import 'dotenv/config';
import { prisma } from '@fsm/db';

function daysFromNow(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  const companyId = process.env.SEED_COMPANY_ID ?? 'seed-company';

  // Company
  await (prisma as any).company.upsert({
    where: { id: companyId },
    update: { name: 'FSM Demo Co', deletedAt: null, deletedBy: null },
    create: { id: companyId, name: 'FSM Demo Co', deletedAt: null, deletedBy: null },
  });

  // “Customer intake jobs” (no Job.status column assumed)
  const customers = [
    { name: 'Jane Cooper', phone: '555-0101', email: 'jane@example.com' },
    { name: 'Devon Lane', phone: '555-0102', email: 'devon@example.com' },
    { name: 'Cody Fisher', phone: '555-0103', email: 'cody@example.com' },
  ];

  const jobs: any[] = [];

  for (const c of customers) {
    const jobId = `seed-job-${c.name.toLowerCase().replace(/\s+/g, '-')}`;
    const customerId = `seed-customer-${c.name.toLowerCase().replace(/\s+/g, '-')}`;

    const data = {
      schemaVersion: 1,
      lifecycle: { status: 'DRAFT' }, // store status in JSON since column doesn't exist
      customer: { id: customerId, name: c.name, phone: c.phone, email: c.email },
      serviceAddress: {
        line1: '123 Demo St',
        city: 'Los Angeles',
        state: 'CA',
        postalCode: '90001',
        country: 'US',
      },
      createdFrom: 'seed',
    };

    const job = await (prisma as any).job.upsert({
      where: { id: jobId },
      update: {
        companyId,
        title: `Customer Intake: ${c.name}`,
        jobType: 'CUSTOMER_INTAKE',
        data,
        deletedAt: null,
        deletedBy: null,
      },
      create: {
        id: jobId,
        companyId,
        title: `Customer Intake: ${c.name}`,
        jobType: 'CUSTOMER_INTAKE',
        data,
        deletedAt: null,
        deletedBy: null,
      },
    });

    jobs.push(job);
  }

  // Visits (avoid assuming jobVisit.status column)
  const visitsSeed = [
    { job: jobs[0], start: daysFromNow(1), minutes: 90, tech: 'seed-tech-1', workType: 'APPOINTMENT' },
    { job: jobs[1], start: daysFromNow(2), minutes: 60, tech: 'seed-tech-1', workType: 'APPOINTMENT' },
    { job: jobs[2], start: daysFromNow(3), minutes: 120, tech: 'seed-tech-2', workType: 'ESTIMATE' },
  ];

  for (const v of visitsSeed) {
    const visitId = `seed-visit-${v.job.id}`;

    const scheduledStart = v.start;
    const scheduledEnd = new Date(scheduledStart.getTime() + v.minutes * 60_000);

    const visitData = {
      version: 1,
      lifecycle: { status: 'SCHEDULED' }, // JSON status
      workType: v.workType,
      technicianId: v.tech,
      scheduledWindow: { start: scheduledStart.toISOString(), end: scheduledEnd.toISOString() },
      serviceAddress:
        v.job?.data?.serviceAddress ?? {
          line1: '123 Demo St',
          city: 'Los Angeles',
          state: 'CA',
          postalCode: '90001',
          country: 'US',
        },
      createdFrom: 'seed',
    };

    await (prisma as any).jobVisit.upsert({
      where: { id: visitId },
      update: {
        companyId,
        jobId: v.job.id,
        technicianId: v.tech,
        scheduledStart,
        scheduledEnd,
        data: visitData,
        deletedAt: null,
        deletedBy: null,
      },
      create: {
        id: visitId,
        companyId,
        jobId: v.job.id,
        technicianId: v.tech,
        scheduledStart,
        scheduledEnd,
        data: visitData,
        deletedAt: null,
        deletedBy: null,
      },
    });
  }

  console.log('Seed complete ✅', {
    companyId,
    jobs: jobs.map((j) => j.id),
    visits: visitsSeed.map((v) => `seed-visit-${v.job.id}`),
  });
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await (prisma as any).$disconnect?.();
  });
