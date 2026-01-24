"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { useSearch } from "../context/searchContext";
import { Product, ProductVariant, ProductBadge } from "../types/productType";

/* ----------------------------------
 Helpers
---------------------------------- */

type SortOption = {
  label: string;
  value: string;
};

const getPrices = (product: Product) => {
  const pk = product.pricing?.pkPrice;
  const intl = product.pricing?.intlPrice;

  return {
    pk: {
      original: pk?.original ?? 0,
      discount: pk?.discount ?? pk?.original ?? 0,
    },
    intl: {
      original: intl?.original ?? 0,
      discount: intl?.discount ?? intl?.original ?? 0,
    },
  };
};

const isNewProduct = (createdAt: string) => {
  const diffDays =
    (Date.now() - new Date(createdAt).getTime()) / (1000 * 3600 * 24);
  return diffDays <= 7;
};

/* ----------------------------------
 Component
---------------------------------- */

const Shop = () => {
  const { searchTerm } = useSearch();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12; // Adjusted for even grid rows

  const fetchedRef = useRef(false);

  const [sortOptions, setSortOptions] = useState<SortOption[]>([
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ]);

  /* ----------------------------------
 Fetch Products + Badges
---------------------------------- */
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchData = async () => {
      setLoading(true);
      setElapsed(0);
      const data: Product[] = await client.fetch(`
        *[_type == "product"] | order(_createdAt desc) {
          _id,
          _createdAt,
          name,
          slug,
          baseImage,
          badges[]->{title,value},
          variants,
          availableSizes,
          fit,
          pricing,
          category->{title,slug}
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
        *[_type == "badge"]{title,value}
      `);

      setSortOptions((prev) => [
        ...prev,
        ...badges.map((b: ProductBadge) => ({
          label: b.title,
          value: b.value,
        })),
      ]);
    };

    fetchData();
    fetchBadges();
  }, []);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [loading]);

  /* ----------------------------------
 Filtering + Sorting
---------------------------------- */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterCategory !== "All") {
      result = result.filter((p) => p.category?.title === filterCategory);
    }

    if (searchTerm.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortOption === "price-low") {
      result.sort(
        (a, b) => getPrices(a).pk.discount - getPrices(b).pk.discount,
      );
    } else if (sortOption === "price-high") {
      result.sort(
        (a, b) => getPrices(b).pk.discount - getPrices(a).pk.discount,
      );
    } else if (sortOption !== "newest") {
      result.sort((a, b) => {
        const aHas = a.badges?.some((x) => x.value === sortOption) ? 1 : 0;
        const bHas = b.badges?.some((x) => x.value === sortOption) ? 1 : 0;
        return bHas - aHas;
      });
    }

    return result;
  }, [products, filterCategory, sortOption, searchTerm]);

  /* ----------------------------------
 Pagination
---------------------------------- */
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    const setPage = () => {
      setCurrentPage(1);
    };
    setPage();
  }, [filterCategory, sortOption, searchTerm]);

  /* ----------------------------------
 Render
---------------------------------- */
  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
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
        {/* Filters */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-sm transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? "text-stone-900 font-medium border-b-2 border-stone-900"
                    : "text-stone-400 hover:text-stone-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm bg-transparent focus:outline-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="min-h-150">
          {loading ? (
            <div className="space-y-10">
              {/* Loader Status */}
              <div className="flex flex-col items-center justify-center gap-3 py-10">
                <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
                <p className="text-stone-400 text-sm font-light italic">
                  Refreshing collection... {elapsed}s
                </p>
              </div>

              {/* Skeleton Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="animate-pulse">
                    <div className="aspect-3/4 bg-stone-100 mb-4 rounded-sm" />
                    <div className="space-y-3">
                      <div className="h-3 w-3/4 bg-stone-100 rounded" />
                      <div className="h-3 w-1/2 bg-stone-100 rounded" />
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-stone-100" />
                        <div className="w-3 h-3 rounded-full bg-stone-100" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 transition-opacity duration-500">
              {paginatedProducts.map((product) => {
                const prices = getPrices(product);

                return (
                  <Link
                    key={product._id}
                    href={`/junhae-edits/${product.slug.current}`}
                    className="group"
                  >
                    <div className="aspect-3/4 bg-stone-50 overflow-hidden mb-3 relative">
                      {product.baseImage && (
                        <Image
                          src={urlFor(product.baseImage).width(800).url()}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}

                      {isNewProduct(product._createdAt) && (
                        <span className="absolute top-3 right-3 bg-black text-white text-[10px] px-2 py-1 tracking-widest font-bold">
                          NEW
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm text-stone-900 font-normal">
                      {product.name}
                    </h3>

                    {/* Prices */}
                    <div className="mt-1.5 space-y-0.5">
                      <div className="flex items-center gap-2">
                        {prices.pk.discount < prices.pk.original && (
                          <span className="line-through text-stone-400 text-xs">
                            PKR {prices.pk.original.toLocaleString()}
                          </span>
                        )}
                        <span className="text-sm font-medium text-stone-900">
                          PKR {prices.pk.discount.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex gap-2 text-[11px] text-stone-500 uppercase tracking-tighter">
                        {prices.intl.discount < prices.intl.original && (
                          <span className="line-through">
                            USD {prices.intl.original}
                          </span>
                        )}
                        <span>USD {prices.intl.discount}</span>
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="flex gap-1.5 mt-3">
                      {product.variants?.map((v: ProductVariant) => (
                        <span
                          key={v.id}
                          className="w-2.5 h-2.5 rounded-full border border-stone-200"
                          style={{ backgroundColor: v.colorCode }}
                          title={v.color}
                        />
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-20">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 h-10 flex items-center justify-center text-xs transition-all border ${
                  currentPage === i + 1
                    ? "bg-black text-white border-black"
                    : "border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
