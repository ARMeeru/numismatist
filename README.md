# Numismatist.app

Museum-style digital coin archive and showcase. See [docs/PRD.md](docs/PRD.md) for the full product spec.

> **Pre-build decisions:** before stack selection, read [§36 Pre-Build Decisions](docs/PRD.md#36-pre-build-decisions-tier-1) (authentication, year/date model, storage quotas, account deletion).

## Repository layout

This is a single monorepo, not a collection of separate repos. Components live in `apps/` and `packages/` and can deploy independently even though they share one repo and one set of contracts.

```
docs/        Product spec (PRD) and architecture decision records
apps/
  web/             Public (SSR/SEO) + authenticated app
  api/             Auth, coins, collections, search, reports
  image-service/   EXIF stripping, resize, thumbnails, dynamic OG cards
  admin/           Moderation tooling (may fold into web early on)
packages/
  contracts/   Shared types + schemas (visibility, image types, year/date, validation)
  ui/          Museum-theme design system
  config/      Shared lint/format/tsconfig
seed/        Launch seed content and scripts
infra/       Infrastructure-as-code and deploy config
```

## Status

Greenfield. Tech stack not yet chosen — skeleton only.
