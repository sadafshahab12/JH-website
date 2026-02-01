"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  client,
  jsPDF,
  Color,
  autoTable,
  PopulatedOrder,
} from "../exports/homeExports";
import { thankyouOrderQuery } from "../lib/thankyouOrderQuery";

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  const [order, setOrder] = useState<PopulatedOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const result: PopulatedOrder | null = await client.fetch(
          thankyouOrderQuery,
          {
            orderNumber,
          },
        );

        setOrder(result);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  const getCurrencySymbol = (mode: "pk" | "intl") =>
    mode === "pk" ? "PKR" : "USD";

  const downloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const accentColor: Color = [28, 25, 23]; // Stone-900

    const currency = getCurrencySymbol(order.currencyMode);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("JUNHAE STUDIO", margin, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Premium Minimalist Apparel & Streetwear", margin, 75);
    doc.text("Official Order Receipt", margin, 90);

    // --- Order Info Box ---
    doc.setFillColor(250, 250, 249);
    doc.rect(margin, 110, 515, 70, "F");

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("ORDER NUMBER", margin + 15, 130);
    doc.text("DATE", 400, 130);

    doc.setFontSize(12);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text(`#${order.orderNumber}`, margin + 15, 150);
    doc.text(new Date().toLocaleDateString(), 400, 150);

    // --- Customer Details ---
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("BILL TO:", margin, 210);

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(order.customer.fullName.toUpperCase(), margin, 225);
    doc.setFont("helvetica", "normal");
    doc.text(order.customer.email, margin, 240);
    doc.text(order.customer.phone, margin, 255);

    // --- Items Table ---
    const rows = order.items.map((item) => [
      item.product.name,
      `${item.color} / ${item.size}`,
      item.quantity.toString(),
      `${getCurrencySymbol(item.priceMode)} ${item.price.toLocaleString()}`,
      `${getCurrencySymbol(item.priceMode)} ${(item.price * item.quantity).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: 280,
      head: [["Product", "Variant", "Qty", "Price", "Total"]],
      body: rows,
      theme: "striped",
      headStyles: {
        fillColor: accentColor,
        textColor: [255, 255, 255],
        fontSize: 10,
      },
    });

    // --- Summary Section ---
    const finalY = doc.lastAutoTable.finalY + 30;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Subtotal:", 350, finalY);
    doc.text(`${currency} ${order.subtotal.toLocaleString()}`, 540, finalY, {
      align: "right",
    });
    doc.text("Shipping Fee:", 350, finalY + 15);
    doc.text(
      `${currency} ${order.shippingFee.toLocaleString()}`,
      540,
      finalY + 15,
      {
        align: "right",
      },
    );
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("Total:", 350, finalY + 40);
    doc.text(`${currency} ${order.total.toLocaleString()}`, 540, finalY + 40, {
      align: "right",
    });

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150);
    doc.text(
      "Thank you for choosing Junhae Studio — Defined by Silence.",
      margin,
      800,
    );

    doc.save(`Receipt-${order.orderNumber}.pdf`);
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-xl font-semibold animate-pulse">
          Loading Order Details...
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="text-xl font-semibold mb-4">Order not found</div>
          <Link href="/" className="text-stone-600 underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-3xl p-6 sm:p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-vogue font-semibold text-stone-900 mb-3 sm:mb-4 pt-10">
          Order Confirmed
        </h1>

        <p className="text-sm sm:text-base text-stone-500 mb-5 sm:mb-6">
          Thank you for shopping with{" "}
          <span className="text-stone-900 font-vogue font-medium">
            Junhae Studio
          </span>
          . Your <span className="italic">minimalist essentials</span> are now
          being ethically prepared.
        </p>

        <div className="p-4 sm:p-5 mb-4 bg-stone-50 rounded-xl border border-stone-200">
          <p className="text-xs sm:text-sm text-stone-500">Order Number</p>
          <p className="text-lg sm:text-xl font-bold text-stone-900">
            {order.orderNumber}
          </p>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Please save this order number for future reference.
          </p>
        </div>

        <button
          onClick={downloadPDF}
          className="w-full bg-stone-900 text-white py-3 sm:py-3.5 rounded-xl hover:bg-stone-800 transition mb-4"
        >
          Download Official Receipt (PDF)
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5">
          <Link href="/" className="w-full">
            <button className="w-full border border-stone-200 py-3 sm:py-3.5 rounded-xl hover:bg-stone-50 transition">
              Home
            </button>
          </Link>

          <Link href="/junhae-edits" className="w-full">
            <button className="w-full border border-stone-200 py-3 sm:py-3.5 rounded-xl hover:bg-stone-50 transition">
              Shop More
            </button>
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-50">
          <p className="text-[10px] uppercase tracking-[0.3em] text-stone-300">
            Ethically Crafted • Sustainable • Minimalist
          </p>
        </div>
      </div>
    </div>
  );
};

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
