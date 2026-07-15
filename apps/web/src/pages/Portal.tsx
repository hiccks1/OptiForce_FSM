import { useCallback, useEffect, useState } from 'react';
import { api, type CalendarEvent, type PortalConfig } from '../api/client';

function toLocalInput(iso: string) {
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}
function fmt(iso: string) {
  return new Date(iso).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function Portal() {
  const [cfg, setCfg] = useState<PortalConfig | null>(null);
  const [visits, setVisits] = useState<CalendarEvent[]>([]);
  const [editing, setEditing] = useState<CalendarEvent | null>(null);
  const [msg, setMsg] = useState('');

  const load = useCallback(async () => {
    const [c, v] = await Promise.all([api.portalConfig(), api.portalUpcoming()]);
    if (c.ok) setCfg(c.data);
    if (v.ok) setVisits(v.data.visits);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const primary = cfg?.primaryColor ?? '#4f46e5';

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fb', fontFamily: 'Inter, system-ui, sans-serif', color: '#1e2233' }}>
      <header style={{ background: `linear-gradient(120deg, ${primary}, #1e1b4b)`, color: '#fff', padding: '40px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ fontSize: 13, opacity: 0.8 }}>{cfg?.companyName}</div>
          <h1 style={{ margin: '6px 0 6px', fontSize: 30 }}>{cfg?.title ?? 'Customer Portal'}</h1>
          <p style={{ margin: 0, opacity: 0.85, maxWidth: 520 }}>{cfg?.description}</p>
        </div>
      </header>

      <main style={{ maxWidth: 780, margin: '0 auto', padding: '28px 24px' }}>
        <h2 style={{ fontSize: 18 }}>Your upcoming appointments</h2>
        {msg && <div style={{ color: '#16a34a', marginBottom: 12 }}>{msg}</div>}

        {visits.length === 0 && <div style={{ color: '#6b7280' }}>You have no upcoming appointments.</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visits.map((v) => (
            <div key={v.id} style={{ background: '#fff', border: '1px solid #e6e8f0', borderRadius: 14, padding: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{v.title}</div>
                <div style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>{fmt(v.start)}</div>
                <div style={{ color: '#6b7280', fontSize: 13, marginTop: 2 }}>
                  {v.customerName}{v.technicianName ? ` · Technician: ${v.technicianName}` : ''}
                </div>
                {v.address && <div style={{ color: '#9ca3af', fontSize: 13 }}>{v.address.line1}, {v.address.city}</div>}
              </div>
              {cfg?.allowReschedule && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setEditing(v)} style={{ border: `1px solid ${primary}`, color: primary, background: '#fff', borderRadius: 10, padding: '9px 14px', cursor: 'pointer', fontWeight: 600 }}>Reschedule</button>
                  <button
                    onClick={async () => {
                      const r = await api.portalCancel(v.jobId, v.id);
                      if (r.ok) { setMsg('Appointment cancelled.'); await load(); setTimeout(() => setMsg(''), 3000); }
                    }}
                    style={{ border: '1px solid #f0c9c9', color: '#dc2626', background: '#fff', borderRadius: 10, padding: '9px 14px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {editing && (
        <Reschedule
          event={editing}
          primary={primary}
          onClose={() => setEditing(null)}
          onSaved={async () => { setEditing(null); setMsg('Appointment rescheduled.'); await load(); setTimeout(() => setMsg(''), 3000); }}
        />
      )}
    </div>
  );
}

function Reschedule({ event, primary, onClose, onSaved }: { event: CalendarEvent; primary: string; onClose: () => void; onSaved: () => void }) {
  const [start, setStart] = useState(toLocalInput(event.start));
  const durationMs = +new Date(event.end) - +new Date(event.start);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    setBusy(true);
    setError('');
    const startIso = new Date(start).toISOString();
    const endIso = new Date(new Date(start).getTime() + durationMs).toISOString();
    const r = await api.portalReschedule(event.jobId, event.id, { start: startIso, end: endIso });
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onSaved();
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,18,40,0.45)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 400, background: '#fff', borderRadius: 16, padding: 24 }}>
        <h2 style={{ margin: '0 0 6px', fontSize: 19 }}>Reschedule appointment</h2>
        <p style={{ margin: '0 0 16px', color: '#6b7280', fontSize: 14 }}>{event.title}</p>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 5 }}>New date & time</div>
        <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} style={{ width: '100%', boxSizing: 'border-box', padding: '10px 11px', borderRadius: 10, border: '1px solid #e6e8f0', fontSize: 14 }} />
        {error && <div style={{ color: '#dc2626', fontSize: 13, marginTop: 8 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 18 }}>
          <button onClick={onClose} style={{ border: '1px solid #e6e8f0', background: '#fff', borderRadius: 10, padding: '10px 16px', cursor: 'pointer' }}>Cancel</button>
          <button onClick={save} disabled={busy} style={{ background: primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 600, cursor: 'pointer' }}>{busy ? 'Saving…' : 'Confirm'}</button>
        </div>
      </div>
    </div>
  );
}
