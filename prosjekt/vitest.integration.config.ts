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
        wrangler: {
            configPath: "./dist/worker/wrangler.json",
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
    include: ["**/*.integration.test.ts"],
    setupFiles: ["./test/apply-migrations.ts"],
  },
});