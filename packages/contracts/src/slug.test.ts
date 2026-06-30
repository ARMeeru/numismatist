import { describe, expect, it } from "vitest";

import { fallbackSlug, slugify, slugSchema, withCollisionSuffix } from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Coins of the Roman Empire")).toBe("coins-of-the-roman-empire");
  });

  it("transliterates accented Latin characters", () => {
    expect(slugify("Schön Münze")).toBe("schon-munze");
  });

  it("strips leading/trailing punctuation and collapses separators", () => {
    expect(slugify("  1909-S VDB!! ")).toBe("1909-s-vdb");
  });

  it("caps length at 80 with no trailing hyphen", () => {
    const slug = slugify("a ".repeat(100));
    expect(slug.length).toBeLessThanOrEqual(80);
    expect(slug.endsWith("-")).toBe(false);
  });

  it("returns empty for non-transliterable titles (caller uses fallback)", () => {
    expect(slugify("コイン")).toBe("");
  });
});

describe("fallbackSlug", () => {
  it("builds a deterministic fallback", () => {
    expect(fallbackSlug("coin", "ab12cd")).toBe("coin-ab12cd");
    expect(slugSchema.safeParse(fallbackSlug("collection", "x9y8z7")).success).toBe(true);
  });
});

describe("withCollisionSuffix", () => {
  it("leaves the base unchanged for n<=1", () => {
    expect(withCollisionSuffix("hadrian-denarius", 1)).toBe("hadrian-denarius");
  });

  it("appends -2, -3, ...", () => {
    expect(withCollisionSuffix("hadrian-denarius", 2)).toBe("hadrian-denarius-2");
  });

  it("keeps the result within the max length", () => {
    const base = "a".repeat(80);
    const result = withCollisionSuffix(base, 12);
    expect(result.length).toBeLessThanOrEqual(80);
    expect(result.endsWith("-12")).toBe(true);
  });
});
