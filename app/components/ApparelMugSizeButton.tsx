import React from "react";
import { Product } from "../types/productType";
import { MugCapacity, ProductSize } from "../types/cartItems";
interface ApparelMugSizeButtonProps {
  product: Product;
  selectedSize: ProductSize | MugCapacity | string | null;
  setSelectedSize: (value: ProductSize | MugCapacity | string | null) => void;
  setErrorMsg: (value: string) => void;
}
const ApparelMugSizeButton: React.FC<ApparelMugSizeButtonProps> = ({
  product,
  selectedSize,
  setSelectedSize,
  setErrorMsg,
}) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {/* --- 1. APPAREL SIZES --- */}
      {product.productType === "apparel" &&
        product.availableSizes?.map((size) => (
          <button
            key={size}
            onClick={() => {
              setSelectedSize(size);
              setErrorMsg("");
            }}
            className={`py-3 text-sm font-medium border transition-colors ${
              selectedSize === size
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            {size}
          </button>
        ))}

      {/* --- 2. MUG CAPACITIES --- */}
      {product.productType === "mug" &&
        product.mugCapacity?.map((capacity) => (
          <button
            key={capacity}
            onClick={() => {
              setSelectedSize(capacity);
              setErrorMsg("");
            }}
            className={`py-3 text-sm font-medium border transition-colors ${
              selectedSize === capacity
                ? "border-stone-900 bg-stone-900 text-white"
                : "border-stone-200 text-stone-600 hover:border-stone-400"
            }`}
          >
            {capacity}
          </button>
        ))}
    </div>
  );
};

export default ApparelMugSizeButton;
