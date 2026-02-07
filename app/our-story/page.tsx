import React from "react";
import OurStoryPage from "../components/OurStoryPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Story | Junhae Studio | Ethically Crafted Sustainable Fashion",
  description:
    "Discover the soul of Junhae Studio. We bridge Korean culture and Japanese minimalism with ethically crafted sustainable streetwear for modern creatives worldwide.",
  keywords: [
    "Junhae Studio Story",
    "Ethically Crafted Fashion",
    "Sustainable Streetwear",
    "Modern Creatives",
    "K-fashion Minimalism",
    "Worldwide Shipping",
  ],

  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Our Story | Junhae Studio | Ethically Crafted Movement",
    description:
      "The journey of Junhae Studio: Truth and the Sea. Sustainable fashion for modern creatives.",
    url: "https://junhaestudio.com/our-story",
    siteName: "Junhae Studio",
    images: [
      {
        url: "https://junhaestudio.com/ourstory-image/latest-arirang-collection.jpg",
        width: 1200,
        height: 630,
        alt: "Junhae Studio Story - Sustainable Fashion",
      },
    ],
    type: "website",
  },
};
const OurStory = () => {
  return <OurStoryPage />;
};

export default OurStory;
