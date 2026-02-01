import { Product, ProductVariant } from "../types/productType";

const ColorPicker = ({
  product,
  selectedVariant,
  setSelectedVariant,
  setErrorMsg,
}: {
  product: Product;
  selectedVariant: ProductVariant;
  setSelectedVariant: (v: ProductVariant) => void;
  setErrorMsg: (msg: string) => void;
}) => (
  <div>
    <span className="text-xs font-bold tracking-widest text-stone-400 uppercase mb-3 block">
      Color: {selectedVariant.color}
    </span>
    <div className="flex space-x-3">
      {product.variants?.map((variant) => (
        <button
          key={variant.id}
          onClick={() => {
            setSelectedVariant(variant);
            setErrorMsg("");
          }}
          className={`w-10 h-10 rounded-full border border-stone-200 focus:outline-none ring-1 ring-offset-2 transition-all ${
            selectedVariant.id === variant.id
              ? "ring-stone-900 scale-110"
              : "ring-transparent hover:scale-105"
          }`}
          style={{
            backgroundColor: variant.colorCode || variant.color,
          }}
          title={variant.color}
        />
      ))}
    </div>
  </div>
);

export default ColorPicker;
