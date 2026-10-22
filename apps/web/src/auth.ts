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

// Signed-in portal customer (password account created from an emailed invite).
const CUSTOMER_KEY = 'optiforce.customerSession';
const PORTAL_COMPANY_KEY = 'optiforce.portalCompany';

export type CustomerSession = {
  token: string;
  user: { id: string; email: string; name: string | null; companyId: string; companyName: string };
};

export function saveCustomerSession(s: CustomerSession, company?: string) {
  sessionStorage.removeItem(PORTAL_KEY);
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(s));
  localStorage.setItem(PORTAL_COMPANY_KEY, company || s.user.companyId);
}

export function getCustomerSession(): CustomerSession | null {
  const raw = localStorage.getItem(CUSTOMER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CustomerSession;
  } catch {
    return null;
  }
}

export function clearCustomerSession() {
  localStorage.removeItem(CUSTOMER_KEY);
}

// Company (id or subdomain) used by /portal/login when the URL doesn't say.
export function lastPortalCompany(): string | null {
  return localStorage.getItem(PORTAL_COMPANY_KEY);
}

export function getPortalToken(): string | null {
  return sessionStorage.getItem(PORTAL_KEY) ?? getCustomerSession()?.token ?? null;
}
