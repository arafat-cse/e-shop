"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/store/use-cart-store";

type CartItemProps = {
  item: CartItemType;
};

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="grid gap-4 rounded-[1.75rem] border border-border/70 bg-card p-4 shadow-soft md:grid-cols-[120px_1fr_auto] md:items-center">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/60">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-4"
          sizes="120px"
        />
      </div>

      <div className="space-y-2">
        <Link
          href={`/product/${item.id}`}
          className="font-[family-name:var(--font-heading)] text-lg font-semibold hover:text-primary"
        >
          {item.title}
        </Link>
        <p className="text-sm capitalize text-muted-foreground">{item.category}</p>
        <p className="text-lg font-bold">{formatCurrency(item.price)}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-10 text-center text-sm font-semibold">
            {item.quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="icon" onClick={() => removeItem(item.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
