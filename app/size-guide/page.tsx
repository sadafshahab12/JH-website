import { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Size Guide | Junhae Studio | Fit for Sustainable Minimalist Apparel",

  description:
    "Find your perfect fit with Junhae Studio’s size guide. Accurate measurements for our ethically crafted sustainable minimalist streetwear, hoodies, and tees.",

  robots: {
    index: true,
    follow: true,
  },
};

const shirtSizes = [
  { label: "S", chest: "34-36 in", length: "27 in", shoulder: "16 in" },
  { label: "M", chest: "38-40 in", length: "28 in", shoulder: "17 in" },
  { label: "L", chest: "42-44 in", length: "29 in", shoulder: "18 in" },
  { label: "XL", chest: "46-48 in", length: "30 in", shoulder: "19 in" },
];

const hoodieSizes = [
  { label: "S", chest: "40 in", length: "27 in", shoulder: "18 in" },
  { label: "M", chest: "44 in", length: "28 in", shoulder: "19 in" },
  { label: "L", chest: "48 in", length: "29 in", shoulder: "20 in" },
  { label: "XL", chest: "52 in", length: "30 in", shoulder: "21 in" },
];

const sweatshirtSizes = [
  { label: "S", chest: "38 in", length: "26 in", shoulder: "17 in" },
  { label: "M", chest: "42 in", length: "27 in", shoulder: "18 in" },
  { label: "L", chest: "46 in", length: "28 in", shoulder: "19 in" },
  { label: "XL", chest: "50 in", length: "29 in", shoulder: "20 in" },
];

const Table = <T extends { [key: string]: string }>(props: {
  title: string;
  headers: string[];
  rows: T[];
}) => {
  return (
    <section className="mb-16 overflow-x-auto">
      <h2 className="text-xl font-vogue text-stone-900 mb-4 tracking-wide uppercase">
        {props.title}
      </h2>
      <table className="w-full border-collapse border border-stone-100 text-sm">
        <thead className="bg-stone-50 text-stone-900 font-medium">
          <tr>
            {props.headers.map((header) => (
              <th
                key={header}
                className="p-4 border border-stone-100 text-left font-vogue uppercase tracking-tighter text-[11px]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-stone-500 font-light">
          {props.rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-stone-50/20 transition-colors">
              {Object.values(row).map((value, valueIdx) => (
                <td key={valueIdx} className="p-4 border border-stone-100">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

const SizeGuide = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Junhae Studio Apparel Size Guide",
    description:
      "Measurement charts for oversized and regular minimalist streetwear.",
    breadcrumb: "Home > Size Guide",
    mainEntity: {
      "@type": "Table",
      name: "Clothing Size Chart",
      about: "T-shirts, Hoodies, and Sweatshirts dimensions in inches",
    },
  };
  return (
    <>
      <Script
        id="size-guide-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-vogue text-stone-900 mb-6 tracking-tight">
            Find Your Fit
          </h1>
          <div className="bg-stone-50 border-l-2 border-stone-900 p-6 mb-10">
            <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
              <span className="font-vogue text-stone-900 uppercase tracking-tighter mr-2">
                Fit Note:
              </span>
              Our collection is curated for a{" "}
              <strong className="text-stone-900 font-medium ">
                relaxed, boxy silhouette
              </strong>
              . If you prefer a standard fit, we recommend your true size. For a
              signature{" "}
              <strong className="text-stone-900 font-medium ">
                minimalist oversized look
              </strong>
              , consider sizing up one level.
            </p>
          </div>
          <p className="text-sm md:text-base text-stone-500 leading-relaxed max-w-2xl font-light">
            <span className="font-vogue text-stone-900">Junhae Studio</span>{" "}
            apparel is designed with a
            <strong className="text-stone-800 font-medium">
              {" "}
              modern, relaxed aesthetic
            </strong>
            . Measurements are in inches. For an{" "}
            <span className="italic">oversized silhouette</span>, consider
            sizing up.
          </p>
        </header>

        <div className="space-y-8">
          <Table
            title="Minimalist Tee Measurements"
            headers={["Size", "Chest (Half)", "Body Length", "Shoulder"]}
            rows={shirtSizes}
          />

          <Table
            title="Premium Hoodie Measurements"
            headers={["Size", "Chest", "Length", "Shoulder"]}
            rows={hoodieSizes}
          />

          <Table
            title="Classic Sweatshirt Measurements"
            headers={["Size", "Chest", "Length", "Shoulder"]}
            rows={sweatshirtSizes}
          />
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-stone-50 rounded-2xl border border-stone-100">
          <div>
            <h2 className="text-lg font-vogue text-stone-900 mb-4 italic uppercase tracking-widest">
              Measurement Guide
            </h2>
            <ul className="text-sm text-stone-500 space-y-4 font-light">
              <li>
                <span className="font-medium text-stone-800 uppercase block text-[10px] tracking-widest mb-1">
                  Chest
                </span>
                Measure around the fullest part of the chest, keeping the tape
                level under the arms.
              </li>
              <li>
                <span className="font-medium text-stone-800 uppercase block text-[10px] tracking-widest mb-1">
                  Length
                </span>
                Measure from the high point of the shoulder to the bottom
                opening of the garment.
              </li>
            </ul>
          </div>
          <div className="items-center justify-center border-l border-stone-200 pl-8 hidden sm:flex">
            <p className="text-xs text-stone-400 italic leading-relaxed">
              {`      "Our garments are pre-shrunk to maintain their minimalist shape and
            premium feel after washing."`}
            </p>
          </div>
        </section>

        <footer className="mt-12 text-center text-[11px] uppercase tracking-[0.2em] text-stone-400">
          Still unsure? Contact{" "}
          <Link
            href="mailto:junhaestudio@gmail.com"
            className="text-stone-900 font-bold border-b border-stone-900"
          >
            Support
          </Link>
        </footer>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Junhae Studio Size Guide",
              description:
                "Size charts for T-shirts, Hoodies, and Sweatshirts.",
              mainEntity: {
                "@type": "Table",
                about: "Clothing size measurements in inches",
              },
            }),
          }}
        />
      </main>{" "}
    </>
  );
};

export default SizeGuide;
