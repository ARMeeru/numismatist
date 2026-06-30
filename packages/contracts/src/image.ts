import { z } from "zod";

/**
 * Coin image types (PRD §11.4). `primary` is intentionally NOT a type — the
 * primary image is a designation on the coin via `primary_image_id` (§11.3).
 */
export const COIN_IMAGE_TYPES = ["obverse", "reverse", "edge", "detail", "slab", "other"] as const;

export const coinImageTypeSchema = z.enum(COIN_IMAGE_TYPES);

export type CoinImageType = z.infer<typeof coinImageTypeSchema>;
