import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { api, type DocumentRow } from '../api/client';
import { theme, statusColor } from '../theme';

function fmtSize(bytes: number | null) {
  if (!bytes) return '—';
  return `${Math.round(bytes / 1024)} KB`;
}

export default function Documents() {
  const [docs, setDocs] = useState<DocumentRow[]>([]);

  useEffect(() => {
    api.listDocuments().then((r) => r.ok && setDocs(r.data.documents));
  }, []);

  return (
    <Layout title="Documents">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {docs.map((d) => {
          const type = (d.metadata?.documentType as string) ?? 'document';
          return (
            <div key={d.id} style={{ background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 14, padding: 18, display: 'flex', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${theme.primary}14`, color: theme.primary, display: 'grid', placeItems: 'center', fontSize: 20 }}>▣</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, lineHeight: 1.3 }}>{d.title ?? 'Untitled'}</div>
                <div style={{ fontSize: 12, color: theme.muted, textTransform: 'capitalize', marginTop: 2 }}>{type} · {d.mimeType ?? ''} · {fmtSize(d.fileSize)}</div>
                <span style={{ display: 'inline-block', marginTop: 10, fontSize: 11, fontWeight: 700, color: statusColor[d.status] ?? theme.muted, background: `${statusColor[d.status] ?? theme.muted}18`, padding: '4px 9px', borderRadius: 999 }}>{d.status.replace('_', ' ')}</span>
              </div>
            </div>
          );
        })}
        {docs.length === 0 && <div style={{ color: theme.muted }}>No documents yet.</div>}
      </div>
    </Layout>
  );
}
