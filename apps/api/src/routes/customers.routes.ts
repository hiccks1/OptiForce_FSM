export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import { Router } from "express";
import { createCustomer, listCustomers } from "../controllers/customers";

const router = Router();

router.get("/", listCustomers);
router.post("/", createCustomer);

export default router;
