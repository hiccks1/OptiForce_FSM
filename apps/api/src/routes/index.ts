export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import { Router } from "express";
import authRoutes from "./auth.routes";
import customersRoutes from "./customers.routes";
import jobsRouter from "./jobs.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/customers", customersRoutes);
router.use("/jobs", jobsRouter);

export default router;
