"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Product,
  urlFor,
  ReviewWithProduct,
  BrandHighlights,
  client,
  FeaturedCard,
} from "./exports/homeExports";
import { homeProductQuery } from "./lib/homeProductQuery";
import { reviewDataQuery } from "./lib/reviewDataQuery";

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

      const data: Product[] = await client.fetch(homeProductQuery);
      const reviewsData: ReviewWithProduct[] =
        await client.fetch(reviewDataQuery);
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
            priority
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-stone-900/10" />
        </div>

        {/* Centered Text */}
        <div className="absolute inset-0 flex items-center justify-center p-8 md:p-20 w-full text-center">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-4 border border-stone-1000 rounded-full text-[10px] md:text-xs font-semibold tracking-[0.2em] mb-6 backdrop-blur-sm text-stone-900 uppercase whitespace-normal max-w-xs md:max-w-md text-center">
              Ethically Crafted • Defined by Silence • 2025
            </span>

            <h1 className="text-[2rem] sm:text-7xl font-extrabold text-crimson sm:text-stone-950 leading-[1.1] mb-8 tracking-tight">
              Minimalist Apparel for <br />
              <span className="text-stone-1000 font-vogue italic font-medium">
                Modern Creatives.
              </span>
            </h1>

            <p className="max-w-xl mx-auto mb-10 text-stone-700 text-sm md:text-base leading-relaxed font-light">
              {`    Discover **Junhae Studio’s** signature collection of premium
              **minimalist apparel**. Redefining **global streetwear** through
              ethically crafted designs and **sustainable print-on-demand**
              fashion.`}
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
          <h2 className="text-3xl sm:text-5xl font-vogue  text-stone-900  mb-6">
            Ethically Crafted Minimalist Clothing
          </h2>
          <p className="text-stone-600 leading-relaxed font-light text-lg">
            <span className="font-vogue">Junhae Studio</span> exists at the
            intersection of minimalism and art. We believe in clothing that
            speaks softly but carries weight. Each piece is printed to order,
            reducing waste and ensuring that what we create is truly wanted.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-vogue ">
            Curated Minimalist Essentials
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
                        width={1000}
                        height={1000}
                        loading="lazy"
                        className="..."
                      />
                    )}

                    {product.badges?.map((badge) => (
                      <span
                        key={badge._id}
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] tracking-widest uppercase font-medium"
                      >
                        {badge.value}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-lg font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {/* PKR Section */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {product.pricing.pkPrice.discount && (
                          <span className="text-stone-400 line-through text-sm">
                            PKR{" "}
                            {product.pricing.pkPrice.original.toLocaleString()}
                          </span>
                        )}
                        <span className="text-base font-bold text-stone-950">
                          PKR{" "}
                          {(
                            product.pricing.pkPrice.discount ??
                            product.pricing.pkPrice.original
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* USD Section */}
                    <div className="flex items-center gap-2">
                      {product.pricing.intlPrice.discount && (
                        <span className="text-stone-400 line-through text-[11px]">
                          USD {product.pricing.intlPrice.original}
                        </span>
                      )}
                      <span className="text-sm font-medium text-stone-700">
                        USD{" "}
                        {product.pricing.intlPrice.discount ??
                          product.pricing.intlPrice.original}
                      </span>
                    </div>
                  </div>
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
          <FeaturedCard />
        </div>
      </section>

      {/* Process / Trust */}
      <BrandHighlights />

      {/* TESTIMONIALS - BEAUTIFUL UI + LOADING */}
      {/* TESTIMONIALS - SEO & TRUST OPTIMIZED */}
      <section className="py-24 bg-[#FAFAFA]" aria-labelledby="reviews-title">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
              Real Experiences
            </span>
            <h2
              id="reviews-title"
              className="text-4xl md:text-5xl font-vogue tracking-tight text-stone-900"
            >
              Community <span className="italic text-stone-500">Feedback</span>
            </h2>

            {/* Average Rating Summary Badge */}
            <div className="mt-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs font-medium text-stone-600">
                4.9/5 Based on Recent Drops
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-72 bg-stone-100 rounded-3xl animate-pulse"
                  />
                ))
              : reviews.map((review) => (
                  <figure
                    key={review._id}
                    className="group relative bg-white border border-stone-100 p-8 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between"
                  >
                    {/* Top Section: Rating & Quote Icon */}
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? "text-amber-400" : "text-stone-200"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <svg
                          width="24"
                          height="18"
                          viewBox="0 0 40 30"
                          className="text-stone-100 group-hover:text-stone-200 transition-colors"
                        >
                          <path
                            fill="currentColor"
                            d="M10.5 0L14 3.5C10.5 7 8 11.5 8 16H15V30H0V16C0 6.5 4.5 0 10.5 0ZM35.5 0L39 3.5C35.5 7 33 11.5 33 16H40V30H25V16C25 6.5 29.5 0 35.5 0Z"
                          />
                        </svg>
                      </div>

                      <blockquote>
                        <p className="text-stone-700 leading-relaxed text-[1rem] font-light italic mb-8">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </blockquote>
                    </div>

                    {/* Bottom Section: User Info */}
                    <figcaption className="flex items-center gap-4 border-t border-stone-50 pt-6 mt-auto">
                      <div className="h-12 w-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 font-medium border border-stone-200 text-xs shadow-inner">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-stone-900 tracking-wide uppercase flex items-center gap-1.5">
                          {review.name}
                          <span className="inline-block bg-blue-50 text-[8px] text-blue-500 px-1.5 py-0.5 rounded-full border border-blue-100 font-bold">
                            VERIFIED
                          </span>
                        </h3>
                        <Link
                          href={`/junhae-edits/${review.product.slug.current}`}
                          className="text-xs text-stone-400 mt-0.5 hover:text-crimson transition-colors underline underline-offset-2 decoration-stone-200"
                        >
                          Purchased: {review.product.name}
                        </Link>
                      </div>
                    </figcaption>
                  </figure>
                ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-crimson text-stone-200 text-center">
        <div className="max-w-4xl mx-auto">
          {/* SEO Header: Target specific niche keywords */}
          <h2 className="text-4xl md:text-5xl font-vogue mb-6 text-white leading-tight">
            Elevate Your Style with <br />
            <span className="italic">Premium Minimalist Streetwear</span>
          </h2>

          {/* Added context for search engines to crawl */}
          <p className="text-stone-100/80 mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Experience the perfect blend of sustainable quality and modern
            aesthetics. Join the{" "}
            <span className="font-vogue">Junhae Studio</span> collective today.
          </p>

          <Link
            href="/junhae-edits"
            aria-label="Shop the latest Junhae Studio minimalist collection"
            className="group inline-block bg-white text-stone-900 px-10 py-4 text-xs md:text-sm font-bold tracking-[0.2em] hover:bg-stone-100 hover:shadow-2xl transition-all duration-300 rounded-sm"
          >
            <span className="flex items-center gap-2">
              SHOP THE EXCLUSIVE DROP
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </span>
          </Link>

          {/* Micro-copy for trust */}
          <p className="mt-6 text-[10px] uppercase tracking-[0.15em] text-stone-300/60 font-medium">
            Ethically Crafted • Limited Production • Global Delivery
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
