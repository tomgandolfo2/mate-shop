"use client"; // Required for client-side components

import React from "react";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Authentication Error</h1>
        <p className="mt-4 text-red-500">Error: {error}</p>
        <p className="mt-2">
          Please try again or contact support if the issue persists.
        </p>
      </div>
    </div>
  );
}
