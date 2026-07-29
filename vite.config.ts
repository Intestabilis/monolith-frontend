import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  define: {
    // added it because react-rnd uses process variable under the hood
    // CHANGE in production (or do some dev/prod mode check and define it based on the results)
    "process.env": {},
  },
});
