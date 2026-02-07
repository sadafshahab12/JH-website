import { Box, PenTool, Truck } from "lucide-react";

const BrandHighlights = () => {
  return (
    <section className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">
          Ethically Crafted Sustainable Apparel | Junhae Studio Brand Values and
          Quality Commitment
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Highlight 1: Design & Aesthetic */}
          <article className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110 duration-300">
              <PenTool strokeWidth={1} size={30} />
            </div>
            <h3 className="text-xl font-vogue mb-3 tracking-wider text-stone-900">
              Artistic <span className="italic">Ethically Crafted</span>{" "}
              Minimalism
            </h3>
            <p className="text-sm font-light text-stone-500 max-w-xs leading-relaxed">
              <span className="font-vogue text-stone-900">Junhae Studio</span>{" "}
              specializes in
              <strong className="text-stone-700 font-medium">
                {" "}
                minimalist aesthetic streetwear
              </strong>
              . Our hand-crafted typography and modern graphics are designed for
              those who value art-inspired fashion and quiet luxury.
            </p>
          </article>

          {/* Highlight 2: Sustainability & Model */}
          <article className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110 duration-300">
              <Box strokeWidth={1} size={30} />
            </div>
            <h3 className="text-xl font-vogue mb-3 tracking-wider text-stone-900">
              Sustainable <span className="italic">Apparel Production</span>
            </h3>
            <p className="text-sm font-light text-stone-500 max-w-xs leading-relaxed">
              Our{" "}
              <strong className="text-stone-700 font-medium">
                made-to-order clothing
              </strong>{" "}
              model reduces overproduction. We deliver high-quality{" "}
              <span className="italic">sustainable POD apparel</span> that is
              ethically crafted to minimize environmental impact.
            </p>
          </article>

          {/* Highlight 3: Logistics */}
          <article className="flex flex-col items-center group">
            <div className="w-16 h-16 bg-crimson text-white rounded-full flex items-center justify-center mb-6 shadow-md transition-transform group-hover:scale-110 duration-300">
              <Truck size={30} strokeWidth={1} />
            </div>
            <h3 className="text-xl font-vogue mb-3 tracking-wider text-stone-900">
              Reliable <span className="italic">Global Delivery</span>
            </h3>
            <p className="text-sm font-light text-stone-500 max-w-xs leading-relaxed">
              Experience fast and{" "}
              <strong className="text-stone-700 font-medium">
                secure worldwide delivery
              </strong>
              . From production to your doorstep, we ensure your{" "}
              <span className="font-vogue text-stone-900">Junhae Studio</span>{" "}
              order arrives in pristine condition, every time.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BrandHighlights;
