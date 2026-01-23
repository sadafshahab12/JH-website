"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Truck, Ruler, X } from "lucide-react";

import { useShop } from "@/app/context/ShopContext";
import { Product, ProductVariant } from "@/app/types/productType";
import { urlFor } from "@/sanity/lib/image";
import { ProductSize } from "@/app/types/cartItems";
import { client } from "@/sanity/lib/client";
import { query } from "@/app/lib/query";
import Image from "next/image";
import Link from "next/link";
import { Review } from "@/app/types/reviewType";

// --- REUSABLE COLOR PICKER COMPONENT ---
const ColorPicker = ({
  product,
  selectedVariant,
  setSelectedVariant,
  setErrorMsg,
}: {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: (v: ProductVariant) => void;
  setErrorMsg: (msg: string) => void;
}) => (
  <div>
    <span className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-3 block">
      Color: {selectedVariant.color}
    </span>
    <div className="flex space-x-3">
      {product.variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => {
            setSelectedVariant(variant);
            setErrorMsg("");
          }}
          className={`w-10 h-10 rounded-full border border-stone-200 focus:outline-none ring-1 ring-offset-2 transition-all ${
            selectedVariant.id === variant.id
              ? "ring-stone-900 scale-110"
              : "ring-transparent hover:scale-105"
          }`}
          style={{
            backgroundColor: variant.colorCode || variant.color,
          }}
          title={variant.color}
        />
      ))}
    </div>
  </div>
);

const ProductDetailsPage = () => {
  const { addToCart } = useShop();
  const params = useParams();

  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [product, setProduct] = useState<Product | undefined>();
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >();
  const [selectedSize, setSelectedSize] = useState<ProductSize>("S");
  const [mainImage, setMainImage] = useState<string>("");

  const [activeTab, setActiveTab] = useState<"details" | "shipping" | "care">(
    "details",
  );
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Loading states
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  useEffect(() => {
    async function fetchProduct() {
      if (!slug) return;

      setLoadingProduct(true);
      try {
        const res: Product = await client.fetch(query, { slug });
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
        const res: Product[] = await client.fetch(
          `*[_type == "product" && slug.current != $slug] [0..7]{
            _id,
            name,
            slug,
            baseImage,
            originalPrice,
            discountPrice
          }`,
          { slug },
        );

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
        const res = await client.fetch(
          `*[_type == "review" && product._ref == $productId] | order(createdAt desc){
            _id,
            name,
            rating,
            comment,
            createdAt
          }`,
          { productId: product?._id },
        );

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
      setMainImage(urlFor(firstVariant.images[0]).width(900).url());
    }
  }, [product]);

  useEffect(() => {
    if (selectedVariant?.images?.[0]) {
      setMainImage(urlFor(selectedVariant.images[0]).width(900).url());
    }
  }, [selectedVariant]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;
    if (!selectedSize) {
      setErrorMsg("Please select a size.");
      return;
    }
    setErrorMsg("");
    const price = product.discountPrice ?? product.originalPrice;
    const image =
      mainImage || urlFor(selectedVariant.images[0]).width(900).url();

    addToCart(
      product,
      selectedSize,
      selectedVariant.color,
      selectedVariant.colorCode,
      selectedVariant.id,
      image,
      price,
    );
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

  return (
    <div className="pt-20 sm:pt-32 pb-24 min-h-screen bg-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <nav className="text-sm text-stone-500 font-light tracking-wide">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-stone-900">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/junhae-edits" className="hover:text-stone-900">
                Junhae Edits
              </Link>
            </li>
            <li>/</li>
            <li className="text-stone-900 font-medium">{product.name}</li>
          </ol>
        </nav>
      </div>

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

          <div className="grid grid-cols-4 gap-4">
            {selectedVariant.images.map((img) => {
              const imgUrl = urlFor(img).width(300).url();
              const fullUrl = urlFor(img).width(900).url();
              return (
                <button
                  key={img._key}
                  onClick={() => setMainImage(fullUrl)}
                  className={`aspect-4/5 bg-stone-100 overflow-hidden border-2 transition-all ${
                    mainImage === fullUrl
                      ? "border-stone-900"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                    width={300}
                    height={300}
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
          <div className="border-b border-stone-200 pb-6 mb-8">
            <h1 className="text-2xl sm:text-4xl font-vogue text-stone-900 mb-2">
              {product.name}
            </h1>

            <p className="text-xl font-light text-stone-600 mb-6">
              PKR {product.discountPrice}
            </p>
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
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold tracking-widest text-stone-400 uppercase">
                  Size
                </span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-stone-500 underline hover:text-stone-900 flex items-center gap-1"
                >
                  <Ruler size={12} /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.availableSizes.map((size) => (
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
              </div>
              {errorMsg && (
                <p className="text-red-500 text-sm mt-2 animate-slide-up">
                  {errorMsg}
                </p>
              )}
            </div>



            <button
              onClick={handleAddToCart}
              className="w-full bg-stone-900 text-white py-4 px-8 text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors shadow-lg active:transform active:scale-[0.99]"
            >
              Add to Cart
            </button>

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
                    <p>
                      <span className="font-medium text-stone-900">
                        Fabric:
                      </span>{" "}
                      {product.fabricDetails?.join(", ")}
                    </p>
                    <p>
                      <span className="font-medium text-stone-900">Fit:</span>{" "}
                      {product.fit}
                    </p>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <div className="flex items-start gap-3 animate-fade-in">
                    <Truck size={18} className="text-stone-400 mt-1 shrink-0" />
                    <div className="space-y-2">
                      <p>
                        <strong>Made to Order:</strong> 2–5 business days
                      </p>
                      <p>
                        <strong>Pakistan Shipping:</strong> 4–7 business days
                      </p>
                      <p>
                        <strong>Standard Shipping:</strong> 5–10 business days
                      </p>

                      <hr className="my-2 border-stone-200" />

                      <p>
                        <strong>Return Policy:</strong> Returns accepted within
                        7 days of delivery. Product must be unused, with tags
                        intact.
                      </p>

                      <p>
                        <strong>Pay Online:</strong> We accept online payments
                        via Credit/Debit cards & JazzCash/Bank transfer.
                      </p>

                      <p className="text-sm text-stone-500">
                        *Delivery times may vary depending on location & product
                        availability.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === "care" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h4 className="text-sm font-medium text-stone-900 mb-2">
                        👕 Clothing Care (T-shirt / Hoodie / Sweatshirt)
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-stone-600">
                        <li>Machine wash cold, inside out</li>
                        <li>Use mild detergent (no bleach)</li>
                        <li>Tumble dry low or hang dry</li>
                        <li>Do not iron directly on print</li>
                        <li>Avoid dry cleaning for printed items</li>
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
                      <p className="font-semibold text-stone-900">{rev.name}</p>
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
                  <span className="text-xs text-stone-500">Verified buyer</span>
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
                <div className="aspect-3/4 bg-stone-100 overflow-hidden mb-3">
                  {rp.baseImage && (
                    <Image
                      src={urlFor(rp.baseImage).width(600).url()}
                      alt={rp.name}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-stone-900 line-clamp-1">
                    {rp.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-light text-stone-400 line-through">
                      PKR {rp.originalPrice}
                    </span>
                    <span className="text-xs font-medium text-stone-900">
                      PKR {rp.discountPrice}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white p-8 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-vogue mb-6">
              {product.sizeGuide?.title || "Size Guide"}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-900">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Length (in)</th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  {product.sizeGuide?.sizes?.map((sizeRow) => (
                    <tr key={sizeRow.size} className="border-b">
                      <td className="p-3">{sizeRow.size}</td>
                      <td className="p-3">{sizeRow.chest}</td>
                      <td className="p-3">{sizeRow.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
