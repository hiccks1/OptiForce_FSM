// apps/api/src/app.ts - Express app wiring

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import "express-async-errors";
import express from "express";
import cors from "cors";
import { attachCtx } from './middleware/attachCtx';
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";



const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-company-id"],
  })
);

// handle preflight
app.options("*", cors());

app.use(express.json());
app.use(attachCtx);
app.use(routes);
app.use(errorHandler);

export default app;
