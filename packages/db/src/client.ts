import { PrismaClient } from "@prisma/client";

// Standard Next.js dev hot-reload singleton: without caching on globalThis,
// every module reload during `next dev` would open a new connection pool.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
