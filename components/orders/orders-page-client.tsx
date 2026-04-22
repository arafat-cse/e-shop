"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { OrderCard } from "@/components/orders/order-card";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/types";
import { useAuthStore } from "@/store/use-auth-store";

export function OrdersPageClient() {
  const user = useAuthStore((state) => state.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadOrders() {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const response = await fetch("/api/orders", { cache: "no-store" });

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const payload = await response.json();

      if (!ignore) {
        setOrders(payload.orders ?? []);
        setLoading(false);
      }
    }

    void loadOrders();

    return () => {
      ignore = true;
    };
  }, [user]);

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Login to view your orders
        </h2>
        <p className="mt-3 text-muted-foreground">
          Your order history is available after login.
        </p>
        <Link href="/login?redirect=%2Faccount%2Forders" className="mt-6 inline-block">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  if (loading) {
    return <div className="h-60 rounded-[2rem] border border-border/70 bg-card/70" />;
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          No orders yet
        </h2>
        <p className="mt-3 text-muted-foreground">
          Start shopping and place your first order.
        </p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Go to shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
