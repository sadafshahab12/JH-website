"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Product, ProductColor } from "../types/productType";
import {
  CartItem,
  MugCapacity,
  PageStyle,
  ProductSize,
} from "../types/cartItems";
import { client } from "@/sanity/lib/client";
import { shopContextQuery } from "../lib/shopContextQuery";
declare global {
  interface Window {
    fbq: (
      type: string,
      event: string,
      params?: Record<string, string | number | string[] | undefined>,
    ) => void;
  }
}
type AnySize = ProductSize | MugCapacity | string;
interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;

  addToCart: (
    product: Product,
    size: AnySize,
    color: ProductColor,
    colorCode: string,
    variantId: string,
    selectedImage: string,
    selectedPrice: number,
    priceMode: "pk" | "intl",
    productType: "apparel" | "stationery" | "mug",
    pageType?: PageStyle,
  ) => void;

  removeFromCart: (
    productId: string,
    variantId: string,
    size: AnySize,
    colorCode: string,
    priceMode: "pk" | "intl",
    pageType?: string,
  ) => void;

  updateQuantity: (
    variantId: string,
    size: AnySize,
    colorCode: string,
    delta: number,
    pageType?: string,
  ) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await client.fetch(shopContextQuery);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("junhae_cart");
    const saveCart = () => {
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    };
    saveCart();
  }, []);

  useEffect(() => {
    localStorage.setItem("junhae_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    size: AnySize,
    color: ProductColor,
    colorCode: string,
    variantId: string,
    selectedImage: string,
    selectedPrice: number,
    priceMode: "pk" | "intl",
    productType: "apparel" | "stationery" | "mug",
    pageType?: "Lined" | "Plain",
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color &&
          item.variantId === variantId &&
          item.colorCode === colorCode &&
          item.priceMode === priceMode &&
          item.productType === productType &&
          item.pageType === pageType,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color &&
          item.variantId === variantId &&
          item.colorCode === colorCode &&
          item.productType === productType &&
          item.priceMode === priceMode &&
          item.pageType === pageType // ✅ Match pageType
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          productType,
          variantId,
          size,
          color,
          colorCode,
          quantity: 1,
          product,
          selectedImage,
          selectedPrice,
          priceMode,
          pageType,
        },
      ];
    });
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "AddToCart", {
        content_name: product.name,
        content_category: productType,
        content_ids: [product._id],
        content_type: "product",
        value: selectedPrice,
        currency: priceMode === "pk" ? "PKR" : "USD",
      });
    }
    // setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: string,
    variantId: string,
    size: AnySize,
    colorCode: string,
    priceMode: "pk" | "intl",
    pageType?: string,
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId &&
            item.size === size &&
            item.colorCode === colorCode &&
            item.priceMode === priceMode &&
            item.pageType === pageType
          ),
      ),
    );
  };

  const updateQuantity = (
    variantId: string,
    size: AnySize,
    colorCode: string,
    delta: number,
    pageType?: string,
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.variantId === variantId &&
          item.size === size &&
          item.colorCode === colorCode &&
          item.pageType === pageType
        ) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  const toggleCart = (isOpen?: boolean) => {
    setIsCartOpen((prev) => (isOpen !== undefined ? isOpen : !prev));
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.selectedPrice * item.quantity,
    0,
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        cartTotal,
        cartCount,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
