import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Junhae Studio | Secure Shopping Policy",
  description:
    "Read the official terms and conditions for shopping at Junhae Studio. Learn about our ethical print-on-demand process, order production, and global shipping terms.",
};

export default function TermsPage() {
  return (
    <article className="max-w-5xl mx-auto py-16 px-6 lg:py-24 text-stone-800 min-h-screen">
      {/* Header - Single H1 for SEO */}
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
            . By accessing our store or placing an order, you agree to the
            following
            <strong className="text-stone-800 font-medium not-italic underline underline-offset-4 decoration-stone-200">
              {" "}
              shopping policies
            </strong>
            .
          </p>
        </section>

        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
          <h2 className="text-[14px] uppercase font-vogue tracking-[0.25em] font-bold text-stone-900">
            Brand Philosophy
          </h2>
          <div className="md:col-span-2 text-stone-600 font-light text-sm md:text-base">
            <p>
              Junhae Studio operates on an{" "}
              <strong className="text-stone-800 font-medium italic">
                ethical print-on-demand
              </strong>{" "}
              model. To minimize environmental impact and reduce textile waste,
              each garment is individually produced only after a purchase is
              confirmed. This ensures every piece of our
              <span className="italic"> minimalist streetwear</span> is unique
              to you.
            </p>
          </div>
        </section>

 
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
          <h2 className="text-[14px] uppercase tracking-[0.25em] font-vogue font-bold text-stone-900">
            Orders & Production
          </h2>
          <div className="md:col-span-2">
            <ul className="space-y-6 list-none text-stone-600 font-light text-sm md:text-base">
              <li className="flex gap-4 items-start">
                <span className="text-stone-300 font-bold">—</span>
                <span>
                  All items are custom-made to order and undergo strict quality
                  checks.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-stone-300 font-bold">—</span>
                <span>
                  Orders enter production immediately and{" "}
                  <strong className="text-stone-900">cannot be canceled</strong>{" "}
                  or modified once confirmed.
                </span>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-stone-300 font-bold">—</span>
                <span>
                  Minor variations in color and placement may occur due to the
                  nature of digital printing on high-quality fabrics.
                </span>
              </li>
            </ul>
          </div>
        </section>

       
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-stone-50 pt-10">
          <h2 className="text-[14px] uppercase tracking-[0.25em] font-vogue font-bold text-stone-900">
            Returns & Refunds
          </h2>
          <div className="md:col-span-2">
            <p className="mb-6 text-stone-600 font-light text-sm md:text-base">
              Since our minimalist apparel is made specifically for your order,
              we maintain a
              <strong className="text-stone-800 font-medium">
                {" "}
                no-return policy
              </strong>{" "}
              for change of mind or incorrect size selection.
            </p>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
              <p className="text-sm italic text-stone-500 leading-relaxed">
                <strong className="text-stone-900 not-italic uppercase text-[12px] tracking-widest block mb-2">
                  Defective Items:
                </strong>
                Returns are only accepted for manufacturing defects or incorrect
                shipments. Please contact our support within 7 days of delivery
                at{" "}
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
  );
}
