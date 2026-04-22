export type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  description: string;
  category: string;
  image: string;
  gallery?: string[];
  rating: ProductRating;
  featured?: boolean;
  stockQuantity: number;
};

export type CartItem = {
  id: number;
  title: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  category: string;
  quantity: number;
  stockQuantity: number;
};

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  fullName: string;
};

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "hub"
  | "courier_assigned"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cod" | "bkash" | "nagad";

export type PaymentStatus = "pending" | "paid" | "failed";

export type OrderLineItem = {
  productId: number;
  title: string;
  category: string;
  image: string;
  quantity: number;
  price: number;
  compareAtPrice?: number | null;
  lineTotal: number;
};

export type OrderTimelineEntry = {
  status: OrderStatus;
  label: string;
  description: string;
  createdAt: string;
};

export type Order = {
  id: number;
  trackingToken: string;
  trackingNumber: string;
  customerUserId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingArea: string;
  shippingZone: string;
  notes?: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  itemsSnapshot: OrderLineItem[];
  statusTimeline: OrderTimelineEntry[];
  adminNote?: string | null;
  createdAt: string;
  updatedAt: string;
};
