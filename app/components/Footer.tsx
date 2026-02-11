"use client";
import React, { useState } from "react";
import Link from "next/link";

const Footer = () => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      setEmail("");
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-vogue text-stone-100 mb-6">
              Junhae Studio
            </h3>
            <p className="text-sm font-light leading-relaxed">
              <span className="font-vogue">Junhae Studio</span> is a global
              print-on-demand clothing brand offering minimalist and aesthetic
              apparel. Designed for modern creatives, our sustainable, ethically
              crafted pieces are available for worldwide shipping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-stone-100 font-medium tracking-wider text-sm mb-6 uppercase">
              Explore
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link
                  href="/junhae-edits"
                  className="hover:text-stone-100 transition-colors"
                >
                  Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/junhae-edits"
                  className="hover:text-stone-100 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="hover:text-stone-100 transition-colors"
                >
                  Our Story
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-stone-100 font-medium tracking-wider text-sm mb-6 uppercase">
              Support
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-stone-100 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-return"
                  className="hover:text-stone-100 transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-stone-100 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/care-instructions"
                  className="hover:text-stone-100 transition-colors"
                >
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section - New */}
          <div className="col-span-1">
            <h3 className="text-stone-100 font-medium tracking-wider text-sm mb-6 uppercase">
              Newsletter
            </h3>
            <p className="text-xs font-light mb-4 leading-relaxed">
              Join the studio. Get early access to new drops and minimalist
              style edits.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-stone-700 py-2 text-sm text-stone-100 focus:outline-none focus:border-stone-100 transition-colors placeholder:text-stone-600"
                />
                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="absolute right-0 bottom-2 text-xs font-medium uppercase tracking-widest text-stone-100 hover:opacity-70 disabled:opacity-50"
                >
                  {status === "loading" ? "..." : "Join"}
                </button>
              </div>

              {/* Feedback Messages */}
              {status === "success" && (
                <p className="text-[10px] text-green-500 mt-2 tracking-wide uppercase">
                  Welcome to the Junhae Studio.
                </p>
              )}
              {status === "error" && (
                <p className="text-[10px] text-red-400 mt-2 tracking-wide uppercase">
                  Something went wrong.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-vogue">Junhae Studio</span>. Minimalist
            fashion brand.
          </p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/terms"
              className="hover:text-stone-100 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-stone-100 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-stone-100 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
