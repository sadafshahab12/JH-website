"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { jsPDF } from "jspdf";
import autoTable, { Color } from "jspdf-autotable";
import { PopulatedOrder } from "../types/orderType";

// --- Sub-component to handle SearchParams logic ---
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
        const query = groq`
          *[_type == "order" && orderNumber == $orderNumber][0]{
            _id,
            orderNumber,
            customer,
            items[] {
              _key,
              product->{
                _id,
                name,
                slug,
                price
              },
              quantity,
              price,
              size,
              color,
              colorCode
            },
            subtotal,
            shippingFee,
            total,
            payment
          }`;

        const result: PopulatedOrder | null = await client.fetch(query, {
          orderNumber,
        });
        setOrder(result);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNumber]);

  const downloadPDF = () => {
    if (!order) return;

    const doc = new jsPDF("p", "pt", "a4");
    const margin = 40;
    const accentColor: Color = [28, 25, 23];

    // --- Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("JUNHAE EDITS", margin, 60);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Official Order Receipt", margin, 75);

    // --- Order Info Box ---
    doc.setFillColor(250, 250, 249);
    doc.rect(margin, 100, 515, 70, "F");

    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("ORDER NUMBER", margin + 15, 120);
    doc.text("DATE", 400, 120);

    doc.setFontSize(12);
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.setFont("helvetica", "bold");
    doc.text(`#${order.orderNumber}`, margin + 15, 140);
    doc.text(new Date().toLocaleDateString(), 400, 140);

    // --- Customer Details ---
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("BILL TO:", margin, 200);

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(order.customer.fullName.toUpperCase(), margin, 215);
    doc.setFont("helvetica", "normal");
    doc.text(order.customer.email, margin, 230);
    doc.text(order.customer.phone, margin, 245);

    // --- Items Table ---
    const rows = order.items.map((item) => [
      item.product.name,
      `${item.color} / ${item.size}`,
      item.quantity.toString(),
      `PKR ${item.price.toLocaleString()}`,
      `PKR ${(item.price * item.quantity).toLocaleString()}`,
    ]);

    autoTable(doc, {
      startY: 270,
      head: [["Product", "Variant", "Qty", "Price", "Total"]],
      body: rows,
      theme: "striped",
      headStyles: {
        fillColor: accentColor,
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: "bold",
        halign: "center",
        cellPadding: 10,
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 8,
      },
      columnStyles: {
        2: { halign: "center" },
        3: { halign: "right" },
        4: { halign: "right" },
      },
    });

    // --- Summary Section ---
    const finalY = (doc as any).lastAutoTable.finalY + 30;
    const summaryX = 350;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);

    doc.text("Subtotal:", summaryX, finalY);
    doc.text(`PKR ${order.subtotal.toLocaleString()}`, 540, finalY, {
      align: "right",
    });

    doc.text("Shipping Fee:", summaryX, finalY + 20);
    doc.text(`PKR ${order.shippingFee.toLocaleString()}`, 540, finalY + 20, {
      align: "right",
    });

    doc.setDrawColor(200);
    doc.line(summaryX, finalY + 30, 540, finalY + 30);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.text("Total:", summaryX, finalY + 50);
    doc.text(`PKR ${order.total.toLocaleString()}`, 540, finalY + 50, {
      align: "right",
    });

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(150);
    doc.text("Thank you for shopping with Junhae Edits.", margin, 800);

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
        <h1 className="text-2xl sm:text-3xl font-semibold text-stone-900 mb-3 sm:mb-4">
          Thank You! 🎉
        </h1>

        <p className="text-sm sm:text-base text-stone-500 mb-5 sm:mb-6">
          Your order has been placed successfully.
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
          Download Receipt (PDF)
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5">
          <Link href="/" className="w-full">
            <button className="w-full border border-stone-200 py-3 sm:py-3.5 rounded-xl hover:bg-stone-50 transition">
              Go to Home
            </button>
          </Link>

          <Link href="/junhae-edits" className="w-full">
            <button className="w-full border border-stone-200 py-3 sm:py-3.5 rounded-xl hover:bg-stone-50 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
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
