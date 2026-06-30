/**
 * Field-length and count constraints, centralized so the app, the worker, and
 * the database layer agree on the same limits.
 *
 * NOTE: The PRD does not specify these explicitly (flagged as a gap in the v3.1
 * review). These are proposed defaults; adjust here and everything follows.
 */
export const CONSTRAINTS = {
  displayName: { min: 1, max: 80 },
  username: { min: 3, max: 30 },
  bio: { max: 280 },
  coinTitle: { min: 1, max: 120 },
  collectionTitle: { min: 1, max: 120 },
  description: { max: 5000 },
  /** Short free-text fields: country/region, ruler/issuer, denomination, mint, material, etc. */
  shortText: { max: 120 },
  tag: { min: 1, max: 30 },
  tagsPerItem: { max: 20 },
  slug: { max: 80 },
  dateDisplay: { min: 1, max: 60 },
  altText: { max: 280 },
  catalogSystem: { min: 1, max: 40 },
  catalogNumber: { min: 1, max: 120 },
} as const;
