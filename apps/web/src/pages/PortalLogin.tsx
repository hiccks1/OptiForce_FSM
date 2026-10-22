import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { lastPortalCompany, saveCustomerSession } from '../auth';
import PortalAuthShell, { portalButtonStyle, portalInputStyle } from '../components/PortalAuthShell';
import { theme } from '../theme';

// /portal/login?company=<id or subdomain> — returning customers sign in to their portal.
export default function PortalLogin() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const company = params.get('company') ?? lastPortalCompany() ?? '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    setError('');
    const r = await api.customerLogin(company, email, password);
    setBusy(false);
    if (!r.ok) return setError(r.error);
    saveCustomerSession(r.data, company);
    navigate('/portal', { replace: true });
  }

  if (!company) {
    return (
      <PortalAuthShell title="Customer portal" subtitle="Open the sign-in link from your service company's email to continue.">
        {null}
      </PortalAuthShell>
    );
  }

  return (
    <PortalAuthShell title="Customer portal" subtitle="Sign in to see and manage your appointments.">
      <label style={{ fontSize: 12, color: theme.muted }}>Email</label>
      <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={portalInputStyle} />

      <label style={{ fontSize: 12, color: theme.muted }}>Password</label>
      <input
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        style={portalInputStyle}
      />

      {error && <div style={{ color: theme.danger, fontSize: 13, marginBottom: 12 }}>{error}</div>}
      <button onClick={submit} disabled={busy} style={portalButtonStyle}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </PortalAuthShell>
  );
}
