import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyeyMRwY5bBvC_B4cBN500-BsKo997JyWto5jP0CypCaZg0PL6AfjLeUpjmK6eOZE4i/exec";

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
