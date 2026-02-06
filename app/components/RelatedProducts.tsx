import Image from "next/image";
import React from "react";
import { Product, urlFor } from "../exports/homeExports";
import Link from "next/link";

interface RelatedProductsProps {
  relatedProducts: Product[];
}
const RelatedProducts: React.FC<RelatedProductsProps> = ({
  relatedProducts,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {relatedProducts.map((rp) => (
        <Link
          key={rp._id}
          href={`/junhae-edits/${rp.slug.current}`}
          className="group block"
        >
          <div className="aspect-3/4 bg-stone-100 overflow-hidden mb-3 relative">
            {/* 💡 Badges Section */}
            {rp.badges && rp.badges.length > 0 && (
              <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                {rp.badges.map((badge) => (
                  <span
                    key={badge._id}
                    className="text-[10px] uppercase tracking-widest px-2 py-1 bg-white/90 backdrop-blur-sm text-stone-900 font-medium shadow-sm"
                    style={{ color: badge.color }}
                  >
                    {badge.title}
                  </span>
                ))}
              </div>
            )}

            {rp.baseImage && (
              <Image
                src={urlFor(rp.baseImage).width(600).url()}
                alt={rp.name}
                width={800}
                height={800}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-medium text-stone-900 line-clamp-1">
              {rp.name}
            </h3>
            <div className="flex flex-col gap-1">
              {/* PKR Pricing */}
              <div className="flex items-center gap-2">
                {rp.pricing?.pkPrice?.discount &&
                  rp.pricing.pkPrice.discount < rp.pricing.pkPrice.original && (
                    <span className="text-xs font-light text-stone-400 line-through">
                      PKR {rp.pricing.pkPrice.original}
                    </span>
                  )}
                <span className="text-xs font-medium text-stone-900">
                  PKR{" "}
                  {rp.pricing?.pkPrice?.discount ??
                    rp.pricing?.pkPrice?.original}
                </span>
              </div>

              {/* USD Pricing */}
              <div className="flex items-center gap-2">
                {rp.pricing?.intlPrice?.discount &&
                  rp.pricing.intlPrice.discount <
                    rp.pricing.intlPrice.original && (
                    <span className="text-xs font-light text-stone-400 line-through">
                      USD {rp.pricing.intlPrice.original}
                    </span>
                  )}
                <span className="text-xs font-medium text-stone-900">
                  USD{" "}
                  {rp.pricing?.intlPrice?.discount ??
                    rp.pricing?.intlPrice?.original}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RelatedProducts;
