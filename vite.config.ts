import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  base: "./",
  plugins: [react(), viteSingleFile()],
  server: {
    host: "127.0.0.1",
    port: 3003
  },
  preview: {
    host: "127.0.0.1",
    port: 3003
  },
  build: {
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    modulePreload: false
  }
});
