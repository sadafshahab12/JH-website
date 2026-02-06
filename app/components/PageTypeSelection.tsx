import React from "react";
import { Product } from "../types/productType";

interface PageTypeSelectionProps {
  product: Product;
  selectedPageType: "Lined" | "Plain";
  setSelectedPageType: (value: "Lined" | "Plain") => void;
}
const PageTypeSelection: React.FC<PageTypeSelectionProps> = ({
  product,
  selectedPageType,
  setSelectedPageType,
}) => {
  return (
    <>
      {product.productType === "stationery" &&
        (product.category.slug.current.includes("notebook") ||
          product.category.slug.current.includes("spiral-notebook") ||
          product.category.slug.current.includes("diary")) && (
          <div className="mt-8 p-4 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-xs font-bold tracking-widest text-stone-400 uppercase block mb-3">
              Select Page Style
            </span>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="pageType"
                  value="Lined"
                  checked={selectedPageType === "Lined"}
                  onChange={() => setSelectedPageType("Lined")}
                  className="w-5 h-5 accent-stone-900 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm ${selectedPageType === "Lined" ? "text-stone-900 font-bold" : "text-stone-500"}`}
                  >
                    Lined Pages
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Best for writing
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="pageType"
                  value="Plain"
                  checked={selectedPageType === "Plain"}
                  onChange={() => setSelectedPageType("Plain")}
                  className="w-5 h-5 accent-stone-900 cursor-pointer"
                />
                <div className="flex flex-col">
                  <span
                    className={`text-sm ${selectedPageType === "Plain" ? "text-stone-900 font-bold" : "text-stone-500"}`}
                  >
                    Plain White Pages
                  </span>
                  <span className="text-[10px] text-stone-400">
                    Best for sketching
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}
    </>
  );
};

export default PageTypeSelection;
