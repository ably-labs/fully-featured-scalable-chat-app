/* eslint-disable */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: "app",
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    proxy: {
      "/api": "http://localhost:7071"
    }
  },
  build: {
    outDir: "../dist",
    sourcemap: true,
    emptyOutDir: true
  },
  plugins: [react()]
});
