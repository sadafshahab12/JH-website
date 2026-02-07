"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Truck,
  Ruler,
  useShop,
  urlFor,
  client,
  Product,
  ProductSize,
  ProductVariant,
  Review,
  productDetailBySlugQuery,
  productDetailPageReview,
  getPrices,
  BreadCrumbs,
  ColorPicker,
  PageTypeSelection,
  ApparelMugSizeButton,
  getEstimatedDelivery,
  AddtoCartModal,
  Check,
  Share2,
  ProductTabInstructions,
  RelatedProductSkeleton,
  RelatedProducts,
  CompletetheLook,
  ProductDetailReviews,
  SizeGuideModal,
  productDetailRelatedQuery,
  MugCapacity,
} from "../exports/homeExports";
import Image from "next/image";

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
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(true);
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
                  ? "overflow-x-auto snap-x scrollbar-hide"
                  : "grid grid-cols-4"
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
                        {product.productType === "mug" ? "Capacity" : "Size"}
                      </span>

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
                <PageTypeSelection
                  product={product}
                  setSelectedPageType={setSelectedPageType}
                  selectedPageType={selectedPageType}
                />
                {/* APPAREL SIZES  & MUG CAPACITIES Button --- */}
                <ApparelMugSizeButton
                  product={product}
                  selectedSize={selectedSize}
                  setErrorMsg={setErrorMsg}
                  setSelectedSize={setSelectedSize}
                />
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
              {showModal && <AddtoCartModal setShowModal={setShowModal} />}
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
                <ProductTabInstructions
                  activeTab={activeTab}
                  product={product}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <ProductDetailReviews
          reviews={reviews}
          loadingReviews={loadingReviews}
        />

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h2 className="text-xl font-vogue text-stone-900 mb-6">
            You May Also Like
          </h2>

          {loadingRelated ? (
            <RelatedProductSkeleton />
          ) : (
            <RelatedProducts relatedProducts={relatedProducts} />
          )}
        </div>
        <CompletetheLook product={product} />
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

        <SizeGuideModal
          setShowSizeGuide={setShowSizeGuide}
          showSizeGuide={showSizeGuide}
          product={product}
        />
      </div>
    </>
  );
};

export default ProductDetail;
