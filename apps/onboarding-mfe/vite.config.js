import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

const shared = {
  react: { singleton: true },
  "react-dom": { singleton: true },
  zustand: { singleton: true },
  "@banking-mf/store": { singleton: true },
  "@banking-mf/ui-library": { singleton: true }
};

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "onboarding-mfe",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx"
      },
      shared
    })
  ],
  server: {
    port: 3002,
    strictPort: true,
    cors: true
  },
  preview: {
    port: 3002,
    strictPort: true
  },
  build: {
    target: "esnext",
    modulePreload: false,
    cssCodeSplit: false,
    minify: false
  }
});
