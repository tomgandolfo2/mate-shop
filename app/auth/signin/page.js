"use client"; // Required for client-side components

import { signIn } from "next-auth/react";
import React from "react";

export default function SignIn({ searchParams }) {
  const callbackUrl = searchParams?.callbackUrl || "/"; // Default to homepage if no callbackUrl

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
