import { describe, expect, it } from "vitest";

import { CONTRACTS_PACKAGE } from "./index";

describe("contracts package", () => {
  it("exposes its package name", () => {
    expect(CONTRACTS_PACKAGE).toBe("@numismatist/contracts");
  });
});
