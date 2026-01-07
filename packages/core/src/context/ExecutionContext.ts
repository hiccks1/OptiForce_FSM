// FSM/packages/core/src/context/ExecutionContext.ts

import { UserRole } from "@prisma/client";
import { CompanyConfig } from "../config/types";

export type ExecutionContext = Readonly<{
  requestId: string;
  companyId: string;

  actor: {
    type: "human" | "system" | "ai";
    id?: string;
    role?: UserRole;
  };

  source: "api" | "worker" | "cron" | "betty";

  config: CompanyConfig;              // Zod-validated
  permissions: ResolvedPermissions;   // derived from config
  workflows: ResolvedWorkflows;       // derived from config
  subscription: SubscriptionSnapshot; // limits & entitlements

  timestamp: Date;
}>;
