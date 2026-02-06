import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-vogue text-stone-100 mb-6">
              Junhae Studio
            </h3>
            <p className="text-sm font-light leading-relaxed max-w-sm">
              <span className="font-vogue">Junhae Studio</span> is a global
              print-on-demand clothing brand offering minimalist and aesthetic
              apparel. Designed for modern creatives, our sustainable, ethically
              crafted pieces are available for worldwide shipping.
            </p>
          </div>

          <div>
            <h3 className="text-stone-100 font-medium tracking-wider text-sm mb-6">
              EXPLORE
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
              <li>
                <Link
                  href="/contact"
                  className="hover:text-stone-100 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-stone-100 font-medium tracking-wider text-sm mb-6">
              SUPPORT
            </h3>
            <ul className="space-y-4 text-sm font-light">
              <li>
                <Link
                  href="/faq"
                  className="hover:text-stone-100 transition-colors"
                >
                  FAQ (Worldwide Shipping)
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-return"
                  className="hover:text-stone-100 transition-colors"
                >
                  Shipping & Returns (Global Delivery)
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-stone-100 transition-colors"
                >
                  Size Guide (International Sizes)
                </Link>
              </li>
              <li>
                <Link
                  href="/care-instructions"
                  className="hover:text-stone-100 transition-colors"
                >
                  Care Instructions (Print-on-Demand Apparel)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-vogue">Junhae Studio</span>. Minimalist
            fashion brand with worldwide shipping & ethical production.
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
