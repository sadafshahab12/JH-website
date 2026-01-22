import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { CreateOrderPayload } from "@/app/types/orderType";
import { sanityClient } from "@/app/lib/sanityClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const orderRaw = formData.get("order");
    const receiptFile = formData.get("receipt");

    if (!orderRaw || typeof orderRaw !== "string") {
      return NextResponse.json(
        { error: "Invalid order payload" },
        { status: 400 },
      );
    }

    const order: CreateOrderPayload = JSON.parse(orderRaw);

    let receiptAssetRef: string | undefined;

    /* ---------- EDGE-SAFE RECEIPT UPLOAD ---------- */
    if (receiptFile instanceof File) {
      const asset = await sanityClient.assets.upload("file", receiptFile, {
        filename: receiptFile.name,
        contentType: receiptFile.type,
      });

      receiptAssetRef = asset._id;
    }

    /* ---------- CREATE ORDER ---------- */
    const orderNumber = `P-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    const sanityOrder = {
      _type: "order",
      orderNumber,
      customer: order.customer,

      // ✅ Add _key here
      items: order.items.map((item) => ({
        ...item,
        _key: uuidv4(),
      })),

      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      total: order.total,
      status: "pending",
      payment: {
        method: order.payment.method,
        ...(receiptAssetRef && {
          receipt: {
            _type: "file",
            asset: {
              _type: "reference",
              _ref: receiptAssetRef,
            },
          },
        }),
      },
    };

    const createdOrder = await sanityClient.create(sanityOrder);

    return NextResponse.json(
      { success: true, orderId: createdOrder._id, orderNumber },
      { status: 201 },
    );
  } catch (error) {
    console.error("ORDER API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 },
    );
  }
}
