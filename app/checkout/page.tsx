"use client";

import React, { useEffect, useState } from "react";
import { useShop } from "@/app/context/ShopContext";
import Image from "next/image";
import { Plus, Minus, Upload } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { CreateOrderPayload } from "../types/orderType";
import { v4 as uuidv4 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, cartTotal, updateQuantity, removeFromCart, clearCart } =
    useShop();
  const router = useRouter();

  const [shippingFee, setShippingFee] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const [fullname, setFullname] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [customization, setCustomization] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipping = async () => {
      if (!country) return;

      const query = groq`*[_type == "shippingCost" && country == $country][0]{
        shippingFee
      }`;

      const result = await client.fetch(query, {
        country: country.toLowerCase(),
      });

      setShippingFee(result?.shippingFee || 0);
    };

    fetchShipping();
  }, [country]);

  useEffect(() => {
    setTotal(cartTotal + shippingFee);
  }, [cartTotal, shippingFee]);

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setReceipt(e.target.files[0]);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      setError("Your cart is empty");
      toast.error("Your cart is empty");
      return;
    }

    if (!fullname || !phone || !email || !country || !city || !address) {
      setError("Please fill all required customer details");
      toast.error("Please fill all required customer details");
      return;
    }

    try {
      setIsPlacingOrder(true);
      setError(null);

      const payload: CreateOrderPayload = {
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
        items: cart.map((item) => ({
          _key: uuidv4(),
          product: {
            _type: "reference",
            _ref: item.productId,
          },
          variantId: item.variantId,
          size: item.size,
          color: item.color,
          colorCode: item.colorCode,
          quantity: item.quantity,
          price: item.selectedPrice,
        })),
        subtotal: cartTotal,
        shippingFee,
        total,
        payment: {
          method: "EasyPaisa",
        },
      };

      const formData = new FormData();
      formData.append("order", JSON.stringify(payload));

      if (receipt) {
        formData.append("receipt", receipt);
      }

      const response = await fetch("/api/order", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Order creation failed");
      }

      toast.success("Order placed successfully! 🎉");
      router.push(`/thank-you?order=${data.orderNumber}`);
      setTimeout(() => {
        clearCart();
      }, 800);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing your order");
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-stone-50 pt-30 pb-30">
      <Toaster />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length > 0 ? (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-vogue font-semibold text-stone-900">
                Checkout
              </h1>
              <p className="text-sm text-stone-500 mt-2">
                Complete your order and payment details.
              </p>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-stone-500">
              <span className="font-medium text-stone-700">Cart</span>
              <span>→</span>
              <span className="font-medium text-stone-700">Checkout</span>
              <span>→</span>
              <span className="font-medium text-stone-700">Confirmation</span>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl text-center md:text-4xl font-vogue font-semibold text-stone-900 mb-8">
            Checkout
          </h1>
        )}
        {/* MAIN CONTAINER */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: CUSTOMER DETAILS */}
          {cart.length > 0 && (
            <div className="lg:w-1/2 space-y-6">
              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900 mb-4">
                  Customer Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Full Name"
                  />

                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Phone Number"
                  />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Email"
                  />

                  <input
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Country"
                  />

                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="City"
                  />

                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="md:col-span-2 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Full Residential Address"
                    rows={4}
                  />

                  <textarea
                    value={customization}
                    onChange={(e) => setCustomization(e.target.value)}
                    className="md:col-span-2 border border-stone-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                    placeholder="Customization Details (if any)"
                    rows={3}
                  />
                </div>
              </div>

              <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold text-stone-900 mb-4">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <div className="p-4 border border-stone-200 rounded-xl bg-stone-50">
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

                  <div>
                    <label className="text-sm font-medium text-stone-600 mb-3 block">
                      Upload Receipt / Screenshot
                    </label>

                    <label
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files?.[0]) {
                          setReceipt(e.dataTransfer.files[0]);
                        }
                      }}
                      className={`
                        relative cursor-pointer flex flex-col items-center justify-center 
                        border-2 border-dashed rounded-2xl p-10 transition-all
                        ${isDragging ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white"}
                        hover:border-stone-400
                      `}
                    >
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleReceiptUpload}
                        className="hidden"
                      />

                      <Upload
                        className="w-10 h-10 text-stone-400 mb-4"
                        strokeWidth={1.5}
                      />

                      <p className="text-stone-700 font-medium">
                        {receipt
                          ? receipt.name
                          : "Click to upload or drag & drop"}
                      </p>
                      <p className="text-stone-400 text-xs mt-2">
                        (Accepted: JPG, PNG, PDF)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT: ORDER SUMMARY */}
          <>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-6 py-12 w-full">
                <div className="w-full max-w-md p-8  rounded-2xl  text-center">
                  <div className="text-5xl mb-4">🛒</div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-stone-500 mb-6">
                    Add some beautiful jewelry to your cart and come back to
                    checkout.
                  </p>

                  <button
                    onClick={() => router.push("/junhae-edits")}
                    className="w-full bg-stone-900 text-white py-3 text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors rounded-xl"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:w-1/2 space-y-6">
                <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-sm">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-stone-900 mb-4">
                      Order Summary
                    </h2>
                    {cart.map((item) => (
                      <div
                        key={`${item.variantId}-${item.size}-${item.colorCode}`}
                        className="flex items-center gap-4 border-b border-stone-100 pb-4"
                      >
                        <div className="w-20 h-20 bg-stone-100 overflow-hidden rounded-xl">
                          <Image
                            src={item.selectedImage}
                            alt={item.product.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-stone-900">
                              {item.product.name}
                            </h3>
                            <p className="text-sm font-bold text-stone-900">
                              PKR {item.selectedPrice * item.quantity}
                            </p>
                          </div>

                          <p className="text-xs text-stone-500">
                            {item.color} / {item.size}
                          </p>

                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.size,
                                  item.colorCode,
                                  -1,
                                )
                              }
                              className="p-1 border border-stone-200 rounded-lg"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="text-sm">{item.quantity}</span>

                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.variantId,
                                  item.size,
                                  item.colorCode,
                                  1,
                                )
                              }
                              className="p-1 border border-stone-200 rounded-lg"
                            >
                              <Plus size={14} />
                            </button>

                            <button
                              onClick={() =>
                                removeFromCart(
                                  item.productId,
                                  item.variantId,
                                  item.size,
                                  item.colorCode,
                                )
                              }
                              className="text-xs text-red-500 underline ml-4"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="space-y-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-500">Subtotal</span>
                        <span className="font-bold text-stone-900">
                          PKR{cartTotal}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-500">Shipping</span>
                        <span className="font-bold text-stone-900">
                          PKR {shippingFee}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-stone-500">Total</span>
                        <span className="font-bold text-stone-900">
                          PKR {total}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={placeOrder}
                      disabled={isPlacingOrder}
                      className="w-full bg-stone-900 text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-stone-800 transition-colors rounded-xl disabled:opacity-50"
                    >
                      {isPlacingOrder ? "Placing Order..." : "Place Order"}
                    </button>

                    {error && (
                      <p className="text-sm text-red-600 mt-3">{error}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
