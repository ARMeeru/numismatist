import { describe, expect, it } from "vitest";

import { COIN_IMAGE_TYPES, coinImageTypeSchema } from "./image";

describe("coin image type", () => {
  it("has the six PRD types and excludes 'primary'", () => {
    expect(COIN_IMAGE_TYPES).toEqual(["obverse", "reverse", "edge", "detail", "slab", "other"]);
    expect(coinImageTypeSchema.safeParse("primary").success).toBe(false);
  });

  it("accepts a valid type", () => {
    expect(coinImageTypeSchema.safeParse("obverse").success).toBe(true);
  });
});
