import { describe, expect, it } from "vitest";

import { checkCoinPublishable, checkCollectionPublishable } from "./publish";

describe("checkCoinPublishable", () => {
  it("passes with title, an image, and a country", () => {
    expect(
      checkCoinPublishable({
        title: "Hadrian Denarius",
        imageCount: 1,
        countryRegion: "Roman Empire",
      }),
    ).toEqual({
      ok: true,
      missing: [],
    });
  });

  it("passes with title, an image, and a date instead of a country", () => {
    expect(
      checkCoinPublishable({ title: "Hadrian Denarius", imageCount: 2, yearStart: 117 }).ok,
    ).toBe(true);
  });

  it("reports every missing requirement", () => {
    expect(checkCoinPublishable({ title: "  ", imageCount: 0 })).toEqual({
      ok: false,
      missing: ["title", "image", "originOrDate"],
    });
  });

  it("requires a country or date", () => {
    expect(checkCoinPublishable({ title: "Mystery Coin", imageCount: 1 }).missing).toEqual([
      "originOrDate",
    ]);
  });
});

describe("checkCollectionPublishable", () => {
  it("passes with title, a public coin, and a cover image", () => {
    expect(
      checkCollectionPublishable({
        title: "Coins of Rome",
        publicCoinCount: 3,
        hasCoverImage: true,
      }),
    ).toEqual({
      ok: true,
      missing: [],
    });
  });

  it("reports missing public coin and cover image", () => {
    expect(
      checkCollectionPublishable({ title: "Empty", publicCoinCount: 0, hasCoverImage: false })
        .missing,
    ).toEqual(["publicCoin", "coverImage"]);
  });
});
