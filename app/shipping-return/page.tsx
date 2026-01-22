import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns | Junhae Studio",
  description:
    "Junhae Studio Shipping & Returns policy. Learn about delivery timelines, shipping fees, and our return process for print-on-demand apparel.",
};

const ShippingReturn = () => {
  return (
    <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif mb-6">Shipping & Returns</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Shipping Policy</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          At Junhae Studio, we use a print-on-demand model to ensure ethical
          production and reduce waste. Once your order is placed, it is produced
          and shipped directly from our trusted production partners.
        </p>
        <ul className="mt-4 text-sm text-stone-500 space-y-2">
          <li>🕒 Production time: 2–4 business days</li>
          <li>🚚 Delivery time: 5–10 business days (varies by location)</li>
          <li>📦 Shipping confirmation email will be sent after dispatch</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Returns & Exchanges</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Due to the made-to-order nature of our products, we only accept
          returns for damaged or incorrect items. Please contact us within 7
          days of receiving your order.
        </p>
        <ul className="mt-4 text-sm text-stone-500 space-y-2">
          <li>✔️ Damage or misprint issues are eligible for return</li>
          <li>✔️ Please provide order ID and photos of the issue</li>
          <li>❌ No returns for change of mind or sizing issues</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Contact our support team at{" "}
          <Link href="mailto:hello@junhaestudio.com" className="underline">
            junhaestudio@gmail.com
          </Link>{" "}
          with your order number.
        </p>
      </section>
    </main>
  );
};

export default ShippingReturn;
