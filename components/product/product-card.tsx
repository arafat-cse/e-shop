import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted/60">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline" className="capitalize">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-primary text-primary" />
            {product.rating.rate}
          </div>
        </div>

        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="line-clamp-2 font-[family-name:var(--font-heading)] text-lg font-semibold transition group-hover:text-primary">
              {product.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="text-sm text-muted-foreground line-through">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {product.stockQuantity > 0
                ? `${product.stockQuantity} in stock`
                : "Out of stock"}
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </CardContent>
    </Card>
  );
}
