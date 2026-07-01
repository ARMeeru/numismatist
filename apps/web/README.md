# web

Next.js (App Router) full-stack app — the SSR public site **and** API route handlers in one codebase. Renders public profiles, collections, and coin pages (SEO-critical), the authenticated collector app (dashboard, add/edit flows), and backend endpoints (auth, coins, collections, search, reports). Dynamic Open Graph cards via `next/og`.

Stack: Next.js 16 (React 19) · Tailwind CSS v4 · consumes `@numismatist/contracts` and `@numismatist/db`. See [ADR 0001](../../docs/decisions/0001-tech-stack.md).

Also see [AGENTS.md](AGENTS.md) in this directory — Next.js–specific guidance for AI agents, supplementing the [repo-root AGENTS.md](../../AGENTS.md).

## Local development

Copy `.env.example` to `.env` (see the repo-root [AGENTS.md](../../AGENTS.md) "Local database" section for Postgres setup), then from the repo root:

```bash
pnpm --filter @numismatist/web dev     # http://localhost:3000
pnpm --filter @numismatist/web test    # vitest
pnpm --filter @numismatist/web build   # production build
```

`GET /api/health` proves the workspace wiring — it imports from both `@numismatist/contracts` and `@numismatist/db` and queries the real database.

## Status

Scaffold only: base layout, a placeholder home page, and the health-check route. Auth (Better Auth) and real features land in subsequent PRs.
