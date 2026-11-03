import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "cloudflare:workers": fileURLToPath(new URL("./__tests__/cloudflare-workers.ts", import.meta.url)),
          },
        },
        test: {
          name: "unit",
          restoreMocks: true,
          include: ["__tests__/**/*.test.ts"],
          exclude: ["__tests__/integration/**/*.integration.test.ts", "**/node_modules/**"],
        },
      },
      "./vitest.integration.config.ts",
    ],
  },
});