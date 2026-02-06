import React from "react";
const SkeletonPulse = () => (
  <div className="absolute inset-0 bg-stone-200/60 animate-pulse" />
);

const ProductSkeleton = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex justify-between items-end mb-12">
        <div className="h-10 w-64 bg-stone-200 rounded-md animate-pulse" />
        <div className="h-5 w-20 bg-stone-200 rounded-md animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col">
            {/* Image Box */}
            <div className="relative aspect-4/5 bg-stone-100 overflow-hidden mb-4">
              <SkeletonPulse />
            </div>
            {/* Text lines */}
            <div className="h-5 w-3/4 bg-stone-200 rounded mb-3 animate-pulse" />
            <div className="h-4 w-1/2 bg-stone-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSkeleton;
