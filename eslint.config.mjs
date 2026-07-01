import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import nextTs from "eslint-config-next/typescript";
import nextVitals from "eslint-config-next/core-web-vitals";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/coverage/**",
    "**/.turbo/**",
    "**/next-env.d.ts",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  // Next.js-specific rules (React hooks, core web vitals, next/typescript),
  // scoped to apps/web only so they don't apply to non-React packages.
  {
    files: ["apps/web/**/*.{js,jsx,ts,tsx}"],
    extends: [nextVitals, nextTs],
    // ESLint runs from the monorepo root, but the Next.js app lives in
    // apps/web — tell eslint-config-next where to find it (avoids a spurious
    // "Pages directory cannot be found" message from no-html-link-for-pages).
    settings: { next: { rootDir: "apps/web" } },
  },
  eslintConfigPrettier,
]);
