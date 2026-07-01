# Numismatist.app

Museum-style digital coin archive and showcase. See [docs/PRD.md](docs/PRD.md) for the full product spec.

> **Pre-build decisions:** before stack selection, read [§36 Pre-Build Decisions](docs/PRD.md#36-pre-build-decisions-tier-1) (authentication, year/date model, storage quotas, account deletion).

## Tech stack

TypeScript monorepo · Next.js (App Router, web+api) · PostgreSQL + Prisma · Better Auth · `sharp` image worker · Cloudflare R2 · Postgres FTS · Railway. Full rationale in [ADR 0001](docs/decisions/0001-tech-stack.md). AI coding agents: read [AGENTS.md](AGENTS.md) first.

## Repository layout

This is a single monorepo, not a collection of separate repos. Components live in `apps/` and `packages/` and can deploy independently even though they share one repo and one set of contracts.

```
docs/        Product spec (PRD) and architecture decision records
apps/
  web/             Next.js full-stack app — SSR public site + API route handlers
  image-service/   sharp worker: EXIF strip, resize, thumbnails, HEIC convert
  admin/           Moderation tooling (may live inside web/ early on)
packages/
  contracts/   Shared types + schemas (visibility, image types, year/date, validation)
  db/          Prisma schema, migrations, and typed client
  ui/          Museum-theme design system
  config/      Shared lint/format/tsconfig
seed/        Launch seed content and scripts
infra/       Infrastructure-as-code and deploy config
```

## Getting started

Requires Node >=22 (`.nvmrc`) and pnpm.

```bash
pnpm install
pnpm lint && pnpm typecheck && pnpm test
```

## Status

Stack chosen ([ADR 0001](docs/decisions/0001-tech-stack.md)); workspace, CI, `contracts` schemas, the Prisma data model, and the `apps/web` Next.js scaffold (with a `packages/contracts`/`packages/db`-wired health check at `/api/health`) are all in place. Next: Better Auth integration, then real features.
