"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CartItem } from "@/components/cart/cart-item";
import { Separator } from "@/components/ui/separator";
import { useMounted } from "@/hooks/use-mounted";
import { formatCurrency } from "@/lib/format";
import { SHIPPING_FEE } from "@/lib/constants";
import { useCartStore } from "@/store/use-cart-store";

export function CartPageClient() {
  const mounted = useMounted();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());

  if (!mounted) {
    return <div className="h-80 rounded-[2rem] border border-border/70 bg-card/70" />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Your cart is empty
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start adding products from the shop to see them here.
        </p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Continue shopping</Button>
        </Link>
      </div>
    );
  }

  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="h-fit rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Order summary
        </h2>
        <div className="mt-6 space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-semibold">{formatCurrency(SHIPPING_FEE)}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-base">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">{formatCurrency(total)}</span>
          </div>
        </div>

        <Link href="/checkout" className="mt-6 block">
          <Button className="w-full">Proceed to checkout</Button>
        </Link>
      </div>
    </div>
  );
}
