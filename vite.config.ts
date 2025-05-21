import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// Set base path for GitHub Pages deployment
// For GitHub Pages, this should be '/<REPO>/' if deploying to https://<USERNAME>.github.io/<REPO>/
// or '/' if deploying to a custom domain or https://<USERNAME>.github.io/
const base = "/ebaycut/";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    {
      name: "copy-404-html",
      closeBundle() {
        // Copy 404.html to dist folder after build
        if (fs.existsSync("404.html")) {
          fs.copyFileSync("404.html", "dist/404.html");
          console.log("404.html copied to dist folder");
        } else {
          console.warn("404.html not found in root directory");
        }
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
