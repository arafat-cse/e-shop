import type { Metadata } from "next";

import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review cart items, adjust quantities, and continue to checkout."
};

export default function CartPage() {
  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Your basket
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-bold">
          Shopping cart
        </h1>
      </div>
      <CartPageClient />
    </section>
  );
}
