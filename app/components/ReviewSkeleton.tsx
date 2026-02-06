export const ReviewSkeleton = () => {
  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="h-12 w-80 bg-stone-200 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-64 bg-white border border-stone-100 p-8 rounded-4xl shadow-sm animate-pulse"
            >
              <div className="h-4 w-full bg-stone-100 rounded mb-2" />
              <div className="h-4 w-5/6 bg-stone-100 rounded mb-8" />
              <div className="flex items-center gap-4 mt-auto">
                <div className="h-12 w-12 rounded-full bg-stone-100" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-stone-100 rounded" />
                  <div className="h-3 w-32 bg-stone-100 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
