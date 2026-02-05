"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Truck,
  Ruler,
  X,
  useShop,
  urlFor,
  client,
  Product,
  ProductSize,
  ProductVariant,
  Review,
} from "../exports/homeExports";

import Image from "next/image";
import Link from "next/link";
import { productDetailRelatedQuery } from "@/app/lib/productDetailRelatedQuery";
import { productDetailPageReview } from "@/app/lib/reviewDataQuery";
import { productDetailBySlugQuery } from "@/app/lib/productDetailBySlugQuery";
import { Check, Share2 } from "lucide-react";
import { getEstimatedDelivery } from "../utils/getEstimatedDelivery";
import { getPrices } from "../utils/getPrices";
import ColorPicker from "./ColorPicker";
import { BreadCrumbs } from "./BreadCrumbs";
import { MugCapacity } from "../types/cartItems";

const ProductDetail = () => {
  const { addToCart } = useShop();
  const params = useParams();

  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [product, setProduct] = useState<Product | undefined>();
  const [priceMode, setPriceMode] = useState<"pk" | "intl">("pk");

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >();
  const [selectedSize, setSelectedSize] = useState<
    ProductSize | MugCapacity | string | null
  >(null);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "care">(
    "details",
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedPageType, setSelectedPageType] = useState<"Lined" | "Plain">(
    "Lined",
  );
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Loading states
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [copied, setCopied] = useState(false);
  const [mainImage, setMainImage] = useState(() => {
    if (
      selectedVariant &&
      selectedVariant.images &&
      selectedVariant.images.length > 0
    ) {
      return urlFor(selectedVariant.images[0]).width(800).url();
    }
    return product?.baseImage ? urlFor(product.baseImage).width(800).url() : "";
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      setLoadingProduct(true);
      try {
        const res: Product = await client.fetch(productDetailBySlugQuery, {
          slug,
        });
        setProduct(res);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoadingProduct(false);
      }
    }
    fetchProduct();
  }, [slug]);

  // FETCH RELATED PRODUCTS
  useEffect(() => {
    if (!product) return;

    async function fetchRelatedProducts() {
      setLoadingRelated(true);
      try {
        const res: Product[] = await client.fetch(productDetailRelatedQuery, {
          slug,
        });

        const shuffled = res.sort(() => Math.random() - 0.5);
        setRelatedProducts(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoadingRelated(false);
      }
    }

    fetchRelatedProducts();
  }, [product, slug]);

  useEffect(() => {
    if (!product) return;

    async function fetchReviews() {
      setLoadingReviews(true);
      try {
        const res = await client.fetch(productDetailPageReview, {
          productId: product?._id,
        });

        setReviews(res);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoadingReviews(false);
      }
    }

    fetchReviews();
  }, [product]);

  useEffect(() => {
    if (!product?.variants || product.variants.length === 0) return;
    const firstVariant = product.variants[0];
    setSelectedVariant(firstVariant);
    if (firstVariant.images?.[0]) {
      setMainImage(urlFor(firstVariant.images[0]).width(800).url());
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariant?.images?.[0]) {
      setMainImage(urlFor(selectedVariant.images[0]).width(800).url());
    }
  }, [selectedVariant]);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.productType !== "stationery" && !selectedSize) {
      const errorText =
        product.productType === "mug"
          ? "Please select a capacity."
          : "Please select a size.";
      setErrorMsg(errorText);
      return;
    }
    if (product.productType !== "stationery" && !selectedVariant) {
      setErrorMsg("Please select a color.");
      return;
    }

    setErrorMsg("");

    // 4. Price Logic
    const price =
      priceMode === "pk"
        ? (product.pricing.pkPrice.discount ?? product.pricing.pkPrice.original)
        : (product.pricing.intlPrice.discount ??
          product.pricing.intlPrice.original);

    const cartImage =
      mainImage ||
      (selectedVariant?.images?.[0]
        ? urlFor(selectedVariant.images[0]).width(800).url()
        : "") ||
      (product.baseImage ? urlFor(product.baseImage).width(800).url() : "");

    // 6. Execute AddToCart
    addToCart(
      product,
      selectedSize || "",
      selectedVariant?.color || "Default",
      selectedVariant?.colorCode || "#000",
      selectedVariant?.id || "base",
      cartImage,
      price,
      priceMode,
      product.productType,
      product.productType === "stationery" ? selectedPageType : undefined,
    );

    // 7. Show Success Modal
    setShowModal(true);
  };
  const handleShare = async () => {
    const shareData = {
      title: product?.name,
      text: `Check out this ${product?.name} at Junhae Studio`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  // ✅ FULL LOADING SKELETON
  if (loadingProduct || !product || !selectedVariant) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24">
        <div className="w-full max-w-7xl animate-pulse">
          <div className="h-10 bg-stone-100 rounded mb-6" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-4/5 bg-stone-100 rounded" />
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="aspect-4/5 bg-stone-100 rounded" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-8 bg-stone-100 rounded" />
              <div className="h-6 bg-stone-100 rounded w-1/2" />
              <div className="h-4 bg-stone-100 rounded w-3/4" />
              <div className="h-4 bg-stone-100 rounded w-full" />
              <div className="h-10 bg-stone-100 rounded" />
              <div className="h-12 bg-stone-100 rounded" />
              <div className="h-8 bg-stone-100 rounded" />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="h-28 bg-stone-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }
  const prices = getPrices(product);
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: mainImage,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Junhae Studio",
    },
    offers: {
      "@type": "Offer",
      url: `https://junhaestudio.com/junhae-edits/${slug}`,
      priceCurrency: priceMode === "pk" ? "PKR" : "USD",
      price:
        priceMode === "pk"
          ? (product.pricing.pkPrice.discount ??
            product.pricing.pkPrice.original)
          : (product.pricing.intlPrice.discount ??
            product.pricing.intlPrice.original),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: avgRating.toFixed(1),
            reviewCount: reviews.length,
          }
        : undefined,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="pt-20 sm:pt-32 pb-24 min-h-screen bg-white animate-fade-in">
        <BreadCrumbs productName={product.name} />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Column */}
          <div className="space-y-4">
            <div className="aspect-4/5 bg-stone-100 w-full overflow-hidden">
              <Image
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
                width={800}
                height={800}
                priority
              />
            </div>

            <div
              className={`flex gap-4 pb-2 ${
                selectedVariant.images.length > 4
                  ? "overflow-x-auto snap-x scrollbar-hide" // 4 se zyada to scroll
                  : "grid grid-cols-4" // 4 ya kam to grid
              }`}
            >
              {selectedVariant.images.map((img) => {
                const imgUrl = urlFor(img).width(800).url();
                const fullUrl = urlFor(img).width(800).url();

                return (
                  <button
                    key={img._key}
                    onClick={() => setMainImage(fullUrl)}
                    className={`relative shrink-0 snap-start bg-stone-100 overflow-hidden border-2 transition-all ${
                      selectedVariant.images.length > 4 ? "w-[22%]" : "w-full"
                    } aspect-4/5 ${
                      mainImage === fullUrl
                        ? "border-stone-900"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} - ${selectedVariant.color}`}
                      className="w-full h-full object-cover"
                      width={300}
                      height={200}
                    />
                  </button>
                );
              })}
            </div>

            {/* MOBILE COLOR SELECTION */}
            <div className="sm:hidden pt-4 border-t border-stone-100">
              <ColorPicker
                product={product}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
                setErrorMsg={setErrorMsg}
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="flex flex-col">
            <div
              className={`border-b border-stone-200 pb-6 ${product.productType === "stationery" ? "mb-0" : "mb-8"}`}
            >
              <h1 className="text-2xl sm:text-4xl font-vogue text-stone-900 mb-2">
                {product.name}
              </h1>
              <div className="mb-6 space-y-1">
                <div className="flex gap-2">
                  {priceMode === "pk" &&
                    prices.pk.discount < prices.pk.original && (
                      <span className="line-through text-stone-400">
                        PKR {prices.pk.original}
                      </span>
                    )}

                  {priceMode === "intl" &&
                    prices.intl.discount < prices.intl.original && (
                      <span className="line-through text-stone-400">
                        USD {prices.intl.original}
                      </span>
                    )}

                  <span className="text-xl">
                    {priceMode === "pk"
                      ? `PKR ${prices.pk.discount}`
                      : `USD ${prices.intl.discount}`}
                  </span>
                </div>
              </div>

              <div className="mt-6 mb-6">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={priceMode === "pk"}
                      onChange={() => setPriceMode("pk")}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span className="font-medium">PKR</span>
                  </label>

                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      checked={priceMode === "intl"}
                      onChange={() => setPriceMode("intl")}
                      className="w-4 h-4 accent-stone-900"
                    />
                    <span className="font-medium">USD</span>
                  </label>
                </div>

                <p className="text-xs text-stone-500 mt-3">
                  Select{" "}
                  <span className="font-semibold text-stone-700">USD</span> if
                  you are ordering from outside Pakistan.
                </p>

                <div className="mt-4 border-t border-stone-200" />
              </div>

              {reviews.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-stone-600 mb-6">
                  <span className="text-amber-500">⭐</span>
                  <span className="font-medium">{avgRating.toFixed(1)}</span>
                  <span className="text-stone-400">({reviews.length})</span>
                </div>
              )}
              <div className="hidden sm:block">
                <ColorPicker
                  product={product}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                  setErrorMsg={setErrorMsg}
                />
              </div>
            </div>

            <div className="space-y-8">
              {/* Size Selection */}
              <div>
                {product.productType !== "stationery" && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                        {/* ✅ Check for Mug vs Apparel Label */}
                        {product.productType === "mug" ? "Capacity" : "Size"}
                      </span>

                      {/* ✅ Show Size Guide only if relevant guide exists */}
                      {(product.sizeGuide || product.mugSizeGuide) && (
                        <button
                          onClick={() => setShowSizeGuide(true)}
                          className="text-xs text-stone-500 underline hover:text-stone-900 flex items-center gap-1"
                        >
                          <Ruler size={12} />{" "}
                          {product.productType === "mug"
                            ? "View Dimensions"
                            : "Size Guide"}
                        </button>
                      )}
                    </div>

                    {errorMsg && (
                      <p className="text-red-500 text-sm mt-2 animate-slide-up">
                        {errorMsg}
                      </p>
                    )}
                  </div>
                )}

                {/* Page Type Selection - Only for Stationery/Notebooks */}
                {product.productType === "stationery" &&
                  (product.category.slug.current.includes("notebook") ||
                    product.category.slug.current.includes("spiral-notebook") ||
                    product.category.slug.current.includes("diary")) && (
                    <div className="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-100">
                      <span className="text-xs font-bold tracking-widest text-stone-400 uppercase block mb-3">
                        Select Page Style
                      </span>
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="pageType"
                            value="Lined"
                            checked={selectedPageType === "Lined"}
                            onChange={() => setSelectedPageType("Lined")}
                            className="w-5 h-5 accent-stone-900 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <span
                              className={`text-sm ${selectedPageType === "Lined" ? "text-stone-900 font-bold" : "text-stone-500"}`}
                            >
                              Lined Pages
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Best for writing
                            </span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="pageType"
                            value="Plain"
                            checked={selectedPageType === "Plain"}
                            onChange={() => setSelectedPageType("Plain")}
                            className="w-5 h-5 accent-stone-900 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <span
                              className={`text-sm ${selectedPageType === "Plain" ? "text-stone-900 font-bold" : "text-stone-500"}`}
                            >
                              Plain White Pages
                            </span>
                            <span className="text-[10px] text-stone-400">
                              Best for sketching
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {/* --- 1. APPAREL SIZES --- */}
                  {product.productType === "apparel" &&
                    product.availableSizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setErrorMsg("");
                        }}
                        className={`py-3 text-sm font-medium border transition-colors ${
                          selectedSize === size
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-200 text-stone-600 hover:border-stone-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}

                  {/* --- 2. MUG CAPACITIES --- */}
                  {product.productType === "mug" &&
                    product.mugCapacity?.map((capacity) => (
                      <button
                        key={capacity}
                        onClick={() => {
                          setSelectedSize(capacity); // selectedSize variable hi use karein taake logic same rahe
                          setErrorMsg("");
                        }}
                        className={`py-3 text-sm font-medium border transition-colors ${
                          selectedSize === capacity
                            ? "border-stone-900 bg-stone-900 text-white"
                            : "border-stone-200 text-stone-600 hover:border-stone-400"
                        }`}
                      >
                        {capacity}
                      </button>
                    ))}
                </div>
              </div>
              {product.inventory !== undefined &&
                product.inventory > 0 &&
                product.inventory < 6 && (
                  <div className="flex items-center gap-2 mb-3 text-orange-600 animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                    <p className="text-xs font-bold uppercase tracking-wider">
                      Only {product.inventory} left in stock!
                    </p>
                  </div>
                )}

              {/* Delivery Estimator */}
              <div className="mb-6 p-3 bg-stone-50 border border-stone-100 rounded flex items-center gap-3">
                <Truck size={16} className="text-stone-400" />
                <p className="text-xs text-stone-600">
                  Want it soon? Get it by{" "}
                  <span className="font-bold text-stone-900">
                    {getEstimatedDelivery()}
                  </span>
                </p>
              </div>
              <div className="my-6 py-4 border-y border-stone-100">
                <div className="flex items-center gap-4 bg-crimson p-5 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white"
                    >
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold mb-0.5">
                      Eco-Conscious Choice
                    </p>
                    <p className="text-xs text-white leading-relaxed">
                      Your choice saves{" "}
                      <span className="font-bold text-white underline decoration-white/30 underline-offset-4">
                        2,700L of water
                      </span>{" "}
                      compared to mass production.
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-stone-900 text-white py-4 px-8 text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-lg active:transform active:scale-[0.99]"
              >
                Add to Cart
              </button>
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
                    <button
                      onClick={() => setShowModal(false)}
                      className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors p-1"
                      aria-label="Close modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    {/* ------------------------ */}

                    {/* Cute Cartoon Image */}
                    <div className="flex justify-center mb-4">
                      <Image
                        src="/checkout images/add to cart.png"
                        alt="Success"
                        width={800}
                        height={800}
                        className="w-32 h-32 object-contain"
                      />
                    </div>

                    <h3 className="text-2xl font-bold text-stone-900 mb-2">
                      Yay! Added to Cart
                    </h3>
                    <p className="text-stone-600 mb-6">
                      Your item is waiting for you in the bag.
                    </p>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="w-full bg-stone-900 text-white py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-stone-800"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={() => (window.location.href = "/checkout")}
                        className="w-full text-stone-500 py-2 text-sm font-semibold underline underline-offset-4 hover:text-stone-800"
                      >
                        Go to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div
                className="flex items-center justify-center py-4 border-b border-stone-100 cursor-pointer"
                onClick={handleShare}
              >
                <button className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors group cursor-pointer">
                  {copied ? (
                    <>
                      <Check size={16} className="text-green-600" />
                      <span className="text-xs font-medium uppercase tracking-widest text-green-600">
                        Link Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Share2
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="text-xs font-medium uppercase tracking-widest">
                        Share this product
                      </span>
                    </>
                  )}
                </button>
              </div>
              {/* Tabs */}
              <div className="pt-8">
                <div className="flex border-b border-stone-200 space-x-8 mb-4">
                  {(["details", "shipping", "care"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 text-sm tracking-wide capitalize transition-colors ${
                        activeTab === tab
                          ? "text-stone-900 border-b border-stone-900"
                          : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="text-sm font-light text-stone-600 leading-relaxed min-h-25">
                  {activeTab === "details" && (
                    <div className="space-y-2 animate-fade-in">
                      <p>{product.description}</p>

                      <div>
                        <ul className="list-disc list-inside mt-1">
                          {product.fabricDetails?.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>

                      {product.fit && (
                        <p className="text-sm">
                          <span className="font-medium text-stone-900">
                            Fit:
                          </span>{" "}
                          <span className="text-stone-500">
                            {/* 💡 Check karein ke fit array hai ya string */}
                            {Array.isArray(product.fit)
                              ? product.fit.join(" / ")
                              : product.fit}
                          </span>
                        </p>
                      )}
                      {product.productType === "stationery" &&
                        product.productSpecs && (
                          <div className="mt-4 p-3 bg-stone-50 rounded space-y-1">
                            {/* Material Fix */}
                            {product.productSpecs.material && (
                              <div className="text-xs">
                                <strong className="block mb-1">
                                  Material:
                                </strong>
                                <ul className="list-disc pl-4">
                                  {Array.isArray(
                                    product.productSpecs.material,
                                  ) ? (
                                    product.productSpecs.material.map(
                                      (item, index) => (
                                        <li key={index}>{item}</li>
                                      ),
                                    )
                                  ) : (
                                    <li>{product.productSpecs.material}</li>
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Size/Dimensions */}
                            {/* Dimensions / Size Section */}
                            {product.productSpecs.dimensions && (
                              <div className="text-xs mt-2">
                                <strong className="block mb-1">Size:</strong>
                                <ul className="list-disc pl-4">
                                  {Array.isArray(
                                    product.productSpecs.dimensions,
                                  ) ? (
                                    product.productSpecs.dimensions.map(
                                      (dim, index) => (
                                        <li key={index}>{dim}</li>
                                      ),
                                    )
                                  ) : (
                                    <li>{product.productSpecs.dimensions}</li>
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Other Fix / Notes Section */}
                            {product.productSpecs.other && (
                              <div className="mt-2 text-xs italic text-stone-400">
                                <ul className="list-none space-y-1">
                                  {Array.isArray(product.productSpecs.other) ? (
                                    product.productSpecs.other.map(
                                      (note, index) => (
                                        <li key={index}>* {note}</li>
                                      ),
                                    )
                                  ) : (
                                    <li>* {product.productSpecs.other}</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  )}
                  {/* Shipping Tab */}
                  {activeTab === "shipping" && (
                    <div className="flex items-start gap-3 animate-fade-in">
                      <Truck
                        size={18}
                        className="text-stone-400 mt-1 shrink-0"
                      />
                      <div className="space-y-2">
                        {product.shippingDetails ? (
                          <p className="whitespace-pre-line text-stone-700 leading-relaxed">
                            {product.shippingDetails}
                          </p>
                        ) : (
                          <>
                            <p>
                              <strong>Made to Order:</strong> 2–5 business days
                            </p>
                            <p>
                              <strong>Pakistan Shipping:</strong> 4–7 business
                              days
                            </p>
                            <p>
                              <strong>Standard Shipping:</strong> 5–10 business
                              days
                            </p>
                          </>
                        )}

                        <hr className="my-2 border-stone-200" />

                        <p>
                          <strong>Return Policy:</strong> Returns accepted
                          within 7 days of delivery. Product must be unused,
                          with tags intact.
                        </p>

                        <p>
                          <strong>Pay Online:</strong> We accept online payments
                          via Credit/Debit cards & JazzCash/Bank transfer.
                        </p>

                        <p className="text-sm text-stone-500 italic">
                          *Delivery times may vary depending on location &
                          product availability.
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Care Instructions Tab */}
                  {activeTab === "care" && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <h3 className="text-sm font-medium text-stone-900 mb-2">
                          Product Care Guide
                        </h3>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-stone-600">
                          {product.careInstructions &&
                          product.careInstructions.length > 0 ? (
                            product.careInstructions.map((instruction, idx) => (
                              <li key={idx}>{instruction}</li>
                            ))
                          ) : (
                            <>
                              <li>Machine wash cold, inside out</li>
                              <li>Use mild detergent (no bleach)</li>
                              <li>Tumble dry low or hang dry</li>
                              <li>Do not iron directly on print</li>
                              <li>Avoid dry cleaning for printed items</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 max-w-7xl mx-auto px-6">
          <h2 className="text-xl font-vogue text-stone-900 mb-4">
            Reviews ({reviews.length})
          </h2>

          {loadingReviews ? (
            <div className="space-y-4 animate-pulse">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="border p-4 rounded-md">
                  <div className="h-4 bg-stone-100 w-1/4 rounded mb-2" />
                  <div className="h-3 bg-stone-100 w-1/6 rounded mb-2" />
                  <div className="h-3 bg-stone-100 w-full rounded" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <p className="text-sm text-stone-500">
              No reviews yet. Be the first to review!
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((rev) => (
                <div
                  key={rev._id}
                  className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    {/* Avatar */}
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-700">
                        {rev.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">
                          {rev.name}
                        </p>
                        <p className="text-xs text-stone-500 mt-1">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                      <span className="text-amber-500">⭐</span>
                      <span>{rev.rating}/5</span>
                    </div>
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-stone-600 mt-4 leading-relaxed">
                    {rev.comment}
                  </p>

                  {/* Optional: “Verified” badge */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="text-xs text-stone-500">
                      Verified buyer
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h2 className="text-xl font-vogue text-stone-900 mb-6">
            You May Also Like
          </h2>

          {loadingRelated ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-pulse">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="aspect-3/4 bg-stone-100 rounded" />
                  <div className="h-3 bg-stone-100 w-3/4 rounded" />
                  <div className="h-3 bg-stone-100 w-1/2 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp._id}
                  href={`/junhae-edits/${rp.slug.current}`}
                  className="group block"
                >
                  <div className="aspect-3/4 bg-stone-100 overflow-hidden mb-3 relative">
                    {/* 💡 Badges Section */}
                    {rp.badges && rp.badges.length > 0 && (
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {rp.badges.map((badge) => (
                          <span
                            key={badge._id}
                            className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/90 backdrop-blur-sm text-stone-900 font-medium shadow-sm"
                            style={{ color: badge.color }}
                          >
                            {badge.title}
                          </span>
                        ))}
                      </div>
                    )}

                    {rp.baseImage && (
                      <Image
                        src={urlFor(rp.baseImage).width(600).url()}
                        alt={rp.name}
                        width={800}
                        height={800}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-stone-900 line-clamp-1">
                      {rp.name}
                    </h3>
                    <div className="flex flex-col gap-1">
                      {/* PKR Pricing */}
                      <div className="flex items-center gap-2">
                        {rp.pricing?.pkPrice?.discount &&
                          rp.pricing.pkPrice.discount <
                            rp.pricing.pkPrice.original && (
                            <span className="text-xs font-light text-stone-400 line-through">
                              PKR {rp.pricing.pkPrice.original}
                            </span>
                          )}
                        <span className="text-xs font-medium text-stone-900">
                          PKR{" "}
                          {rp.pricing?.pkPrice?.discount ??
                            rp.pricing?.pkPrice?.original}
                        </span>
                      </div>

                      {/* USD Pricing */}
                      <div className="flex items-center gap-2">
                        {rp.pricing?.intlPrice?.discount &&
                          rp.pricing.intlPrice.discount <
                            rp.pricing.intlPrice.original && (
                            <span className="text-xs font-light text-stone-400 line-through">
                              USD {rp.pricing.intlPrice.original}
                            </span>
                          )}
                        <span className="text-xs font-medium text-stone-900">
                          USD{" "}
                          {rp.pricing?.intlPrice?.discount ??
                            rp.pricing?.intlPrice?.original}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {product.completeTheLook && product.completeTheLook.length > 0 && (
          <section className="bg-stone-50 py-8 sm:py-24 px-6 border-y border-stone-100 mt-20">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">
                  Shop the aesthetic
                </span>
                <h2 className="text-3xl md:text-4xl font-vogue text-stone-900 mt-2">
                  Complete the Look
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
                {product.completeTheLook?.map((item) => (
                  <Link
                    key={item._id}
                    href={`/junhae-edits/${item.slug.current}`}
                    className="group"
                  >
                    <div className="aspect-3/4 overflow-hidden rounded-2xl bg-white mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-stone-100">
                      <Image
                        src={
                          item.baseImage
                            ? urlFor(item.baseImage)
                                .width(400)
                                .height(533)
                                .url()
                            : ""
                        }
                        alt={item.name}
                        width={400}
                        height={533}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider truncate px-2">
                        {item.name}
                      </h3>

                      {/* PKR + USD Pricing, Related Products Style */}
                      <div className="flex flex-col gap-1 mt-1">
                        {/* PKR */}
                        <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                          {item.pricing.pkPrice.discount ? (
                            <>
                              <span className="line-through text-stone-400">
                                PKR {item.pricing.pkPrice.original}
                              </span>
                              <span className="font-medium text-stone-900">
                                PKR {item.pricing.pkPrice.discount}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-stone-900">
                              PKR {item.pricing.pkPrice.original}
                            </span>
                          )}
                        </div>

                        {/* USD */}
                        <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                          {item.pricing.intlPrice.discount ? (
                            <>
                              <span className="line-through text-stone-400">
                                USD {item.pricing.intlPrice.original.toFixed(2)}
                              </span>
                              <span className="font-medium text-stone-900">
                                USD {item.pricing.intlPrice.discount.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="font-medium text-stone-900">
                              USD {item.pricing.intlPrice.original.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="inline-block mt-2 text-[10px] border-b border-stone-900 pb-0.5 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                        View Detail
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        {/* Trust Section / Product Footer */}
        <div className="max-w-7xl mx-auto px-6 mt-24 border-t border-stone-100 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <Truck size={24} strokeWidth={1} />
              </div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase">
                Global Shipping
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Ethically crafted in Pakistan, delivered to your doorstep
                anywhere in the world.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex justify-center text-2xl font-light">↺</div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase">
                Easy Returns
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Not the right fit? Enjoy a hassle-free 7-day return policy for
                all unworn items.
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="flex justify-center text-2xl font-light">🛡️</div>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase">
                Secure Payment
              </h3>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Your data is protected. Pay securely via card, JazzCash, or bank
                transfer.
              </p>
            </div>
          </div>
        </div>
        {/* Size Guide Modal */}
        {showSizeGuide && product && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setShowSizeGuide(false)}
          >
            <div
              className="bg-white p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSizeGuide(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={20} />
              </button>

              {/* --- Dynamic Title --- */}
              <h3 className="text-2xl font-vogue mb-6 text-stone-900">
                {product.productType === "mug"
                  ? product.mugSizeGuide?.title || "Mug Size Guide"
                  : product.sizeGuide?.title || "Size Guide"}
              </h3>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-stone-50 text-stone-900 border-b border-stone-200">
                    <tr>
                      {/* Conditional Headers */}
                      <th className="p-3 font-semibold">
                        {product.productType === "mug" ? "Capacity" : "Size"}
                      </th>
                      <th className="p-3 font-semibold">
                        {product.productType === "mug"
                          ? "Height"
                          : "Chest (in)"}
                      </th>
                      <th className="p-3 font-semibold">
                        {product.productType === "mug"
                          ? "Diameter"
                          : "Length (in)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-stone-600">
                    {/* --- MUG DATA --- */}
                    {product.productType === "mug" &&
                      product.mugSizeGuide?.sizes?.map((row, idx) => (
                        <tr key={idx} className="border-b border-stone-100">
                          <td className="p-3 font-medium text-stone-900">
                            {row.sizeLabel}
                          </td>
                          <td className="p-3">{row.height || "-"}</td>
                          <td className="p-3">{row.diameter || "-"}</td>
                        </tr>
                      ))}

                    {/* --- APPAREL DATA --- */}
                    {product.productType === "apparel" &&
                      product.sizeGuide?.sizes?.map((sizeRow, idx) => (
                        <tr key={idx} className="border-b border-stone-100">
                          <td className="p-3 font-medium text-stone-900">
                            {sizeRow.size}
                          </td>
                          <td className="p-3">{sizeRow.chest}</td>
                          <td className="p-3">{sizeRow.length}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* --- Mug Specific Extra Info (Material & Safety) --- */}
              {product.productType === "mug" && product.mugSizeGuide && (
                <div className="space-y-4 border-t border-stone-100 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-[11px]">
                    <div className="bg-stone-50 p-2 rounded">
                      <p className="text-stone-400 uppercase font-bold mb-1">
                        Material
                      </p>
                      <p className="text-stone-900 font-medium">
                        {product.mugSizeGuide.materialInfo?.material}
                      </p>
                    </div>
                    <div className="bg-stone-50 p-2 rounded text-right">
                      <p className="text-stone-400 uppercase font-bold mb-1">
                        Care
                      </p>
                      <p className="text-stone-900 font-medium">
                        {product.mugSizeGuide.materialInfo?.isMicrowaveSafe
                          ? "Microwave Safe"
                          : ""}
                        {product.mugSizeGuide.materialInfo?.isDishwasherSafe
                          ? " • Dishwasher Safe"
                          : ""}
                      </p>
                    </div>
                  </div>
                  {product.mugSizeGuide.usageTip && (
                    <p className="text-xs text-stone-500 italic text-center">
                      Tip: {product.mugSizeGuide.usageTip}
                    </p>
                  )}
                </div>
              )}

              {/* --- Apparel Specific Extra Info (Model Stats) --- */}
              {product.productType === "apparel" &&
                product.sizeGuide?.modelStats && (
                  <div className="space-y-4 border-t border-stone-100 pt-6">
                    <div className="flex items-start gap-3 bg-stone-50 p-4 rounded-lg">
                      <div className="mt-1">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-stone-400"
                        >
                          <circle cx="12" cy="8" r="5" />
                          <path d="M20 21a8 8 0 1 0-16 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">
                          Model Context
                        </p>
                        <p className="text-xs text-stone-600 leading-relaxed italic">
                          Our model is{" "}
                          <strong className="text-stone-900">
                            {product.sizeGuide.modelStats.height}
                          </strong>{" "}
                          {product.sizeGuide.modelStats.weight &&
                            `and ${product.sizeGuide.modelStats.weight}`}
                          , wearing a{" "}
                          <strong className="text-stone-900 font-bold">
                            Size {product.sizeGuide.modelStats.sizeWorn}
                          </strong>{" "}
                          for a{" "}
                          <strong className="text-stone-900 underline underline-offset-4 decoration-stone-200">
                            {product.sizeGuide.modelStats.fitDescription}
                          </strong>
                          .
                        </p>
                      </div>
                    </div>

                    {/* 💡 DYNAMIC SIZE TIP */}
                    {product.sizeGuide.sizeTip && (
                      <div className="text-[11px] text-stone-500 flex items-center justify-center gap-2 italic text-center">
                        <span>{product.sizeGuide.sizeTip}</span>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
