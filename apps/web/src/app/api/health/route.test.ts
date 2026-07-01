import { describe, expect, it } from "vitest";

import { GET } from "./route";

describe("GET /api/health", () => {
  it("reports ok and the contracts default visibility when the database is reachable", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({ status: "ok", defaultVisibility: "private" });
  });
});
