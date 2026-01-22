import { Product } from "./productType";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface CartItem {
  productId: string;
  variantId: string;
  size: ProductSize;
  color: string;
  colorCode: string;
  quantity: number;
  product: Product;
  selectedImage: string;
  selectedPrice: number;
  selectedImageAssetId?: string;
}
