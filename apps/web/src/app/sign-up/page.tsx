"use client";

import { signUp } from "@/lib/auth-client";
import { useState } from "react";

// Minimal, functional sign-up form — proves the auth flow end to end. The
// real onboarding wizard (PRD §15.2: profile step, security guidance, first
// coin) is separate feature work, not part of the auth scaffold.
export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    const { error: signUpError } = await signUp.email({
      email,
      password,
      name,
      username,
    });
    if (signUpError) {
      setError(signUpError.message ?? "Sign up failed.");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
        <h1 className="text-xl font-semibold">Check your email</h1>
        <p className="text-sm text-gray-500">
          We sent a verification link. You can start adding coins privately right away — you only
          need to verify before sharing anything publicly.
        </p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
        <input
          type="text"
          placeholder="Display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded border px-3 py-2"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button type="submit" className="rounded bg-black px-3 py-2 text-white">
          Sign up
        </button>
      </form>
    </main>
  );
}
