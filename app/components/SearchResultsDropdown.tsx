"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearch } from "../context/searchContext";
import { Product } from "../types/productType";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

export default function SearchResultsDropdown() {
  const { searchTerm, setSearchTerm } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type=="product" && name match $q][0..4]{
    _id,
    name,
    slug,
    baseImage,
    pricing {
      pkPrice {
        discount,
        original
      }
    }
  }`,
        { q: `${searchTerm}*` },
      )
      .then(setProducts);
  }, [searchTerm]);

  if (!searchTerm) return null;

  return (
    <div className="absolute left-0 right-0 top-12 z-50 rounded-2xl bg-white shadow-xl border border-stone-100 overflow-hidden">
      {products.length > 0 ? (
        <>
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/junhae-edits/${product.slug.current}`}
              onClick={() => setSearchTerm("")}
              className="flex items-center gap-4 px-4 py-3 hover:bg-stone-50 transition"
            >
              <div className="relative w-12 h-14 bg-stone-100 overflow-hidden rounded">
                {product.baseImage && (
                  <Image
                    src={urlFor(product.baseImage).width(200).url()}
                    alt={product.name}
                    width={800}
                    height={800}
                    className="object-cover"
                  />
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm text-stone-900">{product.name}</p>
                <p className="text-xs text-stone-500">
                  PKR{" "}
                  {product.pricing.pkPrice.discount ??
                    product.pricing.pkPrice.original}
                </p>
              </div>
            </Link>
          ))}

          {/* View All */}
          <Link
            href="/junhae-edits"
            onClick={() => setSearchTerm("")}
            className="block text-center text-xs tracking-widest uppercase py-3 bg-stone-900 text-white hover:bg-stone-800 transition"
          >
            View all results
          </Link>
        </>
      ) : (
        <p className="px-4 py-6 text-sm text-stone-400 text-center">
          No products found
        </p>
      )}
    </div>
  );
}
