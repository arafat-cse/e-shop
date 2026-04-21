import { API_BASE_URL } from "@/lib/constants";
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

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    next: { revalidate: 300 }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await fetchJson<Product[]>("/products");
    return products.map(mapProduct);
  } catch {
    return mockProducts.map(mapProduct);
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const product = await fetchJson<Product>(`/products/${id}`);
    return mapProduct(product);
  } catch {
    return mockProducts.find((product) => product.id === id) ?? null;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await fetchJson<string[]>("/products/categories");
    return categories;
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
