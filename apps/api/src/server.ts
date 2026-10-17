// apps/api/src/server.ts - HTTP server bootstrap

export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import app from "./app";
import { config } from "./config/env";

export function createServer() {
  const port = config.port;
  app.listen(port, () => console.log("API listening on", port));
}
