import ProductDetail from "@/app/components/ProductDetail";
import { client, urlFor } from "../../exports/homeExports";
import { productDetailBySlugQuery } from "@/app/lib/productDetailBySlugQuery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await client.fetch(productDetailBySlugQuery, { slug });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Junhae Studio`,
    description: product.description?.substring(0, 160),
    openGraph: {
      title: product.name,
      images: [urlFor(product.baseImage).width(1200).url()],
    },
    alternates: {
      canonical: `https://junhaestudio.com/junhae-edits/${slug}`,
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
      {/* Is script tag se Google ko table format mein data milta hai */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail />
    </>
  );
}
