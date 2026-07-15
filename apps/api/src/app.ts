// apps/api/src/app.ts - Express app wiring

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { auth } from './middleware/auth';
import { attachCtx } from './middleware/attachCtx';
import routes from "./routes";



const app = express();

// Security headers (HSTS, X-Content-Type-Options, frame denial, etc.)
app.use(helmet());

// Allowed browser origins. Comma-separated CORS_ORIGINS overrides the default
// local dev origin. Never fall back to a wildcard while credentials are enabled.
const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-company-id"],
};

app.use(cors(corsOptions));

// handle preflight with the same restricted policy (not a permissive default)
app.options("*", cors(corsOptions));

// Parse bodies before any handler/middleware that reads req.body.
app.use(express.json());

app.use(auth);
app.use(attachCtx);
app.use(routes);

export default app;
