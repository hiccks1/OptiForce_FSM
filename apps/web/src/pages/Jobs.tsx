import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api, type JobSummary } from '../api/client';
import { theme, statusColor } from '../theme';

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export default function Jobs() {
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    api.listJobs().then((r) => r.ok && setJobs(r.data.jobs));
  }, []);

  const statuses = ['ALL', 'NEW', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED'];
  const filtered = filter === 'ALL' ? jobs : jobs.filter((j) => j.status === filter);

  return (
    <Layout title="Jobs">
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '7px 14px',
              borderRadius: 999,
              border: `1px solid ${filter === s ? theme.primary : theme.border}`,
              background: filter === s ? theme.primary : '#fff',
              color: filter === s ? '#fff' : theme.text,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {s === 'ALL' ? 'All' : s.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {filtered.map((j) => (
          <div key={j.id} style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{j.customer.name}</div>
                <div style={{ fontSize: 13, color: theme.muted }}>{j.serviceType ?? 'Service'}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: statusColor[j.status] ?? theme.muted, background: `${statusColor[j.status] ?? theme.muted}18`, padding: '4px 9px', borderRadius: 999 }}>{j.status.replace('_', ' ')}</span>
            </div>
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 13, color: theme.muted }}>
              <span>{j.visitCount} visit{j.visitCount === 1 ? '' : 's'}</span>
              <span>Next: {fmtDate(j.nextVisit)}</span>
            </div>
            {j.priority === 'urgent' && <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: theme.danger }}>● Urgent</div>}
          </div>
        ))}
        {filtered.length === 0 && <div style={{ color: theme.muted }}>No jobs in this view.</div>}
      </div>
    </Layout>
  );
}
