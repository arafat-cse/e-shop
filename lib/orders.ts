import "server-only";

import crypto from "crypto";

import { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";

import { getDbPool } from "@/lib/db";
import { SHIPPING_FEE } from "@/lib/constants";
import {
  CartItem,
  Order,
  OrderLineItem,
  OrderStatus,
  OrderTimelineEntry,
  PaymentMethod,
  PaymentStatus
} from "@/lib/types";

type OrderRow = RowDataPacket & {
  id: number;
  tracking_token: string;
  tracking_number: string;
  customer_user_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  shipping_area: string;
  shipping_zone: string;
  notes: string | null;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  status: OrderStatus;
  subtotal: number | string;
  shipping_fee: number | string;
  discount_amount: number | string;
  total: number | string;
  items_snapshot: string | OrderLineItem[];
  status_timeline: string | OrderTimelineEntry[];
  admin_note: string | null;
  created_at: string;
  updated_at: string;
};

type ProductRow = RowDataPacket & {
  id: number;
  title: string;
  price: number | string;
  compare_at_price: number | string | null;
  category: string;
  image: string;
  stock_quantity: number;
};

type CheckoutPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  shippingArea: string;
  shippingZone: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
};

function parseJsonField<T>(value: string | T): T {
  if (typeof value !== "string") {
    return value;
  }

  return JSON.parse(value) as T;
}

function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    trackingToken: row.tracking_token,
    trackingNumber: row.tracking_number,
    customerUserId: row.customer_user_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    shippingAddress: row.shipping_address,
    shippingArea: row.shipping_area,
    shippingZone: row.shipping_zone,
    notes: row.notes,
    paymentMethod: row.payment_method,
    paymentStatus: row.payment_status,
    status: row.status,
    subtotal: Number(row.subtotal),
    shippingFee: Number(row.shipping_fee),
    discountAmount: Number(row.discount_amount),
    total: Number(row.total),
    itemsSnapshot: parseJsonField<OrderLineItem[]>(row.items_snapshot),
    statusTimeline: parseJsonField<OrderTimelineEntry[]>(row.status_timeline),
    adminNote: row.admin_note,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function buildTrackingNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `ESHOP-${stamp}-${suffix}`;
}

function buildTrackingToken() {
  return crypto.randomBytes(16).toString("hex");
}

function buildInitialTimeline(): OrderTimelineEntry[] {
  const createdAt = new Date().toISOString();

  return [
    {
      status: "placed",
      label: "Order placed",
      description: "Your order has been received and is waiting for confirmation.",
      createdAt
    }
  ];
}

export async function listOrdersForUser(userId: number) {
  const [rows] = await getDbPool().query<OrderRow[]>(
    `SELECT *
     FROM orders
     WHERE customer_user_id = ?
     ORDER BY id DESC`,
    [userId]
  );

  return rows.map(mapOrder);
}

export async function getOrderForUser(userId: number, trackingToken: string) {
  const [rows] = await getDbPool().query<OrderRow[]>(
    `SELECT *
     FROM orders
     WHERE customer_user_id = ? AND tracking_token = ?
     LIMIT 1`,
    [userId, trackingToken]
  );

  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function getOrderByTrackingToken(trackingToken: string) {
  const [rows] = await getDbPool().query<OrderRow[]>(
    `SELECT *
     FROM orders
     WHERE tracking_token = ?
     LIMIT 1`,
    [trackingToken]
  );

  return rows[0] ? mapOrder(rows[0]) : null;
}

export async function createOrderForUser(userId: number, payload: CheckoutPayload) {
  const db = getDbPool();
  const connection = await db.getConnection();

  try {
    if (payload.items.length === 0) {
      throw new Error("Your cart is empty.");
    }

    await connection.beginTransaction();

    const productIds = payload.items.map((item) => item.id);

    const [products] = await connection.query<ProductRow[]>(
      `SELECT id, title, price, compare_at_price, category, image, stock_quantity
       FROM products
       WHERE id IN (${productIds.map(() => "?").join(",")})
       FOR UPDATE`,
      productIds
    );

    if (products.length !== payload.items.length) {
      throw new Error("One or more products no longer exist.");
    }

    const byId = new Map(products.map((product) => [product.id, product]));

    const itemsSnapshot = payload.items.map((item) => {
      const product = byId.get(item.id);

      if (!product) {
        throw new Error("Product not found.");
      }

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Only ${product.stock_quantity} unit(s) available for ${product.title}.`);
      }

      return {
        productId: product.id,
        title: product.title,
        category: product.category,
        image: product.image,
        quantity: item.quantity,
        price: Number(product.price),
        compareAtPrice:
          product.compare_at_price === null ? null : Number(product.compare_at_price),
        lineTotal: Number(product.price) * item.quantity
      } satisfies OrderLineItem;
    });

    const subtotal = itemsSnapshot.reduce((total, item) => total + item.lineTotal, 0);
    const discountAmount = itemsSnapshot.reduce((total, item) => {
      const compareAt = item.compareAtPrice ?? item.price;
      return total + Math.max(compareAt - item.price, 0) * item.quantity;
    }, 0);
    const shippingFee = SHIPPING_FEE;
    const total = subtotal + shippingFee;
    const trackingNumber = buildTrackingNumber();
    const trackingToken = buildTrackingToken();
    const statusTimeline = buildInitialTimeline();

    const [result] = await connection.query<ResultSetHeader>(
      `INSERT INTO orders (
        tracking_token,
        tracking_number,
        customer_user_id,
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        shipping_area,
        shipping_zone,
        notes,
        payment_method,
        payment_status,
        status,
        subtotal,
        shipping_fee,
        discount_amount,
        total,
        items_snapshot,
        status_timeline,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        trackingToken,
        trackingNumber,
        userId,
        payload.customerName,
        payload.customerEmail,
        payload.customerPhone,
        payload.shippingAddress,
        payload.shippingArea,
        payload.shippingZone,
        payload.notes ?? null,
        payload.paymentMethod,
        "pending",
        "placed",
        subtotal,
        shippingFee,
        discountAmount,
        total,
        JSON.stringify(itemsSnapshot),
        JSON.stringify(statusTimeline)
      ]
    );

    for (const item of payload.items) {
      await connection.query(
        `UPDATE products
         SET stock_quantity = stock_quantity - ?
         WHERE id = ?`,
        [item.quantity, item.id]
      );
    }

    await connection.commit();

    return await getOrderByTrackingTokenFromConnection(connection, trackingToken, result.insertId);
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function getOrderByTrackingTokenFromConnection(
  connection: PoolConnection,
  trackingToken: string,
  id: number
) {
  const [rows] = await connection.query<OrderRow[]>(
    `SELECT *
     FROM orders
     WHERE id = ? AND tracking_token = ?
     LIMIT 1`,
    [id, trackingToken]
  );

  if (!rows[0]) {
    throw new Error("Order lookup failed after creation.");
  }

  return mapOrder(rows[0]);
}
