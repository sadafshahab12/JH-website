"use client";

import React, { createContext, useContext, useState, useMemo } from "react";

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resetSearch: () => void;
}


const SearchContext = createContext<SearchContextType | undefined>(undefined);


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


  const resetSearch = () => setSearchTerm("");


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
