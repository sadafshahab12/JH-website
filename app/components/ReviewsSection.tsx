import { ReviewWithProduct } from "../types/reviewType";
import Link from "next/link";
import { reviewDataQuery } from "../lib/reviewDataQuery";
import { client } from "../exports/homeExports";

const ReviewsSection = async () => {
  // Direct Server-side Fetching
  const reviews: ReviewWithProduct[] = await client.fetch(reviewDataQuery);

  return (
    <section className="py-24 bg-[#FAFAFA]" aria-labelledby="reviews-title">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.2em] text-stone-400 uppercase mb-3">
            Real Experiences
          </span>
          <h2
            id="reviews-title"
            className="text-4xl md:text-5xl font-vogue tracking-tight text-stone-900"
          >
            Community <span className="italic text-stone-500">Feedback</span>
          </h2>

          {/* Average Rating Summary Badge */}
          <div className="mt-6 flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs font-medium text-stone-600">
              4.9/5 Based on Recent Drops
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review) => (
            <figure
              key={review._id}
              className="group relative bg-white border border-stone-100 p-8 rounded-4xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out flex flex-col justify-between"
            >
              {/* Top Section: Rating & Quote Icon */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-amber-400" : "text-stone-200"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <svg
                    width="24"
                    height="18"
                    viewBox="0 0 40 30"
                    className="text-stone-100 group-hover:text-stone-200 transition-colors"
                  >
                    <path
                      fill="currentColor"
                      d="M10.5 0L14 3.5C10.5 7 8 11.5 8 16H15V30H0V16C0 6.5 4.5 0 10.5 0ZM35.5 0L39 3.5C35.5 7 33 11.5 33 16H40V30H25V16C25 6.5 29.5 0 35.5 0Z"
                    />
                  </svg>
                </div>

                <blockquote>
                  <p className="text-stone-700 leading-relaxed text-[1rem] font-light italic mb-8">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Bottom Section: User Info */}
              <figcaption className="flex items-center gap-4 border-t border-stone-50 pt-6 mt-auto">
                <div className="h-12 w-12 rounded-full bg-stone-50 flex items-center justify-center text-stone-400 font-medium border border-stone-200 text-xs shadow-inner">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 tracking-wide uppercase flex items-center gap-1.5">
                    {review.name}
                    <span className="inline-block bg-blue-50 text-[8px] text-blue-500 px-1.5 py-0.5 rounded-full border border-blue-100 font-bold">
                      VERIFIED
                    </span>
                  </h3>
                  <Link
                    href={`/junhae-edits/${review.product.slug.current}`}
                    className="text-xs text-stone-400 mt-0.5 hover:text-stone-600 transition-colors underline underline-offset-2 decoration-stone-200"
                  >
                    Purchased: {review.product.name}
                  </Link>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
