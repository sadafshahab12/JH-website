import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { faqData } from "../data/faq";

export const metadata: Metadata = {
  title: "Inquiry Hub | FAQ & Shipping | Junhae Studio",
  description:
    "Find answers about Junhae Studio's made-to-order process, carbon-neutral shipping, and sustainable streetwear care.",
};

const FAQ = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          item.q === "What makes the Junhae Studio production process unique?"
            ? "Junhae Studio operates on a 100% made-to-order philosophy..." // Clean text for AI
            : "Detailed policy information on junhaestudio.com",
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
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
            Everything you need to know about our{" "}
            <strong className="text-stone-800">made-to-order philosophy</strong>{" "}
            and sustainable shipping practices.
          </p>
        </header>

        {/* Journey Map Section */}
        <div className="mb-20 bg-stone-50 p-8 rounded-3xl border border-stone-100">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-center text-stone-400">
            Journey of your Garment
          </h3>
          <div className="flex flex-col md:flex-row justify-between gap-8 text-center">
            <div className="flex-1">
              <span className="block text-lg font-vogue mb-1">01. Order</span>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                Instant Confirmation
              </p>
            </div>
            <div className="hidden md:block self-center h-px w-12 bg-stone-200"></div>
            <div className="flex-1">
              <span className="block text-lg font-vogue mb-1">02. Craft</span>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                2-4 Days Production
              </p>
            </div>
            <div className="hidden md:block self-center h-px w-12 bg-stone-200"></div>
            <div className="flex-1">
              <span className="block text-lg font-vogue mb-1">03. Transit</span>
              <p className="text-[10px] text-stone-400 uppercase tracking-widest">
                Global Tracking
              </p>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="grid gap-12">
          {faqData.map((item, i) => (
            <div
              key={i}
              className="group border-l-2 border-stone-100 pl-8 hover:border-stone-900 transition-colors duration-500"
            >
              <h2 className="text-xl font-medium text-stone-800 mb-4 leading-snug group-hover:text-black">
                {item.q}
              </h2>
              {/* Ab yahan 'item.a' direct render hoga as a React Element */}
              <div className="text-stone-500 font-light leading-relaxed max-w-2xl">
                {item.a}
              </div>
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
