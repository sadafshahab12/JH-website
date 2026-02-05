export interface ModelStats {
  height?: string;
  weight?: string;
  sizeWorn?: string;
  fitDescription?: string;
}
export interface MugSizeGuideSize {
  sizeLabel: string;
  capacity?: number;
  height?: string;
  diameter?: string;
}
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}
export interface MugSizeGuide {
  _id: string;
  _type: "mugSizeGuide";
  title: string;
  image?: SanityImage;
  sizes: MugSizeGuideSize[];
  materialInfo?: {
    material?: string;
    isDishwasherSafe?: boolean;
    isMicrowaveSafe?: boolean;
  };
  usageTip?: string;
}
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
  modelStats?: ModelStats;
  sizeTip?: string;
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
  _id: string;
  title: string;
  value: string;
  color?: string;
}

export interface RegionalPrice {
  original: number;
  discount?: number;
}

// 💡 NEW: Stationery Specs Interface
export interface ProductSpecs {
  material?: string[];
  dimensions?: string;
  other?: string[];
}
export interface UpsellProduct {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  baseImage?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  pricing: {
    pkPrice: RegionalPrice;
    intlPrice: RegionalPrice;
  };
}

export interface Product {
  _id: string;
  _type: "product";
  _createdAt: string;
  name: string;
  inventory?: number;
  productType: "apparel" | "stationery" | "mug";
  completeTheLook?: UpsellProduct[];
  description: string;
  slug: { _type: "slug"; current: string };
  category: Category;
  baseImage?: { _type: "image"; asset: { _ref: string } };
  badges?: ProductBadge[];
  variants?: ProductVariant[];
  careInstructions?: string[];
  shippingDetails?: string;
  // 💡 Apparel Fields
  sizeGuide?: SizeGuide;
  availableSizes?: ("XS" | "S" | "M" | "L" | "XL" | "XXL")[];
  // ✅ Mug Fields (New)
  mugCapacity?: ("11oz" | "15oz" | "12oz")[];
  mugSizeGuide?: MugSizeGuide;
  fit?: string[];
  productSpecs?: ProductSpecs;
  pricing: {
    pkPrice: RegionalPrice;
    intlPrice: RegionalPrice;
  };
  fabricDetails?: string[];
  details?: string[];
}
