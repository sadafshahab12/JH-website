"use client";

import { ArrowRight, Box, PenTool, Truck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import { client } from "@/sanity/lib/client";
import { Product } from "./types/productType";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { ReviewWithProduct } from "./types/reviewType";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewWithProduct[]>([]);
  const [elapsed, setElapsed] = useState<number>(0);
  console.log(elapsed);
  const MIN_LOADING_TIME = 600;

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      const start = Date.now();

      const data: Product[] = await client.fetch(groq`
        *[_type == "product"] | order(_createdAt desc) {
          _id,
          _createdAt,
          name,
          slug,
          baseImage,
          originalPrice,
          discountPrice,
          badges[]->{
            _key,
            title,
            value
          }
        }
      `);

      const reviewsData: ReviewWithProduct[] = await client.fetch(groq`
        *[_type == "review"] | order(_createdAt desc)[0..2]{
          _id,
          _createdAt,
          name,
          rating,
          comment,
          createdAt,
          product->{
            _id,
            name,
            slug
          }
        }
      `);

      const elapsedTime = Date.now() - start;
      const remaining = MIN_LOADING_TIME - elapsedTime;

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      setElapsed(Date.now() - start);
      setProducts(data);
      setReviews(reviewsData);
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  // Filter for best seller or featured badge
  const featuredProducts = products
    .filter((p) =>
      p.badges?.some(
        (badge) => badge.value === "Best Seller" || badge.value === "Featured",
      ),
    )
    .slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen w-full bg-stone-200 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/home page image/home page banner.png"
            alt="Junhae Studio Collection"
            width={1000}
            height={1000}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-20 w-full text-center">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-4 border border-stone-800 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] mb-6 backdrop-blur-sm text-stone-900 uppercase whitespace-normal max-w-xs md:max-w-md text-center">
              Ethically Crafted • Defined by Silence • 2025
            </span>

            <h1 className="text-4xl  sm:text-7xl font-extrabold text-crimson sm:text-stone-950 leading-[1.1] mb-8 tracking-tight">
              Silence is the <br />
              <span className="text-stone-800 font-vogue italic font-medium">
                Ultimate Sophistication.
              </span>
            </h1>

            <p className="max-w-xl mx-auto mb-10 text-stone-700 text-sm md:text-base leading-relaxed font-light">
              Discover **Junhae Studio’s** signature capsule of premium,
              minimalist essentials. Redefining global streetwear through the
              lens of quiet luxury and sustainable design.
            </p>

            <Link
              href="/junhae-edits"
              aria-label="Shop the Junhae Studio Minimalist Collection"
              className="group inline-flex items-center space-x-3 text-lg font-medium tracking-wide text-stone-900 hover:text-stone-600 transition-all duration-300"
            >
              <span className="border-b border-stone-900 group-hover:border-stone-400 pb-1">
                Shop the Collection
              </span>
              <ArrowRight
                className="group-hover:translate-x-2 transition-transform duration-300"
                size={20}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Snippet */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-vogue  text-stone-900 tracking-wider mb-6">
            Designed with Intention
          </h2>
          <p className="text-stone-600 leading-relaxed font-light text-lg">
            Junhae Studio exists at the intersection of minimalism and art. We
            believe in clothing that speaks softly but carries weight. Each
            piece is printed to order, reducing waste and ensuring that what we
            create is truly wanted.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-vogue tracking-wider">
            Curated Essentials
          </h2>
          <Link
            href="/junhae-edits"
            className="text-sm border-b border-stone-300 hover:border-stone-900 pb-1 transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="group block animate-pulse">
                  <div className="relative aspect-4/5 overflow-hidden bg-stone-100 mb-4">
                    <div className="absolute inset-0 bg-stone-200/60" />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-60 animate-shimmer" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] tracking-widest uppercase font-medium">
                      Loading...
                    </div>
                  </div>

                  <div className="h-5 bg-stone-200 rounded-md mb-2 w-3/4" />
                  <div className="h-4 bg-stone-200 rounded-md w-1/2" />
                </div>
              ))
            : featuredProducts.map((product) => (
                <Link
                  key={product._id}
                  href={`/junhae-edits/${product.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-4/5 overflow-hidden bg-stone-100 mb-4">
                    {product.baseImage && (
                      <Image
                        src={urlFor(product.baseImage).url()}
                        alt={product.name}
                        width={800}
                        height={800}
                        className="..."
                      />
                    )}

                    {product.badges?.map((badge) => (
                      <span
                        key={badge._key}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] tracking-widest uppercase font-medium"
                      >
                        {badge.value}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-500 mt-1">
                    PKR {product.discountPrice}
                  </p>
                </Link>
              ))}
        </div>
      </section>
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-vogue text-stone-900 tracking-tight">
              Why Junhae Studio?
            </h2>
            <p className="text-stone-600 mt-4 max-w-2xl mx-auto font-light">
              Minimalist fashion built for creatives. Ethically crafted,
              sustainably printed, and designed to elevate your daily wardrobe.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Story */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6">
              <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/outstory image/our story.png"
                  alt="Junhae Studio Brand Story"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-vogue text-stone-900 mb-3">
                Our Story
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Junhae Studio was created for the modern minimalist — a brand
                that values quiet luxury, timeless design, and sustainable
                fashion.
              </p>
            </div>

            {/* Processing Method */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6">
              <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/outstory image/how its made.png"
                  alt="Junhae Studio Process"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-vogue text-stone-900 mb-3">
                How It’s Made
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                We print each item on demand to reduce waste. Every order is
                checked for quality, packed carefully, and shipped globally.
              </p>
              <ul className="mt-4 space-y-2 text-stone-500 text-sm font-light">
                <li>✓ Designed in-house</li>
                <li>✓ Made-to-order printing</li>
                <li>✓ Premium materials & quality checks</li>
                <li>✓ Worldwide shipping</li>
              </ul>
            </div>

            {/* Trust / Benefits */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6">
              <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
                <Image
                  src="/outstory image/why choose us.png"
                  alt="Junhae Studio Quality"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-vogue text-stone-900 mb-3">
                Why Choose Us
              </h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Minimal designs, premium quality, and sustainable practices —
                built for people who want style without compromise.
              </p>
              <div className="mt-4 space-y-2 text-stone-500 text-sm font-light">
                <div className="flex items-start gap-3">
                  <span className="text-crimson font-bold">•</span>
                  <span>Ethically crafted, limited production</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-crimson font-bold">•</span>
                  <span>High-quality print & material</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-crimson font-bold">•</span>
                  <span>Minimalist aesthetic, modern fit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process / Trust */}
      <section className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-sm ">
                <PenTool strokeWidth={1} size={30} />
              </div>
              <h3 className="text-xl font-vogue mb-3 tracking-wider">
                Artistic Minimalism
              </h3>
              <p className="text-sm font-light text-stone-500 max-w-xs">
                Junhae Studio creates minimalist, aesthetic designs with
                hand-crafted typography and modern graphics — perfect for
                streetwear, casual wear, and art-inspired fashion.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-sm ">
                <Box strokeWidth={1} size={30} />
              </div>
              <h3 className="text-xl font-vogue mb-3 tracking-wider">
                Print-on-Demand Quality
              </h3>
              <p className="text-sm font-light text-stone-500 max-w-xs">
                Our made-to-order model reduces waste and overproduction,
                delivering high-quality POD apparel that’s ethically crafted and
                sustainably printed.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-sm ">
                <Truck size={30} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-vogue mb-3 tracking-wider">
                Worldwide Shipping
              </h3>
              <p className="text-sm font-light text-stone-500 max-w-xs">
                Fast and reliable global shipping from trusted production
                partners — ensuring your Junhae Studio order arrives safely, on
                time, and in perfect condition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - BEAUTIFUL UI + LOADING */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-vogue tracking-tight text-stone-900">
              What People Are Saying
            </h2>
            <div className="h-1 w-12 bg-stone-900 mt-6 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-64 bg-stone-100 rounded-3xl animate-pulse"
                  />
                ))
              : reviews.map((review) => (
                  <div
                    key={review._id}
                    className="group relative bg-white border border-stone-100 p-8 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out"
                  >
                    {/* Decorative Quote Mark */}
                    <div className="absolute top-6 right-8 text-stone-100 group-hover:text-stone-200 transition-colors">
                      <svg
                        width="40"
                        height="30"
                        viewBox="0 0 40 30"
                        fill="currentColor"
                      >
                        <path d="M10.5 0L14 3.5C10.5 7 8 11.5 8 16H15V30H0V16C0 6.5 4.5 0 10.5 0ZM35.5 0L39 3.5C35.5 7 33 11.5 33 16H40V30H25V16C25 6.5 29.5 0 35.5 0Z" />
                      </svg>
                    </div>

                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* Modern Star Rating */}
                        <div className="flex gap-0.5 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-amber-400"
                                  : "text-stone-200"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <p className="text-stone-700 leading-relaxed text-[1.05rem] font-light italic mb-8">
                          {` "${review.comment}"`}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 border-t border-stone-50 pt-6">
                        <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-medium border border-stone-200 uppercase">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-stone-900 tracking-wide uppercase">
                            {review.name}
                          </h3>
                          <p className="text-xs text-stone-400 mt-0.5">
                            Verified Buyer — {review.product.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-crimson text-stone-200 text-center">
        <h2 className="text-4xl md:text-5xl font-vogue mb-8 text-white">
          Elevate your daily uniform.
        </h2>
        <Link
          href="/junhae-edits"
          className="inline-block bg-white text-stone-900 px-8 py-4 text-sm font-medium tracking-widest hover:bg-stone-200 transition-colors"
        >
          SHOP THE DROP
        </Link>
      </section>
    </div>
  );
};

export default Home;
