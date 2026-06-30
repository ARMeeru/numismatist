# ADR 0001 — Tech Stack and Repository Shape

**Status:** Accepted · 2026-06-30
**Deciders:** Product/eng owner (ARMeeru)
**Context links:** [PRD](../PRD.md), [§36 Pre-Build Decisions](../PRD.md#36-pre-build-decisions-tier-1)

## Context

Numismatist.app is an SEO-critical, image-heavy, museum-style coin showcase (see PRD). Constraints shaping this decision:

- **Public pages must be server-rendered** for SEO, OG/meta tags, canonical URLs, sitemaps, and structured data (§18–19).
- **Dynamic Open Graph image generation** per coin/collection (§19).
- **Relational data** — the §11 model is foreign-key-heavy (users → coins → images/refs/provenance, collections, membership, reports, slug redirects).
- **Image pipeline** — EXIF/GPS stripping, resize, thumbnails, and HEIC conversion (§13.2) on inputs up to 20 MB.
- **Auth per §36.1** — email+password (argon2/bcrypt), the "save-private-before-verify" gate, optional Google OAuth, password reset.
- **Object storage + CDN, search, rate limiting, lightweight admin/moderation.**
- **Workflow:** Codex writes most code; the maintainer reviews and opens PRs; the owner tests locally and merges. This biases the stack toward **mainstream, strongly-typed, conventional** technology that AI agents handle reliably and that is easy to review. Solo operation also favors **low ops**.

## Decision

End-to-end **TypeScript monorepo**:

| Layer | Choice |
|---|---|
| Language / monorepo | TypeScript · pnpm workspaces · Turborepo |
| App framework | **Next.js (App Router, React 19)** — web + API route handlers in one app |
| Database | **PostgreSQL** |
| ORM | **Prisma** |
| Auth | **Better Auth** (email+password + email verification + OAuth + reset) |
| Image processing | **sharp** (libvips) in a **separate worker** (`apps/image-service`) |
| Object storage / CDN | **Cloudflare R2** |
| Search (MVP) | **Postgres FTS + `pg_trgm`** |
| Admin/moderation | In-app role-gated `/admin` routes |
| Tests / CI | Vitest (unit) · Playwright (e2e) · GitHub Actions |
| Lint / format | ESLint · Prettier |
| Hosting | **Railway** (Next app + image worker + Postgres) · Cloudflare R2 for storage |

### Repository shape

The earlier scaffold's separate `apps/api` is **folded into the Next.js app** (`apps/web`), which serves both the SSR public site and API route handlers. The only separately deployed service is the **sharp image worker** (`apps/image-service`), which has a genuinely different runtime profile. Shared types/schemas live in `packages/contracts` as the single source of truth for the §36 data model.

## Rationale (key trade-offs)

- **Next.js (one app, not split web/api):** maximal Codex training corpus; collapses SSR + authed app + API into one reviewable codebase; `next/og` (Satori) covers dynamic OG cards (§19) natively. Splitting web/api was rejected as premature for a solo, AI-driven MVP — more surface to keep consistent.
- **Prisma over Drizzle:** most predictable, most-represented ORM patterns → easier to review Codex output. Drizzle reconsidered if SQL-level control becomes necessary.
- **Better Auth over Auth.js/Lucia:** natively supports the §36.1 email+password + verification-gate + OAuth + reset flow. Auth.js is OAuth-centric (email/password gate is more DIY); Lucia is deprecated.
- **sharp worker separate:** 20 MB HEIC conversion exceeds serverless function limits; a long-lived worker is the correct home, and is why hosting favors Railway over Vercel.
- **Railway over Vercel:** runs the Next app, the worker, and Postgres on one platform (one bill, one credential set, minimal ops). The owner tests locally and merges, so Vercel's preview-deploy advantage is not decisive. Moving only the Next front to Vercel later is a clean swap if preview deploys become valuable.
- **Postgres FTS over Elasticsearch:** covers §17.2 search without extra infrastructure; revisit if relevance/scale demands it.
- **Cloudflare R2:** S3-compatible with no egress fees — material for a public, image-heavy site.

## Consequences

- `apps/api` is removed; `apps/web` is the full-stack Next app. `apps/image-service` and `packages/contracts` remain.
- Every change ships via a `<type>/<desc>` branch + PR with squash-merge and conventional-commit titles; `main` is protected. Status checks become required once CI exists.
- The §36 data model is implemented once in `packages/contracts` (Zod + types) and consumed by both the Next app and the worker.
- HEIC support depends on libvips/libheif being available in the worker image — a build-time concern to verify early.
- Vendor surface: Railway (compute + Postgres) + Cloudflare R2 (storage) + Google (OAuth). Manageable for solo.

## Revisit triggers

- Image processing or search outgrows in-app/in-worker handling → consider a managed image service / Elasticsearch.
- Preview deployments become valuable → move the Next front to Vercel.
- A second team or a hard security boundary appears → reconsider splitting `api` into its own deployable.
