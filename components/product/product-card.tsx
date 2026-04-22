import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, TimerReset } from "lucide-react";

import { formatCurrency } from "@/lib/format";
import { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const savings =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <div className="group overflow-hidden rounded-md border border-border bg-card transition hover:shadow-lg hover:shadow-black/5">
      <Link href={`/product/${product.id}`} className="block">
        <div className="flex items-center justify-between px-3 pt-3 text-[10px] font-semibold">
          <span className="rounded-sm bg-primary px-2 py-1 text-primary-foreground">
            {product.stockQuantity > 0 ? "Best Selling" : "Best Collection"}
          </span>
          {savings > 0 ? (
            <span className="rounded-sm bg-emerald-500 px-2 py-1 text-white">
              Save {savings}%
            </span>
          ) : null}
        </div>

        <div className="relative aspect-square overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-3 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>

        {product.stockQuantity > 0 ? (
          <div className="flex items-center gap-1 px-3 text-[10px] font-medium text-primary">
            <TimerReset className="h-3.5 w-3.5" />
            Offer ends in: 00 Days : 17 Hours : 53 Min : 45 Sec
          </div>
        ) : null}

        <div className="space-y-3 px-3 pb-3 pt-2">
          <h3 className="min-h-[68px] text-[14px] font-medium leading-5 text-[#111827] transition group-hover:text-primary">
            {product.title}
          </h3>

          <div className="flex items-center gap-3">
            <p className="text-[18px] font-bold text-primary">{formatCurrency(product.price)}</p>
            {product.compareAtPrice && product.compareAtPrice > product.price ? (
              <p className="text-[14px] text-muted-foreground line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            ) : null}
          </div>

          <span className="block rounded-sm border border-primary px-4 py-2.5 text-center text-[14px] font-medium text-primary transition hover:bg-primary hover:text-primary-foreground">
            <span className="inline-flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              {product.stockQuantity > 0 ? "Order Now" : "Stock Out"}
            </span>
          </span>
        </div>
      </Link>
    </div>
  );
}
