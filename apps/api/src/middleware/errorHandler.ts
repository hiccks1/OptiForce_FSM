export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { isDomainError } from "@fsm/core/errors/index";

export function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (res.headersSent) {
    next(error);
    return;
  }

  const requestId =
    req.ctx?.requestId ??
    req.header("x-request-id") ??
    res.getHeader("X-Request-ID")?.toString();

  if (isDomainError(error)) {
    res.status(error.statusCode).json({
      ...error.toClientJSON(),
      requestId,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      code: "VALIDATION_ERROR",
      message: "Request validation failed",
      details: error.flatten(),
      requestId,
    });
    return;
  }

  console.error("Unhandled request error", { requestId, error });
  res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Internal server error",
    requestId,
  });
}
