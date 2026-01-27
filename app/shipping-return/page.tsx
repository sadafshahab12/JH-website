import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns | Junhae Studio | Global Minimalist Apparel",
  description:
    "Junhae Studio Shipping & Returns policy. Learn about our ethical print-on-demand delivery timelines, shipping fees, and return process for minimalist streetwear.",
};

const ShippingReturn = () => {
  return (
    <main className="pt-30 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
      {/* Main H1 - Only one per page */}
      <h1 className="text-4xl md:text-5xl font-vogue text-stone-900 mb-8 tracking-tight">
        Shipping & Returns
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Shipping Section */}
        <section className="bg-white p-8 border border-stone-100 rounded-2xl shadow-sm">
          <h2 className="text-xl font-vogue text-stone-900 mb-4 flex items-center gap-2">
            <span>🚚</span> Shipping Policy
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed mb-6">
            At <span className="font-vogue text-stone-800">Junhae Studio</span>,
            we prioritize
            <strong className="font-medium text-stone-700">
              {" "}
              ethical production
            </strong>
            . By using a print-on-demand model, we reduce textile waste. Every
            piece is crafted specifically for you and shipped globally from our
            trusted partners.
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
              <span>Eligible for damaged, misprinted, or incorrect items.</span>
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
          Our support team is here to help with your orders from Pakistan to the
          World.
        </p>
        <Link
          href="mailto:junhaestudio@gmail.com"
          className="inline-block px-8 py-3 bg-stone-900 text-white text-sm tracking-widest hover:bg-stone-800 transition-colors rounded-full uppercase"
        >
          Contact Support
        </Link>
      </section>
    </main>
  );
};

export default ShippingReturn;
