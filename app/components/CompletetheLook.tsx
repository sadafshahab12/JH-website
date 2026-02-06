import Image from "next/image";
import React from "react";
import { Product } from "../types/productType";
import Link from "next/link";
import { urlFor } from "../exports/homeExports";

interface CompletetheLookProps {
  product: Product;
}
const CompletetheLook: React.FC<CompletetheLookProps> = ({ product }) => {
  return (
    <>
      {product.completeTheLook && product.completeTheLook.length > 0 && (
        <section className="bg-stone-50 py-8 sm:py-24 px-6 border-y border-stone-100 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold">
                Shop the aesthetic
              </span>
              <h2 className="text-3xl md:text-4xl font-vogue text-stone-900 mt-2">
                Complete the Look
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-10">
              {product.completeTheLook?.map((item) => (
                <Link
                  key={item._id}
                  href={`/junhae-edits/${item.slug.current}`}
                  className="group"
                >
                  <div className="aspect-3/4 overflow-hidden  bg-white mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500 border border-stone-100">
                    <Image
                      src={
                        item.baseImage
                          ? urlFor(item.baseImage).width(400).height(533).url()
                          : ""
                      }
                      alt={item.name}
                      width={400}
                      height={533}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>

                  <div>
                    <h3 className="text-sm  text-stone-800 ">
                      {item.name}
                    </h3>

                    {/* PKR + USD Pricing, Related Products Style */}
                    <div className="flex flex-col gap-1 mt-1">
                      {/* PKR */}
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        {item.pricing.pkPrice.discount ? (
                          <>
                            <span className="line-through text-stone-400">
                              PKR {item.pricing.pkPrice.original}
                            </span>
                            <span className="font-medium text-stone-900">
                              PKR {item.pricing.pkPrice.discount}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium text-stone-900">
                            PKR {item.pricing.pkPrice.original}
                          </span>
                        )}
                      </div>

                      {/* USD */}
                      <div className="flex items-center  gap-2 text-sm text-stone-500">
                        {item.pricing.intlPrice.discount ? (
                          <>
                            <span className="line-through text-stone-400">
                              USD {item.pricing.intlPrice.original.toFixed(2)}
                            </span>
                            <span className="font-medium text-stone-900">
                              USD {item.pricing.intlPrice.discount.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="font-medium text-stone-900">
                            USD {item.pricing.intlPrice.original.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="inline-block mt-2 text-[10px] border-b border-stone-900 pb-0.5 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                      View Detail
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CompletetheLook;
