"use client";

import { useShop, X, Minus, Plus } from "../exports/homeExports";
import Image from "next/image";
import Link from "next/link";

const CartDrawer = () => {
  const {
    isCartOpen,
    toggleCart,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useShop();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        <div className="p-6 border-b border-stone-100 flex justify-between items-center">
          <h1 className="text-lg font-vogue tracking-wide">Your Cart</h1>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 hover:bg-stone-100 rounded-full transition-colors"
          >
            <X size={20} className="text-stone-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-stone-400">Your cart is empty.</p>
              <button
                onClick={() => toggleCart(false)}
                className="text-stone-900 border-b border-stone-900 pb-1 text-sm hover:text-stone-600 hover:border-stone-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.variantId}-${item.size}-${item.colorCode}-${item.pageType || "default"}`}
                className="flex space-x-4"
              >
                <div className="w-20 h-24 bg-stone-100 overflow-hidden rounded-sm shrink-0">
                  <Image
                    src={item.selectedImage}
                    alt={item.product.name}
                    width={800}
                    height={800}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-stone-900">
                        {item.product.name}
                      </h3>
                    </div>

                    {/* Price in next line */}
                    <p className="text-sm text-stone-900 mt-2">
                      {item.priceMode === "pk" ? "PKR" : "USD"}{" "}
                      {item.selectedPrice * item.quantity}
                    </p>

                    <p className="text-xs text-stone-500 mt-1">
                      {(() => {
                        const slug = item.product.category?.slug.current || "";
                        const type = item.product.productType;

  
                        if (type === "mug") {
                          return `${item.color} / ${item.size}`; 
                        }

                        if (slug.match(/notebook|diary|spiral-notebook/)) {
                          return `${item.color}${item.pageType ? ` / ${item.pageType} Pages` : ""}`;
                        }

                        if (slug.match(/sticker|bookmark/)) {
                          return `${item.color}`;
                        }

                        return `${item.color} / Size ${item.size}`;
                      })()}
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      {item.colorCode}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border border-stone-200 rounded-sm">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variantId,
                            item.size as string,
                            item.colorCode,
                            -1,
                            item.pageType,
                          )
                        }
                        className="p-1 px-2 text-stone-500 hover:text-stone-900"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xs w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.variantId,
                            item.size as string,
                            item.colorCode,
                            1,
                            item.pageType,
                          )
                        }
                        className="p-1 px-2 text-stone-500 hover:text-stone-900"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.productId,
                          item.variantId,
                          item.size as string,
                          item.colorCode,
                          item.priceMode,
                          item.pageType,
                        )
                      }
                      className="text-xs text-stone-400 hover:text-red-500 underline transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-stone-100 p-6 space-y-4 bg-stone-50">
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Subtotal</span>
              <span className="font-medium">
                {cart[0].priceMode === "pk" ? "PKR" : "USD"} {cartTotal}
              </span>
            </div>

            <p className="text-xs text-stone-400 text-center">
              Shipping calculated at checkout.
            </p>

            {/* 🚀 Checkout Button */}
            <Link href="/checkout" className="w-full">
              <button
                onClick={() => toggleCart(false)}
                className="w-full bg-stone-900 text-white py-4 text-sm font-medium tracking-widest hover:bg-stone-1000 transition-colors uppercase"
              >
                Checkout
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
