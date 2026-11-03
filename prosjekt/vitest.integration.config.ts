import {cloudflareTest, readD1Migrations,} from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
    resolve: {
        alias: {
          "@": path.resolve("src"),
        },
      },
  plugins: [
    cloudflareTest(async () => {
        const migrations = await readD1Migrations({
            projectPath: path.resolve("."),
            migrationsDir: "drizzle",
            migrationsPattern: "drizzle/*/migration.sql",
          });

      return {
        // Unngår at src/worker.tsx (rwsdk) lastes inn i testmiljøet
        main: "./src/db/index.ts",
        wrangler: {
            configPath: "./wrangler.jsonc",
        },
        miniflare: {
          bindings: {
            TEST_MIGRATIONS: migrations,
          },
        },
      };
    }),
  ],
  test: {
    include: ["tests/integration/**/*.integration.test.ts"],
    setupFiles: ["./tests/integration/apply-migrations.ts"],
  },
});