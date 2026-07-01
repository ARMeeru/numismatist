import { DEFAULT_VISIBILITY } from "@numismatist/contracts";
import { prisma } from "@numismatist/db";
import { NextResponse } from "next/server";

// Proves the workspace wiring: this app can resolve and use both
// @numismatist/contracts (pure schemas) and @numismatist/db (Prisma client
// against a real Postgres connection).
export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ok", defaultVisibility: DEFAULT_VISIBILITY });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: error instanceof Error ? error.message : "unknown error" },
      { status: 503 },
    );
  }
}
