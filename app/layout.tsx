import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ShopProvider } from "./context/ShopContext";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { SearchProvider } from "./context/searchContext";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Outfit({
  weight: ["400", "800"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 1. Updated Title (matches report) [cite: 53, 70]
  title: "Junhae Studio | Minimalist Print-On-Demand Apparel",

  // 2. FIXED: Shortened Description
  // Your previous description was 175 characters; search engines truncate at 160.
  description:
    "Shop minimalist, trendy print-on-demand apparel at Junhae Studio. Premium t-shirts and hoodies designed with modern aesthetics and ethical crafting.",

  keywords: [
    "Junhae Studio",
    "minimalist apparel",
    "print on demand clothing",
    "minimalist t shirts",
    "graphic hoodies",
    "custom printed apparel",
    "modern streetwear",
    "trendy fashion designs",
    "minimalist fashion brand",
    "custom tees online",
    "premium print on demand",
    "minimalist clothing Pakistan",
  ],

  // 3. FIXED: Canonical URL [cite: 95, 99]
  // The report noted the missing canonical tag.
  alternates: {
    canonical: "https://www.junhaestudio.com",
  },

  // 4. FIXED: Complete OpenGraph Tags [cite: 136, 137]
  openGraph: {
    title: "Junhae Studio | Minimalist Print-On-Demand Apparel",
    description:
      "Premium minimalist print-on-demand clothing for modern fashion lovers.",
    url: "https://www.junhaestudio.com", // Ensure this matches your standard URL
    siteName: "Junhae Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.junhaestudio.com/og-image.jpg", // Add a real OG image path
        width: 1200,
        height: 630,
        alt: "Junhae Studio Minimalist Apparel",
      },
    ],
  },

  // 5. ADDED: Robots.txt instruction [cite: 107, 163]
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema data to help Google identify your brand
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Junhae Studio",
    url: "https://www.junhaestudio.com",
    logo: "https://www.junhaestudio.com/logo.png", // Ensure this path is correct
    description: "Premium minimalist print-on-demand apparel brand.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [
      "https://instagram.com/junhaestudio", // Apne real social links yahan dalein
      "https://facebook.com/junhaestudioco",
    ],
  };
  return (
    <html lang="en">
      <head>
        {/* Schema Markup injection */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${outfit.className} ${outfit.style}  antialiased`}>
        <ShopProvider>
          <SearchProvider>
            <Navbar />
            {children}
            <CartDrawer />
            <Footer />
          </SearchProvider>
        </ShopProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
