"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl: "/setup" })}
      className="w-full rounded-xl border border-slate-300 bg-white py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400"
    >
      Continue with GitHub
    </button>
  );
}
