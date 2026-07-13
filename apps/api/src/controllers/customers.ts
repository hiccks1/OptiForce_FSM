// apps/api/src/controllers/customer.ts 

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import type { Request, Response } from "express";
import { JobService } from "@fsm/core/services/JobService";

export async function createCustomer(req: Request, res: Response) {
  const {
    name,
    phone,
    email,
    address1,
    city,
    state,
    zip,
    jobType = "CUSTOMER_INTAKE",
  } = req.body ?? {};

  const svc = new JobService(req.ctx.prisma);

  const result = await svc.createCustomerIntake(req.ctx, {
    name: String(name ?? ""),
    phone: phone ? String(phone) : undefined,
    email: email ? String(email) : undefined,
    serviceAddress: {
      line1: String(address1 ?? ""),
      city: String(city ?? ""),
      state: String(state ?? ""),
      postalCode: String(zip ?? ""),
      country: "US",
    },
    jobType: String(jobType),
  });

  res.json(result);
}

export async function listCustomers(req: Request, res: Response) {
  const svc = new JobService(req.ctx.prisma);

  const result = await svc.listCustomerIntakes(req.ctx, { limit: 50 });

  res.json(result);
}
