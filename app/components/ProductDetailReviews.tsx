import React from "react";
import { Review } from "../types/reviewType";

interface ProductDetailReviewsProps {
  reviews: Review[];
  loadingReviews: boolean;
}
const ProductDetailReviews: React.FC<ProductDetailReviewsProps> = ({
  loadingReviews,
  reviews,
}) => {
  return (
    <div className="mt-8 max-w-7xl mx-auto px-6">
      <h2 className="text-xl font-vogue text-stone-900 mb-4">
        Reviews ({reviews.length})
      </h2>

      {loadingReviews ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="border p-4 rounded-md">
              <div className="h-4 bg-stone-100 w-1/4 rounded mb-2" />
              <div className="h-3 bg-stone-100 w-1/6 rounded mb-2" />
              <div className="h-3 bg-stone-100 w-full rounded" />
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-stone-500">
          No reviews yet. Be the first to review!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                {/* Avatar */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-sm font-semibold text-stone-700">
                    {rev.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900">{rev.name}</p>
                    <p className="text-xs text-stone-500 mt-1">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm font-semibold text-stone-700">
                  <span className="text-amber-500">⭐</span>
                  <span>{rev.rating}/5</span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-sm text-stone-600 mt-4 leading-relaxed">
                {rev.comment}
              </p>

              {/* Optional: “Verified” badge */}
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-xs text-stone-500">Verified buyer</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetailReviews;
