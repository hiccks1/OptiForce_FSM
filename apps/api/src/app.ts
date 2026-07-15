// apps/api/src/app.ts - Express app wiring
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import { attachCtx } from './middleware/attachCtx';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-company-id', 'x-actor-id', 'x-request-id'],
  }),
);

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// Tenant context for all API routes, then the routes themselves.
app.use(attachCtx);
app.use(routes);
app.use(errorHandler);

export default app;
