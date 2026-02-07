import ContactPage from "../components/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Junhae Studio | Worldwide Shipping Support",

  description:
    "Get in touch with Junhae Studio. Support for modern creatives regarding our ethically crafted collections, worldwide shipping, and sustainable apparel inquiries.",

  keywords: [
    "Junhae Studio Contact",
    "Customer Support",
    "Worldwide Shipping Inquiry",
    "Ethically Crafted Fashion Support",
    "Modern Creatives Help",
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Contact Junhae Studio | Get in Touch",
    description:
      "Support for our global community of modern creatives. Reach out for any inquiries.",
    url: "https://junhaestudio.com/contact",
    siteName: "Junhae Studio",
    images: [
      {
        url: "https://junhaestudio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Junhae Studio Support",
      },
    ],
    type: "website",
  },
};
const Contact = () => {
  return <ContactPage />;
};

export default Contact;
