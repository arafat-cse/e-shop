import type { Metadata } from "next";

import { ProductGrid } from "@/components/product/product-grid";
import { SearchFilters } from "@/components/product/search-filters";
import { Badge } from "@/components/ui/badge";
import { getCategories, getProducts } from "@/lib/api/products";

type ShopPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse products, search inventory, and filter by category."
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const searchQuery = params.q?.toLowerCase().trim() ?? "";
  const selectedCategory = params.category ?? "all";

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const filteredProducts = products.filter((product) => {
    const matchesQuery =
      !searchQuery ||
      product.title.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8 space-y-3">
        <Badge>Marketplace</Badge>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold">
          Shop all products
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Search by keyword, refine by category, and explore a responsive
          product grid powered by a dedicated service layer.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <SearchFilters
          categories={categories}
          initialQuery={params.q ?? ""}
          initialCategory={selectedCategory}
        />

        <div>
          <p className="mb-5 text-sm text-muted-foreground">
            Showing {filteredProducts.length} product
            {filteredProducts.length === 1 ? "" : "s"}
          </p>
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
                No products found
              </h2>
              <p className="mt-3 text-muted-foreground">
                Try a different keyword or reset the active category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
