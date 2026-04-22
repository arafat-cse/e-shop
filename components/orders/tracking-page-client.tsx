"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { Order } from "@/lib/types";

import { OrderStatusBadge } from "./order-status-badge";

export function TrackingPageClient({
  order,
  showPlacedMessage
}: {
  order: Order;
  showPlacedMessage: boolean;
}) {
  const trackingUrl =
    typeof window === "undefined"
      ? `/track/${order.trackingToken}`
      : `${window.location.origin}/track/${order.trackingToken}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
        {showPlacedMessage && (
          <div className="mb-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">
            Order placed successfully. Save or copy your tracking link to view order status without login.
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Tracking number</p>
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
              {order.trackingNumber}
            </h1>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(trackingUrl);
              toast.success("Tracking link copied.");
            }}
          >
            Copy tracking link
          </Button>
          <p className="text-sm text-muted-foreground">{trackingUrl}</p>
        </div>

        <div className="mt-8 space-y-4">
          {order.statusTimeline.map((entry) => (
            <div
              key={`${entry.status}-${entry.createdAt}`}
              className="rounded-2xl border border-border/70 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{entry.label}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleString("en-BD")}
                </p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Order details
        </h2>
        <div className="mt-6 space-y-4">
          {order.itemsSnapshot.map((item) => (
            <div key={`${order.id}-${item.productId}`} className="flex items-start justify-between gap-4 text-sm">
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

        <div className="mt-6 space-y-2 border-t border-border/70 pt-6 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(order.shippingFee)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Discount</span>
            <span>-{formatCurrency(order.discountAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-border/70 p-4 text-sm">
          <p className="font-semibold">{order.customerName}</p>
          <p className="mt-1 text-muted-foreground">{order.customerPhone}</p>
          <p className="text-muted-foreground">{order.customerEmail}</p>
          <p className="mt-3 text-muted-foreground">
            {order.shippingAddress}, {order.shippingArea}, {order.shippingZone}
          </p>
          {order.notes && (
            <p className="mt-3 text-muted-foreground">Note: {order.notes}</p>
          )}
        </div>
      </div>
    </div>
  );
}
