"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Recycle, MapPin, Sparkles } from "lucide-react";
import { BsInstagram } from "react-icons/bs";

const OurStoryPage: React.FC = () => {
  return (
    <article className="min-h-screen bg-[#FDFCFB] text-stone-900 selection:bg-rose-100 overflow-x-hidden">
      {/* 1. HERO SECTION: Aesthetic & Latest Design Focus */}
      <section className="relative pt-24 md:pt-40 pb-16 md:pb-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-crimson"></span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-crimson font-bold">
                EST. 2025 — JUNHAE STUDIO
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-vogue tracking-tighter leading-none mb-8">
              Fashion that <br />
              <span className="italic text-crimson">Speaks Your</span> Soul.
            </h1>
          </div>
          <div className="max-w-xs border-l-2 border-rose-200 pl-6 pb-2">
            <p className="text-[10px] md:text-xs uppercase tracking-widest leading-relaxed text-stone-500">
              Merging Japanese art with K-fashion aesthetics for the modern
              dreamer.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE MOVEMENT: Latest Product Spotlight (dxdssfsf.png style) */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-0 bg-white shadow-2xl rounded-3xl overflow-hidden border border-rose-50">
          {/* Main Content Box */}
          <div className="md:col-span-5 p-10 md:p-20 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-vogue mb-8 uppercase italic flex items-center gap-3">
              The Meaning <Sparkles className="w-5 h-5 text-rose-400" />
            </h2>
            <div className="space-y-6 font-light text-stone-600 leading-loose text-sm md:text-base">
              <p>
                <span className="text-stone-900 font-medium font-vogue text-lg">
                  Junhae (준해)
                </span>{" "}
                stems from Korean roots, meaning
                <span className="text-crimson font-medium">
                  {" "}
                  {` "Truth and the Sea."`}
                </span>
              </p>
              <p>
                Inspired by the raw emotion of **BTS Arirang** and urban street
                aesthetics, our designs are a rebellion against the algorithm.
              </p>
              <div className="pt-6">
                <Link
                  href="/junhae-edits"
                  className="inline-block bg-crimson text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-rose-200"
                >
                  Shop the Latest Drop
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Image Box - Displaying the latest aesthetic */}
          <div className="md:col-span-7 relative h-125 md:h-auto overflow-hidden">
            <Image
              src="/outstory image/latest arirang collection.jpg" // Replace with your dxdssfsf.png style image
              alt="Junhae Studio Latest Design"
              width={800}
              height={800}
              className="object-cover hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-linear-to-r from-white via-transparent to-transparent hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPS: Muted & Minimalist */}
      <section className="py-20 md:py-32 bg-[#1A1A1A] text-stone-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-vogue italic mb-4">
            Simplicity is Rebellion
          </h2>
          <p className="text-stone-400 font-light tracking-widest text-xs uppercase">
            Why Choose Junhae Studio?
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              title: "Not Just Algorithms",
              desc: "Every design carries a piece of emotion and a story to tell.",
              icon: <Globe className="w-6 h-6 mb-6 text-rose-400" />,
            },
            {
              title: "Quiet Minds",
              desc: "Minimalist shirts that blend Japanese art and urban aesthetics.",
              icon: <MapPin className="w-6 h-6 mb-6 text-rose-400" />,
            },
            {
              title: "Sustainable Soul",
              desc: "No mass production. Every piece is crafted specifically for you.",
              icon: <Recycle className="w-6 h-6 mb-6 text-rose-400" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group p-8 border border-stone-800 rounded-2xl hover:bg-stone-800/30 transition-all text-center"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-vogue mb-4 italic group-hover:text-rose-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-stone-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CALL TO ACTION */}
      <section className="relative py-24 md:py-40 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-vogue mb-10 tracking-tighter leading-tight">
            Wear Your <br /> <span className="text-crimson italic">Truth.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="https://instagram.com/junhaestudio"
              className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-stone-900 border-b-2 border-rose-200 pb-2 hover:border-crimson transition-all"
            >
              <BsInstagram size={18} className="text-rose-400" /> Follow the
              Journey
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
};

export default OurStoryPage;
