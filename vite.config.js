import { defineConfig } from "vite";

export default defineConfig({
  base: '/',  // Change to / for custom domain
  build: {
    outDir: 'dist',
    minify: "terser"
  },
  server: {
    port: 5173,
    open: true
  }
});