import { Product } from "./productType";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type PriceMode = "pk" | "intl";
export interface CartItem {
  productId: string;
  productType: "apparel" | "stationery";
  variantId: string;
  size: ProductSize;
  color: string;
  colorCode: string;
  quantity: number;
  product: Product;
  selectedImage: string;
  selectedPrice: number;
  selectedImageAssetId?: string;
  priceMode: PriceMode;
  pageType?: string;
}
