// apps/api/src/auth/portalInvites.ts
// Customer portal accounts: a CUSTOMER user per (company, email) linked to the
// customer id embedded in Job.data.customer.id, invited by email to set a password.
import { prisma } from '@fsm/db';
import { z } from 'zod';
import { config } from '../config/env';
import { signInviteToken } from './tokens';
import { sendMail } from '../mail/mailer';
import { portalInviteEmail } from '../mail/templates';

export type InviteStatus =
  | 'sent' // emailed
  | 'not_sent' // account ready but the email could not be sent (see url / reason)
  | 'already_active' // customer already set a password
  | 'email_in_use' // email belongs to a staff user of this company
  | 'invalid_email';

export type InviteResult = { status: InviteStatus; reason?: string; url?: string };

const Email = z.string().trim().toLowerCase().email();

export function portalLoginUrl(company: { id: string; subdomain: string | null }): string {
  return `${config.portalBaseUrl}/portal/login?company=${encodeURIComponent(company.subdomain ?? company.id)}`;
}

export async function inviteCustomer(input: {
  companyId: string;
  customer: { id: string; name: string; email?: string | null };
}): Promise<InviteResult> {
  const parsed = Email.safeParse(input.customer.email ?? '');
  if (!parsed.success) return { status: 'invalid_email' };
  const email = parsed.data;
  const { companyId, customer } = input;

  const existing = await prisma.user.findUnique({
    where: { companyId_email: { companyId, email } },
    select: { id: true, role: true, passwordHash: true, deletedAt: true },
  });

  let userId: string;
  if (existing) {
    if (existing.role !== 'CUSTOMER') return { status: 'email_in_use' };
    if (existing.passwordHash && !existing.deletedAt) return { status: 'already_active' };
    const updated = await prisma.user.update({
      where: { id: existing.id },
      data: { customerId: customer.id, name: customer.name, deletedAt: null, deletedBy: null, passwordHash: null },
      select: { id: true },
    });
    userId = updated.id;
  } else {
    const created = await prisma.user.create({
      data: { companyId, email, name: customer.name, role: 'CUSTOMER', customerId: customer.id },
      select: { id: true },
    });
    userId = created.id;
  }

  const company = await prisma.company.findUnique({ where: { id: companyId }, select: { id: true, name: true, subdomain: true } });
  const url = `${config.portalBaseUrl}/portal/welcome?token=${encodeURIComponent(signInviteToken({ id: userId, companyId }))}`;

  const result = await sendMail(
    portalInviteEmail({
      to: email,
      customerName: customer.name,
      companyName: company?.name ?? 'Your service company',
      url,
      loginUrl: company ? portalLoginUrl(company) : undefined,
      expiresIn: config.portalInviteTtl,
    }),
  );

  // When the email didn't go out, hand the link back so staff can share it another way.
  return result.sent ? { status: 'sent' } : { status: 'not_sent', reason: result.reason, url };
}
