// apps/api/src/mail/templates.ts
import type { MailMessage } from './mailer';

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function portalInviteEmail(input: {
  to: string;
  customerName: string;
  companyName: string;
  url: string;
  loginUrl?: string;
  expiresIn: string;
}): MailMessage {
  const { to, customerName, companyName, url, loginUrl, expiresIn } = input;
  const subject = `${companyName}: set up your customer portal`;
  const text = [
    `Hi ${customerName},`,
    '',
    `${companyName} has created a customer portal account for you. Use it to see and manage your upcoming service appointments.`,
    '',
    `Set your password here (link expires in ${expiresIn}):`,
    url,
    '',
    ...(loginUrl ? [`After that, sign in any time at: ${loginUrl}`, ''] : []),
    `If you weren't expecting this email, you can ignore it.`,
  ].join('\n');
  const html = `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;color:#1e2233">
  <h2 style="margin:0 0 12px">${escapeHtml(companyName)}</h2>
  <p>Hi ${escapeHtml(customerName)},</p>
  <p>${escapeHtml(companyName)} has created a customer portal account for you. Use it to see and manage your upcoming service appointments.</p>
  <p style="margin:28px 0"><a href="${escapeHtml(url)}" style="background:#4f46e5;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:600">Set your password</a></p>
  <p style="color:#6b7280;font-size:13px">This link expires in ${escapeHtml(expiresIn)}. If the button doesn't work, paste this into your browser:<br>${escapeHtml(url)}</p>
  ${loginUrl ? `<p style="font-size:13px">After that, sign in any time at <a href="${escapeHtml(loginUrl)}">${escapeHtml(loginUrl)}</a></p>` : ''}
  <p style="color:#9ca3af;font-size:12px">If you weren't expecting this email, you can ignore it.</p>
</div>`;
  return { to, subject, text, html };
}
