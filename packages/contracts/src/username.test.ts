import { describe, expect, it } from "vitest";

import { isReservedUsername, normalizeUsername, usernameSchema } from "./username";

describe("username", () => {
  it("normalizes to lowercase and trims", () => {
    expect(normalizeUsername("  Alex  ")).toBe("alex");
  });

  it("accepts valid usernames", () => {
    for (const ok of ["alex", "alex-morgan", "coin123", "a1b"]) {
      expect(usernameSchema.safeParse(ok).success).toBe(true);
    }
  });

  it("rejects invalid usernames", () => {
    for (const bad of [
      "al",
      "-alex",
      "alex-",
      "alex--morgan",
      "Alex",
      "ab",
      "a".repeat(31),
      "al_ex",
      "coiné",
    ]) {
      expect(usernameSchema.safeParse(bad).success).toBe(false);
    }
  });

  it("rejects reserved names case-insensitively", () => {
    expect(isReservedUsername("Admin")).toBe(true);
    expect(usernameSchema.safeParse("settings").success).toBe(false);
    expect(isReservedUsername("alex")).toBe(false);
  });
});
