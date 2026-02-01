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
};

//comp
export { SearchResultsDropdown, FeaturedCard, BrandHighlights };
