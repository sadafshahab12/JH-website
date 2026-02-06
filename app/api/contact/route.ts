import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/app/lib/sanityClient";

type ContactFormBody = {
  name: string;
  email: string;
  phone?: string;
  customization: string;
  message: string;
  referenceImage?: {
    base64: string;
    filename: string;
    mimeType: string;
  };
};

type ContactFormDoc = {
  _type: "contactForm";
  name: string;
  email: string;
  phone?: string; 
  customization: string;
  message: string;
  referenceImage?: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
};

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export async function POST(req: NextRequest) {
  try {
    const body: ContactFormBody = await req.json();
    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long." },
        { status: 400 },
      );
    }

    if (!body.email || !validateEmail(body.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!body.customization || body.customization.trim().length < 5) {
      return NextResponse.json(
        { error: "Please describe your customization idea." },
        { status: 400 },
      );
    }

    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 },
      );
    }


    const doc: ContactFormDoc = {
      _type: "contactForm",
      name: body.name,
      email: body.email,
      phone: body.phone, 
      customization: body.customization,
      message: body.message,
    };

 
    if (body.referenceImage) {
      doc.referenceImage = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: await uploadImage(body.referenceImage),
        },
      };
    }

    const result = await sanityClient.create(doc);

    return NextResponse.json({ message: "Submitted successfully", result });
  } catch (error) {
    console.error("Sanity Submission Error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}

async function uploadImage(image: {
  base64: string;
  filename: string;
  mimeType: string;
}) {
  const base64Data = image.base64.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const uploadResult = await sanityClient.assets.upload("image", buffer, {
    filename: image.filename,
    contentType: image.mimeType,
  });

  return uploadResult._id;
}
