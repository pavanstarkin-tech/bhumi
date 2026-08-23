import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/bhumi/" : "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
}));
