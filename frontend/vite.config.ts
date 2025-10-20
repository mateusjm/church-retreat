import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzOpFJiPuTl9Y8RNxiJw0WoicPA_4dQOyB4EyksGhMctxFMWsAuHitvNc7q_MESrNeTOQ/exec";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: GOOGLE_SHEET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
