import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Inquiry Hub | FAQ & Shipping | Junhae Studio",
  description:
    "Find answers about Junhae Studio's made-to-order process, carbon-neutral shipping, and sustainable streetwear care.",
};

const FAQ = () => {
  const faqData = [
    {
      q: "What makes the Junhae Studio production process unique?",
      a: "Junhae Studio operates on a **100% made-to-order philosophy**. Unlike fast-fashion brands that contribute to 92 million tons of textile waste annually, we manufacture each piece only after an order is placed. This bespoke approach ensures zero overstock waste.",
    },
    {
      q: "How long does delivery take for made-to-order apparel?",
      a: "Total delivery typically takes **7–14 business days**. This includes a 2–4 day production window where your garment is handcrafted, followed by 5–10 days for carbon-neutral domestic shipping.",
    },
    {
      q: "Does Junhae Studio offer international shipping?",
      a: "Yes, we provide **global streetwear delivery** to over 50 countries. Shipping rates are calculated in real-time at checkout. All international shipments include end-to-end tracking for a secure delivery experience.",
    },
    {
      q: "How do I track my Junhae Studio order?",
      a: "Once your bespoke piece is crafted and shipped, you will receive a **confirmation email with a tracking link**. You can monitor your order's journey from our studio to your doorstep in real-time.",
    },
    {
      q: "What is your return policy for made-to-order items?",
      a: "As part of our **circular fashion commitment**, we only produce what is requested. We offer replacements for manufacturing defects within 30 days. We do not accept returns for change of mind to maintain our low-waste standard.",
    },
    {
      q: "Are Junhae Studio materials sustainable?",
      a: "Yes, we prioritize longevity. Our garments are designed as **capsule wardrobe staples** using high-quality fabrics that reduce the need for frequent replacements, directly combatting the environmental impact of disposable fashion.",
    },
    {
      q: "How should I care for my printed garments?",
      a: "To maximize the lifecycle of your clothing, we recommend **eco-friendly care**: wash inside-out in cold water and hang dry. This method preserves print integrity and reduces your household energy consumption.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      {/* AEO: Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto animate-fade-in">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-stone-900 mb-4 font-vogue">
            Junhae Studio{" "}
            <span className="italic text-stone-400 text-3xl block md:inline md:ml-2">
              Inquiry Hub
            </span>
          </h1>
          <p className="text-sm text-stone-500 max-w-lg mx-auto leading-relaxed">
            Everything you need to know about our made-to-order philosophy and
            sustainable shipping practices.
          </p>
        </header>

        <div className="grid gap-12">
          {faqData.map((item, i) => (
            <div
              key={i}
              className="group border-l-2 border-stone-100 pl-8 hover:border-stone-900 transition-colors duration-500"
            >
              {/* SEO: Using H2/H3 tags for better hierarchy */}
              <h2 className="text-xl font-medium text-stone-800 mb-4 leading-snug group-hover:text-black">
                {item.q}
              </h2>
              <p className="text-stone-500 font-light leading-relaxed max-w-2xl">
                {item.a}
              </p>
            </div>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t border-stone-100 text-center">
          <p className="text-stone-400 text-sm">
            Still have questions? Reach out to the studio at{" "}
            <Link
              href="mailto:junhaestudio@gmail.com"
              className="text-stone-900 font-medium underline underline-offset-4"
            >
              junhaestudio@gmail.com
            </Link>
          </p>
        </footer>
      </section>
    </>
  );
};

export default FAQ;
