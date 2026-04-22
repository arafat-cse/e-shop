import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div className={className ?? "grid gap-6 sm:grid-cols-2 xl:grid-cols-4"}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
