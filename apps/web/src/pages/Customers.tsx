import resourceTimelinePlugin from '@fullcalendar/react-scheduler/resource-timeline';
import { useCallback, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api, type Customer, type InviteResult } from '../api/client';
import { theme } from '../theme';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<{ text: string; url?: string } | null>(null);

  const load = useCallback(async () => {
    const r = await api.listCustomers();
    if (r.ok) setCustomers(r.data.customers);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = customers.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()) || (c.email ?? '').toLowerCase().includes(q.toLowerCase()));

  return (
    <Layout
      title="Customers"
      actions={<button onClick={() => setOpen(true)} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>+ Add customer</button>}
    >
      {notice && (
        <div style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 12, padding: '12px 16px', marginBottom: 16, fontSize: 14, display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
          <div>
            <div>{notice.text}</div>
            {notice.url && (
              <div style={{ marginTop: 6, fontSize: 12, color: theme.muted, wordBreak: 'break-all' }}>
                Share this link with the customer: <a href={notice.url}>{notice.url}</a>
              </div>
            )}
          </div>
          <button onClick={() => setNotice(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: theme.muted, fontSize: 16 }}>×</button>
        </div>
      )}

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search customers…" style={{ width: 320, maxWidth: '100%', padding: '10px 12px', borderRadius: 10, border: `1px solid ${theme.border}`, marginBottom: 16, fontSize: 14 }} />

      <div style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#fafbff', color: theme.muted, textAlign: 'left' }}>
              <th style={th}>Customer</th>
              <th style={th}>Contact</th>
              <th style={th}>Location</th>
              <th style={th}>Jobs</th>
              <th style={th}>Upcoming</th>
              <th style={th}>Portal</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} style={{ borderTop: `1px solid ${theme.border}` }}>
                <td style={td}><strong>{c.name}</strong></td>
                <td style={td}>
                  <div>{c.email ?? '—'}</div>
                  <div style={{ color: theme.muted, fontSize: 13 }}>{c.phone ?? ''}</div>
                </td>
                <td style={{ ...td, color: theme.muted }}>{c.address ? `${c.address.city ?? ''}, ${c.address.state ?? ''}` : '—'}</td>
                <td style={td}>{c.jobCount}</td>
                <td style={td}><span style={{ fontWeight: 700, color: c.upcomingVisits ? theme.primary : theme.muted }}>{c.upcomingVisits}</span></td>
                <td style={td}>
                  {c.portalStatus === 'active' ? (
                    <span style={{ color: theme.success, fontWeight: 600 }}>Active</span>
                  ) : c.email ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {c.portalStatus === 'invited' && <span style={{ color: theme.warn, fontWeight: 600 }}>Invited</span>}
                      <button
                        onClick={async () => {
                          const r = await api.resendCustomerInvite(c.id);
                          setNotice(r.ok ? inviteNotice(c.name, r.data.invite) : { text: r.error });
                          await load();
                        }}
                        style={{ border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 8, padding: '5px 10px', cursor: 'pointer', fontSize: 12 }}
                      >
                        {c.portalStatus === 'invited' ? 'Resend' : 'Invite'}
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: theme.muted }}>—</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ ...td, textAlign: 'center', color: theme.muted, padding: 32 }}>No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <AddCustomerModal
          onClose={() => setOpen(false)}
          onSaved={async (name, invite) => {
            setOpen(false);
            setNotice(invite ? inviteNotice(name, invite) : { text: `${name} added.` });
            await load();
          }}
        />
      )}
    </Layout>
  );
}

function inviteNotice(name: string, invite: InviteResult): { text: string; url?: string } {
  switch (invite.status) {
    case 'sent':
      return { text: `Portal invite emailed to ${name}.` };
    case 'not_sent':
      return { text: `Portal account created for ${name}, but the invite email was not sent (${invite.reason ?? 'unknown error'}).`, url: invite.url };
    case 'already_active':
      return { text: `${name} already has an active portal account.` };
    case 'email_in_use':
      return { text: `No portal invite sent: that email belongs to a staff user.` };
    default:
      return { text: `No portal invite sent: the email address is not valid.` };
  }
}

const th: React.CSSProperties = { padding: '13px 18px', fontWeight: 600, fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.3 };
const td: React.CSSProperties = { padding: '13px 18px' };
const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 11px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14 };

function AddCustomerModal({ onClose, onSaved }: { onClose: () => void; onSaved: (name: string, invite: InviteResult | null) => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [line1, setLine1] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    if (!name.trim()) return setError('Name is required');
    setBusy(true);
    setError('');
    const r = await api.createCustomer({ name, email: email || undefined, phone: phone || undefined, serviceType: serviceType || undefined, address: { line1, city, state } });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onSaved(r.data.name, r.data.invite);
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,18,40,0.45)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 460, background: '#fff', borderRadius: 16, padding: 24 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>Add customer</h2>
        
        <Field label="Name *"><input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} /></Field>
        <Field label="Email"><input value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} /></Field>
        {email.trim() && <div style={{ color: theme.muted, fontSize: 12, margin: '-6px 0 12px' }}>We'll email this customer a link to set up their portal account.</div>}
        <Field label="Phone"><input value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} /></Field>
        <Field label="Service type"><input value={serviceType} onChange={(e) => setServiceType(e.target.value)} placeholder="HVAC, Plumbing…" style={inputStyle} /></Field>
        <Field label="Street address"><input value={line1} onChange={(e) => setLine1(e.target.value)} style={inputStyle} /></Field>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <Field label="City"><input value={city} onChange={(e) => setCity(e.target.value)} style={inputStyle} /></Field>
          <Field label="State"><input value={state} onChange={(e) => setState(e.target.value)} style={inputStyle} /></Field>
        </div>

        {error && <div style={{ color: theme.danger, fontSize: 13 }}>{error}</div>}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
          <button onClick={onClose} style={{ border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={save} disabled={busy} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 600, cursor: 'pointer' }}>{busy ? 'Saving…' : 'Add customer'}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>{label}</div>
      {children}
    </label>
  );
}
