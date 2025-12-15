import { defineConfig } from "vite";

export default defineConfig({
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    minify: "terser"
  },
  server: {
    port: 5173,
    open: true
  }
});