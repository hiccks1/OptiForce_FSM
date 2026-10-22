// apps/api/src/app.ts - Express app wiring
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import routes from './routes';

const app = express();

app.use(helmet());
app.use(
  cors({
    // DEMO_MODE accepts any origin; otherwise only CORS_ORIGINS (default PORTAL_BASE_URL).
    origin: config.demoMode ? true : config.corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: config.demoMode
      ? ['Content-Type', 'Authorization', 'x-company-id', 'x-actor-id', 'x-request-id']
      : ['Content-Type', 'Authorization', 'x-request-id'],
  }),
);

app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

// Routes attach tenant context (attachCtx) per router; /auth/login is public.
app.use(routes);

// Fallback error handler.
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // eslint-disable-next-line no-console
  console.error('API error:', err);
  const message = err instanceof Error ? err.message : 'Internal error';
  res.status(500).json({ error: config.nodeEnv === 'production' ? 'Internal error' : message });
});

export default app;
