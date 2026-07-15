import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, type User } from '../api/client';
import { saveSession } from '../auth';
import { theme } from '../theme';

export default function Login() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('csr@optiforce.demo');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.listUsers().then((r) => {
      if (r.ok) setUsers(r.data.users);
    });
  }, []);

  async function signIn(withEmail: string) {
    setLoading(true);
    setError('');
    const r = await api.login(withEmail);
    setLoading(false);
    if (!r.ok) {
      setError(r.error);
      return;
    }
    saveSession({ token: r.data.token, user: r.data.user });
    navigate('/dashboard');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ background: `linear-gradient(150deg, ${theme.primary}, #1e1b4b)`, color: '#fff', padding: 56, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 22 }}>O</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>OptiForce FSM</div>
        </div>
        <h2 style={{ fontSize: 36, lineHeight: 1.15, margin: '0 0 16px', maxWidth: 460 }}>The workspace your CSRs use to schedule, dispatch & delight customers.</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', maxWidth: 420 }}>
          Book visits on a live calendar, manage your customer book, track jobs & documents — and give customers their own self-service portal.
        </p>
      </div>

      <div style={{ display: 'grid', placeItems: 'center', background: theme.bg, padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 360, background: '#fff', borderRadius: 18, border: `1px solid ${theme.border}`, padding: 32, boxShadow: '0 20px 45px rgba(20,20,60,0.08)' }}>
          <h1 style={{ fontSize: 22, margin: '0 0 4px' }}>Welcome back</h1>
          <p style={{ color: theme.muted, fontSize: 14, margin: '0 0 22px' }}>Sign in to the CSR workspace.</p>

          <label style={{ fontSize: 12, color: theme.muted }}>Work email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            style={{ width: '100%', boxSizing: 'border-box', margin: '6px 0 16px', padding: '11px 12px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14 }}
          />

          {error && <div style={{ color: theme.danger, fontSize: 13, marginBottom: 12 }}>{error}</div>}

          <button
            onClick={() => signIn(email)}
            disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: theme.primary, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          {users.length > 0 && (
            <div style={{ marginTop: 22 }}>
              <div style={{ fontSize: 12, color: theme.muted, marginBottom: 8 }}>Demo accounts — click to sign in</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => signIn(u.email)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderRadius: 10, border: `1px solid ${theme.border}`, background: '#fff', cursor: 'pointer', fontSize: 13 }}
                  >
                    <span>{u.name}</span>
                    <span style={{ color: theme.muted }}>{u.role}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
