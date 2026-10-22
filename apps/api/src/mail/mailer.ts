// apps/api/src/mail/mailer.ts
// Outbound email over SMTP (any provider). Without SMTP_URL, messages are logged
// so local setups still surface invite links.
import nodemailer, { type Transporter } from 'nodemailer';
import { config } from '../config/env';

export type MailMessage = { to: string; subject: string; text: string; html: string };
export type MailResult = { sent: true } | { sent: false; reason: string };

let transport: Transporter | null = null;

function getTransport(): Transporter | null {
  if (!config.smtpUrl) return null;
  transport ??= nodemailer.createTransport(config.smtpUrl);
  return transport;
}

export async function sendMail(msg: MailMessage): Promise<MailResult> {
  const t = getTransport();
  if (!t) {
    // eslint-disable-next-line no-console
    console.warn(`[mail] SMTP_URL not set; not sending "${msg.subject}" to ${msg.to}:\n${msg.text}`);
    return { sent: false, reason: 'SMTP not configured' };
  }
  try {
    await t.sendMail({ from: config.mailFrom, ...msg });
    return { sent: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[mail] failed to send "${msg.subject}" to ${msg.to}:`, err);
    return { sent: false, reason: err instanceof Error ? err.message : 'Send failed' };
  }
}
