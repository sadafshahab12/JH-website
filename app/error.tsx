"use client";

import { useEffect } from "react";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optional: log error to monitoring service
    console.error("Global error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="max-w-md text-center bg-white rounded-2xl shadow-md p-10 space-y-6">
        {/* Label */}
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Something went wrong
        </p>

        {/* Headline */}
        <h1 className="text-3xl font-semibold text-gray-900">
          Oops! An error occurred
        </h1>

        {/* Message */}
        <p className="text-gray-600">
          {` We’re experiencing a temporary issue. Please try again or return to
          the homepage.`}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-900 transition"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>

        {/* Support */}
        <p className="text-xs text-gray-400 pt-4">
          Need help? Contact{" "}
          <Link
            href="mailto:junhaestudio@gmail.com"
            className="underline hover:text-gray-600"
          >
            junhaestudio@gmail.com
          </Link>
        </p>
      </div>
    </main>
  );
}
