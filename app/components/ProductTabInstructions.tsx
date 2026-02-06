import React from "react";
import { Product } from "../types/productType";
import { Truck } from "lucide-react";

interface ProductTabInstructionsProps {
  activeTab: "details" | "shipping" | "care";
  product: Product;
}
const ProductTabInstructions: React.FC<ProductTabInstructionsProps> = ({
  product,
  activeTab,
}) => {
  return (
    <div className="text-sm font-light text-stone-600 leading-relaxed min-h-25">
      {activeTab === "details" && (
        <div className="space-y-2 animate-fade-in">
          <p>{product.description}</p>

          <div>
            <ul className="list-disc list-inside mt-1">
              {product.fabricDetails?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {product.fit && (
            <p className="text-sm">
              <span className="font-medium text-stone-900">Fit:</span>{" "}
              <span className="text-stone-500">
                {Array.isArray(product.fit)
                  ? product.fit.join(" / ")
                  : product.fit}
              </span>
            </p>
          )}
          {product.productType === "stationery" && product.productSpecs && (
            <div className="mt-4 p-3 bg-stone-50 rounded space-y-1">
              {/* Material Fix */}
              {product.productSpecs.material && (
                <div className="text-xs">
                  <strong className="block mb-1">Material:</strong>
                  <ul className="list-disc pl-4">
                    {Array.isArray(product.productSpecs.material) ? (
                      product.productSpecs.material.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>{product.productSpecs.material}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Size/Dimensions */}
              {product.productSpecs.dimensions && (
                <div className="text-xs mt-2">
                  <strong className="block mb-1">Size:</strong>
                  <ul className="list-disc pl-4">
                    {Array.isArray(product.productSpecs.dimensions) ? (
                      product.productSpecs.dimensions.map((dim, index) => (
                        <li key={index}>{dim}</li>
                      ))
                    ) : (
                      <li>{product.productSpecs.dimensions}</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Other Fix / Notes Section */}
              {product.productSpecs.other && (
                <div className="mt-2 text-xs italic text-stone-400">
                  <ul className="list-none space-y-1">
                    {Array.isArray(product.productSpecs.other) ? (
                      product.productSpecs.other.map((note, index) => (
                        <li key={index}>* {note}</li>
                      ))
                    ) : (
                      <li>* {product.productSpecs.other}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* Shipping Tab */}
      {activeTab === "shipping" && (
        <div className="flex items-start gap-3 animate-fade-in">
          <Truck size={18} className="text-stone-400 mt-1 shrink-0" />
          <div className="space-y-2">
            {product.shippingDetails ? (
              <p className="whitespace-pre-line text-stone-700 leading-relaxed">
                {product.shippingDetails}
              </p>
            ) : (
              <>
                <p>
                  <strong>Made to Order:</strong> 2–5 business days
                </p>
                <p>
                  <strong>Pakistan Shipping:</strong> 4–7 business days
                </p>
                <p>
                  <strong>Standard Shipping:</strong> 5–10 business days
                </p>
              </>
            )}

            <hr className="my-2 border-stone-200" />

            <p>
              <strong>Return Policy:</strong> Returns accepted within 7 days of
              delivery. Product must be unused, with tags intact.
            </p>

            <p>
              <strong>Pay Online:</strong> We accept online payments via
              Credit/Debit cards & JazzCash/Bank transfer.
            </p>

            <p className="text-sm text-stone-500 italic">
              *Delivery times may vary depending on location & product
              availability.
            </p>
          </div>
        </div>
      )}
      {/* Care Instructions Tab */}
      {activeTab === "care" && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h3 className="text-sm font-medium text-stone-900 mb-2">
              Product Care Guide
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-sm text-stone-600">
              {product.careInstructions &&
              product.careInstructions.length > 0 ? (
                product.careInstructions.map((instruction, idx) => (
                  <li key={idx}>{instruction}</li>
                ))
              ) : (
                <>
                  <li>Machine wash cold, inside out</li>
                  <li>Use mild detergent (no bleach)</li>
                  <li>Tumble dry low or hang dry</li>
                  <li>Do not iron directly on print</li>
                  <li>Avoid dry cleaning for printed items</li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTabInstructions;
