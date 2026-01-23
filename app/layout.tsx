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
  title: "Junhae Studio | Minimalist Print-On-Demand Apparel",
  description:
    "Junhae Studio offers minimalist, trendy print-on-demand apparel and accessories. Shop stylish t-shirts, hoodies, and custom designs with premium quality and modern aesthetics.",
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
  openGraph: {
    title: "Junhae Studio | Minimalist Print-On-Demand Apparel",
    description:
      "Shop minimalist print-on-demand clothing and accessories from Junhae Studio. Premium quality designs for modern fashion lovers.",
    url: "https://your-domain.com",
    siteName: "Junhae Studio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
