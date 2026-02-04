import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { CreateOrderPayload } from "@/app/types/orderType";
import { sanityClient } from "@/app/lib/sanityClient";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 },
      );
    }

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

    // Validate required fields
    if (!order.customer || !order.items || order.items.length === 0) {
      return NextResponse.json(
        { error: "Order must have customer & items" },
        { status: 400 },
      );
    }

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
    const orderNumber =
      order.orderNumber ||
      `P-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    /* ---------- CREATE ORDER ---------- */
    const sanityOrder = {
      _type: "order",
      orderNumber,
      customer: order.customer,
      currencyMode: order.currencyMode,
      items: order.items.map((item) => {
        const isStationery = item.productType === "stationery";

        return {
          _key: item._key || uuidv4(),
          _type: "item",
          product: item.product,
          productType: item.productType,
          variantId: item.variantId,
          size: isStationery ? "N/A" : item.size,
          color: item.color,
          colorCode: item.colorCode,
          quantity: item.quantity,
          pageType: isStationery ? item.pageType : null,
          price: item.price,
          priceMode: item.priceMode,
        };
      }),
      subtotal: order.subtotal,
      shippingFee: order.shippingFee,
      total: order.total,
      status: "pending",
      payment: {
        method: order.payment?.method || "EasyPaisa",
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
