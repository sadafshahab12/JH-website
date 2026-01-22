/* ---------- SANITY HELPERS ---------- */

export interface SanityReference {
  _type: "reference";
  _ref: string;
}

export interface SanityFileReference {
  _type: "file";
  asset: SanityReference;
}

export interface SanityImageReference {
  _type: "image";
  asset: SanityReference;
}

/* ---------- ORDER STATUS ---------- */

export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "completed"
  | "cancelled";

/* ---------- CUSTOMER ---------- */

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  customization?: string;
}

/* ---------- ORDER ITEM ---------- */

export type OrderSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface OrderItem {
  product: SanityReference; // product document reference
  variantId: string;
  size: OrderSize;
  color: string;
  colorCode: string;
  quantity: number;
  price: number; // single item price
  image?: SanityImageReference;
}

/* ---------- PAYMENT ---------- */

export interface OrderPayment {
  method: "EasyPaisa";
  receipt?: SanityFileReference;
}

/* ---------- STORED ORDER (SANITY) ---------- */

export interface Order {
  _id?: string; // returned by Sanity
  _createdAt?: string;
  _type: "order";

  orderNumber: string; // <-- added

  customer: OrderCustomer;
  items: OrderItem[];

  payment: OrderPayment;

  subtotal: number;
  shippingFee: number;
  total: number;

  status: OrderStatus;
}

export interface CreateOrderPayload {
  _type: "order";

  orderNumber?: string; // <-- added (optional because you may generate it in backend)

  customer: OrderCustomer;

  items: {
    _key: string;
    product: SanityReference;
    variantId: string;
    size: OrderSize;
    color: string;
    colorCode: string;
    quantity: number;
    price: number;
  }[];

  subtotal: number;
  shippingFee: number;
  total: number;

  payment: {
    method: "EasyPaisa";
    receiptAssetId?: string; // uploaded first
  };
}
export interface PopulatedOrderItem {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    price: number;
  };
  variantId: string;
  size: OrderSize;
  color: string;
  colorCode: string;
  quantity: number;
  price: number;
}
export interface PopulatedOrder {
  _id?: string;
  _type: "order";
  orderNumber: string;
  customer: OrderCustomer;
  items: PopulatedOrderItem[];
  payment: OrderPayment;
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
}
