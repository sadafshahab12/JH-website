"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Router add kiya
import { urlFor, client, Product, useSearch } from "../exports/homeExports";
import { searchResultQuery } from "../lib/searchResultQuery";

export default function SearchResultsDropdown() {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchTerm.trim()) {
      client
        .fetch(searchResultQuery, { q: `${searchTerm}*` })
        .then(setProducts);
    }
  }, [searchTerm]);

  if (!searchTerm) return null;

  // View All click handle karne ke liye function
  const handleViewAll = (e: React.MouseEvent) => {
    e.preventDefault();

    // URL friendly search term (spaces ko hyphens se badalna)
    const searchSlug = searchTerm.toLowerCase().trim().replace(/\s+/g, "-");

    // Search term ko context mein rehne dein taake page par filter ho sake
    // Lekin dropdown band karne ke liye state update ki zarurat nahi,
    // bas redirect karein
    router.push(`/junhae-edits?search=${searchSlug}`);

    // Optional: Agar aap dropdown band karna chahte hain toh searchTerm reset mat karein,
    // balki dropdown ki visibility control karein.
    // Filhal redirection hi kafi hai.
  };

  return (
    <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl bg-white shadow-xl border border-stone-100 overflow-hidden">
      {products.length > 0 ? (
        <>
          <div className="max-h-100 overflow-y-auto">
            {" "}
            {/* Scroll add kiya taake dropdown screen se bahar na jaye */}
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/junhae-edits/${product.slug.current}`}
                onClick={() => setSearchTerm("")}
                className="flex items-center gap-4 px-4 py-3 hover:bg-stone-50 transition"
              >
                <div className="relative w-12 h-14 bg-stone-100 overflow-hidden rounded shrink-0">
                  {product.baseImage && (
                    <Image
                      src={urlFor(product.baseImage).width(200).url()}
                      alt={product.name}
                      fill // Image layout ko responsive banaya
                      sizes="48px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {" "}
                  {/* Text overflow prevent karne ke liye */}
                  <p className="text-sm text-stone-900 truncate">
                    {product.name}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs mt-1">
                    {/* PKR */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-stone-500">PKR</span>
                      <span className="font-semibold text-stone-900">
                        {(
                          product.pricing.pkPrice.discount ||
                          product.pricing.pkPrice.original
                        ).toLocaleString()}
                      </span>
                    </div>

                    {/* USD */}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-stone-500">USD</span>
                      <span className="font-semibold text-stone-900">
                        {product.pricing.intlPrice.discount ||
                          product.pricing.intlPrice.original}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button - Fixed Logic */}
          <button
            onClick={handleViewAll}
            className="w-full block text-center text-[10px] tracking-[0.2em] uppercase py-4 bg-stone-900 text-white hover:bg-black transition-colors font-medium"
          >
            View all results
          </button>
        </>
      ) : (
        <p className="px-4 py-8 text-sm text-stone-400 text-center italic">
          {`No products found for "${searchTerm}"`}
        </p>
      )}
    </div>
  );
}
