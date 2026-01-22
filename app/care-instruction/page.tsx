import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Instructions | Junhae Studio",
  description:
    "Junhae Studio care instructions for print-on-demand clothing. Learn how to wash, dry, and preserve your minimalist apparel for long-lasting quality.",
};

const CareInstruction = () => {
  return (
    <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif mb-6">Care Instructions</h1>

      <p className="text-sm text-stone-500 leading-relaxed mb-6">
        To keep your Junhae Studio apparel looking new, follow these care
        instructions. These tips help preserve print quality and fabric softness.
      </p>

      <ul className="text-sm text-stone-500 space-y-3">
        <li>✔️ Machine wash cold inside out</li>
        <li>✔️ Use mild detergent, no bleach</li>
        <li>✔️ Tumble dry low or hang dry</li>
        <li>✔️ Do not iron directly on the print</li>
        <li>✔️ Avoid dry cleaning</li>
      </ul>

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2">For Best Results</h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Wash with similar colors and avoid strong chemicals. Proper care helps
          maintain the soft feel and clean minimal look of your Junhae Studio
          clothing.
        </p>
      </section>
    </main>
  );
};

export default CareInstruction;
