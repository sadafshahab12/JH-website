import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Size Guide | Junhae Studio",
  description:
    "Junhae Studio Size Guide for shirts, hoodies, sweatshirts, and mugs. Find your perfect fit and product dimensions.",
};

type ApparelSize = {
  label: string;
  chest: string;
  length: string;
  shoulder: string;
};

type MugSize = {
  size: string;
  capacity: string;
  height: string;
  diameter: string;
};

const shirtSizes: ApparelSize[] = [
  { label: "S", chest: "34-36 in", length: "27 in", shoulder: "16 in" },
  { label: "M", chest: "38-40 in", length: "28 in", shoulder: "17 in" },
  { label: "L", chest: "42-44 in", length: "29 in", shoulder: "18 in" },
  { label: "XL", chest: "46-48 in", length: "30 in", shoulder: "19 in" },
];

const hoodieSizes: ApparelSize[] = [
  { label: "S", chest: "40 in", length: "27 in", shoulder: "18 in" },
  { label: "M", chest: "44 in", length: "28 in", shoulder: "19 in" },
  { label: "L", chest: "48 in", length: "29 in", shoulder: "20 in" },
  { label: "XL", chest: "52 in", length: "30 in", shoulder: "21 in" },
];

const sweatshirtSizes: ApparelSize[] = [
  { label: "S", chest: "38 in", length: "26 in", shoulder: "17 in" },
  { label: "M", chest: "42 in", length: "27 in", shoulder: "18 in" },
  { label: "L", chest: "46 in", length: "28 in", shoulder: "19 in" },
  { label: "XL", chest: "50 in", length: "29 in", shoulder: "20 in" },
];

const mugSizes: MugSize[] = [
  {
    size: "11 oz",
    capacity: "11 ounces",
    height: "3.75 in",
    diameter: "3.25 in",
  },
  {
    size: "15 oz",
    capacity: "15 ounces",
    height: "4.5 in",
    diameter: "3.35 in",
  },
];

const Table = <T extends { [key: string]: string }>(props: {
  title: string;
  headers: string[];
  rows: T[];
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">{props.title}</h2>
      <table className="w-full border border-stone-800 text-sm">
        <thead className="bg-stone-900 text-white">
          <tr>
            {props.headers.map((header) => (
              <th key={header} className="p-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row, idx) => (
            <tr key={idx} className="border-t border-stone-800">
              {Object.values(row).map((value, valueIdx) => (
                <td key={valueIdx} className="p-3 text-center">
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
  return (
    <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-serif mb-6">Size Guide</h1>

      <p className="text-sm text-stone-500 leading-relaxed mb-8">
        Junhae Studio offers a modern, relaxed fit. These measurements are based
        on standard POD apparel sizing. If you are between sizes, we recommend
        sizing up for comfort.
      </p>

      <Table
        title="Shirt Size Guide"
        headers={["Size", "Chest", "Length", "Shoulder"]}
        rows={shirtSizes}
      />

      <Table
        title="Hoodie Size Guide"
        headers={["Size", "Chest", "Length", "Shoulder"]}
        rows={hoodieSizes}
      />

      <Table
        title="Sweatshirt Size Guide"
        headers={["Size", "Chest", "Length", "Shoulder"]}
        rows={sweatshirtSizes}
      />

      <Table
        title="Mug Size Guide"
        headers={["Size", "Capacity", "Height", "Diameter"]}
        rows={mugSizes}
      />

      <p className="text-sm text-stone-500 leading-relaxed mt-6">
        Still unsure about your size? Contact us at{" "}
        <Link href="mailto:junhaestudio@gmail.com" className="underline">
          junhaestudio@gmail.com
        </Link>
        .
      </p>
    </main>
  );
};

export default SizeGuide;
