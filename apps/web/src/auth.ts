import type { User } from './api/client';

const KEY = 'optiforce.session';

export type Session = { token: string; user: User & { companyId?: string } };

export function saveSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function getSession(): Session | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

const PORTAL_KEY = 'optiforce.portalToken';

// Customer portal links carry ?token=...; keep it for this browser tab only.
export function capturePortalToken(): string | null {
  const url = new URL(window.location.href);
  const fromUrl = url.searchParams.get('token');
  if (fromUrl) {
    sessionStorage.setItem(PORTAL_KEY, fromUrl);
    url.searchParams.delete('token');
    window.history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  return sessionStorage.getItem(PORTAL_KEY);
}

export function getPortalToken(): string | null {
  return sessionStorage.getItem(PORTAL_KEY);
}
