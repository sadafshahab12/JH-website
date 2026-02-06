import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="group relative w-full max-w-lg mx-auto overflow-hidden rounded-[3rem] border border-stone-100 bg-white py-20 text-center shadow-sm transition-all hover:shadow-md">
      {/* Soft Background Glow */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-stone-50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Animated Character Container */}
        <div className="relative mb-8 transform transition-transform duration-700 ease-out group-hover:scale-105">
          <div className="animate-bounce-slow">
            <Image
              src="/checkout-images/cart-is-empty.png"
              alt="Lonely Chibi Character"
              className="h-64 w-auto object-contain drop-shadow-sm"
              width={800}
              height={800}
              loading="eager"
            />
          </div>
          {/* Decorative Sparkles (Optional CSS-only) */}
          <div className="absolute -right-4 top-10 opacity-0 transition-opacity group-hover:opacity-100 delay-100">
            ✨
          </div>
          <div className="absolute -left-4 top-20 opacity-0 transition-opacity group-hover:opacity-100 delay-300">
            ✨
          </div>
        </div>

        {/* Typography */}
        <h2 className="text-4xl font-bold tracking-tight text-slate-800">
          Your cart is lonely
        </h2>

        <p className="mt-4 max-w-70 text-lg leading-relaxed text-stone-500/80">
          {` Looks like you haven't added anything to your bag yet.`}
          <span className="block italic">{`Let's find something special.`}</span>
        </p>

        {/* Action Button */}
        <button
          onClick={() => router.push("/junhae-edits")}
          className="mt-12 min-w-60 rounded-full bg-[#5D636D] px-10 py-5 text-sm font-bold tracking-widest text-white shadow-xl shadow-stone-200 transition-all hover:bg-slate-700 hover:shadow-stone-300 active:scale-95"
        >
          START SHOPPING
        </button>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EmptyCart;
