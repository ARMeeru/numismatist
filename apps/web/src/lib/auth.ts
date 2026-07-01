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
export const auth = betterAuth({
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
