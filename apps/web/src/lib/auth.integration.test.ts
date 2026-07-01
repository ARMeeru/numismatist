import { randomUUID } from "node:crypto";

import { prisma } from "@numismatist/db";
import { afterAll, describe, expect, it } from "vitest";

import { auth } from "./auth";

// Integration tests against real local Postgres (see AGENTS.md "Local database").
// Exercises Better Auth's actual sign-up/sign-in routes, not mocks — this is
// the reconciliation point between Better Auth and the §36.1/§8.6 PRD rules.

function credentials() {
  const suffix = randomUUID().slice(0, 8);
  return {
    email: `auth-${suffix}@example.test`,
    password: "correct horse battery staple",
    name: "Test Collector",
    username: `collector-${suffix}`,
  };
}

describe("Better Auth sign-up", () => {
  const createdEmails: string[] = [];

  afterAll(async () => {
    if (createdEmails.length > 0) {
      await prisma.user.deleteMany({ where: { email: { in: createdEmails } } });
    }
  });

  it("creates a user that is unverified by default (§8.6 starting state)", async () => {
    const creds = credentials();
    createdEmails.push(creds.email);

    const result = await auth.api.signUpEmail({ body: creds });

    expect(result.user.email).toBe(creds.email);
    expect(result.user.emailVerified).toBe(false);

    const stored = await prisma.user.findUniqueOrThrow({ where: { email: creds.email } });
    expect(stored.username).toBe(creds.username);
    expect(stored.name).toBe(creds.name);
  });

  it("stores the password on an Account row, not on User (§36.1 reconciliation)", async () => {
    const creds = credentials();
    createdEmails.push(creds.email);

    await auth.api.signUpEmail({ body: creds });

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: creds.email },
      include: { accounts: true },
    });

    expect(user.accounts).toHaveLength(1);
    expect(user.accounts[0]?.providerId).toBe("credential");
    expect(user.accounts[0]?.password).toBeTruthy();
  });

  it("rejects a reserved username via the shared contracts schema (§12.3)", async () => {
    const creds = { ...credentials(), username: "admin" };

    await expect(auth.api.signUpEmail({ body: creds })).rejects.toThrow();

    const stored = await prisma.user.findUnique({ where: { email: creds.email } });
    expect(stored).toBeNull();
  });

  it("rejects a malformed username via the shared contracts schema (§12.2)", async () => {
    const creds = { ...credentials(), username: "AB" };

    await expect(auth.api.signUpEmail({ body: creds })).rejects.toThrow();
  });

  it("allows signing in while unverified — Better Auth's own requireEmailVerification is off", async () => {
    const creds = credentials();
    createdEmails.push(creds.email);

    await auth.api.signUpEmail({ body: creds });
    const result = await auth.api.signInEmail({
      body: { email: creds.email, password: creds.password },
    });

    expect(result.user.email).toBe(creds.email);
    expect(result.user.emailVerified).toBe(false);
  });
});
