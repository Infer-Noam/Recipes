import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dotenv from "dotenv";

dotenv.config();

const VITE_DEV_PORT =
  process.env.VITE_PORT ??
  (() => {
    throw new Error("Missing vite port"); // Throws an error if no vite port number is configured
  })();

export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(VITE_DEV_PORT),
  },
  preview: {
    port: parseInt(VITE_DEV_PORT),
  },
  resolve: {
    alias: {
      "@shared": resolve(import.meta.dirname, "../shared"),
    },
  },
});
