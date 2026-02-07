import React from "react";
import { Product } from "../types/productType";
import { X } from "lucide-react";
interface SizeGuideModalProps {
  setShowSizeGuide: (value: boolean) => void;
  product: Product;
  showSizeGuide: boolean;
}
const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  showSizeGuide,
  product,
  setShowSizeGuide,
}) => {
  return (
    <>
      {showSizeGuide && product && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="bg-white p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <X size={20} />
            </button>

            {/* --- Dynamic Title --- */}
            <h3 className="text-2xl font-vogue mb-6 text-stone-900">
              {product.productType === "mug"
                ? product.mugSizeGuide?.title || "Mug Size Guide"
                : product.sizeGuide?.title || "Size Guide"}
            </h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-stone-50 text-stone-900 border-b border-stone-200">
                  <tr>
                    {/* Conditional Headers */}
                    <th className="p-3 font-semibold">
                      {product.productType === "mug" ? "Capacity" : "Size"}
                    </th>
                    <th className="p-3 font-semibold">
                      {product.productType === "mug" ? "Height" : "Chest (in)"}
                    </th>
                    <th className="p-3 font-semibold">
                      {product.productType === "mug"
                        ? "Diameter"
                        : "Length (in)"}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-stone-600">
                  {/* --- MUG DATA --- */}
                  {product.productType === "mug" &&
                    product.mugSizeGuide?.sizes?.map((row, idx) => (
                      <tr key={idx} className="border-b border-stone-100">
                        <td className="p-3 font-medium text-stone-900">
                          {row.sizeLabel}
                        </td>
                        <td className="p-3">{row.height || "-"}</td>
                        <td className="p-3">{row.diameter || "-"}</td>
                      </tr>
                    ))}

                  {/* --- APPAREL DATA --- */}
                  {product.productType === "apparel" &&
                    product.sizeGuide?.sizes?.map((sizeRow, idx) => (
                      <tr key={idx} className="border-b border-stone-100">
                        <td className="p-3 font-medium text-stone-900">
                          {sizeRow.size}
                        </td>
                        <td className="p-3">{sizeRow.chest}</td>
                        <td className="p-3">{sizeRow.length}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {product.productType === "mug" && product.mugSizeGuide && (
              <div className="space-y-4 border-t border-stone-100 pt-6">
                <div className="grid grid-cols-2 gap-4 text-[11px]">
                  <div className="bg-stone-50 p-2 rounded">
                    <p className="text-stone-400 uppercase font-bold mb-1">
                      Material
                    </p>
                    <p className="text-stone-900 font-medium">
                      {product.mugSizeGuide.materialInfo?.material}
                    </p>
                  </div>
                  <div className="bg-stone-50 p-2 rounded text-right">
                    <p className="text-stone-400 uppercase font-bold mb-1">
                      Care
                    </p>
                    <p className="text-stone-900 font-medium">
                      {product.mugSizeGuide.materialInfo?.isMicrowaveSafe
                        ? "Microwave Safe"
                        : ""}
                      {product.mugSizeGuide.materialInfo?.isDishwasherSafe
                        ? " • Dishwasher Safe"
                        : ""}
                    </p>
                  </div>
                </div>
                {product.mugSizeGuide.usageTip && (
                  <p className="text-xs text-stone-500 italic text-center">
                    Tip: {product.mugSizeGuide.usageTip}
                  </p>
                )}
              </div>
            )}

            {product.productType === "apparel" &&
              product.sizeGuide?.modelStats && (
                <div className="space-y-4 border-t border-stone-100 pt-6">
                  <div className="flex items-start gap-3 bg-stone-50 p-4 rounded-lg">
                    <div className="mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-stone-400"
                      >
                        <circle cx="12" cy="8" r="5" />
                        <path d="M20 21a8 8 0 1 0-16 0" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-1">
                        Model Context
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed italic">
                        Our model is{" "}
                        <strong className="text-stone-900">
                          {product.sizeGuide.modelStats.height}
                        </strong>{" "}
                        {product.sizeGuide.modelStats.weight &&
                          `and ${product.sizeGuide.modelStats.weight}`}
                        , wearing a{" "}
                        <strong className="text-stone-900 font-bold">
                          Size {product.sizeGuide.modelStats.sizeWorn}
                        </strong>{" "}
                        for a{" "}
                        <strong className="text-stone-900 underline underline-offset-4 decoration-stone-200">
                          {product.sizeGuide.modelStats.fitDescription}
                        </strong>
                        .
                      </p>
                    </div>
                  </div>

                  {/* 💡 DYNAMIC SIZE TIP */}
                  {product.sizeGuide.sizeTip && (
                    <div className="text-[11px] text-stone-500 flex items-center justify-center gap-2 italic text-center">
                      <span>{product.sizeGuide.sizeTip}</span>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default SizeGuideModal;
