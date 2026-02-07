import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title:
    "Shipping & Returns | Worldwide Shipping | Junhae Studio Ethically Crafted",

  description:
    "Junhae Studio shipping policy for modern creatives. Details on our ethically crafted delivery timelines, worldwide shipping rates, and sustainable return process.",

  robots: {
    index: true,
    follow: true,
  },
};

const ShippingReturn = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Junhae Studio Shipping and Return Policy",
    mainEntity: {
      "@type": "ShippingRateSettings",
      description:
        "Global shipping for minimalist streetwear. Production takes 2-4 days, delivery takes 5-12 days.",
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: "Global",
      },
    },
  };
  return (
    <>
      <Script
        id="shipping-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-30 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        {/* Main H1 - Only one per page */}
        <h1 className="text-4xl md:text-5xl font-vogue text-stone-900 mb-8 tracking-tight">
          Shipping & Returns
        </h1>
        <section className="mb-12 bg-stone-50 p-8 rounded-3xl border border-stone-100 grid md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
              Shipment Origin
            </h3>
            <p className="text-sm text-stone-800 font-medium">
              Global Fulfillment via Carbon-Neutral Partners
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
              Order Cancellation
            </h3>
            <p className="text-sm text-stone-800 font-medium">
              Immediate Production (No cancellations once confirmed)
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
              Return Eligibility
            </h3>
            <p className="text-sm text-stone-800 font-medium">
              Defects only within 7 days of delivery
            </p>
          </div>
        </section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Shipping Section */}
          <section className="bg-white p-8 border border-stone-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-vogue text-stone-900 mb-4 flex items-center gap-2">
              <span>🚚</span> Shipping Policy
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              At{" "}
              <span className="font-vogue text-stone-800">Junhae Studio</span>,
              we prioritize
              <strong className="font-medium text-stone-700">
                {" "}
                ethical production
              </strong>
              . By using a print-on-demand model, we reduce textile waste. Every
              piece is crafted specifically for you and shipped globally from
              our trusted partners.
            </p>
            <ul className="text-sm text-stone-500 space-y-4 border-t border-stone-50 pt-4">
              <li className="flex justify-between">
                <span className="font-medium">Production Time:</span>
                <span>2–4 Business Days</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Global Delivery:</span>
                <span>5–12 Business Days</span>
              </li>
              <li className="italic text-[12px]">
                * Shipping confirmation with tracking will be emailed upon
                dispatch.
              </li>
            </ul>
          </section>

          {/* Returns Section */}
          <section className="bg-white p-8 border border-stone-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-vogue text-stone-900 mb-4 flex items-center gap-2">
              <span>🔄</span> Returns & Exchanges
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed mb-6">
              Since our{" "}
              <strong className="font-medium text-stone-700">
                minimalist apparel
              </strong>{" "}
              is made-to-order, we maintain a strict return policy to ensure
              sustainability.
            </p>
            <ul className="text-sm text-stone-500 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>
                  Eligible for damaged, misprinted, or incorrect items.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Must be reported within 7 days of delivery.</span>
              </li>
              <li className="flex items-start gap-2 text-stone-400">
                <span className="text-red-400 font-bold">✕</span>
                <span>No returns for sizing issues or change of mind.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Support Section */}
        <section className="mt-16 text-center py-12 border-t border-stone-100">
          <h2 className="text-2xl font-vogue text-stone-900 mb-4">
            Need Assistance?
          </h2>
          <p className="text-stone-500 font-light mb-6">
            Our support team is here to help with your orders from Pakistan to
            the World.
          </p>
          <Link
            href="mailto:junhaestudio@gmail.com"
            className="inline-block px-8 py-3 bg-stone-900 text-white text-sm tracking-widest hover:bg-stone-800 transition-colors rounded-full uppercase"
          >
            Contact Support
          </Link>
        </section>
      </main>
    </>
  );
};

export default ShippingReturn;
