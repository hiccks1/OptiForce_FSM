// FSM/apps/api/src/middleware/requestContext.ts

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};


import { Request, Response, NextFunction } from "express";
import { createContext } from "@fsm/core/context/createContext";
import { RequestContext } from "@fsm/core/context/RequestContext";
import { UserRole } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}

export function attachRequestContext(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const actorId = req.user?.id || "anonymous";
  const role = req.user?.role || UserRole.CSR;

  const requestId =
    (req.headers["x-request-id"] as string) || crypto.randomUUID();

  const companyIdHeader = req.headers["x-company-id"];
  const companyId =
    (typeof companyIdHeader === "string" ? companyIdHeader : undefined) ||
    (typeof req.query.companyId === "string" ? req.query.companyId : undefined);

  req.context = createContext({
    actorId,
    role,
    source: "api",
    requestId,
    companyId,
  });

  res.setHeader("X-Request-ID", req.context.requestId);

  next();
}
