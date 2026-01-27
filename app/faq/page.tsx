import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ & Shipping | Junhae Studio",
  description:
    "Common questions about Junhae Studio's made-to-order process, sustainable shipping, and streetwear sizing guide.",
};

const FAQ = () => {
  const faqData = [
    {
      q: "What makes the Junhae Studio production process unique?",
      // Keyword: slow fashion
      a: "Junhae Studio is rooted in the slow fashion movement. Unlike mass-produced brands, we manufacture each piece only after your order is placed. This bespoke approach eliminates overstock waste and ensures your garment is crafted specifically for you.",
    },
    {
      q: "How long does delivery take for made-to-order apparel?",
      // Keyword: carbon-neutral logistics
      a: "Quality takes time. Production typically spans 2–4 business days. To minimize our footprint, we utilize carbon-neutral logistics where available. Domestic shipping usually arrives in 5–10 business days, while international transit varies by region.",
    },
    {
      q: "Does Junhae Studio offer international shipping?",
      // Keyword: global streetwear delivery
      a: "Yes, we provide global streetwear delivery to most countries. Shipping rates are calculated in real-time at checkout based on your location. All international orders include end-to-end tracking for your peace of mind.",
    },
    {
      q: "How do I find my perfect fit?",
      // Keyword: capsule wardrobe staples
      a: "Our designs are intended to be timeless capsule wardrobe staples. Most items feature a modern unisex fit. We highly recommend consulting the specific 'Sizing Guide' on each product page, as made-to-order items are final sale.",
    },
    {
      q: "What is the return policy for defective items?",
      // Keyword: circular fashion commitment
      a: "As part of our circular fashion commitment, we only produce what is needed. While we don't accept 'change of mind' returns, if a Junhae Studio piece arrives with a manufacturing defect, contact us within 30 days for a dedicated replacement.",
    },
    {
      q: "How should I care for my printed garments?",
      // Keyword: eco-friendly garment care
      a: "To extend the lifecycle of your clothing, we suggest eco-friendly garment care: wash inside-out in cold water and hang dry. This preserves the print integrity and reduces energy consumption.",
    },
  ];

  return (
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
            <h3 className="text-xl font-medium text-stone-800 mb-4 leading-snug group-hover:text-black">
              {item.q}
            </h3>
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
  );
};

export default FAQ;
