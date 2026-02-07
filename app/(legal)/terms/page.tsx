import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Terms & Conditions | Junhae Studio | Ethically Crafted Shopping",

  description:
    "Official terms for Junhae Studio. Understand our ethical print-on-demand process, sustainable apparel production, and worldwide shipping terms for our community.",

  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Junhae Studio Terms and Conditions",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the return policy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Junhae Studio maintains a no-return policy for change of mind or size errors because each item is custom-made. Returns are only accepted for manufacturing defects.",
        },
      },
      {
        "@type": "Question",
        name: "Can I cancel my order?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Orders enter production immediately and cannot be canceled or modified once confirmed.",
        },
      },
      {
        "@type": "Question",
        name: "How does Junhae Studio reduce environmental impact?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use a print-on-demand model which ensures zero inventory waste and reduces water consumption compared to traditional mass production.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="terms-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-5xl mx-auto py-16 px-6 lg:py-24 text-stone-800 min-h-screen">
        {/* Header */}
        <header className="border-b border-stone-100 pb-10 mb-16">
          <h1 className="text-4xl md:text-5xl pt-10 font-vogue font-light tracking-tight mb-4 text-stone-900">
            Terms & <span className="italic">Conditions</span>
          </h1>
          <p className="text-[12px] uppercase tracking-[0.3em] text-stone-400 font-medium">
            Last Updated: January 2026 • Junhae Studio
          </p>
        </header>

        <div className="space-y-16 leading-relaxed">
          {/* Intro Section */}
          <section>
            <p className="text-xl text-stone-600 font-light max-w-2xl leading-relaxed italic">
              Welcome to{" "}
              <span className="font-vogue text-stone-900 not-italic">
                Junhae Studio
              </span>
              . By accessing our store, you agree to our policies designed for
              <strong className="text-stone-800 font-medium not-italic">
                {" "}
                sustainable consumption
              </strong>
              .
            </p>
          </section>

          {/* Brand Philosophy - GEO Optimized */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
            <h2 className="text-[14px] uppercase font-vogue tracking-[0.25em] font-bold text-stone-900">
              Philosophy & Sustainability
            </h2>
            <div className="md:col-span-2 text-stone-600 font-light text-sm md:text-base">
              <p>
                Junhae Studio operates on an{" "}
                <strong className="text-stone-800 font-medium italic">
                  ethical print-on-demand
                </strong>{" "}
                model. Each garment is produced only after a purchase is
                confirmed to eliminate overproduction waste.
              </p>
            </div>
          </section>

          {/* Orders & Production - AEO Optimized */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
            <h2 className="text-[14px] uppercase tracking-[0.25em] font-vogue font-bold text-stone-900">
              Orders & Production
            </h2>
            <div className="md:col-span-2 space-y-6">
              <div id="cancellation-policy">
                <h3 className="text-base font-bold text-stone-900 mb-2 underline underline-offset-4 decoration-stone-100">
                  Can I cancel my order?
                </h3>
                <p className="text-stone-600 font-light text-sm md:text-base">
                  Orders enter production immediately and{" "}
                  <strong>cannot be canceled</strong> or modified once
                  confirmed. This ensures we maintain zero inventory waste.
                </p>
              </div>
              <div id="production-details">
                <h3 className="text-base font-bold text-stone-900 mb-2 underline underline-offset-4 decoration-stone-100">
                  Production Process
                </h3>
                <ul className="space-y-4 list-none text-stone-600 font-light text-sm md:text-base">
                  <li className="flex gap-4 items-start">
                    <span className="text-stone-300 font-bold">—</span>
                    <span>
                      Every item undergoes a 3-step quality check before
                      shipping.
                    </span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-stone-300 font-bold">—</span>
                    <span>
                      Minor variations in digital print placement may occur,
                      making each piece unique.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Returns & Refunds - AEO Optimized */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
            <h2 className="text-[14px] uppercase tracking-[0.25em] font-vogue font-bold text-stone-900">
              Returns & Refunds
            </h2>
            <div className="md:col-span-2">
              <div id="return-policy" className="mb-8">
                <h3 className="text-base font-bold text-stone-900 mb-2 underline underline-offset-4 decoration-stone-100">
                  What is the return policy?
                </h3>
                <p className="text-stone-600 font-light text-sm md:text-base">
                  We maintain a <strong>no-return policy</strong> for change of
                  mind or incorrect size selection. Please use our{" "}
                  <Link href="/size-guide" className="underline font-medium">
                    Size Guide
                  </Link>{" "}
                  before purchasing.
                </p>
              </div>

              <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                <p className="text-sm italic text-stone-500 leading-relaxed">
                  <strong className="text-stone-900 not-italic uppercase text-[12px] tracking-widest block mb-2">
                    Defective Items:
                  </strong>
                  Returns are only accepted for manufacturing defects. Contact
                  us within 7 days at{" "}
                  <Link
                    href="mailto:junhaestudio@gmail.com"
                    className="text-stone-900 underline underline-offset-4 decoration-stone-300 hover:decoration-stone-900 transition-all"
                  >
                    junhaestudio@gmail.com
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Footer Support */}
          <footer className="pt-12 mt-12 border-t border-stone-100 text-center md:text-left">
            <p className="text-xs md:text-sm text-stone-400 font-light">
              Questions regarding our global terms? Reach out to us at{" "}
              <Link
                href="mailto:junhaestudio@gmail.com"
                className="font-medium text-stone-900 hover:opacity-70 transition-opacity underline underline-offset-4"
              >
                junhaestudio@gmail.com
              </Link>
            </p>
            <p className="mt-8 text-[12px] uppercase tracking-[0.4em] text-stone-300">
              Defined by Silence • Junhae Studio
            </p>
          </footer>
        </div>
      </article>
    </>
  );
}
