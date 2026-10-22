import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { saveCustomerSession } from '../auth';
import PortalAuthShell, { portalButtonStyle, portalInputStyle } from '../components/PortalAuthShell';
import { theme } from '../theme';

// /portal/welcome?token=… — landing page for the emailed invite: set a password, then open the portal.
export default function PortalWelcome() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [info, setInfo] = useState<{ email: string; name: string | null; companyName: string } | null>(null);
  const [loadError, setLoadError] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!token) {
      setLoadError('This invite link is missing its token. Use the link from your email.');
      return;
    }
    api.inviteInfo(token).then((r) => (r.ok ? setInfo(r.data) : setLoadError(r.error)));
  }, [token]);

  async function submit() {
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (password !== confirm) return setError('Passwords do not match.');
    setBusy(true);
    setError('');
    const r = await api.acceptInvite(token, password);
    setBusy(false);
    if (!r.ok) return setError(r.error);
    saveCustomerSession(r.data);
    navigate('/portal', { replace: true });
  }

  if (loadError) {
    return (
      <PortalAuthShell title="Invite link not valid" subtitle={loadError}>
        <a href="/portal/login" style={{ color: theme.primary, fontSize: 14 }}>Already set a password? Sign in</a>
      </PortalAuthShell>
    );
  }

  if (!info) return <PortalAuthShell title="Loading…">{null}</PortalAuthShell>;

  return (
    <PortalAuthShell
      title={`Welcome${info.name ? `, ${info.name}` : ''}`}
      subtitle={<>Create a password for your <strong>{info.companyName}</strong> customer portal.</>}
    >
      <label style={{ fontSize: 12, color: theme.muted }}>Email</label>
      <input value={info.email} readOnly style={{ ...portalInputStyle, background: '#f5f6fb', color: theme.muted }} />

      <label style={{ fontSize: 12, color: theme.muted }}>New password</label>
      <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} style={portalInputStyle} />

      <label style={{ fontSize: 12, color: theme.muted }}>Confirm password</label>
      <input
        type="password"
        autoComplete="new-password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        style={portalInputStyle}
      />

      {error && <div style={{ color: theme.danger, fontSize: 13, marginBottom: 12 }}>{error}</div>}
      <button onClick={submit} disabled={busy} style={portalButtonStyle}>{busy ? 'Saving…' : 'Set password & open portal'}</button>
    </PortalAuthShell>
  );
}
