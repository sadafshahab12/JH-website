import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Accessibility Statement | Junhae Studio | Inclusive Minimalist Fashion",
  description:
    "Junhae Studio is committed to providing an inclusive shopping experience. Learn about our digital accessibility standards for minimalist apparel and streetwear.",
};

export default function AccessibilityPage() {
  return (
    <article className="max-w-5xl mx-auto py-25 px-6 sm:py-24 text-stone-800 min-h-screen">
      {/* Primary SEO H1 Header */}
      <header className="mb-16 border-l-4 border-stone-900 pl-6 md:pl-10 pt-10">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight font-vogue mb-4 text-stone-900">
          Accessibility <span className="italic">Statement</span>
        </h1>
        <p className="text-[12px] uppercase tracking-[0.2em] text-stone-400 font-medium">
          Last Revised: January 2026 • Junhae Studio Global
        </p>
      </header>

      <div className="space-y-16 leading-relaxed">
        {/* Keyword-Rich Intro */}
        <section>
          <p className="text-xl text-stone-600 font-light max-w-2xl leading-relaxed">
            At <span className="font-vogue text-stone-900">Junhae Studio</span>,
            we believe minimalist design should be borderless. We are refining
            our
            <strong className="font-medium text-stone-800">
              {" "}
              digital presence{" "}
            </strong>
            to ensure an{" "}
            <span className="text-stone-900 font-medium italic underline underline-offset-4 decoration-stone-200">
              inclusive shopping experience
            </span>
            for every member of our global community, including those with
            disabilities.
          </p>
        </section>

        {/* Section 1: Digital Standards (Fixed H1 to H2) */}
        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] uppercase tracking-[0.25em] font-bold font-vogue text-stone-900">
            Digital Standards
          </h2>
          <div className="md:col-span-2">
            <p className="mb-6 text-stone-600 font-light">
              Our website is built with the Web Content Accessibility Guidelines
              (WCAG) in mind, ensuring our{" "}
              <strong className="font-medium text-stone-800 italic">
                ethically made apparel
              </strong>{" "}
              is accessible to all.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {[
                {
                  title: "Visual Clarity",
                  desc: "Utilizing high-contrast ratios and scalable typography for effortless reading of our collection.",
                },
                {
                  title: "Keyboard Navigation",
                  desc: "Ensuring all interactive elements are fully reachable without a mouse for seamless browsing.",
                },
                {
                  title: "Assistive Tech",
                  desc: "Optimizing code structure for screen readers and alternative input devices.",
                },
                {
                  title: "Alt Text",
                  desc: "Adding descriptive alternative text to all images of our minimalist streetwear.",
                },
              ].map((item) => (
                <li key={item.title} className="group">
                  <h3 className="text-sm font-bold text-stone-900 mb-2 group-hover:underline underline-offset-4 decoration-stone-300 transition-all">
                    {item.title}
                  </h3>
                  <p className="text-sm text-stone-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 2: Support (Fixed H1 to H2) */}
        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] uppercase font-vogue tracking-[0.25em] font-bold text-stone-900">
            Assistance
          </h2>
          <div className="md:col-span-2">
            <p className="mb-8 text-stone-600 font-light">
              Should you encounter any barriers while navigating our studio or
              purchasing our
              <strong className="text-stone-800"> aesthetic streetwear</strong>,
              please reach out. Your feedback is vital to our growth as a global
              brand.
            </p>

            <div className="inline-flex flex-col space-y-2">
              <span className="text-[12px] uppercase tracking-widest text-stone-400">
                Direct Support
              </span>
              <Link
                href="mailto:junhaestudio@gmail.com"
                className="text-lg font-medium border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-300 transition-all"
              >
                junhaestudio@gmail.com
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Subtle Footer Quote */}
      <footer className="mt-24 text-center py-10 border-t border-stone-50">
        <p className="text-[12px] uppercase tracking-[0.3em] text-stone-300">
          Design for all —{" "}
          <span className="font-vogue text-stone-400 italic">
            Defined by Silence
          </span>
        </p>
      </footer>
    </article>
  );
}
