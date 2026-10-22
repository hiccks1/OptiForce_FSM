import type { ReactNode } from 'react';
import { theme } from '../theme';

export const portalInputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  margin: '6px 0 16px',
  padding: '11px 12px',
  borderRadius: 10,
  border: `1px solid ${theme.border}`,
  fontSize: 14,
};

export const portalButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  borderRadius: 10,
  border: 'none',
  background: theme.primary,
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
};

// Centered card used by the customer portal's sign-in and set-password pages.
export default function PortalAuthShell({ title, subtitle, children }: { title: string; subtitle?: ReactNode; children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: `linear-gradient(150deg, ${theme.primary}, #1e1b4b)`, padding: 24, fontFamily: 'Inter, system-ui, sans-serif', color: theme.text }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 18, padding: 32, boxShadow: '0 20px 45px rgba(20,20,60,0.25)' }}>
        <h1 style={{ fontSize: 22, margin: '0 0 6px' }}>{title}</h1>
        {subtitle && <p style={{ color: theme.muted, fontSize: 14, margin: '0 0 22px' }}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
