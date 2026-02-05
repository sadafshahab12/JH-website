import { Product } from "./productType";
export type PageStyle = "Lined" | "Plain";
export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type MugCapacity = "11oz" | "15oz" | "12oz";

export type PriceMode = "pk" | "intl";

export interface CartItem {
  productId: string;
  productType: "apparel" | "stationery" | "mug"; 
  variantId: string;
  size?: ProductSize | MugCapacity | string; 
  color: string;
  colorCode: string;
  quantity: number;
  product: Product;
  selectedImage: string;
  selectedPrice: number;
  selectedImageAssetId?: string;
  priceMode: PriceMode;
  pageType?: "Lined" | "Plain"; 
}