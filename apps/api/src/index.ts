// apps/api/src/index.ts - API process entrypoint

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import './config/env';
import { createServer } from './server';

createServer();


