"use client";

import React, { useEffect, useState, useRef } from "react";
import { useShop } from "@/app/context/ShopContext";
import Image from "next/image";
import {
  Plus,
  Minus,
  Upload,
  Loader2,
  MapPin,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, cartTotal, updateQuantity, clearCart } = useShop();
  const router = useRouter();

  // Calculate total quantity of items in the cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Shipping & Total State
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [shippingNote, setShippingNote] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [isLoadingShipping, setIsLoadingShipping] = useState(false);

  // Form State
  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [customization, setCustomization] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Dynamic Suggestion States
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const currencyMode = cart.length > 0 ? cart[0].priceMode : "pk";

  const formatCurrency = (mode: "pk" | "intl", value: number) => {
    return mode === "pk"
      ? `PKR ${value.toLocaleString()}`
      : `USD ${value.toFixed(2)}`;
  };

  // 1. Fetch unique countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countries = await client.fetch(
          groq`*[_type == "shippingCost"].country`,
        );
        setAvailableCountries(countries || []);
      } catch (err) {
        console.error("Failed to fetch countries", err);
      }
    };
    fetchCountries();

    const handleClickOutside = (e: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Updated Logic: Quantity-based Shipping Calculation
  useEffect(() => {
    const fetchShipping = async () => {
      const trimmedCountry = country.trim();
      if (!trimmedCountry || trimmedCountry.length < 2) {
        setShippingFee(0);
        setShippingNote("");
        return;
      }

      setIsLoadingShipping(true);
      try {
        const query = groq`
          *[_type == "shippingCost" && lower(country) == lower($country)][0]{
            shippingFee,
            freeShippingMinOrder,
            note
          }
        `;

        const result = await client.fetch(query, { country: trimmedCountry });

        if (result) {
          const threshold = result.freeShippingMinOrder || 0;

          // Logic Change: Check if Total Quantity reaches the threshold
          const meetsFreeShipping = threshold > 0 && totalQuantity >= threshold;

          if (meetsFreeShipping) {
            setShippingFee(0);
            setShippingNote("Free shipping applied for your bulk order!");
          } else {
            setShippingFee(result.shippingFee || 0);
            if (threshold > 0) {
              const remaining = threshold - totalQuantity;
              setShippingNote(
                `Add ${remaining} more item${remaining > 1 ? "s" : ""} to get free shipping.`,
              );
            } else {
              setShippingNote(result.note || "Standard rates apply.");
            }
          }
        } else {
          setShippingFee(0);
          setShippingNote("Shipping rates not configured for this country.");
        }
      } catch (err) {
        console.error("Shipping error:", err);
      } finally {
        setIsLoadingShipping(false);
      }
    };

    const timer = setTimeout(fetchShipping, 600);
    return () => clearTimeout(timer);
  }, [country, totalQuantity]); // Re-run when country OR total quantity changes

  useEffect(() => {
    setTotal(cartTotal + shippingFee);
  }, [cartTotal, shippingFee]);

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setReceipt(e.target.files[0]);
    }
  };

  const placeOrder = async () => {
    // 1. Validation
    if (cart.length === 0) return toast.error("Your cart is empty");

    if (!fullname || !phone || !email || !country || !city || !address) {
      return toast.error("Please fill all required fields");
    }

    if (!receipt) return toast.error("Please upload your payment receipt");

    try {
      setIsPlacingOrder(true);

      const orderItems = cart.map((item) => ({
        _key: uuidv4(),
        product: { _type: "reference", _ref: item.productId },
        variantId: item.variantId,
        size: item.size,
        color: item.color,
        colorCode: item.colorCode,
        quantity: item.quantity,
        price: item.selectedPrice,
        priceMode: item.priceMode,
      }));

      const payload = {
        _type: "order",

        customer: {
          fullName: fullname,
          phone,
          email,
          country,
          city,
          address,
          customization: customization || undefined,
        },

        currencyMode: currencyMode, // <-- IMPORTANT (fix)

        items: orderItems,
        subtotal: cartTotal,
        shippingFee,
        total,

        payment: {
          method: "EasyPaisa",
        },
      };

      const formData = new FormData();
      formData.append("order", JSON.stringify(payload));
      formData.append("receipt", receipt);

      const response = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data?.error || "Order failed");

      toast.success("Order placed successfully!");

      router.push(`/thank-you?order=${data.orderNumber}`);

      setTimeout(() => {
        clearCart();
      }, 2000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order. Check your connection.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-20">
      <Toaster />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length > 0 && (
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-stone-900">
              Checkout
            </h1>
            <p className="text-stone-500 mt-2">
              Complete your order and payment details.
            </p>
          </header>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-7/12 space-y-6">
            {cart.length > 0 ? (
              <>
                <section className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-semibold text-stone-900 mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-stone-400" /> Shipping
                    Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="Full Name"
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="Phone Number"
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="Email Address"
                    />

                    <div className="relative" ref={suggestionRef}>
                      <input
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                        placeholder="Country (e.g. Pakistan)"
                      />
                      {showSuggestions && country.trim().length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-stone-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                          {availableCountries
                            .filter((c) =>
                              c.toLowerCase().includes(country.toLowerCase()),
                            )
                            .map((c) => (
                              <div
                                key={c}
                                onClick={() => {
                                  setCountry(c);
                                  setShowSuggestions(false);
                                }}
                                className="p-3 text-sm hover:bg-stone-50 cursor-pointer flex items-center justify-between border-b border-stone-50 last:border-none uppercase"
                              >
                                {c}
                                {country.toLowerCase() === c.toLowerCase() && (
                                  <CheckCircle2
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                              </div>
                            ))}
                        </div>
                      )}
                      {isLoadingShipping && (
                        <Loader2
                          className="absolute right-3 top-3 animate-spin text-stone-400"
                          size={18}
                        />
                      )}
                    </div>

                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="City"
                    />
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="md:col-span-2 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="Full Residential Address"
                      rows={3}
                    />
                    <textarea
                      value={customization}
                      onChange={(e) => setCustomization(e.target.value)}
                      className="md:col-span-2 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-stone-200 outline-none"
                      placeholder="Customization Details (optional)"
                      rows={2}
                    />
                  </div>
                </section>

                <section className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                  <h2 className="text-xl font-semibold text-stone-900 mb-4">
                    Payment Method
                  </h2>
                  <div className="p-4 border border-stone-200 rounded-xl bg-stone-50 mb-6">
                    <p className="text-sm font-medium text-stone-900">
                      EasyPaisa (Online Transfer)
                    </p>
                    <p className="text-xs text-stone-500 mt-1">
                      Send payment to:
                    </p>
                    <p className="text-sm font-bold mt-2">0340-2195735</p>
                    <p className="text-xs text-stone-500 mt-1">
                      (If you need IBAN for international transfer, contact us)
                    </p>
                  </div>

                  <label
                    className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 transition-all cursor-pointer ${isDragging ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white hover:border-stone-400"}`}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      if (e.dataTransfer.files?.[0])
                        setReceipt(e.dataTransfer.files[0]);
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleReceiptUpload}
                      className="hidden"
                    />
                    <Upload className="w-10 h-10 text-stone-400 mb-2" />
                    <p className="text-sm font-medium text-stone-800">
                      {receipt ? receipt.name : "Upload Payment Receipt"}
                    </p>
                    <p className="text-xs text-stone-400 mt-1">
                      Drag and drop or click to browse
                    </p>
                  </label>
                </section>
              </>
            ) : (
              <div className="group relative w-full overflow-hidden rounded-4xl border border-stone-100 py-24 text-center transition-all ">
                {/* Subtle Background Accent */}
                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-stone-50/50 blur-3xl" />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Animated Icon Container */}
                  <div className="mb-6 inline-flex transform rounded-full bg-stone-50 p-6 text-stone-400 transition-transform duration-500 group-hover:scale-110 group-hover:bg-stone-100 group-hover:text-stone-600">
                    <ShoppingBag size={48} strokeWidth={1.5} />
                  </div>

                  {/* Typography */}
                  <h2 className="text-3xl font-medium tracking-tight text-stone-900">
                    Your cart is lonely
                  </h2>
                  <p className="mt-2 text-stone-500 max-w-xs mx-auto text-balance">
                    {`            Looks like you haven't added anything to your bag yet. Let's
                    find something special.`}
                  </p>

                  {/* Refined Button */}
                  <button
                    onClick={() => router.push("/shop")}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-stone-900 px-12 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-800 hover:shadow-lg active:scale-95"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="lg:w-5/12">
              <div className="sticky top-32 p-6 bg-white border border-stone-200 rounded-2xl shadow-sm space-y-6">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="max-h-80 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div
                      key={`${item.variantId}-${item.size}`}
                      className="flex gap-4"
                    >
                      <div className="w-16 h-16 bg-stone-100 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.selectedImage}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-stone-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-stone-500 mt-1">
                          {item.color} / {item.size} × {item.quantity}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.size,
                                item.colorCode,
                                -1,
                              )
                            }
                            className="p-1 border border-stone-200 rounded hover:bg-stone-50"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs px-1">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.variantId,
                                item.size,
                                item.colorCode,
                                1,
                              )
                            }
                            className="p-1 border border-stone-200 rounded hover:bg-stone-50"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-bold">
                        {formatCurrency(
                          item.priceMode,
                          item.selectedPrice * item.quantity,
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <div className="flex justify-between text-stone-600">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-semibold">
                      {formatCurrency(currencyMode, cartTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span className="text-sm">Shipping</span>
                    <span className="font-semibold text-stone-900">
                      {shippingFee === 0
                        ? "FREE"
                        : formatCurrency(currencyMode, shippingFee)}
                    </span>
                  </div>
                  {shippingNote && (
                    <p className="text-[11px] text-stone-400 italic">
                      *{shippingNote}
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-bold text-stone-900 pt-3 border-t border-stone-100">
                    <span>Total</span>
                    <span>{formatCurrency(currencyMode, total)}</span>
                  </div>
                </div>

                <button
                  disabled={isPlacingOrder || isLoadingShipping}
                  onClick={placeOrder}
                  className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 flex justify-center items-center gap-3"
                >
                  {isPlacingOrder ? (
                    <>
                      <Loader2 className="animate-spin" size={18} /> Placing
                      Order...
                    </>
                  ) : (
                    "Confirm & Place Order"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
