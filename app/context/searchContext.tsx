"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

// Types define karte hain taake error na aaye
interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resetSearch: () => void;
}

// Context create ho raha hai
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Custom hook taake components mein asani se use ho sake
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

// Provider Component
export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Search ko clear karne ka function (optional but useful)
  const resetSearch = () => setSearchTerm("");

  // Performance optimize karne ke liye values ko memoize karte hain
  const value = useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      resetSearch,
    }),
    [searchTerm],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
