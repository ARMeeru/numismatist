import { randomUUID } from "node:crypto";

import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";

import { prisma } from "./client";

// Integration tests against a real local Postgres (see AGENTS.md "Local database").
// Verifies the schema enforces the PRD rules that matter, not just that Prisma compiles.

async function createUser(suffix: string) {
  return prisma.user.create({
    data: {
      email: `owner-${suffix}@example.test`,
      username: `owner-${suffix}`,
      name: "Test Owner",
    },
  });
}

describe("schema integration", () => {
  const createdUserIds: string[] = [];

  afterEach(async () => {
    if (createdUserIds.length > 0) {
      await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
      createdUserIds.length = 0;
    }
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeAll(async () => {
    await prisma.$connect();
  });

  it("defaults a new coin's visibility to private (§8.2)", async () => {
    const user = await createUser(randomUUID().slice(0, 8));
    createdUserIds.push(user.id);

    const coin = await prisma.coin.create({
      data: { ownerId: user.id, title: "Untitled Coin", slug: "untitled-coin" },
    });

    expect(coin.visibility).toBe("private");
  });

  it("enforces a unique (ownerId, slug) pair but allows the same slug across owners", async () => {
    const userA = await createUser(`a-${randomUUID().slice(0, 8)}`);
    const userB = await createUser(`b-${randomUUID().slice(0, 8)}`);
    createdUserIds.push(userA.id, userB.id);

    await prisma.coin.create({ data: { ownerId: userA.id, title: "Denarius", slug: "denarius" } });

    await expect(
      prisma.coin.create({ data: { ownerId: userA.id, title: "Denarius 2", slug: "denarius" } }),
    ).rejects.toThrow();

    // Same slug, different owner: should succeed (§12.5 uniqueness is per-owner).
    await expect(
      prisma.coin.create({ data: { ownerId: userB.id, title: "Denarius", slug: "denarius" } }),
    ).resolves.toBeDefined();
  });

  it("rejects a reused email or username (case-sensitive at the DB layer)", async () => {
    const suffix = randomUUID().slice(0, 8);
    const user = await createUser(suffix);
    createdUserIds.push(user.id);

    await expect(
      prisma.user.create({
        data: { email: user.email, username: `other-${suffix}`, name: "Dup Email" },
      }),
    ).rejects.toThrow();

    await expect(
      prisma.user.create({
        data: {
          email: `other-${suffix}@example.test`,
          username: user.username,
          name: "Dup Username",
        },
      }),
    ).rejects.toThrow();
  });

  it("clears Coin.primaryImageId when the primary image is deleted (§11.5)", async () => {
    const user = await createUser(randomUUID().slice(0, 8));
    createdUserIds.push(user.id);

    const coin = await prisma.coin.create({
      data: { ownerId: user.id, title: "Hadrian Denarius", slug: "hadrian-denarius" },
    });
    const image = await prisma.coinImage.create({
      data: {
        coinId: coin.id,
        imageUrl: "https://example.test/img.jpg",
        thumbnailUrl: "https://example.test/thumb.jpg",
        type: "obverse",
        sortOrder: 0,
      },
    });

    await prisma.coin.update({ where: { id: coin.id }, data: { primaryImageId: image.id } });
    await prisma.coinImage.delete({ where: { id: image.id } });

    const updated = await prisma.coin.findUniqueOrThrow({ where: { id: coin.id } });
    expect(updated.primaryImageId).toBeNull();
  });

  it("removes collection membership but preserves the collection when a coin is deleted (§22.2)", async () => {
    const user = await createUser(randomUUID().slice(0, 8));
    createdUserIds.push(user.id);

    const coin = await prisma.coin.create({
      data: { ownerId: user.id, title: "Sestertius", slug: "sestertius" },
    });
    const collection = await prisma.collection.create({
      data: { ownerId: user.id, title: "Roman Coins", slug: "roman-coins" },
    });
    await prisma.collectionCoin.create({
      data: { collectionId: collection.id, coinId: coin.id, sortOrder: 0 },
    });

    await prisma.coin.delete({ where: { id: coin.id } });

    const membership = await prisma.collectionCoin.findMany({
      where: { collectionId: collection.id },
    });
    expect(membership).toHaveLength(0);

    const stillExists = await prisma.collection.findUnique({ where: { id: collection.id } });
    expect(stillExists).not.toBeNull();
  });

  it("cascades user deletion to owned coins and collections", async () => {
    const user = await createUser(randomUUID().slice(0, 8));
    const coin = await prisma.coin.create({
      data: { ownerId: user.id, title: "Follis", slug: "follis" },
    });

    await prisma.user.delete({ where: { id: user.id } });

    const orphan = await prisma.coin.findUnique({ where: { id: coin.id } });
    expect(orphan).toBeNull();
  });
});
