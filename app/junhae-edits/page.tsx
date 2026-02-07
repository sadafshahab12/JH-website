import { Suspense } from "react";
import JunhaeEdits from "../components/JunhaeEdits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Junhae Edits | Curated Ethically Crafted Minimalist Style",

  description:
    "Explore Junhae Edits: A curated selection of sustainable minimalist apparel for modern creatives. Discover our latest ethically crafted streetwear drops and style guides.",

  keywords: [
    "Junhae Edits",
    "Curated Minimalist Fashion",
    "Modern Creatives Style",
    "Ethically Crafted Streetwear",
    "Sustainable Fashion Edits",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Junhae Edits | Premium Minimalist Style Curations",
    description:
      "Curated ethically crafted streetwear for the modern creative movement.",
    url: "https://www.junhaestudio.com/junhae-edits",
    siteName: "Junhae Studio",
    images: [
      {
        url: "https://www.junhaestudio.com/edits-og-image.png",
        width: 1200,
        height: 630,
        alt: "Junhae Edits - Sustainable Minimalist Collection",
      },
    ],
    type: "article",
  },
};
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
        </div>
      }
    >
      <JunhaeEdits />
    </Suspense>
  );
}
