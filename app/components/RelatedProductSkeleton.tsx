import React from "react";

const RelatedProductSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 animate-pulse">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="space-y-3">
          <div className="aspect-3/4 bg-stone-100 rounded" />
          <div className="h-3 bg-stone-100 w-3/4 rounded" />
          <div className="h-3 bg-stone-100 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
};

export default RelatedProductSkeleton;
