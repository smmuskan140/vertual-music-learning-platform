"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserBar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p className="text-xs text-slate-400">...</p>;
  if (!session?.user) {
    return (
      <Link href="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="max-w-[10rem] truncate text-sm text-slate-600">{session.user.email ?? session.user.name}</span>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-sm font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline"
      >
        Sign out
      </button>
    </div>
  );
}
