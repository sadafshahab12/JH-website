import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.junhaestudio.com";

  // Static Routes from Navbar and Footer
  const staticRoutes = [
    "",
    "/junhae-edits",
    "/our-story",
    "/contact",
    "/faq",
    "/shipping-return",
    "/size-guide",
    "/care-instruction",
    "/terms",
    "/privacy-policy",
    "/accessibility",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  return [...staticRoutes];
}
