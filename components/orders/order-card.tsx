import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { Order } from "@/lib/types";

import { OrderStatusBadge } from "./order-status-badge";

export function OrderCard({ order }: { order: Order }) {
  return (
    <div className="rounded-[1.75rem] border border-border/70 bg-card p-5 shadow-soft">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Tracking number</p>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold">
            {order.trackingNumber}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {new Date(order.createdAt).toLocaleString("en-BD")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <p className="text-lg font-bold">{formatCurrency(order.total)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-3">
        {order.itemsSnapshot.map((item) => (
          <div key={`${order.id}-${item.productId}`} className="flex items-center justify-between text-sm">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-muted-foreground">
                Qty {item.quantity} · {item.category}
              </p>
            </div>
            <p className="font-semibold">{formatCurrency(item.lineTotal)}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href={`/track/${order.trackingToken}`}>
          <Button>Track order</Button>
        </Link>
      </div>
    </div>
  );
}
