import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";

import { CreateOrderPayload } from "@/app/types/orderType";
import { sanityClient } from "@/app/lib/sanityClient";

// Resend instance initialize
const resend = new Resend(process.env.RESEND_API_KEY);

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

    /* ---------- GENERATE ORDER NUMBER ---------- */
    const orderNumber =
      order.orderNumber ||
      `JUN-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

    /* ---------- PREPARE SANITY ORDER ---------- */
    const sanityOrder = {
      _type: "order",
      orderNumber,
      customer: order.customer,
      currencyMode: order.currencyMode,
      items: order.items.map((item) => {
        const isApparel = item.productType === "apparel";
        const isMug = item.productType === "mug";
        const isStationery = item.productType === "stationery";

        const baseItem = {
          _key: item._key || uuidv4(),
          _type: "item",
          product: item.product,
          productType: item.productType,
          variantId: item.variantId,
          color: item.color,
          colorCode: item.colorCode,
          quantity: item.quantity,
          price: item.price,
          priceMode: item.priceMode,
        };

        if (isApparel || isMug) {
          return { ...baseItem, size: item.size };
        }

        if (isStationery) {
          return { ...baseItem, pageType: item.pageType };
        }
        return baseItem;
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

    // Save to Sanity
    const createdOrder = await sanityClient.create(sanityOrder);

    /* ---------- SEND CONFIRMATION EMAIL ---------- */
    if (order.customer.email) {
      try {
        const customerDisplayName = order.customer.fullName || "Customer";
        const currencySymbol = order.currencyMode === "pk" ? "Rs." : "$";

        await resend.emails.send({
          from: "Junhae Studio <orders@junhaestudio.com>",
          to: [order.customer.email],
          replyTo: "junhaestudio@gmail.com",
          subject: `Your Junhae Studio Order #${orderNumber}`,
          html: `
  <div style="background-color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; color: #1a1a1a; padding: 40px; border: 1px solid #f0f0f0;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 5px; text-transform: uppercase; margin: 0;">Junhae Studio</h1>
            <p style="font-size: 10px; color: #888; letter-spacing: 2px; margin-top: 5px; text-transform: uppercase;">Aesthetic Essentials</p>
          </div>

          <div style="margin-bottom: 30px;">
            <p style="font-size: 16px; font-weight: 400;">Hello ${customerDisplayName},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">We've received your order. Our team is currently verifying your payment receipt. You'll receive another update once your package is ready for dispatch.</p>
          </div>

          <div style="background-color: #fafafa; padding: 25px; margin-bottom: 35px; border-left: 2px solid #1a1a1a;">
            <table style="width: 100%; font-size: 13px;">
              <tr>
                <td style="color: #888; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Order Number</td>
                <td style="text-align: right; font-weight: bold; padding-bottom: 8px;">#${orderNumber}</td>
              </tr>
              <tr>
                <td style="color: #888; text-transform: uppercase; letter-spacing: 1px;">Payment Status</td>
                <td style="text-align: right; color: #d4a373; font-weight: bold;">Reviewing Receipt</td>
              </tr>
            </table>
          </div>

          <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 15px;">Your Selection</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            ${order.items
              .map(
                (item) => `
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f9f9f9;">
                  <span style="font-size: 14px; display: block; font-weight: 500;">${item.productType.toUpperCase()}</span>
                  <span style="font-size: 12px; color: #888;">${item.color || "Standard"} ${item.size ? ` / ${item.size}` : ""}</span>
                </td>
                <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px; color: #666;">
                  x${item.quantity}
                </td>
                <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #f9f9f9; font-size: 14px; font-weight: 500;">
                  ${currencySymbol} ${item.price * item.quantity}
                </td>
              </tr>
            `,
              )
              .join("")}
          </table>

          <div style="margin-left: auto; width: 200px; margin-bottom: 40px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td style="padding: 5px 0; color: #888;">Subtotal</td>
                <td style="text-align: right; padding: 5px 0;">${currencySymbol} ${order.subtotal}</td>
              </tr>
              <tr>
                <td style="padding: 5px 0; color: #888;">Shipping</td>
                <td style="text-align: right; padding: 5px 0;">${currencySymbol} ${order.shippingFee}</td>
              </tr>
              <tr style="font-weight: bold; font-size: 16px;">
                <td style="padding: 15px 0; border-top: 1px solid #eee;">Total</td>
                <td style="text-align: right; padding: 15px 0; border-top: 1px solid #eee;">${currencySymbol} ${order.total}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; border-top: 1px solid #eee; padding-top: 30px;">
            <p style="font-size: 12px; color: #aaa; line-height: 1.8;">
              Thank you for choosing our Junhaen Studio. <br/>
              If you have any questions, simply reply to this email.
            </p>
            <div style="margin-top: 20px;">
               <a href="https://junhaestudio.com" style="text-decoration: none; font-size: 11px; color: #1a1a1a; text-transform: uppercase; letter-spacing: 2px;">Visit Website</a>
            </div>
          </div>
        </div>
      `,
        });
      } catch (emailError) {
        console.error(
          "Email delivery failed, but order was created:",
          emailError,
        );
        // Hum order successfully return karenge kyunke Sanity mein data save ho chuka hai
      }
    }

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
