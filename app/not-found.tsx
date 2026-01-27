"use client";

import Link from "next/link";
import { MoveLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FDFDFD] px-6 py-12 overflow-hidden selection:bg-stone-200">
      {/* Ethereal Brand Backdrop 
         Responsive: Hidden on very small screens, scales perfectly on desktop 
      */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[25vw] font-vogue text-stone-900/3 leading-none transition-all duration-1000">
          JUNHAE
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        {/* Top Accent Line */}
        <div className="w-px h-12 bg-linear-to-b from-transparent to-stone-300 mb-8 animate-in slide-in-from-top duration-1000" />

        <div className="space-y-8 md:space-y-12 text-center">
          {/* Header Section */}
          <div className="space-y-3 md:space-y-4">
            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-stone-400 font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              Error 404 — The Void
            </p>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-vogue text-stone-900 tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Lost in <br className="sm:hidden" />
              <span className="italic hover:tracking-normal transition-all duration-700 cursor-default">
                Silence
              </span>
            </h1>
          </div>

          {/* Descriptive Text - Fluid width for better line breaks */}
          <div className="max-w-70 sm:max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 fill-mode-forwards ">
            <p className="text-stone-500 font-light text-xs sm:text-sm md:text-base leading-relaxed">
              The page you are seeking has drifted beyond our current
              collection. Retrace your steps or explore our latest edits.
            </p>
          </div>

          {/* Responsive Action Menu */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 pt-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-forwards ">
            {/* Secondary Link: Minimalist Underline */}
            <Link
              href="/"
              className="group flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-medium text-stone-400 hover:text-stone-900 transition-colors duration-300 relative"
            >
              <MoveLeft
                size={14}
                className="transition-transform group-hover:-translate-x-2"
              />
              <span>Back to Home</span>
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Primary CTA: High-End Button */}
            <Link
              href="/junhae-edits"
              className="group flex items-center gap-3 rounded-full bg-stone-900 px-10 py-4 md:px-12 md:py-5 text-white text-[10px] md:text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all duration-300 active:scale-95 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
            >
              <ShoppingBag
                size={14}
                className="group-hover:rotate-12 transition-transform"
              />
              Shop Collection
            </Link>
          </div>
        </div>

        {/* Dynamic Timestamp / Footer */}
        <div className="mt-24 md:mt-32 text-center animate-in fade-in duration-3000  fill-mode-forwards">
          <p className="text-[9px] md:text-[10px] text-stone-300 uppercase tracking-[0.4em] flex items-center gap-4">
            <span className="w-8 h-px bg-stone-100" />©{" "}
            {new Date().getFullYear()} Junhae Studio
            <span className="w-8 h-px bg-stone-100" />
          </p>
        </div>
      </div>

      {/* Grain Overlay - Essential for the "Premium Paper" feel */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.15] mix-blend-multiply bg-[url('https://res.cloudinary.com/dlv996vva/image/upload/v1711200000/noise_o7n0up.png')]"></div>

      {/* Corner Accents for Ultra-wide screens */}
      <div className="hidden lg:block fixed top-12 left-12 w-12 h-px bg-stone-200 rotate-90 origin-left opacity-50" />
      <div className="hidden lg:block fixed bottom-12 right-12 w-12 h-px bg-stone-200 rotate-90 origin-right opacity-50" />
    </main>
  );
}
