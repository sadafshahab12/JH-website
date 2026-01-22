"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { Product, ProductBadge, ProductVariant } from "../types/productType";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useSearch } from "../context/searchContext";

type SortOption = {
  label: string;
  value: string;
};

const Shop = () => {
  const { searchTerm } = useSearch();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [sortOption, setSortOption] = useState<string>("newest");

  const [sortOptions, setSortOptions] = useState<SortOption[]>([
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ]);

  // Loading State
  const [loading, setLoading] = useState<boolean>(true);

  // Elapsed Time
  const [elapsed, setElapsed] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10;
  // Prevent duplicate fetching in React Strict Mode
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchShopData = async () => {
      setLoading(true);
      setElapsed(0);

      const data: Product[] = await client.fetch(`
        *[_type == "product"]
          | order(_createdAt desc) {
            _id,
            _createdAt,
            name,
            description,
            slug,
            baseImage,
            badges[]->{
              _key,
              title,
              value
            },
            variants,
            availableSizes,
            fit,
            details,
            originalPrice,
            discountPrice,
            category->{
              title,
              slug
            }
          }
      `);

      setProducts(data);

      const uniqueCats = Array.from(
        new Set(data.map((p) => p.category?.title).filter(Boolean)),
      ) as string[];

      setCategories(["All", ...uniqueCats]);
      setLoading(false);
    };

    const fetchBadges = async () => {
      const badges = await client.fetch(`
        *[_type == "badge"]{
          _id,
          title,
          value
        }
      `);

      const badgeOptions = badges.map((badge: ProductBadge) => ({
        label: badge.title,
        value: badge.value,
      }));

      // remove duplicates
      const uniqueBadgeOptions = badgeOptions.filter(
        (v: SortOption, index: number, self: SortOption[]) =>
          index === self.findIndex((t) => t.value === v.value),
      );

      setSortOptions((prev) => {
        const merged = [...prev, ...uniqueBadgeOptions];

        // dedupe again just in case
        return merged.filter(
          (opt, index) =>
            index === merged.findIndex((x) => x.value === opt.value),
        );
      });
    };

    fetchShopData();
    fetchBadges();
  }, []);

  // Elapsed timer while loading
  useEffect(() => {
    if (!loading) return;

    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [loading]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterCategory !== "All") {
      result = result.filter((p) => p.category?.title === filterCategory);
    }

    if (searchTerm.trim().length > 0) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortOption === "price-low") {
      result.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (sortOption === "price-high") {
      result.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (sortOption !== "newest") {
      result.sort((a, b) => {
        const aHasBadge = a.badges?.some((badge) => badge.value === sortOption)
          ? 1
          : 0;
        const bHasBadge = b.badges?.some((badge) => badge.value === sortOption)
          ? 1
          : 0;

        return bHasBadge - aHasBadge;
      });
    } else {
      result.sort(
        (a, b) =>
          new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime(),
      );
    }

    return result;
  }, [products, filterCategory, sortOption, searchTerm]);

  const isNewProduct = (createdAt: string) => {
    const createdDate = new Date(createdAt);
    const diffDays =
      (new Date().getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
    return diffDays <= 7;
  };
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);
  useEffect(() => {
    const setPage = () => {
      setCurrentPage(1);
    };
    setPage();
  }, [filterCategory, searchTerm, sortOption]);

  return (
    <div className="pt-22 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}

        <div className="relative overflow-hidden rounded-3xl mb-8 sm:mb-12">
          {/* Desktop Image */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="/junhae-edits-image/junhaestudio header background image.png"
              alt="Junhae Studio collection background"
              width={800}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Mobile Crimson Background */}
          <div className="block md:hidden absolute inset-0 bg-crimson"></div>

          {/* Overlay Content */}
          <div className="relative z-10 p-6 sm:p-8 rounded-3xl">
            <h1 className="text-3xl sm:text-4xl font-vogue text-white mb-4 text-center sm:text-left">
              Shop Junhae Studio Collection
            </h1>
            <p className="text-stone-200 text-sm sm:text-[16px] font-light max-w-2xl text-center sm:text-left">
              Explore our premium print-on-demand essentials — ethically
              crafted, minimalist apparel designed for modern creatives. Shop
              our best-selling tees, hoodies, and sweatshirts with global
              shipping and effortless style.
            </p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="sticky top-20 z-30 bg-white/95 backdrop-blur py-4 border-b border-stone-100 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-6 overflow-x-auto hide-scrollbar pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-sm tracking-wide whitespace-nowrap transition-all ${
                  filterCategory === cat
                    ? "text-stone-900 font-medium border-b-2 border-stone-900 pb-1"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 border-l border-stone-100 pl-4">
            <SlidersHorizontal size={14} className="text-stone-400" />
            <select
              className="bg-transparent text-sm text-stone-600 focus:outline-none cursor-pointer font-light"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              {sortOptions.map((opt, idx) => (
                <option key={`${opt.value}-${idx}`} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Loading State */}
        {loading ? (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
              <p className="text-stone-500 font-medium">
                Loading products... {elapsed}s
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-10">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="animate-fade-in">
                  <div className="relative aspect-3/4 overflow-hidden bg-stone-50 mb-4 skeleton" />
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 skeleton rounded" />
                    <div className="h-3 w-1/2 skeleton rounded" />
                    <div className="flex gap-1.5 pt-1">
                      <div className="w-2.5 h-2.5 rounded-full border border-stone-200 skeleton" />
                      <div className="w-2.5 h-2.5 rounded-full border border-stone-200 skeleton" />
                      <div className="w-2.5 h-2.5 rounded-full border border-stone-200 skeleton" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {paginatedProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/junhae-edits/${product.slug.current}`}
                  className="group block animate-fade-in"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-stone-50 mb-4">
                    {product.baseImage && (
                      <Image
                        src={urlFor(product.baseImage).width(800).url()}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    )}

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 text-[9px] tracking-[0.2em] uppercase text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {product.category.title}
                    </span>

                    {/* Badge Logic */}
                    {isNewProduct(product._createdAt) ? (
                      <span className="absolute top-4 right-4 bg-stone-900 text-white px-2 py-1 text-[9px] tracking-[0.2em] uppercase">
                        NEW
                      </span>
                    ) : (
                      product.badges?.[0] && (
                        <span className="absolute bottom-4 left-4 bg-stone-900 text-white px-2 py-1 text-[9px] tracking-[0.2em] uppercase">
                          {product.badges[0].value}
                        </span>
                      )
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-[12px] sm:text-[15px] text-stone-900 font-normal tracking-tight sm:line-clamp-1">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-light text-stone-400 line-through">
                        PKR {product.originalPrice}
                      </span>
                      <span className="text-[13px] font-medium text-stone-900">
                        PKR {product.discountPrice}
                      </span>
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      {product.variants?.map((v: ProductVariant) => (
                        <div
                          key={v.id}
                          className="w-2.5 h-2.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: v.color.toLowerCase() }}
                          title={v.color}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center">
                <p className="text-stone-400 font-light tracking-widest text-sm uppercase">
                  No items found in {filterCategory}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded text-sm font-medium ${
              currentPage === 1
                ? "text-stone-400 border-stone-200 cursor-not-allowed"
                : "text-stone-900 border-stone-300 hover:bg-stone-100"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-4 py-2 border rounded text-sm font-medium ${
                  currentPage === pageNum
                    ? "bg-stone-900 text-white border-stone-900"
                    : "text-stone-900 border-stone-300 hover:bg-stone-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded text-sm font-medium ${
              currentPage === totalPages
                ? "text-stone-400 border-stone-200 cursor-not-allowed"
                : "text-stone-900 border-stone-300 hover:bg-stone-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
