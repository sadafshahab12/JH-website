import ProductDetail from "@/app/components/ProductDetail";
import { client, urlFor } from "../../exports/homeExports";
import { productDetailBySlugQuery } from "@/app/lib/productDetailBySlugQuery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await client.fetch(productDetailBySlugQuery, { slug });

  if (!product) return { title: "Product Not Found | Junhae Studio" };
  const brandSuffix = "Ethically Crafted Sustainable Apparel | Junhae Studio";

  return {
    title: `${product.name} | ${brandSuffix}`,
    description: `${product.description?.substring(0, 120)}... Ethically crafted for modern creatives with worldwide shipping.`,

    openGraph: {
      title: `${product.name} | Junhae Studio`,
      description: product.description?.substring(0, 160),
      url: `https://junhaestudio.com/junhae-edits/${slug}`,
      siteName: "Junhae Studio",
      images: [
        {
          url: urlFor(product.baseImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: `${product.name} - Sustainable Minimalist Apparel`,
        },
      ],
      type: "website",
    },

    alternates: {
      canonical: `https://junhaestudio.com/junhae-edits/${slug}`,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await client.fetch(productDetailBySlugQuery, { slug });

  if (!product) return <ProductDetail />;

  // 💡 Schema Markup for AI & Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: urlFor(product.baseImage).url(),
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Junhae Studio",
    },
    offers: {
      "@type": "Offer",
      url: `https://junhaestudio.com/junhae-edits/${slug}`,
      priceCurrency: "PKR",
      price:
        product.pricing?.pkPrice?.discount ||
        product.pricing?.pkPrice?.original,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail />
    </>
  );
}
