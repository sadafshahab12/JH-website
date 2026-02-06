import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { BsInstagram } from "react-icons/bs";
import {
  ArrowRight,
  Box,
  PenTool,
  Truck,
  Globe,
  Recycle,
  Ruler,
  Plus,
  Minus,
  Upload,
  Loader2,
  MapPin,
  ChevronDown,
  Mail,
  Phone,
  ShoppingBag,
  CheckCircle2,
  Menu,
  X,
  Search,
} from "lucide-react";
import { groq } from "next-sanity";
import { ReviewWithProduct } from "../types/reviewType";
import FeaturedCard from "../components/FeaturedCard";
import BrandHighlights from "../components/BrandHighlights";
import { useShop } from "../context/ShopContext";
import { useSearch } from "../context/searchContext";
import SearchResultsDropdown from "../components/SearchResultsDropdown";
import { jsPDF } from "jspdf";
import autoTable, { Color } from "jspdf-autotable";
//type
import { Product, ProductVariant } from "@/app/types/productType";
import { ProductSize } from "@/app/types/cartItems";
import { Review } from "@/app/types/reviewType";
import { PopulatedOrder } from "../types/orderType";
//components
import { productDetailRelatedQuery } from "@/app/lib/productDetailRelatedQuery";
import { productDetailPageReview } from "@/app/lib/reviewDataQuery";
import { productDetailBySlugQuery } from "@/app/lib/productDetailBySlugQuery";
import { Check, Share2 } from "lucide-react";
import { getEstimatedDelivery } from "../utils/getEstimatedDelivery";
import { getPrices } from "../utils/getPrices";
import ColorPicker from "../components/ColorPicker";
import { BreadCrumbs } from "../components/BreadCrumbs";
import ProductDetailReviews from "../components/ProductDetailReviews";
import RelatedProducts from "../components/RelatedProducts";
import CompletetheLook from "../components/CompletetheLook";
import SizeGuideModal from "../components/SizeGuideModal";
import RelatedProductSkeleton from "../components/RelatedProductSkeleton";
import AddtoCartModal from "../components/AddtoCartModal";
import PageTypeSelection from "../components/PageTypeSelection";
import ProductTabInstructions from "../components/ProductTabInstructions";
import ApparelMugSizeButton from "../components/ApparelMugSizeButton";
import { MugCapacity } from "../types/cartItems";
import ReviewsSection from "../components/ReviewsSection";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductSkeleton from "../components/ProductSkeleton";
import { ReviewSkeleton } from "../components/ReviewSkeleton";
// icons
export {
  ArrowRight,
  Box,
  PenTool,
  Truck,
  Plus,
  Minus,
  Upload,
  Globe,
  ChevronDown,
  Recycle,
  Loader2,
  Check,
  Share2,
  BsInstagram,
  MapPin,
  ShoppingBag,
  CheckCircle2,
  Menu,
  X,
  Search,
  Ruler,
  Mail,
  Phone,
};

export { client, groq, urlFor, useShop, useSearch, jsPDF, autoTable };
//types
export type {
  Color,
  ReviewWithProduct,
  Product,
  ProductVariant,
  ProductSize,
  Review,
  PopulatedOrder,
  MugCapacity,
};

export {
  productDetailBySlugQuery,
  productDetailPageReview,
  productDetailRelatedQuery,
  getEstimatedDelivery,
  getPrices,
};
//comp
export {
  SearchResultsDropdown,
  FeaturedCard,
  BrandHighlights,
  RelatedProductSkeleton,
  RelatedProducts,
  ColorPicker,
  BreadCrumbs,
  ProductDetailReviews,
  ApparelMugSizeButton,
  SizeGuideModal,
  CompletetheLook,
  AddtoCartModal,
  PageTypeSelection,
  ProductTabInstructions,
  ProductSkeleton,
  ReviewSkeleton,
  ReviewsSection,
  FeaturedProducts,
};
