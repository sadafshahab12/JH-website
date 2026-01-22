import React from "react";
import Image from "next/image";
import { Mail, Globe, Recycle, MapPin } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";

const OurStoryPage: React.FC = () => {
  return (
    <article className="min-h-screen bg-stone-50/50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-5xl mx-auto animate-fade-in">
        <header className="max-w-3xl">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-4 block">
            Designed in Pakistan — Inspired by the World
          </span>
          <h1 className="text-5xl md:text-6xl font-vogue text-stone-900 mb-6 tracking-tight">
            The Studio
          </h1>
          <p className="text-xl md:text-2xl font-light text-stone-600 leading-relaxed italic">
            {` "Bridging the gap between modern minimalism and the vibrant echoes
            of Korean culture."`}
          </p>
        </header>

        <hr className="my-12 border-stone-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-stone prose-lg font-light text-stone-600">
            <h2 className="text-3xl font-vogue text-stone-800 mb-6">
              Our Origin & Heritage
            </h2>
            <p className="mb-6">
              Junhae Studio began in the heart of Pakistan with a simple
              question:{" "}
              <span className="text-stone-900 font-normal">
                How can we create fashion that feels personal without adding to
                the noise?
              </span>
            </p>
            <p className="mb-6">
              We are a digital-first design house that blends the rich textile
              heritage of Pakistan with the clean silhouettes of East Asian
              minimalism. From our specialized <strong>Korean Silk</strong>{" "}
              blends to our typography-led streetwear, we create for the modern,
              global woman who values both culture and contemporary style.
            </p>
            <p>
              Whether it is the rhythmic pulse of <strong>Arirang</strong> or
              {`our modest-wear "Dreaming Collection," every piece is a canvas for
              expression, crafted with intentionality.`}
            </p>
          </div>
          <div className="relative h-125 w-full rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-stone-200 animate-pulse" />
            <Image
              src="/outstory image/arirang purple.jpg"
              alt="Junhae Studio aesthetic apparel - Korean inspired designs made in Pakistan"
              width={800}
              height={800}
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Philosophy / SEO Keyword Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-vogue text-stone-900 mb-12">
            Why We Create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-stone-100 rounded-xl hover:shadow-md transition-shadow">
              <Globe className="w-8 h-8 mx-auto mb-4 text-stone-700" />
              <h3 className="font-vogue text-xl mb-2">Global Vision</h3>
              <p className="text-stone-600 font-light">
                Premium fusion wear designed in Pakistan, shipping to the UK,
                USA, UAE, and beyond.
              </p>
            </div>
            <div className="p-8 border border-stone-100 rounded-xl hover:shadow-md transition-shadow">
              <MapPin className="w-8 h-8 mx-auto mb-4 text-stone-700" />
              <h3 className="font-vogue text-xl mb-2">Local Roots</h3>
              <p className="text-stone-600 font-light">
                Harnessing local craftsmanship to produce high-quality fabrics
                that meet international standards.
              </p>
            </div>
            <div className="p-8 border border-stone-100 rounded-xl hover:shadow-md transition-shadow">
              <Recycle className="w-8 h-8 mx-auto mb-4 text-stone-700" />
              <h3 className="font-vogue text-xl mb-2">Sustainable Mindset</h3>
              <p className="text-stone-600 font-light">
                Reducing waste through Print-on-Demand production and ethical
                manufacturing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-stone-900 text-stone-50 rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-vogue mb-6">Intentional Production</h3>
            <div className="space-y-6 text-stone-300 font-light leading-relaxed">
              <p>
                Traditional fashion often leads to massive environmental waste.
                At <span className="text-white font-medium">Junhae Studio</span>
                , we operate on a <strong>Print-on-Demand (POD)</strong> and
                <strong> Made-to-Order</strong> model.
              </p>
              <p>
                When you place an order from Lahore, London, or Dubai, only then
                do we prepare your piece. This allows us to offer a wider
                variety of artistic designs—from
                <span className="italic"> K-Pop aesthetic hoodies</span> to
                <span className="italic"> elegant silk coordinates</span>
                —without filling warehouses with unsold inventory.
              </p>
              <p className="text-sm border-l border-stone-500 pl-4 italic">
                By choosing us, you support a slower, kinder, and more
                thoughtful fashion cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer className="pb-20 px-6 text-center max-w-2xl mx-auto">
        <h4 className="text-2xl font-vogue text-stone-900 mb-6">
          Join Our Global Journey
        </h4>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <Link
            href="https://instagram.com/junhaestudio"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <BsInstagram /> <span>@junhaestudio</span>
          </Link>
          <Link
            href="mailto:junhaestudio@gmail.com"
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <Mail size={18} /> <span>junhaestudio@gmail.com</span>
          </Link>
        </div>
      </footer>
    </article>
  );
};

export default OurStoryPage;
