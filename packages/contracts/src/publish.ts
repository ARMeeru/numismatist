import { hasDate } from "./year";

/**
 * Public publishing minimums (PRD §9.4–9.5). These predicates are the single
 * source of truth for "can this go public?" and return machine-readable reason
 * codes so the UI can render the appropriate guidance copy.
 */

export type CoinPublishReason = "title" | "image" | "originOrDate";
export type CollectionPublishReason = "title" | "publicCoin" | "coverImage";

export interface PublishCheck<Reason extends string> {
  ok: boolean;
  missing: Reason[];
}

export interface CoinPublishInput {
  title: string;
  imageCount: number;
  countryRegion?: string | null;
  yearStart?: number | null;
  dateDisplay?: string | null;
}

function hasText(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * A coin may be published publicly with: a title, at least one image, and either
 * a country/region or a date (§9.4).
 */
export function checkCoinPublishable(input: CoinPublishInput): PublishCheck<CoinPublishReason> {
  const missing: CoinPublishReason[] = [];
  if (!hasText(input.title)) missing.push("title");
  if (input.imageCount < 1) missing.push("image");
  if (
    !hasText(input.countryRegion) &&
    !hasDate({ year_start: input.yearStart, date_display: input.dateDisplay })
  ) {
    missing.push("originOrDate");
  }
  return { ok: missing.length === 0, missing };
}

export interface CollectionPublishInput {
  title: string;
  publicCoinCount: number;
  hasCoverImage: boolean;
}

/**
 * A collection may be published publicly with: a title, at least one public coin,
 * and at least one cover image (explicit or derived from a coin) (§9.5).
 */
export function checkCollectionPublishable(
  input: CollectionPublishInput,
): PublishCheck<CollectionPublishReason> {
  const missing: CollectionPublishReason[] = [];
  if (!hasText(input.title)) missing.push("title");
  if (input.publicCoinCount < 1) missing.push("publicCoin");
  if (!input.hasCoverImage) missing.push("coverImage");
  return { ok: missing.length === 0, missing };
}
