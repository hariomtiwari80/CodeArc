import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {

          if (id.includes("node_modules")) {

            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }

            if (
              id.includes("@clerk")
            ) {
              return "clerk";
            }

            if (
              id.includes("recharts")
            ) {
              return "charts";
            }

            if (
              id.includes("framer-motion")
            ) {
              return "motion";
            }

            if (
              id.includes("jspdf") ||
              id.includes("html2canvas")
            ) {
              return "pdf";
            }

            if (
              id.includes("lucide-react")
            ) {
              return "icons";
            }

            return "vendor";
          }
        },
      },
    },
  },
});