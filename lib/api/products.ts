import "server-only";

import { RowDataPacket } from "mysql2";

import { getDbPool } from "@/lib/db";
import { mockProducts } from "@/lib/mock-products";
import { Product } from "@/lib/types";

function mapProduct(product: Product): Product {
  return {
    ...product,
    gallery:
      product.gallery && product.gallery.length > 0
        ? product.gallery
        : [product.image, product.image, product.image]
  };
}

type ProductRow = RowDataPacket & {
  id: number;
  title: string;
  price: number | string;
  compare_at_price: number | string | null;
  description: string;
  category: string;
  image: string;
  gallery: string[] | string | null;
  rating_rate: number | string;
  rating_count: number;
  featured: number | boolean | null;
  stock_quantity: number | null;
};

function normalizeGallery(value: ProductRow["gallery"], fallbackImage: string) {
  if (Array.isArray(value) && value.length > 0) {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    try {
      const parsed = JSON.parse(value) as unknown;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    } catch {
      return [fallbackImage, fallbackImage];
    }
  }

  return [fallbackImage, fallbackImage];
}

function mapRowToProduct(row: ProductRow): Product {
  return mapProduct({
    id: row.id,
    title: row.title,
    price: Number(row.price),
    compareAtPrice:
      row.compare_at_price === null ? null : Number(row.compare_at_price),
    description: row.description,
    category: row.category,
    image: row.image,
    gallery: normalizeGallery(row.gallery, row.image),
    rating: {
      rate: Number(row.rating_rate),
      count: Number(row.rating_count)
    },
    featured: Boolean(row.featured),
    stockQuantity: Number(row.stock_quantity ?? 0)
  });
}

export async function getProducts(): Promise<Product[]> {
  try {
    const [rows] = await getDbPool().query<ProductRow[]>(
      `SELECT id, title, price, compare_at_price, description, category, image, gallery, rating_rate, rating_count, featured, stock_quantity
       FROM products
       ORDER BY id ASC`
    );

    return rows.map(mapRowToProduct);
  } catch {
    return mockProducts.map(mapProduct);
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const [rows] = await getDbPool().query<ProductRow[]>(
      `SELECT id, title, price, compare_at_price, description, category, image, gallery, rating_rate, rating_count, featured, stock_quantity
       FROM products
       WHERE id = ?
       LIMIT 1`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    return mapRowToProduct(rows[0]);
  } catch {
    return mockProducts.find((product) => product.id === id) ?? null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const [rows] = await getDbPool().query<RowDataPacket[]>(
      `SELECT DISTINCT category
       FROM products
       WHERE category IS NOT NULL AND category != ''
       ORDER BY category ASC`
    );

    return rows.map((row) => String(row.category));
  } catch {
    return Array.from(new Set(mockProducts.map((product) => product.category)));
  }
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  const featuredProducts = products.filter((product) => product.featured);
  return (featuredProducts.length > 0 ? featuredProducts : products).slice(0, 4);
}

export async function getRelatedProducts(category: string, productId: number) {
  const products = await getProducts();
  return products
    .filter((product) => product.category === category && product.id !== productId)
    .slice(0, 4);
}
