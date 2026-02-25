// FSM/packages/core/src/domain/User.ts

import { UserRole } from "@prisma/client";

import { DriftyLayer } from "../../drifty/laws";
export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
};

export type UserCapabilities = {
  canCreateEstimates: boolean;
  canApproveEstimates: boolean;
  canManageJobs: boolean;
  canViewAllAccounts: boolean;
  canAssignTechnicians: boolean;
  canAccessBetty: boolean;
};


export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: [DriftyLayer.L2_DOMAIN],
} as const;
