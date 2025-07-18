import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      // Proxy frontend calls to local LLaMA 3.1 API running through ngrok
      "/api/llama": {
        target: "https://together-polecat-strictly.ngrok-free.app", // ← Your working ngrok endpoint
        changeOrigin: true,
        secure: false, // ← disables SSL verification (required for ngrok)
        rewrite: (path) => path.replace(/^\/api\/llama/, "/api/generate"),
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            // Add ngrok headers to bypass warning page
            proxyReq.setHeader("ngrok-skip-browser-warning", "true");
            proxyReq.setHeader("User-Agent", "TruFlo-App/1.0");
          });
        },
      },
    },
  },
});
