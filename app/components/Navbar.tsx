"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search } from "lucide-react";

import { useShop } from "../context/ShopContext";
import { useSearch } from "../context/searchContext";
import SearchResultsDropdown from "./SearchResultsDropdown";

/* ----------------------------------
 Types
-----------------------------------*/
interface NavLink {
  label: string;
  href: string;
}

/* ----------------------------------
 Navigation Links
-----------------------------------*/
const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "/" },
  { label: "JUNHAE EDITS", href: "/junhae-edits" },
  { label: "OUR STORY", href: "/our-story" },
  { label: "CONTACT", href: "/contact" },
];

const Navbar: React.FC = () => {
  const { toggleCart, cartCount } = useShop();
  const { searchTerm, setSearchTerm } = useSearch();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const pathname = usePathname();

  // Hide navbar in Sanity Studio
  const hideNavbar = pathname?.startsWith("/studio");

  /* ----------------------------------
   Effects
  -----------------------------------*/
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    const toggle = () => {
      setIsMobileMenuOpen(false);
      setIsMobileSearchOpen(false);
      setSearchTerm("");
    };
    toggle();
  }, [pathname, setSearchTerm]);

  // Escape key closes search
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileSearchOpen(false);
        setSearchTerm("");
      }
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [setSearchTerm]);
  if (hideNavbar) return null;
  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md border-stone-200 py-3"
            : "bg-transparent border-transparent py-4 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-vogue tracking-tight font-medium text-stone-900 z-50"
          >
            Junhae Studio
          </Link>

          {/* Desktop Search */}
          <div className="relative hidden md:block w-72">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search essentials..."
              className="w-full rounded-full border border-stone-200 bg-white/80 backdrop-blur px-5 py-2 text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 transition"
            />
            {searchTerm && <SearchResultsDropdown />}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12 text-sm font-medium tracking-wide text-stone-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-stone-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center  z-50">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsMobileSearchOpen((prev) => !prev)}
              className="md:hidden p-2 text-stone-800"
              aria-label="Search"
            >
              <Search size={22} />
            </button>

            {/* Cart */}
            <button
              onClick={() => toggleCart(true)}
              className="relative p-1 text-stone-800 hover:text-stone-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-stone-800 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 text-stone-800"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE SEARCH BAR ================= */}
        {isMobileSearchOpen && (
          <div className="md:hidden px-6 pb-4 pt-2 bg-white border-t border-stone-200 relative">
            <input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search essentials..."
              className="w-full rounded-full border border-stone-200 px-5 py-2 text-sm focus:outline-none focus:border-stone-900"
            />
            {searchTerm && <SearchResultsDropdown />}
          </div>
        )}
      </nav>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl font-light tracking-widest text-stone-900">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
