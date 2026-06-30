// Node 22+ built-in .env loader — populates process.env for Prisma, no
// extra dependency needed. Silently no-ops if .env is absent (e.g. in CI,
// where DATABASE_URL is set directly via the workflow env).
try {
  process.loadEnvFile(new URL(".env", import.meta.url));
} catch {
  // .env not present; rely on process.env being set externally (CI).
}
