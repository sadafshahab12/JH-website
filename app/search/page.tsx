// app/search/page.tsx
"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); 

  useEffect(() => {
    if (query) {
      router.replace(`/junhae-edits?search=${encodeURIComponent(query)}`);
    } else {
      router.replace("/junhae-edits");
    }
  }, [query, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-stone-500 font-light italic tracking-widest text-xs uppercase">
          Searching the collection...
        </p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchRedirect />
    </Suspense>
  );
}