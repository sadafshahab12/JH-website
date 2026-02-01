
import Link from "next/link";
import { Product } from "../types/productType";

type BreadCrumbsProps = {
  productName: Product["name"];
};

export const BreadCrumbs = ({ productName }: BreadCrumbsProps) => (
  <div className="max-w-7xl mx-auto px-6 mb-6">
    <nav className="text-sm text-stone-500 font-light tracking-wide">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="hover:text-stone-900">Home</Link>
        </li>
        <li>/</li>
        <li>
          <Link href="/junhae-edits" className="hover:text-stone-900">
            Junhae Edits
          </Link>
        </li>
        <li>/</li>
        <li className="text-stone-900 font-medium">{productName}</li>
      </ol>
    </nav>
  </div>
);
