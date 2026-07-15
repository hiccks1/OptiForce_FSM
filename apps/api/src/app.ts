// apps/api/src/app.ts - Express app wiring
import express from 'express';
import cors from 'cors';
import { attachCtx } from './middleware/attachCtx';
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

// Fallback error handler.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error('API error:', err);
  res.status(500).json({ error: err instanceof Error ? err.message : 'Internal error' });
});

export default app;
