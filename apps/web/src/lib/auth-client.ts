import type { auth } from "@/lib/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// No explicit baseURL: same-origin requests to /api/auth/* are the default
// and correct for this app (client and server are the same Next.js app).
// `inferAdditionalFields<typeof auth>()` is type-only — it pulls in the
// server auth config's additional fields (e.g. `username`) so the client is
// properly typed, without bundling any server code (the import is erased).
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

export const { signIn, signUp, signOut, useSession } = authClient;
