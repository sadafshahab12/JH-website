"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import { Product, ProductColor } from "../types/productType";
import { CartItem, ProductSize } from "../types/cartItems";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  isCartOpen: boolean;

  addToCart: (
    product: Product,
    size: ProductSize,
    color: ProductColor,
    colorCode: string,
    variantId: string,
    selectedImage: string,
    selectedPrice: number,
  ) => void;

  removeFromCart: (
    productId: string,
    variantId: string,
    size: ProductSize,
    colorCode: string,
  ) => void;

  updateQuantity: (
    variantId: string,
    size: ProductSize,
    colorCode: string,
    delta: number,
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
      const data = await client.fetch(groq`
      *[_type == "product"]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        slug,
        originalPrice,
        discountPrice,
        description,
        fit,
        fabricDetails,
        availableSizes,
        category->{
          _id,
          title,
          slug
        },
        badges[]->{
          _id,
          title,
          color
        },
        baseImage{
          _type,
          asset->{
            _id,
            url
          }
        },
        sizeGuide->{
          _id,
          title,
          image{
            _type,
            asset->{_id, url}
          },
          sizes[] {
            size,
            chest,
            length
          }
        },
        variants[]{
          _key,
          id,
          color,
          colorCode,
          images[] {
            _key,
            _type,
            asset->{
              _id,
              url
            }
          }
        }
      }
    `);

      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem("junhae_cart");
    const saveCart = () => {
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
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
    size: ProductSize,
    color: ProductColor,
    colorCode: string,
    variantId: string,
    selectedImage: string,
    selectedPrice: number,
  ) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color &&
          item.variantId === variantId &&
          item.colorCode === colorCode,
      );

      if (existingItem) {
        return prev.map((item) =>
          item.productId === product._id &&
          item.size === size &&
          item.color === color &&
          item.variantId === variantId &&
          item.colorCode === colorCode
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          variantId,
          size,
          color,
          colorCode,
          quantity: 1,
          product,
          selectedImage,
          selectedPrice,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: string,
    variantId: string,
    size: ProductSize,
    colorCode: string,
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId &&
            item.size === size &&
            item.colorCode === colorCode
          ),
      ),
    );
  };

  const updateQuantity = (
    variantId: string,
    size: ProductSize,
    colorCode: string,
    delta: number,
  ) => {
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.variantId === variantId &&
          item.size === size &&
          item.colorCode === colorCode
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
    (total, item) =>
      total +
      (item.product.discountPrice ?? item.product.originalPrice) *
        item.quantity,
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
