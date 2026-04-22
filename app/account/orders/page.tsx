import type { Metadata } from "next";

import { OrdersPageClient } from "@/components/orders/orders-page-client";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your order history and live tracking updates."
};

export default function AccountOrdersPage() {
  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8 space-y-3">
        <Badge>Account</Badge>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold">
          My orders
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Track all your orders, delivery progress, and totals from one place.
        </p>
      </div>
      <OrdersPageClient />
    </section>
  );
}
