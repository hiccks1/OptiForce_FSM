// apps/api/src/controllers/auth.ts

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import type { Request, Response } from "express";
import { AuthService } from "@fsm/core/services/AuthService";

export async function login(req: Request, res: Response) {
  const result = await AuthService.login(req.ctx, req.body ?? {});
  res.json(result);
}
