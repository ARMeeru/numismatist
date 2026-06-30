import { z } from "zod";

/**
 * Visibility levels (PRD §8.1). New coins and collections default to `private`
 * (§8.2); users must explicitly opt into `unlisted` or `public`.
 */
export const VISIBILITY_VALUES = ["private", "unlisted", "public"] as const;

export const visibilitySchema = z.enum(VISIBILITY_VALUES);

export type Visibility = z.infer<typeof visibilitySchema>;

export const DEFAULT_VISIBILITY: Visibility = "private";

/** Whether a visibility level exposes content to anyone other than the owner. */
export function isShared(visibility: Visibility): boolean {
  return visibility === "unlisted" || visibility === "public";
}

/** Whether a visibility level requires an unlisted share token. */
export function requiresToken(visibility: Visibility): boolean {
  return visibility === "unlisted";
}
