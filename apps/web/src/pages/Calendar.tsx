import { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { api, type CalendarEvent } from '../api/client';
import { theme, statusColor } from '../theme';

const TECHS = [
  { id: 'tech_amir', name: 'Amir Kaplan' },
  { id: 'tech_dana', name: 'Dana Ruiz' },
  { id: 'tech_leo', name: 'Leo Chen' },
];

function startOfWeek(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - x.getDay());
  return x;
}
function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}
function toLocalInput(d: Date) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
}

type Editing =
  | { mode: 'create'; date: Date }
  | { mode: 'edit'; event: CalendarEvent }
  | null;

export default function Calendar() {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [techFilter, setTechFilter] = useState('');
  const [editing, setEditing] = useState<Editing>(null);
  const [msg, setMsg] = useState('');

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i)), [weekStart]);

  const load = useCallback(async () => {
    const start = days[0]!;
    const end = new Date(days[6]!.getFullYear(), days[6]!.getMonth(), days[6]!.getDate() + 1);
    const r = await api.listCalendar({ start: start.toISOString(), end: end.toISOString() });
    if (r.ok) setEvents(r.data.events);
  }, [days]);

  useEffect(() => {
    load();
  }, [load]);

  const visible = techFilter ? events.filter((e) => e.technicianId === techFilter) : events;

  return (
    <Layout
      title="Schedule"
      actions={
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} style={{ padding: '9px 10px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 13 }}>
            <option value="">All technicians</option>
            {TECHS.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button onClick={() => setEditing({ mode: 'create', date: new Date() })} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>+ New visit</button>
        </div>
      }
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button onClick={() => setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7))} style={navBtn}>‹ Prev</button>
        <button onClick={() => setWeekStart(startOfWeek(new Date()))} style={navBtn}>Today</button>
        <button onClick={() => setWeekStart(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7))} style={navBtn}>Next ›</button>
        <div style={{ fontWeight: 600, marginLeft: 8 }}>
          {days[0]!.toLocaleDateString([], { month: 'short', day: 'numeric' })} – {days[6]!.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
        {days.map((d) => {
          const isToday = d.toDateString() === new Date().toDateString();
          const dayEvents = visible.filter((e) => new Date(e.start).toDateString() === d.toDateString()).sort((a, b) => +new Date(a.start) - +new Date(b.start));
          return (
            <div key={d.toISOString()} style={{ background: '#fff', border: `1px solid ${isToday ? theme.primary : theme.border}`, borderRadius: 12, minHeight: 340, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px 12px', borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, color: theme.muted, textTransform: 'uppercase' }}>{d.toLocaleDateString([], { weekday: 'short' })}</div>
                  <div style={{ fontWeight: 700, color: isToday ? theme.primary : theme.text }}>{d.getDate()}</div>
                </div>
                <button onClick={() => setEditing({ mode: 'create', date: d })} title="Add visit" style={{ border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 8, width: 26, height: 26, cursor: 'pointer', color: theme.primary, fontWeight: 700 }}>+</button>
              </div>
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {dayEvents.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEditing({ mode: 'edit', event: e })}
                    style={{ textAlign: 'left', border: 'none', borderLeft: `3px solid ${statusColor[e.status] ?? theme.primary}`, background: `${statusColor[e.status] ?? theme.primary}12`, borderRadius: 8, padding: '7px 9px', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: 11, color: theme.muted }}>{fmtTime(e.start)}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.25 }}>{e.title}</div>
                    <div style={{ fontSize: 11, color: theme.muted }}>{e.customerName}</div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {msg && <div style={{ marginTop: 14, color: theme.success, fontSize: 14 }}>{msg}</div>}

      {editing && (
        <VisitModal
          editing={editing}
          onClose={() => setEditing(null)}
          onSaved={async (text) => {
            setEditing(null);
            setMsg(text);
            await load();
            setTimeout(() => setMsg(''), 3000);
          }}
        />
      )}
    </Layout>
  );
}

const navBtn: React.CSSProperties = { border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: 13 };

function VisitModal({ editing, onClose, onSaved }: { editing: NonNullable<Editing>; onClose: () => void; onSaved: (msg: string) => void }) {
  const isEdit = editing.mode === 'edit';
  const ev = editing.mode === 'edit' ? editing.event : null;

  const defaultStart = ev ? new Date(ev.start) : (() => { const d = new Date(editing.mode === 'create' ? editing.date : new Date()); d.setHours(9, 0, 0, 0); return d; })();
  const defaultEnd = ev ? new Date(ev.end) : new Date(defaultStart.getTime() + 2 * 3600000);

  const [title, setTitle] = useState(ev?.title ?? '');
  const [customerName, setCustomerName] = useState(ev?.customerName ?? '');
  const [tech, setTech] = useState(ev?.technicianId ?? '');
  const [start, setStart] = useState(toLocalInput(defaultStart));
  const [end, setEnd] = useState(toLocalInput(defaultEnd));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function save() {
    setBusy(true);
    setError('');
    const startIso = new Date(start).toISOString();
    const endIso = new Date(end).toISOString();
    const techName = TECHS.find((t) => t.id === tech)?.name;

    if (isEdit && ev) {
      const r = await api.updateVisit(ev.jobId, ev.id, { title, start: startIso, end: endIso, technicianId: tech || undefined, technicianName: techName });
      setBusy(false);
      if (!r.ok) return setError(r.error);
      onSaved('Visit updated.');
    } else {
      if (!customerName.trim()) { setBusy(false); return setError('Customer name is required'); }
      const r = await api.createJob({ title: title || 'Service visit', customerName, assignedTechnicianId: tech || undefined, start: startIso, end: endIso });
      setBusy(false);
      if (!r.ok) return setError(r.error);
      onSaved('Visit scheduled.');
    }
  }

  async function cancel() {
    if (!ev) return;
    setBusy(true);
    const r = await api.cancelVisit(ev.jobId, ev.id);
    setBusy(false);
    if (!r.ok) return setError(r.error);
    onSaved('Visit cancelled.');
  }

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(15,18,40,0.45)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 440, background: '#fff', borderRadius: 16, padding: 24 }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 19 }}>{isEdit ? 'Edit visit' : 'Schedule a visit'}</h2>

        {!isEdit && (
          <Field label="Customer">
            <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer name" style={inputStyle} />
          </Field>
        )}
        {isEdit && <div style={{ marginBottom: 12, fontSize: 13, color: theme.muted }}>Customer: <strong style={{ color: theme.text }}>{ev?.customerName}</strong></div>}

        <Field label="Visit title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AC diagnostic" style={inputStyle} />
        </Field>
        <Field label="Technician">
          <select value={tech} onChange={(e) => setTech(e.target.value)} style={inputStyle}>
            <option value="">Unassigned</option>
            {TECHS.map((t) => (<option key={t.id} value={t.id}>{t.name}</option>))}
          </select>
        </Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Field label="Start"><input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} style={inputStyle} /></Field>
          <Field label="End"><input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} style={inputStyle} /></Field>
        </div>

        {error && <div style={{ color: theme.danger, fontSize: 13, marginTop: 4 }}>{error}</div>}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <div>
            {isEdit && <button onClick={cancel} disabled={busy} style={{ ...btnGhost, color: theme.danger, borderColor: '#f0c9c9' }}>Cancel visit</button>}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={btnGhost}>Close</button>
            <button onClick={save} disabled={busy} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 600, cursor: 'pointer' }}>{busy ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: theme.muted, marginBottom: 5 }}>{label}</div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', boxSizing: 'border-box', padding: '10px 11px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14 };
const btnGhost: React.CSSProperties = { border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', fontSize: 14 };
