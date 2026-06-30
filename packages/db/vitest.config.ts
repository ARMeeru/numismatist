import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./vitest.setup.ts"],
    // Integration tests share one Postgres database; run serially to avoid
    // cross-test interference (each test still scopes/cleans its own rows).
    fileParallelism: false,
  },
});
