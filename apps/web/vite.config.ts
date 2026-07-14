export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
   optimizeDeps: {
    // Prevents Vite from parsing deep inside @fsm/db's backend files during dev
    exclude: ["@fsm/db"] 
  }  
});
