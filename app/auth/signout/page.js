"use client"; // Required for client-side components

import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

export default function SignOut() {
  useEffect(() => {
    // Automatically sign out when the page loads
    signOut({ callbackUrl: "/" });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Signing you out...</p>
    </div>
  );
}
