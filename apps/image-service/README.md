# image-service

Standalone `sharp` (libvips) worker — the one separately deployed service. Handles the upload pipeline: EXIF/GPS stripping, format conversion (incl. **HEIC**), resize, and thumbnail generation, writing optimized display + thumbnail variants to Cloudflare R2. Kept out of the Next serverless/request path because 20 MB HEIC conversion exceeds function limits.

Dynamic Open Graph cards are handled in the Next app via `next/og`, not here. Shares domain types from `packages/contracts`. See [ADR 0001](../../docs/decisions/0001-tech-stack.md). _Scaffolding lands later._
