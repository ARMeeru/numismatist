import { describe, expect, it } from "vitest";

import { DEFAULT_VISIBILITY, isShared, requiresToken, visibilitySchema } from "./visibility";

describe("visibility", () => {
  it("defaults to private", () => {
    expect(DEFAULT_VISIBILITY).toBe("private");
  });

  it("accepts the three valid levels and rejects others", () => {
    expect(visibilitySchema.safeParse("public").success).toBe(true);
    expect(visibilitySchema.safeParse("unlisted").success).toBe(true);
    expect(visibilitySchema.safeParse("private").success).toBe(true);
    expect(visibilitySchema.safeParse("hidden").success).toBe(false);
  });

  it("classifies shared and token-requiring levels", () => {
    expect(isShared("private")).toBe(false);
    expect(isShared("unlisted")).toBe(true);
    expect(isShared("public")).toBe(true);
    expect(requiresToken("unlisted")).toBe(true);
    expect(requiresToken("public")).toBe(false);
  });
});
