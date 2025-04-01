import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": `${__dirname}/src/`,
    },
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: "jsdom",
    setupFiles: "vitest-setup.ts",
  },
});
