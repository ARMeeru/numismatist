import { describe, expect, it } from "vitest";

import { hasDate, parseYearDate, yearDateSchema } from "./year";

describe("parseYearDate", () => {
  it("parses a plain single year as exact", () => {
    expect(parseYearDate("1909")).toEqual({
      year_start: 1909,
      year_end: null,
      date_precision: "exact",
    });
  });

  it("parses a CE range, applying a trailing era to both ends", () => {
    expect(parseYearDate("117–138 CE")).toEqual({
      year_start: 117,
      year_end: 138,
      date_precision: "range",
    });
  });

  it("parses a circa BCE year as negative and circa", () => {
    expect(parseYearDate("circa 50 BCE")).toEqual({
      year_start: -50,
      year_end: null,
      date_precision: "circa",
    });
  });

  it("orders a BCE range so the earlier (more negative) year is the start", () => {
    expect(parseYearDate("50–40 BCE")).toEqual({
      year_start: -50,
      year_end: -40,
      date_precision: "range",
    });
  });

  it("parses a mixed BCE–CE range", () => {
    expect(parseYearDate("50 BCE - 20 CE")).toEqual({
      year_start: -50,
      year_end: 20,
      date_precision: "range",
    });
  });

  it("treats AD/CE as positive", () => {
    expect(parseYearDate("AD 117").year_start).toBe(117);
  });

  it("returns unknown for unparseable input", () => {
    expect(parseYearDate("sometime long ago")).toEqual({
      year_start: null,
      year_end: null,
      date_precision: "unknown",
    });
    expect(parseYearDate("")).toEqual({
      year_start: null,
      year_end: null,
      date_precision: "unknown",
    });
  });
});

describe("hasDate", () => {
  it("is true when a sort key is present", () => {
    expect(hasDate({ year_start: 1909 })).toBe(true);
  });

  it("is true when only a display string is present", () => {
    expect(hasDate({ year_start: null, date_display: "Iron Age" })).toBe(true);
  });

  it("is false when neither is present", () => {
    expect(hasDate({ year_start: null, date_display: "  " })).toBe(false);
    expect(hasDate({})).toBe(false);
  });
});

describe("yearDateSchema", () => {
  it("rejects a range where end precedes start", () => {
    const result = yearDateSchema.safeParse({
      date_display: "138–117 CE",
      year_start: 138,
      year_end: 117,
      date_precision: "range",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid single year", () => {
    const result = yearDateSchema.safeParse({
      date_display: "1909",
      year_start: 1909,
      year_end: null,
      date_precision: "exact",
    });
    expect(result.success).toBe(true);
  });
});
