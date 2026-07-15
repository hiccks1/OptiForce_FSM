import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { api, type CalendarEvent, type Customer, type JobSummary } from '../api/client';
import { theme, statusColor } from '../theme';

function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [jobs, setJobs] = useState<JobSummary[]>([]);

  useEffect(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth() + 2, 0);
    api.listCalendar({ start: start.toISOString(), end: end.toISOString() }).then((r) => r.ok && setEvents(r.data.events));
    api.listCustomers().then((r) => r.ok && setCustomers(r.data.customers));
    api.listJobs().then((r) => r.ok && setJobs(r.data.jobs));
  }, []);

  const today = new Date().toDateString();
  const todays = events.filter((e) => new Date(e.start).toDateString() === today).sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const openJobs = jobs.filter((j) => j.status !== 'COMPLETED' && j.status !== 'CANCELLED').length;

  const kpis = [
    { label: "Today's visits", value: todays.length, color: theme.primary },
    { label: 'Upcoming visits', value: events.filter((e) => +new Date(e.start) >= Date.now()).length, color: theme.warn },
    { label: 'Customers', value: customers.length, color: theme.success },
    { label: 'Open jobs', value: openJobs, color: '#0891b2' },
  ];

  return (
    <Layout
      title="Dashboard"
      actions={
        <button onClick={() => navigate('/calendar')} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>
          + Schedule a visit
        </button>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ fontSize: 13, color: theme.muted }}>{k.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: k.color, marginTop: 6 }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <div style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Today's schedule</div>
          {todays.length === 0 && <div style={{ color: theme.muted, fontSize: 14 }}>No visits scheduled today.</div>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todays.map((e) => (
              <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 14px', border: `1px solid ${theme.border}`, borderRadius: 12 }}>
                <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 4, background: statusColor[e.status] ?? theme.primary }} />
                <div style={{ minWidth: 92, fontWeight: 600 }}>{fmtTime(e.start)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{e.title}</div>
                  <div style={{ fontSize: 13, color: theme.muted }}>{e.customerName} · {e.technicianName ?? 'Unassigned'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>Recent jobs</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {jobs.slice(0, 6).map((j) => (
              <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{j.customer.name}</div>
                  <div style={{ fontSize: 12, color: theme.muted }}>{j.serviceType ?? 'Service'}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: statusColor[j.status] ?? theme.muted, background: `${statusColor[j.status] ?? theme.muted}18`, padding: '4px 9px', borderRadius: 999 }}>{j.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
