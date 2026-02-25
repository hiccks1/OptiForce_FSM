===============================================================================================
// packages/core/src/services/AuthService.ts (LOCKED)
// Core auth service (minimal, tenant-safe stubs).
===============================================================================================

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L2_DOMAIN"],
};

export type LoginResult =
  | { ok: true; userId: string; companyId: string }
  | { ok: false; reason: "INVALID_CREDENTIALS" | "DISABLED" };

export class AuthService {
  // Intentionally minimal: real auth wiring lives in apps/api middleware.
  // This service is here so Drifty has a stable domain contract to call into.

  async login(_input: { email: string; password: string; companyId: string }): Promise<LoginResult> {
    return { ok: false, reason: "INVALID_CREDENTIALS" };
  }
}
