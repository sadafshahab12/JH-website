import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Junhae Studio | Secure Minimalist Shopping",
  description:
    "Learn how Junhae Studio collects, uses, and protects your personal data. We ensure a secure and transparent shopping experience for our global community.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-5xl mx-auto py-16 px-6 lg:py-24 text-stone-800 min-h-screen">
      {/* Page Header - Primary H1 */}
      <header className="mb-16 pt-10">
        <h1 className="text-4xl md:text-5xl font-light font-vogue tracking-tight mb-4 italic text-stone-900">
          Privacy Policy
        </h1>
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-stone-300"></span>
          <p className="text-[12px] uppercase tracking-[0.2em] text-stone-400 font-semibold">
            Effective January 2026 • Junhae Studio
          </p>
        </div>
      </header>

      <div className="space-y-16 leading-relaxed">
        {/* Intro Section */}
        <section>
          <p className="text-xl text-stone-600 font-light max-w-2xl leading-relaxed">
            <span className="font-vogue text-stone-900">Junhae Studio</span>{" "}
            values your privacy. We are committed to being transparent about how
            we collect, use, and protect your information as you shop for our
            <strong className="text-stone-800 font-medium italic">
              {" "}
              minimalist apparel and streetwear
            </strong>
            .
          </p>
        </section>

       
        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] font-vogue uppercase tracking-[0.25em] font-bold text-stone-900">
            01. Information Collection
          </h2>
          <div className="md:col-span-2 space-y-4">
            <p className="text-stone-600 font-light">
              To provide a seamless and{" "}
              <strong className="text-stone-800 font-medium">
                secure shopping experience
              </strong>
              , we collect:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Identity (Full Name, Email)",
                "Contact (Phone Number)",
                "Logistics (Shipping Address)",
                "Transaction (Order History)",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-stone-500 font-light"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-stone-900"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

  
        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] font-vogue uppercase tracking-[0.25em] font-bold text-stone-900">
            02. Data Usage
          </h2>
          <div className="md:col-span-2 text-stone-600 font-light">
            <p>
              Your data is used strictly for operational excellence: fulfilling
              orders, providing tailored customer support, and maintaining the
              security of our storefront against fraudulent activity. We
              prioritize the safety of our global{" "}
              <span className="italic">Junhae Studio</span> community.
            </p>
          </div>
        </section>


        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] uppercase font-vogue tracking-[0.25em] font-bold text-stone-900">
            03. Third Parties
          </h2>
          <div className="md:col-span-2">
            <p className="mb-4 text-stone-600 font-light">
              We do not—and will never—sell your personal data to third parties.
            </p>
            <p className="text-sm text-stone-400 border-l-2 border-stone-100 pl-4 italic">
              Information is only shared with essential partners (like Stripe
              for secure payments or DHL for global shipping) to complete your
              order.
            </p>
          </div>
        </section>

        
        <section className="grid md:grid-cols-3 gap-8 border-t border-stone-100 pt-10">
          <h2 className="text-[14px] uppercase font-vogue tracking-[0.25em] font-bold text-stone-900">
            04. Your Rights
          </h2>
          <div className="md:col-span-2">
            <p className="mb-6 text-stone-600 font-light">
              You retain full control over your data. You may request a copy,
              correction, or total deletion of your information at any time.
            </p>
            <Link
              href="mailto:junhaestudio@gmail.com"
              className="inline-block bg-stone-900 text-white text-[12px] uppercase tracking-widest px-8 py-4 hover:bg-stone-800 transition-all shadow-lg shadow-stone-100"
            >
              Contact Data Officer
            </Link>
          </div>
        </section>
      </div>

      {/* Subtle Brand Footer */}
      <footer className="mt-24 text-center py-10 border-t border-stone-50">
        <p className="text-[12px] uppercase tracking-[0.3em] text-stone-300">
          Secure Shopping — <span className="font-vogue">Junhae Studio</span>
        </p>
      </footer>
    </article>
  );
}
