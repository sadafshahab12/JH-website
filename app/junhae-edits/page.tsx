"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SlidersHorizontal } from "lucide-react";

import { client, urlFor, useSearch } from "../exports/homeExports";
import { Product, ProductVariant, ProductBadge } from "../types/productType";
import { useSearchParams } from "next/navigation";

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

const Shop = () => {
  const { searchTerm } = useSearch();
  const searchParams = useSearchParams();

  // 💡 URL se parameters read karna
  const queryCategory = searchParams.get("category");
  const querySearch = searchParams.get("search"); // Navbar wala search yahan aayega

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);

  const [filterCategory, setFilterCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [elapsed, setElapsed] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const fetchedRef = useRef(false);

  const [sortOptions, setSortOptions] = useState<SortOption[]>([
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
  ]);

  useEffect(() => {
    if (queryCategory) {
      const formatted =
        queryCategory.charAt(0).toUpperCase() + queryCategory.slice(1);
      setFilterCategory(formatted);
    } else {
      setFilterCategory("All");
    }
  }, [queryCategory]);

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
    _updatedAt,
    name,
    slug,
    productType,
    pricing {
      pkPrice {
        original,
        discount
      },
      intlPrice {
        original,
        discount
      }
    },
    baseImage,
    badges[]->{
      _id,
      title,
      value,
      color
    },
    variants,
    availableSizes,
    fit,
    category->{
      title,
      slug
    },
    productSpecs {
      material,
      dimensions,
      other
    }
  }
`);

      setProducts(data);

      const uniqueCats = Array.from(
        new Set(
          data
            .map((p) => p.category?.title)
            .filter((title): title is string => !!title),
        ),
      );

      setCategories(["All", ...uniqueCats]);
      setLoading(false);
    };

    const fetchBadges = async () => {
      const badges: ProductBadge[] = await client.fetch(`
        *[_type == "badge"]{title,value}
      `);

      setSortOptions((prev) => [
        ...prev,
        ...badges.map((b) => ({
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

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Filter by Category
    if (filterCategory !== "All") {
      result = result.filter((p) => p.category?.title === filterCategory);
    }

    // 2. 💡 Updated Search Logic: Priority to URL Param (querySearch) then context (searchTerm)
    const activeSearch = querySearch || searchTerm;

    if (activeSearch && activeSearch.trim()) {
      const term = activeSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category?.title?.toLowerCase().includes(term),
      );
    }

    // 3. Sorting Logic
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
  }, [products, filterCategory, sortOption, searchTerm, querySearch]);

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
  }, [filterCategory, sortOption, searchTerm, querySearch]);

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
              {querySearch
                ? `Results for "${querySearch}"`
                : "Minimalist Streetwear & Apparel | Junhae Studio Collection"}
            </h1>
            <p className="text-stone-200 text-sm sm:text-[16px] font-light max-w-2xl text-center sm:text-left">
              Explore our premium minimalist streetwear essentials — ethically
              crafted, sustainable print-on-demand apparel designed for modern
              creatives.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-stone-100 pb-6">
          <nav className="relative overflow-hidden group">
            <div className="flex items-center gap-8 overflow-x-auto pb-1 scrollbar-hide -mb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`relative text-[11px] md:text-xs uppercase tracking-[0.15em] transition-all duration-300 whitespace-nowrap pb-2 ${
                    filterCategory === cat
                      ? "text-stone-900 font-semibold"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {cat}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-stone-900 transition-transform duration-300 ${
                      filterCategory === cat ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              ))}
            </div>
          </nav>

          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-stone-100 pt-4 md:pt-0">
            <div className="flex items-center gap-2 group cursor-pointer">
              <SlidersHorizontal
                size={14}
                className="text-stone-400 group-hover:text-stone-900 transition-colors"
              />
              <span className="text-[11px] uppercase tracking-widest text-stone-400">
                Sort:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="text-[11px] uppercase tracking-widest bg-transparent focus:outline-none cursor-pointer font-medium text-stone-900"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="min-h-150">
          {loading ? (
            <div className="space-y-10">
              <div className="flex flex-col items-center justify-center gap-3 py-10">
                <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
                <p className="text-stone-400 text-sm font-light italic">
                  Refreshing collection... {elapsed}s
                </p>
              </div>

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
                          src={urlFor(product.baseImage).width(1000).url()}
                          alt={product.name}
                          width={800}
                          height={800}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      )}

                      <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
                        {/* 1. Static NEW Badge (Jo 7 din purane products par aata hai) */}
                        {isNewProduct(product._createdAt) && (
                          <span className="bg-black text-white text-[9px] px-3 py-1.5 tracking-[0.2em] font-bold uppercase shadow-sm">
                            NEW
                          </span>
                        )}

                        {/* 2. Dynamic Sanity Badges (Best Seller, Popular, etc.) */}
                        {product.badges?.map((badge) => (
                          <span
                            key={badge._id}
                            className="bg-white/90 backdrop-blur-sm text-[7px] sm:text-[9px] px-2 sm:px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm border border-stone-100"
                            style={{ color: badge.color || "#1c1917" }} // Stone-900 as default
                          >
                            {badge.value} 
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="text-sm text-stone-900 font-normal">
                      {product.name}
                    </h3>

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
          {!loading && paginatedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-400 italic">
                No products found matching your search.
              </p>
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

      <section className="mt-16 sm:mt-24 md:mt-32 py-12 sm:py-20 border-t border-stone-100 bg-[#FCFCFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="sr-only">About Junhae Studio Minimalist Fashion</h2>
          <div className="w-8 sm:w-12 h-px bg-stone-300 mx-auto mb-6 sm:mb-10" />
          <div className="space-y-4 sm:space-y-8">
            <h3 className="text-lg sm:text-xl md:text-2xl font-vogue text-stone-900 tracking-[0.15em] sm:tracking-wide">
              The Essence of Junhae Studio
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm md:text-base font-light leading-relaxed sm:leading-loose max-w-3xl mx-auto px-2">
              Welcome to{" "}
              <span className="text-stone-900 font-vogue font-medium">
                Junhae Studio
              </span>
              , your destination for premium{" "}
              <strong className="font-medium text-stone-800">
                minimalist clothing
              </strong>{" "}
              and{" "}
              <strong className="font-medium text-stone-800">
                aesthetic streetwear
              </strong>
              .
            </p>
            <p className="text-stone-400 text-[10px] sm:text-xs md:text-sm font-light leading-relaxed max-w-2xl mx-auto italic px-4">
              Based on a print-on-demand model, we reduce waste while delivering
              high-quality{" "}
              <span className="border-b border-stone-200">
                minimalist apparel
              </span>{" "}
              to creatives worldwide.
            </p>
          </div>
          <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-stone-400 uppercase">
            <span>Ethical</span>
            <span className="w-1 h-1 bg-stone-200 rounded-full hidden xs:block" />
            <span>Sustainable</span>
            <span className="w-1 h-1 bg-stone-200 rounded-full hidden xs:block" />
            <span>Minimalist</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
