import { z } from "zod";

import { CONSTRAINTS } from "./constraints";

/**
 * Reserved usernames and top-level slugs (PRD §12.3). Stored lowercase. Engineering
 * may extend this list. Username uniqueness is case-insensitive (§12.2) and enforced
 * at the database layer; this set only blocks reserved words.
 */
export const RESERVED_USERNAMES: ReadonlySet<string> = new Set([
  "admin",
  "api",
  "auth",
  "login",
  "logout",
  "signup",
  "settings",
  "dashboard",
  "explore",
  "search",
  "coins",
  "collections",
  "collection",
  "profile",
  "profiles",
  "users",
  "user",
  "help",
  "support",
  "about",
  "terms",
  "privacy",
  "security",
  "billing",
  "www",
  "mail",
  "app",
  "static",
  "assets",
]);

/**
 * Username format (§12.2): lowercase a-z/0-9/hyphen, must start and end with a
 * letter or number, no consecutive hyphens. Length is enforced separately so the
 * error is specific. The pattern's single-hyphen-between-groups shape already
 * rules out leading/trailing/consecutive hyphens.
 */
export const USERNAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Normalize raw input to its canonical stored form (lowercase, trimmed). */
export function normalizeUsername(input: string): string {
  return input.trim().toLowerCase();
}

export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.has(normalizeUsername(username));
}

export const usernameSchema = z
  .string()
  .trim()
  .min(CONSTRAINTS.username.min, "Username must be at least 3 characters.")
  .max(CONSTRAINTS.username.max, "Username must be at most 30 characters.")
  .regex(
    USERNAME_PATTERN,
    "Use lowercase letters, numbers, and single hyphens; start and end with a letter or number.",
  )
  .refine((u) => !RESERVED_USERNAMES.has(u), "This username is reserved.");
