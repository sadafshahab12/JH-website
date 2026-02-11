import { sanityClient } from "@/app/lib/sanityClient";
import { NextResponse } from "next/server";

// TypeScript interface for request body
interface SubscribeRequest {
  email: string;
}

export async function POST(req: Request) {
  try {
    const body: SubscribeRequest = await req.json();
    const { email } = body;

    // 1. Basic Email Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email is required." },
        { status: 400 },
      );
    }

    // 2. Check if email already exists in Sanity
    // Taake duplicate entries na hon
    const existingSubscriber = await sanityClient.fetch<number>(
      `count(*[_type == "newsletter" && email == $email])`,
      { email },
    );

    if (existingSubscriber > 0) {
      return NextResponse.json(
        { success: false, error: "You are already subscribed!" },
        { status: 409 },
      );
    }

    // 3. Create document in Sanity
    await sanityClient.create({
      _type: "newsletter",
      email: email.toLowerCase().trim(),
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true, message: "Subscribed successfully!" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("Newsletter Subscription Error:", error);

    // Type-safe error handling
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
