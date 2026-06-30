import { z } from "zod";

import { CONSTRAINTS } from "./constraints";

/**
 * Coin and collection slug rules (PRD §12.5). Slugs are auto-generated from the
 * title: lowercase, hyphen-separated, `a-z0-9-`, max 80 chars, Unicode
 * transliterated where possible. Uniqueness is per owner + content type and is
 * enforced at the database layer; collisions are resolved with `-2`, `-3`, ...
 */
export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const slugSchema = z.string().regex(SLUG_PATTERN).max(CONSTRAINTS.slug.max);

/** Strip diacritics so accented Latin transliterates instead of being dropped. */
function stripDiacritics(input: string): string {
  return input.normalize("NFKD").replace(/[̀-ͯ]/g, "");
}

/**
 * Convert a title into a slug. May return an empty string when the title has no
 * transliterable alphanumerics (e.g. all non-Latin script) — callers should fall
 * back to `fallbackSlug`.
 */
export function slugify(title: string): string {
  return stripDiacritics(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, CONSTRAINTS.slug.max)
    .replace(/-+$/g, "");
}

export type SlugKind = "coin" | "collection";

/** Deterministic fallback when a title yields an empty slug (§12.5). */
export function fallbackSlug(kind: SlugKind, shortId: string): string {
  return `${kind}-${shortId}`;
}

/**
 * Append a numeric collision suffix (`-2`, `-3`, ...), trimming the base so the
 * result stays within the max slug length (§12.5).
 */
export function withCollisionSuffix(base: string, n: number): string {
  if (n <= 1) return base;
  const suffix = `-${n}`;
  const trimmed = base.slice(0, CONSTRAINTS.slug.max - suffix.length).replace(/-+$/g, "");
  return `${trimmed}${suffix}`;
}
