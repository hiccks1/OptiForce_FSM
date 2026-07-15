import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { theme } from '../theme';
import { clearSession, getSession } from '../auth';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: '▦' },
  { to: '/calendar', label: 'Schedule', icon: '▤' },
  { to: '/customers', label: 'Customers', icon: '☺' },
  { to: '/jobs', label: 'Jobs', icon: '✦' },
  { to: '/documents', label: 'Documents', icon: '▣' },
];

export default function Layout({ title, children, actions }: { title: string; children: React.ReactNode; actions?: React.ReactNode }) {
  const navigate = useNavigate();
  const session = getSession();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg, color: theme.text, fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <aside style={{ width: 232, background: '#111528', color: '#fff', padding: '22px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 20px' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: theme.primary, display: 'grid', placeItems: 'center', fontWeight: 800 }}>O</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>OptiForce</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Field Service Mgmt</div>
          </div>
        </div>
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 12px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: 14,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.7)',
              background: isActive ? theme.primary : 'transparent',
              fontWeight: isActive ? 600 : 500,
            })}
          >
            <span style={{ width: 18, textAlign: 'center' }}>{n.icon}</span>
            {n.label}
          </NavLink>
        ))}
        <div style={{ flex: 1 }} />
        <a href="/portal" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 12px', borderRadius: 10, textDecoration: 'none', fontSize: 14, color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ width: 18, textAlign: 'center' }}>⇲</span>
          Customer Portal
        </a>
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ height: 64, background: theme.panel, borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {actions}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{session?.user.name ?? 'Guest'}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>{session?.user.role ?? ''}</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: theme.primary, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700 }}>
                {(session?.user.name ?? 'G').charAt(0)}
              </div>
              <button
                onClick={() => {
                  clearSession();
                  navigate('/');
                }}
                style={{ border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 8, padding: '7px 12px', cursor: 'pointer', fontSize: 13 }}
              >
                Sign out
              </button>
            </div>
          </div>
        </header>
        <main style={{ padding: 28, flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}
