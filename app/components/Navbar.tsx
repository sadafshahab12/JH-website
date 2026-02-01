"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  useShop,
  useSearch,
  SearchResultsDropdown,
  ChevronDown,
  client,
} from "../exports/homeExports";

const Navbar: React.FC = () => {
  const router = useRouter();
  const { toggleCart, cartCount } = useShop();
  const { searchTerm, setSearchTerm } = useSearch();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dynamicCategories, setDynamicCategories] = useState<{ title: string; slug: string }[]>([]);

  const pathname = usePathname();
  const hideNavbar = pathname?.startsWith("/studio");

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await client.fetch(`*[_type == "category"]{ title, "slug": slug.current }`);
        setDynamicCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCats();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  // 💡 Enter Key Handler with Auto-Close Results
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const query = searchTerm; 
      setSearchTerm(""); // 💡 Close dropdown & clear bar
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);
      router.push(`/junhae-edits?search=${encodeURIComponent(query)}`);
    }
  };

  const NAV_LINKS = [
    { label: "HOME", href: "/" },
    {
      label: "SHOP",
      href: "/junhae-edits",
      subLinks: [
        { label: "All Products", href: "/junhae-edits" },
        ...dynamicCategories.map((cat) => ({
          label: cat.title,
          href: `/junhae-edits?category=${encodeURIComponent(cat.title)}`,
        })),
      ],
    },
    { label: "OUR STORY", href: "/our-story" },
    { label: "CONTACT", href: "/contact" },
  ];

  if (hideNavbar) return null;

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-white/95 backdrop-blur-md border-stone-200 py-3" : "bg-transparent border-transparent py-4 sm:py-6"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-vogue tracking-tight font-medium text-stone-900 z-50">
            Junhae Studio
          </Link>

          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-stone-600">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="relative group" onMouseEnter={() => setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={link.href} className="hover:text-stone-900 transition-colors flex items-center gap-1 py-2">
                  {link.label}
                  {link.subLinks && link.subLinks.length > 0 && (
                    <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  )}
                </Link>

                {link.subLinks && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-stone-100 shadow-xl rounded-lg py-3 animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((sub) => (
                      <Link key={sub.label} href={sub.href} className="block px-6 py-2 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 z-50">
            <div className="relative hidden lg:block w-48 xl:w-64 mr-4">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full rounded-full border border-stone-200 bg-white/80 px-4 py-1.5 text-xs focus:outline-none focus:border-stone-900"
              />
              {searchTerm && <SearchResultsDropdown />}
            </div>

            <button onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} className="md:hidden p-2 text-stone-800">
              <Search size={20} />
            </button>

            <button onClick={() => toggleCart(true)} className="relative p-2 text-stone-800">
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-stone-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-2 text-stone-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileSearchOpen && (
          <div className="md:hidden px-6 pb-4 pt-2 bg-white border-t border-stone-200 shadow-sm animate-in slide-in-from-top">
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search products..."
              className="w-full rounded-full border border-stone-200 px-5 py-2 text-sm focus:border-stone-900 outline-none"
            />
            {searchTerm && <SearchResultsDropdown />}
          </div>
        )}
      </nav>

      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="flex flex-col pt-32 px-10 space-y-6 overflow-y-auto h-full pb-10">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="border-b border-stone-100 pb-4">
              <Link href={link.href} className="text-xl font-medium text-stone-900 block mb-2">
                {link.label}
              </Link>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {link.subLinks?.map((sub) => (
                  <Link key={sub.label} href={sub.href} className="text-sm text-stone-500 hover:text-stone-900">
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;