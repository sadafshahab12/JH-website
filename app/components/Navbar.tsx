"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { Category } from "../types/productType";

const Navbar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { toggleCart, cartCount } = useShop();
  const { searchTerm, setSearchTerm } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dynamicCategories, setDynamicCategories] = useState<Category[]>([]);

  const hideNavbar = pathname?.startsWith("/studio");

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query.replace(/-/g, " "));
    }
  }, [searchParams, setSearchTerm]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await client.fetch(`*[_type == "category"]{ 
        title, 
        slug
      }`);
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
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
      setShowDropdown(false);
    };
    toggleMobileMenu();
  }, [pathname]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      const searchSlug = searchTerm.toLowerCase().trim().replace(/\s+/g, "-");

      setShowDropdown(false);
      setIsMobileSearchOpen(false);
      setIsMobileMenuOpen(false);

      router.push(`/junhae-edits?search=${searchSlug}`);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setShowDropdown(false);
    if (searchParams.get("search")) {
      router.push("/junhae-edits");
    }
  };

  const NAV_LINKS = [
    { label: "HOME", href: "/" },
    {
      label: "JUNHAE EDITS",
      href: "/junhae-edits",
      subLinks: [
        { label: "All Products", href: "/junhae-edits" },
        ...dynamicCategories.map((cat) => ({
          label: cat.title,
          href: `/junhae-edits?category=${cat.slug.current}`,
        })),
      ],
    },
    { label: "OUR STORY", href: "/our-story" },
    { label: "CONTACT", href: "/contact" },
  ];

  if (hideNavbar) return null;

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-white/95 backdrop-blur-md border-stone-200 py-3" : "bg-transparent border-transparent py-4 sm:py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-vogue tracking-tight font-medium text-stone-900 z-50"
          >
            Junhae Studio
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-stone-600">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="hover:text-stone-900 transition-colors flex items-center gap-1 py-2"
                >
                  {link.label}
                  {link.subLinks && link.subLinks.length > 0 && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </Link>
                {link.subLinks && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 w-56 bg-white border border-stone-100 shadow-xl rounded-lg py-3 animate-in fade-in slide-in-from-top-2">
                    {link.subLinks.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block px-6 py-2 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 z-50">
            {/* Desktop Search */}
            <div className="relative hidden lg:block w-48 xl:w-64 mr-4">
              <input
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="w-full rounded-full border border-stone-200 bg-white/80 pl-4 pr-10 py-1.5 text-xs focus:outline-none focus:border-stone-900"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              {searchTerm && showDropdown && <SearchResultsDropdown />}
            </div>

            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-stone-800"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => toggleCart(true)}
              className="relative p-2 text-stone-800"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-stone-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="md:hidden p-2 text-stone-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-6 pb-4 pt-2 bg-white border-t border-stone-200 shadow-sm animate-in slide-in-from-top">
            <div className="relative">
              <input
                autoFocus
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search products..."
                className="w-full rounded-full border border-stone-200 pl-5 pr-12 py-2 text-sm focus:border-stone-900 outline-none"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            {searchTerm && showDropdown && <SearchResultsDropdown />}
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex flex-col pt-32 px-10 space-y-6 overflow-y-auto h-full pb-10">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="border-b border-stone-100 pb-4">
              <Link
                href={link.href}
                className="text-xl font-medium text-stone-900 block mb-2"
              >
                {link.label}
              </Link>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {link.subLinks?.map((sub) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    className="text-sm text-stone-500 hover:text-stone-900"
                  >
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
