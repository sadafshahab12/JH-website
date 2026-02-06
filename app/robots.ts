import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/junhae-edits",
        "/our-story",
        "/contact",
        "/faq",
        "/shipping-return",
        "/size-guide",
        "/care-instructions",
        "/terms",
        "/privacy-policy",
        "/accessibility",
        "/home-page-image/",
        "/ourstory-image/",
        "/junhae-edits-image/",
        "/search",
      ],
      disallow: ["/checkout", "/api/", "/*?_rsc"],
    },
    sitemap: "https://junhaestudio.com/sitemap.xml",
  };
}
