export interface SizeGuideSize {
  size: string;
  chest: number | string;
  length: number | string;
}

export interface SizeGuide {
  _id: string;
  title: string;
  image?: {
    _type: "image";
    asset: {
      _id: string;
      url: string;
    };
  };
  sizes: SizeGuideSize[];
}

export type ProductColor = string;

export interface Category {
  title: string;
  slug: { current: string };
}

export interface ProductVariant {
  _key: string;
  color: ProductColor;
  colorCode: string;
  id: string;
  images: {
    _key: string;
    _type: "image";
    asset: { _ref: string; _type: "reference" };
  }[];
}
export interface ProductBadge {
  _key: string;
  title: string;
  value: string;
}
export interface Product {
  _id: string;
  _type: "product";
  _createdAt: string;
  name: string;
  description: string;
  slug: { _type: "slug"; current: string };
  category: Category;
  baseImage?: { _type: "image"; asset: { _ref: string } }; // optional
  badges?: ProductBadge[]; // optional
  variants: ProductVariant[];
  availableSizes: ("S" | "M" | "L" | "XL")[];
  fit: "Regular" | "Slim" | "Oversized";
  details?: string[]; // optional
  originalPrice: number;
  discountPrice: number;
  fabricDetails?: string[]; // optional
  sizeGuide?: SizeGuide; // optional
}
