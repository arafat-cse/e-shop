import "server-only";

import { Product } from "@/lib/types";

export async function getProducts(): Promise<Product[]> {
  return fetchStoreApi<Product[]>("/api/store/products");
}

export async function getProductById(id: number): Promise<Product | null> {
  return fetchStoreApi<Product | null>(`/api/store/products/${id}`);
}

export async function getCategories(): Promise<string[]> {
  return fetchStoreApi<string[]>("/api/store/categories");
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

async function fetchStoreApi<T>(path: string): Promise<T> {
  const response = await fetch(`${getBackendBaseUrl()}${path}`, {
    next: { revalidate: 0 },
    cache: "no-store"
  });

  if (response.status === 404) {
    return null as T;
  }

  if (!response.ok) {
    throw new Error(`Backend request failed for ${path}.`);
  }

  return (await response.json()) as T;
}

function getBackendBaseUrl() {
  return (process.env.STRAPI_PUBLIC_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:1337").replace(/\/$/, "");
}
