import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import Script from "next/script";
import {
  ArrowRight,
  BrandHighlights,
  FeaturedCard,
  FeaturedProducts,
  ProductSkeleton,
  ReviewSkeleton,
  ReviewsSection,
} from "./exports/homeExports";

export const metadata: Metadata = {
  title: "Junhae Studio | Premium Minimalist Apparel & Ethical Streetwear",
  description:
    "Shop Junhae Studio’s signature minimalist apparel. Ethically crafted, sustainable streetwear designed for the global stage. Redefine your style today.",
  keywords: [
    "Minimalist Fashion",
    "Ethical Streetwear",
    "Sustainable Clothing",
    "Premium Apparel Pakistan",
  ],
  openGraph: {
    title: "Junhae Studio | Premium Minimalist Apparel",
    description: "Ethically crafted minimalist movement for modern creatives.",
    url: "https://junhaestudio.com",
    siteName: "Junhae Studio",
    images: [
      {
        url: "https://junhaestudio.com/home-page-image/home-page-banner.png",
        width: 1200,
        height: 630,
        alt: "Junhae Studio Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
const Home = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "Junhae Studio",
    alternateName: "Junhae",
    description:
      "Premium minimalist apparel, ethical streetwear, and curated stationery for modern creatives.",
    url: "https://junhaestudio.com",
    logo: "https://junhaestudio.com/logo.png",
    image: "https://junhaestudio.com/home-page-image/home-page-banner.png",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "24.8607",
      longitude: "67.0011",
    },
    // Main Categories Listing
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Junhae Studio Collections",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Apparel",
          itemListElement: [
            { "@type": "ListItem", position: 1, item: { "@name": "T-Shirts" } },
            { "@type": "ListItem", position: 2, item: { "@name": "Hoodies" } },
            {
              "@type": "ListItem",
              position: 3,
              item: { "@name": "Sweatshirts" },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Stationery",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: { "@name": "Notebooks" },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: { "@name": "Spiral Notebooks" },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: { "@name": "Bookmarks" },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Lifestyle & Merch",
          itemListElement: [
            { "@type": "ListItem", position: 1, item: { "@name": "Mugs" } },
            {
              "@type": "ListItem",
              position: 2,
              item: { "@name": "K-Pop Merch" },
            },
          ],
        },
      ],
    },
    knowsAbout: [
      "Ethical Fashion",
      "Sustainable Print-on-demand",
      "Minimalist Lifestyle",
      "Modern Creative Apparel",
    ],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://junhaestudio.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://www.instagram.com/junhaestudio",
      "https://www.facebook.com/junhaestudioco",
    ],
  };
  return (
    <>
      <Script
        id="schema-org-store"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="animate-fade-in">
        {/* Hero Section */}
        <section className="relative h-screen w-full bg-stone-200 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/home-page-image/home-page-banner.png"
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
                iscover{" "}
                <strong className="text-stone-900 font-medium font-vogue">
                  {` Junhae Studio’s`}
                </strong>{" "}
                signature collection of premium{" "}
                <strong className="text-stone-900 font-medium ">
                  minimalist apparel
                </strong>
                . Redefining{" "}
                <strong className="text-stone-900 font-medium ">
                  global streetwear
                </strong>{" "}
                through ethically crafted designs and{" "}
                <strong className="text-stone-900 font-medium ">
                  sustainable print-on-demand
                </strong>{" "}
                fashion.
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
        <section className="relative py-20 sm:py-32 px-6 bg-[#F9F8F6] border-y border-stone-200 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-24 order-1">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                <span className="h-px w-8 sm:w-12 bg-stone-300" />
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.5em] text-stone-400 uppercase">
                  The Manifesto — 2025
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-7xl font-vogue text-stone-900 leading-[1.1] lg:leading-[0.95] tracking-tight mb-6 sm:mb-8">
                Crafting <br className="hidden sm:block" />
                <span className="italic text-stone-400 sm:ml-12"> Pure </span>
                <br />
                Intentions.
              </h2>
              <div className="grid grid-cols-2 gap-6 py-8 border-t border-stone-200">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">
                    Impact
                  </p>
                  <p className="text-xs text-stone-500 font-light italic leading-tight">
                    Zero Inventory Waste
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">
                    Ethos
                  </p>
                  <p className="text-xs text-stone-500 font-light italic leading-tight">
                    Ethically Sourced
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Deep Storytelling */}
            <div className="lg:col-span-7 lg:pl-12 order-2">
              <div className="space-y-6 sm:space-y-8">
                {/* Adjusted text size for mobile readability */}
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-stone-800 leading-snug sm:leading-tight">
                  In a world of noise, we choose{" "}
                  <span className="font-medium text-stone-950 underline underline-offset-4 sm:underline-offset-8 decoration-stone-200">
                    silence.
                  </span>
                  <br className="hidden sm:block" /> Every thread is a choice,
                  every silhouette a statement.
                </p>

                <div className="prose prose-stone prose-sm sm:prose-base">
                  <p className="text-stone-500 leading-relaxed font-light text-base sm:text-lg md:text-xl italic">
                    &quot;
                    <span className="font-vogue text-stone-900 not-italic">
                      Junhae Studio
                    </span>{" "}
                    is not just a brand; it is a premium minimalist
                    movement.&quot;
                  </p>

                  <div className="h-px w-full bg-linear-to-r from-stone-200 to-transparent my-6 sm:my-8" />

                  <p className="text-stone-600 leading-relaxed font-light text-sm sm:text-base md:text-lg">
                    Our approach to{" "}
                    <strong className="text-stone-900 font-medium ">
                      sustainable fashion
                    </strong>{" "}
                    is rooted in the
                    <strong className="text-stone-900 font-medium ">
                      print-on-demand model
                    </strong>
                    . This ensures we eliminate overproduction and fabric waste.
                    For the{" "}
                    <strong className="text-stone-900 font-medium ">
                      modern creative
                    </strong>
                    , <span className="font-vogue text-stone-900">Junhae</span>{" "}
                    represents a bridge between high-aesthetic streetwear and
                    conscious living.
                  </p>
                </div>

                {/* CTA - Fixed centered on mobile, left-aligned on desktop */}
                <div className="pt-4 sm:pt-6">
                  <Link
                    href="/our-story"
                    className="group inline-flex items-center gap-3 text-[11px] sm:text-sm font-bold tracking-widest uppercase text-stone-950"
                  >
                    Explore our transparency
                    <span className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center group-hover:bg-stone-950 group-hover:text-white transition-all duration-500">
                      →
                    </span>
                  </Link>
                </div>
              </div>
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
        <Suspense fallback={<ProductSkeleton />}>
          <FeaturedProducts />
        </Suspense>
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-vogue text-stone-900 tracking-tight">
                Why Junhae Studio?
              </h2>
              <p className="text-stone-600 mt-4 max-w-2xl mx-auto font-light">
                Minimalist fashion built for creatives. Ethically crafted,
                sustainably printed, and designed to elevate your daily
                wardrobe.
              </p>
            </div>

            <FeaturedCard />
          </div>
        </section>

        <BrandHighlights />
        <Suspense fallback={<ReviewSkeleton />}>
          <ReviewsSection />
        </Suspense>

        <section className="py-32 px-6 bg-crimson text-stone-200 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-vogue mb-6 text-white leading-tight">
              Elevate Your Style with <br />
              <span className="italic">Premium Minimalist Streetwear</span>
            </h2>

            {/* Added context for search engines to crawl */}
            <p className="text-stone-100/80 mb-10 max-w-lg mx-auto font-light leading-relaxed">
              Experience the perfect blend of sustainable quality and modern
              aesthetics. Join the{" "}
              <span className="font-vogue">Junhae Studio</span> collective
              today.
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
    </>
  );
};

export default Home;
