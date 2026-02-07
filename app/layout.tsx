import type { Metadata } from "next";

import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ShopProvider } from "./context/ShopContext";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { SearchProvider } from "./context/searchContext";
import { GoogleAnalytics } from "@next/third-parties/google";
import ScrollToTop from "./components/ScrollToTop";
import Script from "next/script";
import Image from "next/image";

const outfit = Outfit({
  weight: ["400", "800"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Junhae Studio | Ethically Crafted Sustainable Minimalist Apparel",
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

  alternates: {
    canonical: "https://junhaestudio.com",
  },

  openGraph: {
    title: "Junhae Studio | Ethically Crafted Sustainable Minimalist Apparel",
    description:
      "Premium minimalist print-on-demand clothing for modern fashion lovers.",
    url: "https://junhaestudio.com",
    siteName: "Junhae Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://junhaestudio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Junhae Studio Minimalist Apparel",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};
const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Junhae Studio",
    url: "https://junhaestudio.com",
    logo: "https://junhaestudio.com/logo.png",
    description: "Premium minimalist print-on-demand apparel brand.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
    },
    sameAs: [
      "https://instagram.com/junhaestudio",
      "https://facebook.com/junhaestudioco",
    ],
  };
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {fbPixelId && (
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${fbPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body className={`${outfit.className} ${outfit.style}  antialiased`}>
        {fbPixelId && (
          <noscript>
            <Image
              src={`https://www.facebook.com/tr?id=${fbPixelId}&ev=PageView&noscript=1`}
              alt=""
              width={1}
              height={1}
              style={{ display: "none" }}
              unoptimized={true}
            />
          </noscript>
        )}
        <ScrollToTop />
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
