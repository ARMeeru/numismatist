import { prismaAdapter } from "@better-auth/prisma-adapter";
import { usernameSchema } from "@numismatist/contracts";
import { prisma } from "@numismatist/db";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

// §36.1: email+password is primary. Google OAuth identities arrive
// provider-verified, satisfying the §8.6 gate immediately.
//
// requireEmailVerification is intentionally NOT enabled — Better Auth's flag
// blocks sign-in entirely for unverified users, but §8.6 requires the
// opposite: users can sign in and save private coins before verifying, and
// are only blocked from publishing public/unlisted content. That gate is
// enforced at the application layer (checking `user.emailVerified`) wherever
// visibility is set to public/unlisted, not here.
// Local dev machines often have common ports (3000, etc.) already taken by
// unrelated tools, so the dev server should be free to bind to whatever's
// available rather than fight for one fixed port. Better Auth's origin check
// normally requires `baseURL` to match the actual running port exactly — the
// dynamic-host form of `baseURL` (designed for Vercel preview domains) works
// just as well for "which localhost port am I on this time": it derives the
// origin from the incoming request and accepts anything matching
// `allowedHosts`, so no port needs to be pinned or coordinated with `.env`.
// Production keeps a fixed, real `baseURL` — no wildcard there.
// `fallback` covers calls with no real HTTP request to derive an origin from
// (direct `auth.api.*` calls, e.g. from tests or future server actions) — it
// is never consulted for actual browser traffic, which always has a request.
const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.BETTER_AUTH_URL
    : {
        allowedHosts: ["localhost:*", "127.0.0.1:*"],
        protocol: "http" as const,
        fallback: "http://localhost:3000",
      };

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  user: {
    additionalFields: {
      // §12.2–12.3: format, length, and reserved-word rules are enforced by
      // the same Zod schema the rest of the app uses — single source of
      // truth, not reimplemented here. DB-level uniqueness is the existing
      // `User.username @unique` constraint (packages/db).
      username: {
        type: "string",
        required: true,
        unique: true,
        validator: { input: usernameSchema },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // TODO(feat/auth follow-up): wire a real email provider. Logs only for now.
      console.log(`[auth] verification email for ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  plugins: [nextCookies()],
});
