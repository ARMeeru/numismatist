# AGENTS.md — Guidance for AI coding agents

This file is the contract for any AI agent (Codex, etc.) writing code in this repo. Read it before making changes. Humans: see [README.md](README.md) and [docs/PRD.md](docs/PRD.md).

## What this project is

Numismatist.app — a museum-style digital coin archive and showcase. Collectors catalog coins, preserve provenance privately, and share beautiful public/unlisted collection pages. The full spec is [docs/PRD.md](docs/PRD.md); it is authoritative. Start with **[§36 Pre-Build Decisions](docs/PRD.md#36-pre-build-decisions-tier-1)** — it resolves auth, the year/date model, storage quotas, and account deletion, and overrides earlier sections where they conflict.

## Tech stack (see [ADR 0001](docs/decisions/0001-tech-stack.md))

- **Language:** TypeScript everywhere. No JavaScript source files.
- **Monorepo:** pnpm workspaces + Turborepo.
- **App:** Next.js 16 (App Router, React 19), Tailwind CSS v4 — SSR public site **and** API route handlers in one app (`apps/web`). See [apps/web/AGENTS.md](apps/web/AGENTS.md) for Next.js-specific guidance.
- **DB:** PostgreSQL via **Prisma**.
- **Auth:** Better Auth (email+password + email verification gate + Google OAuth + password reset).
- **Note on versions:** pin to the latest stable of the **previous** major (e.g. Prisma 6.x, not 7.x) when a tool's newest major just shipped and isn't yet well-represented in training data/docs, or when the ecosystem hasn't caught up yet — e.g. ESLint is pinned to 9.x here because `eslint-plugin-react` (pulled in via `eslint-config-next`) doesn't yet support ESLint 10's rule-context API. Check before bumping; don't silently float to a brand-new major.
- **Images:** `sharp` (libvips) in a separate worker (`apps/image-service`); EXIF/GPS stripping, resize, thumbnails, HEIC conversion.
- **Storage:** Cloudflare R2 (S3-compatible). **Search:** Postgres FTS + `pg_trgm`.
- **Tests:** Vitest (unit), Playwright (e2e). **Lint/format:** ESLint + Prettier.
- **Hosting:** Railway (app + worker + Postgres) + Cloudflare R2.

Do not introduce a new framework, ORM, auth library, or hosting dependency without an ADR and human approval.

## Repository layout

```
docs/            PRD and ADRs (docs/decisions/)
apps/
  web/             Next.js full-stack app — SSR public pages + API route handlers
  image-service/   sharp worker: EXIF strip, resize, thumbnails, HEIC convert
  admin/           moderation tooling (may live inside web/ early on)
packages/
  contracts/   Shared Zod schemas + types — SINGLE SOURCE OF TRUTH for the §36 data model
  db/          Prisma schema, migrations, and typed client (§11 + §36 entities)
  ui/          Museum-theme design system
  config/      Shared ESLint/Prettier/tsconfig
seed/          Launch seed content + scripts
infra/         Deploy config
```

## The contracts rule (important)

Shared domain types and validation — visibility enum, coin image types, the year/date model (§36.2), validation constraints, publish-gate rules — live **once** in `packages/contracts` as Zod schemas with inferred TS types. The Next app and the image worker import from there. Never redefine these shapes locally or let them drift.

`packages/db` holds the Prisma schema and is the source of truth for persisted shape. Its enums (`Visibility`, `CoinImageType`, `DatePrecision`, ...) are kept in sync **by hand** with the matching `packages/contracts` Zod enums — Prisma can't import TS values into `schema.prisma`. When you change one, change both, and say so in the PR.

## Workflow and conventions

- **Branching:** always branch off `main`; never commit to `main` directly (it is protected). Branch names: `<type>/<short-desc>` matching conventional-commit types, e.g. `feat/coin-data-model`, `chore/ci-setup`, `fix/unlisted-404`.
- **Commits:** [Conventional Commits](https://www.conventionalcommits.org/). **Never add AI/Claude/Codex credit or co-author trailers** to commit messages or PR bodies.
- **PRs:** one squash-merge per PR; the PR title is the conventional-commit message. Keep PRs small and reviewable. Rebase onto latest `main` before opening/updating (linear history is enforced).
- **Merging:** the human owner tests locally and merges. Do not self-merge.
- **CI gate:** changes must pass lint, typecheck, and tests. Add/adjust tests with the code you change.

## Coding guardrails

- Strong typing end to end; no `any` without a justified comment. Validate all external input with the `contracts` Zod schemas.
- Respect the privacy/visibility model (§8): private/unlisted content must never leak into public profile, Explore, search, sitemaps, or feeds. Invalid unlisted tokens return **404**, never 401/403 (do not confirm existence).
- Strip EXIF/GPS on every uploaded image (§13.4). Never serve original-resolution images on public pages (§8.3).
- Default new coins/collections to `private` (§8.2). Enforce the email-verification gate before any public/unlisted sharing (§8.6).
- Follow the slug/username rules (§12) including reserved names and 301 redirects.
- Keep secrets out of the repo; use env vars (`.env` is gitignored, provide `.env.example`).
- Match existing patterns, naming, and file structure. Prefer clarity over cleverness.

## How to run

Requires Node >=22 (see `.nvmrc`) and pnpm (pinned via `packageManager`).

```bash
pnpm install          # install workspace deps
pnpm lint             # eslint across the repo
pnpm format:check     # prettier check (pnpm format to fix)
pnpm typecheck        # turbo run typecheck (per package)
pnpm test             # turbo run test (vitest)
pnpm build            # turbo run build
pnpm --filter @numismatist/web dev   # Next.js dev server at localhost:3000
```

CI (`.github/workflows/ci.yml`) runs install → format:check → lint → typecheck → `prisma migrate deploy` (against a Postgres service container) → build → a smoke test that boots the built web app and curls `/api/health` → test, on every PR to `main`. All must pass before merge.

Database-specific commands (run from repo root):

```bash
pnpm --filter @numismatist/db migrate:dev      # create + apply a new migration locally
pnpm --filter @numismatist/db migrate:deploy   # apply existing migrations, no new ones (what CI runs)
```

## Local database

Local dev uses **native Homebrew Postgres**, not Docker (none is set up on the dev machine, and a single local Postgres instance is simpler than maintaining a Compose file solo). Railway Postgres is the staging/prod target, used once there's something worth deploying — not for local dev.

One-time setup (macOS):

```bash
brew install postgresql@17
brew services start postgresql@17   # runs as a background service, survives reboots

# Dedicated app role + database (not the OS superuser role):
createuser numismatist --pwprompt --createdb   # password: numismatist_dev (dev only)
createdb -O numismatist numismatist_dev
psql -d numismatist_dev -c 'CREATE EXTENSION IF NOT EXISTS pg_trgm;'
```

Then copy `.env.example` to `.env` at the repo root, inside `packages/db/`, and inside `apps/web/` — Prisma's CLI only reads `.env` from the package containing `schema.prisma`, and Next.js only reads `.env` from the app directory. The default `DATABASE_URL` already points at `numismatist_dev`. Run `pnpm --filter @numismatist/db migrate:dev` to apply migrations.

`brew services list` shows whether Postgres is running; `brew services stop postgresql@17` stops it. Schema is managed entirely through Prisma migrations — never hand-edit the local DB schema. CI does not use Homebrew Postgres; it spins up a disposable `postgres:17` service container per run (see `ci.yml`).
