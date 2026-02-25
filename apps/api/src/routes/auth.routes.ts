// apps/api/src/routes/auth.ts - Auth routes

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import { Router } from "express";
import { login } from "../controllers/auth";

const router = Router();

router.post("/login", login);

export default router;
