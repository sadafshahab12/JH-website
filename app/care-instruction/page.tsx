import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Instructions | Junhae Studio | Preserve Your Minimalist Apparel",
  description:
    "Learn how to care for your Junhae Studio print-on-demand clothing. Expert tips on washing, drying, and preserving the quality of our minimalist streetwear.",
};

const CareInstructions = () => {
  return (
    <main className="pt-24 sm:pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
      {/* SEO H1 - Sirf ek baar */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-vogue text-stone-900 mb-6 tracking-tight">
          Care Guide
        </h1>
        <p className="text-sm md:text-base text-stone-500 leading-relaxed max-w-2xl font-light">
          To keep your{" "}
          <span className="font-vogue text-stone-900">Junhae Studio</span>{" "}
          apparel looking new, follow these specialized care instructions. Our
          <strong className="text-stone-800 font-medium">
            {" "}
            ethically crafted clothing
          </strong>{" "}
          is designed to last when treated with intention.
        </p>
      </header>

      {/* Responsive Grid for Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <section className="bg-white p-8 border border-stone-100 rounded-2xl shadow-sm">
          <h2 className="text-xl font-vogue text-stone-900 mb-6 flex items-center gap-3">
            <span className="text-lg">🧼</span> Washing & Drying
          </h2>
          <ul className="text-sm text-stone-500 space-y-4">
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">01.</span>
              <span>
                Machine wash{" "}
                <strong className="text-stone-700">cold, inside-out</strong> on
                a gentle cycle.
              </span>
            </li>
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">02.</span>
              <span>
                Use mild detergent. Please avoid bleach and fabric softeners.
              </span>
            </li>
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">03.</span>
              <span>
                Tumble dry on{" "}
                <strong className="text-stone-700">low heat</strong> or hang-dry
                for the longest life.
              </span>
            </li>
          </ul>
        </section>

        <section className="bg-white p-8 border border-stone-100 rounded-2xl shadow-sm">
          <h2 className="text-xl font-vogue text-stone-900 mb-6 flex items-center gap-3">
            <span className="text-lg">✨</span> Longevity Tips
          </h2>
          <ul className="text-sm text-stone-500 space-y-4">
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">04.</span>
              <span>
                Cool iron inside-out if necessary.{" "}
                <strong className="text-stone-900 uppercase text-[10px] tracking-widest">
                  Do not iron
                </strong>{" "}
                directly on the print.
              </span>
            </li>
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">05.</span>
              <span>
                Avoid dry cleaning to preserve the integrity of the{" "}
                <strong className="text-stone-700 font-medium">
                  sustainable print
                </strong>
                .
              </span>
            </li>
            <li className="flex items-start gap-3 italic border-b border-stone-50 pb-3">
              <span className="text-stone-900 font-medium">06.</span>
              <span>
                Wash with similar colors to maintain the clean{" "}
                <strong className="text-stone-700 font-medium">
                  minimalist aesthetic
                </strong>
                .
              </span>
            </li>
          </ul>
        </section>
      </div>

      {/* SEO Footer Text */}
      <section className="mt-16 py-10 border-t border-stone-100 text-center">
        <h2 className="text-lg font-vogue text-stone-900 mb-4 tracking-widest uppercase">
          For Best Results
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed max-w-3xl mx-auto font-light">
          Proper care not only helps maintain the soft feel and clean minimal
          look of your
          <span className="font-vogue"> Junhae Studio</span> clothing but also
          reduces environmental impact. Defining silence through quality that
          lasts.
        </p>
      </section>

      <div className="mt-8 text-center">
        <p className="text-xs text-stone-300 tracking-[0.3em] uppercase">
          Ethical • Sustainable • Minimalist
        </p>
      </div>
    </main>
  );
};

export default CareInstructions;
