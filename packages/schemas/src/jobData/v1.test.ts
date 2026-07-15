import { describe, it, expect } from 'vitest';
import {
  JOB_DATA_VERSION,
  JobDataV1,
  VisitV1,
  VisitStatusV1,
  CustomerV1,
  LocationV1,
  NoteV1,
} from './v1';

const ISO = '2024-06-01T12:00:00.000Z';

describe('JobDataV1', () => {
  it('applies defaults for every collection and status when only the version is given', () => {
    const parsed = JobDataV1.parse({ jobDataVersion: JOB_DATA_VERSION });
    expect(parsed).toEqual({
      jobDataVersion: 1,
      status: 'new',
      customers: [],
      locations: [],
      visits: [],
      notes: [],
      external: {},
    });
  });

  it('rejects a jobDataVersion other than the literal 1', () => {
    expect(JobDataV1.safeParse({ jobDataVersion: 2 }).success).toBe(false);
  });

  it('rejects an unknown job status', () => {
    const result = JobDataV1.safeParse({ jobDataVersion: 1, status: 'archived' });
    expect(result.success).toBe(false);
  });

  it('preserves external payloads verbatim', () => {
    const parsed = JobDataV1.parse({
      jobDataVersion: 1,
      external: { quickbooks: { invoiceId: 'INV-1' } },
    });
    expect(parsed.external).toEqual({ quickbooks: { invoiceId: 'INV-1' } });
  });
});

describe('VisitV1', () => {
  const baseVisit = { id: 'v1', technicianId: 't1', startAt: ISO, endAt: ISO };

  it('defaults status to "scheduled"', () => {
    expect(VisitV1.parse(baseVisit).status).toBe('scheduled');
  });

  it('accepts a fully-populated visit with check-in/out and location', () => {
    const result = VisitV1.safeParse({
      ...baseVisit,
      status: 'completed',
      summary: 'Replaced compressor',
      locationRef: { locationId: 'loc1' },
      checkIn: { at: ISO, lat: 40.1, lng: -74.2 },
      checkOut: { at: ISO },
      meta: { source: 'mobile' },
    });
    expect(result.success).toBe(true);
  });

  it('requires a non-empty id and technicianId', () => {
    expect(VisitV1.safeParse({ ...baseVisit, id: '' }).success).toBe(false);
    expect(VisitV1.safeParse({ ...baseVisit, technicianId: '' }).success).toBe(false);
  });

  it('rejects non ISO-8601 datetimes', () => {
    expect(VisitV1.safeParse({ ...baseVisit, startAt: '2024-06-01' }).success).toBe(false);
  });

  it('rejects a summary longer than 500 characters', () => {
    expect(VisitV1.safeParse({ ...baseVisit, summary: 'x'.repeat(501) }).success).toBe(false);
  });

  it('rejects an unknown visit status', () => {
    expect(VisitV1.safeParse({ ...baseVisit, status: 'paused' }).success).toBe(false);
  });
});

describe('VisitStatusV1', () => {
  it.each(['scheduled', 'in_progress', 'completed', 'canceled', 'no_show'])(
    'accepts the "%s" status',
    (status) => {
      expect(VisitStatusV1.safeParse(status).success).toBe(true);
    },
  );
});

describe('CustomerV1', () => {
  it('accepts a minimal customer', () => {
    expect(CustomerV1.safeParse({ id: 'c1', name: 'Jane' }).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(CustomerV1.safeParse({ id: 'c1', name: 'Jane', email: 'not-an-email' }).success).toBe(false);
  });
});

describe('LocationV1', () => {
  it('requires id and line1', () => {
    expect(LocationV1.safeParse({ id: 'l1', line1: '1 Main St' }).success).toBe(true);
    expect(LocationV1.safeParse({ id: 'l1' }).success).toBe(false);
    expect(LocationV1.safeParse({ line1: '1 Main St' }).success).toBe(false);
  });
});

describe('NoteV1', () => {
  it('requires id, timestamp and non-empty text', () => {
    expect(NoteV1.safeParse({ id: 'n1', at: ISO, text: 'hi' }).success).toBe(true);
    expect(NoteV1.safeParse({ id: 'n1', at: ISO, text: '' }).success).toBe(false);
  });
});
