import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src"),
      "cloudflare:workers": resolve("__tests__/cloudflare-workers.ts"),
    },
  },
  test: {
    include: [
      "__tests__/unit/**/*.test.ts",
      "src/**/*.unit.test.ts",
      "src/app/**/*.test.ts",
    ],
    restoreMocks: true,
  },
});