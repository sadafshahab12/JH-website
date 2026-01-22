import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ShopProvider } from "./context/ShopContext";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { SearchProvider } from "./context/searchContext";

const outfit = Outfit({
  weight: ["400", "800"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junhae Studio",
  description:
    "Discover Junhae Studio’s collection of minimalist, print-on-demand apparel — where silence becomes sophistication and style becomes your statement. Trendy designs for every wardrobe.",
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
      </body>
    </html>
  );
}
