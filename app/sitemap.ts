import { MetadataRoute } from "next";

import { groq } from "next-sanity";
import { client } from "./exports/homeExports";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.junhaestudio.com";

  // 1. Fetch all products (Sirf slug aur update time chahiye sitemap ke liye)
  const productQuery = groq`*[_type == "product"]{ "slug": slug.current, _updatedAt }`;
  const products = await client.fetch(productQuery);

  // 2. Product URLs generate karein
  const productRoutes = products.map(
    (product: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/junhae-edits/${product.slug}`,
      lastModified: product._updatedAt
        ? new Date(product._updatedAt)
        : new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }),
  );

  // 3. Static Pages list
  const staticPages = [
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
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // 4. Combine both
  return [...staticRoutes, ...productRoutes];
}
