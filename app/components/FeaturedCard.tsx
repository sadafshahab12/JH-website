import Image from "next/image";

const FeaturedCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Brand Story - Focus: Brand Identity */}
      <section className="bg-stone-50 border border-stone-200 rounded-3xl p-6 transition-transform hover:-translate-y-1 duration-300">
        <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
          <Image
            src="/outstory image/our story.png"
            alt="Junhae Studio's journey into minimalist and sustainable fashion"
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h2 className="text-xl font-vogue text-stone-900 mb-3">
          Our Brand Story
        </h2>
        <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
          <span className="font-vogue text-stone-900">Junhae Studio</span> was
          created for the modern minimalist. We are a{" "}
          <strong className="text-stone-800 font-medium">
            premium apparel brand
          </strong>{" "}
          that values quiet luxury, timeless design, and{" "}
          <span className="italic">sustainable fashion practices</span>.
        </p>
      </section>

      {/* Processing Method - Focus: Print-on-Demand & Quality */}
      <section className="bg-stone-50 border border-stone-200 rounded-3xl p-6 transition-transform hover:-translate-y-1 duration-300">
        <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
          <Image
            src="/outstory image/how its made.png"
            alt="The ethical print-on-demand process at Junhae Studio"
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h2 className="text-xl font-vogue text-stone-900 mb-3">
          Ethical Production
        </h2>
        <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
          To reduce environmental waste, we utilize an{" "}
          <strong className="text-stone-800 font-medium italic">
            ethical print-on-demand
          </strong>{" "}
          model. Every order is meticulously checked for quality and packed for
          secure <span className="italic">worldwide delivery</span>.
        </p>
        <ul className="mt-4 space-y-2 text-stone-500 text-xs md:text-sm font-light uppercase tracking-wider">
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
            Exclusive In-house Designs
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
            Zero-Waste Made-to-order
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1 h-1 bg-stone-400 rounded-full"></span>
            Premium Quality Fabrics
          </li>
        </ul>
      </section>

      {/* Trust / Benefits - Focus: Consumer Value */}
      <section className="bg-stone-50 border border-stone-200 rounded-3xl p-6 transition-transform hover:-translate-y-1 duration-300">
        <div className="relative w-full h-44 mb-6 rounded-2xl overflow-hidden">
          <Image
            src="/outstory image/why choose us.png"
            alt="Why Junhae Studio is the choice for minimalist streetwear"
            width={600}
            height={400}
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h2 className="text-xl font-vogue text-stone-900 mb-3">
          The Junhae Advantage
        </h2>
        <p className="text-stone-600 font-light leading-relaxed text-sm md:text-base">
          Choose <strong className="text-stone-900">Junhae Studio</strong> for
          minimalist designs that don&apos;t compromise on quality. Our apparel
          is built for style, comfort, and longevity.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg border border-stone-100">
            <span className="w-2 h-2 rounded-full bg-stone-900"></span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 font-medium">
              Ethically Crafted Apparel
            </span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-white/50 rounded-lg border border-stone-100">
            <span className="w-2 h-2 rounded-full bg-stone-900"></span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-stone-500 font-medium">
              Global Secure Shipping
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedCard;
