import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/productType";
import { homeProductQuery } from "../lib/homeProductQuery";
import { client, urlFor } from "../exports/homeExports";

// Artificial delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Logic ko component se bahar nikal diya taake compiler ko masla na ho
async function getProductsWithMinDelay() {
  const MIN_LOADING_TIME = 600;
  const start = Date.now();

  const products: Product[] = await client.fetch(homeProductQuery);

  const elapsedTime = Date.now() - start;
  const remaining = MIN_LOADING_TIME - elapsedTime;

  if (remaining > 0) {
    await delay(remaining);
  }

  return products;
}

const FeaturedProducts = async () => {
  // Data fetch kar rahe hain fixed logic ke sath
  const products = await getProductsWithMinDelay();

  const featuredProducts = products
    .filter((p) =>
      p.badges?.some(
        (badge) => badge.value === "Best Seller" || badge.value === "Featured",
      ),
    )
    .slice(0, 3);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-vogue">Curated Minimalist Essentials</h2>
        <Link
          href="/junhae-edits"
          className="text-sm border-b border-stone-300 hover:border-stone-900 pb-1 transition-colors"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {featuredProducts.map((product) => (
          <Link
            key={product._id}
            href={`/junhae-edits/${product.slug.current}`}
            className="group block"
          >
            <div className="relative aspect-4/5 overflow-hidden bg-stone-100 mb-4">
              {product.baseImage && (
                <Image
                  src={urlFor(product.baseImage).width(800).height(1000).url()}
                  alt={product.name}
                  width={800}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {product.badges?.map((badge, index) => (
                <span
                  key={badge._id || index}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 text-[10px] tracking-widest uppercase font-medium"
                >
                  {badge.value}
                </span>
              ))}
            </div>

            <h3 className="text-base font-medium text-stone-900 group-hover:text-stone-600 transition-colors">
              {product.name}
            </h3>

            <div className="flex flex-col gap-2 mt-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {product.pricing.pkPrice.discount && (
                    <span className="text-stone-400 line-through text-sm">
                      PKR {product.pricing.pkPrice.original.toLocaleString()}
                    </span>
                  )}
                  <span className="text-[14px] font-bold text-stone-950">
                    PKR{" "}
                    {(
                      product.pricing.pkPrice.discount ??
                      product.pricing.pkPrice.original
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {product.pricing.intlPrice.discount && (
                  <span className="text-stone-400 line-through text-sm">
                    USD {product.pricing.intlPrice.original}
                  </span>
                )}
                <span className="text-sm font-medium text-stone-700">
                  USD{" "}
                  {product.pricing.intlPrice.discount ??
                    product.pricing.intlPrice.original}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
