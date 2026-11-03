import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve("src"),
      "cloudflare:workers": resolve("src/test/cloudflare-workers.ts"),
    },
  },
  test: { restoreMocks: true },
});