import type { Metadata } from "next";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { SearchFilters } from "@/components/product/search-filters";
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
    <section className="container py-8 md:py-10">
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span>›</span>
        <span>Shop</span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <SearchFilters
          categories={categories}
          initialQuery={params.q ?? ""}
          initialCategory={selectedCategory}
        />

        <div>
          <div className="mb-6 rounded-md border border-border bg-white p-4">
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="font-semibold text-foreground">Sort By :</span>
              <select className="h-10 rounded-sm border border-border bg-white px-3 outline-none">
                <option>Default Sorting</option>
                <option>Price low to high</option>
                <option>Price high to low</option>
                <option>Newest</option>
              </select>
              <p className="ml-auto text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" />
          ) : (
            <div className="rounded-md border border-dashed border-border bg-white p-10 text-center">
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
