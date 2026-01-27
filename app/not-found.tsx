import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 px-6">
      <div className="max-w-md text-center bg-white rounded-2xl shadow-md p-10 space-y-6">
        
        {/* Error Code */}
        <p className="text-sm uppercase tracking-widest text-gray-400">
          Error 404
        </p>

        {/* Headline */}
        <h1 className="text-4xl font-semibold text-gray-900">
          Page not found
        </h1>

        {/* Message */}
        <p className="text-gray-600">
          {`The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back to something stylish.`}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="rounded-xl bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-900 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/junhae-edits"
            className="rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
          >
            Shop Collection
          </Link>
        </div>

        {/* Brand Touch */}
        <p className="text-xs text-gray-400 pt-4">
          © {new Date().getFullYear()} <span className="font-vogue">Junhae Studio</span>
        </p>
      </div>
    </main>
  );
}
