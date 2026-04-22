"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useMounted } from "@/hooks/use-mounted";
import { formatCurrency } from "@/lib/format";
import { SHIPPING_FEE } from "@/lib/constants";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

export function CheckoutPageClient() {
  const mounted = useMounted();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerName, setCustomerName] = useState(user?.fullName ?? "");
  const [customerEmail, setCustomerEmail] = useState(user?.email ?? "");
  const [customerPhone, setCustomerPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingArea, setShippingArea] = useState("");
  const [shippingZone, setShippingZone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");

  useEffect(() => {
    if (!user) {
      return;
    }

    setCustomerName((value) => value || user.fullName);
    setCustomerEmail((value) => value || user.email);
  }, [user]);

  if (!mounted) {
    return <div className="h-96 rounded-[2rem] border border-border/70 bg-card/70" />;
  }

  if (!user) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Login required for checkout
        </h2>
        <p className="mt-3 text-muted-foreground">
          You need an account before placing any order.
        </p>
        <Link href="/login?redirect=%2Fcheckout" className="mt-6 inline-block">
          <Button>Login to continue</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Checkout is unavailable
        </h2>
        <p className="mt-3 text-muted-foreground">
          Add items to your cart before continuing to checkout.
        </p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Go to shop</Button>
        </Link>
      </div>
    );
  }

  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <form
        className="rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft"
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);

          try {
            const response = await fetch("/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                customerName,
                customerEmail,
                customerPhone,
                shippingAddress,
                shippingArea,
                shippingZone,
                notes,
                paymentMethod,
                items
              })
            });

            const payload = await response.json();

            if (!response.ok) {
              throw new Error(payload.error ?? "Unable to place order.");
            }

            clearCart();
            toast.success("Order placed successfully");
            router.push(`/track/${payload.order.trackingToken}?placed=1`);
            router.refresh();
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "Order failed.");
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Shipping details
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold">
            Complete your order
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            required
            className="md:col-span-2"
            placeholder="Full name"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
          />
          <Input
            required
            type="email"
            placeholder="Email address"
            value={customerEmail}
            onChange={(event) => setCustomerEmail(event.target.value)}
          />
          <Input
            required
            placeholder="Phone number"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
          />
          <Input
            required
            className="md:col-span-2"
            placeholder="Full delivery address"
            value={shippingAddress}
            onChange={(event) => setShippingAddress(event.target.value)}
          />
          <Input
            required
            placeholder="Area / Thana"
            value={shippingArea}
            onChange={(event) => setShippingArea(event.target.value)}
          />
          <Input
            required
            placeholder="District / City"
            value={shippingZone}
            onChange={(event) => setShippingZone(event.target.value)}
          />
          <Input
            className="md:col-span-2"
            placeholder="Delivery note (optional)"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <div className="mt-6">
          <p className="mb-3 text-sm font-semibold">Payment method</p>
          <div className="grid gap-3">
            <label className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
              <span>Cash on delivery</span>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
              <span>bKash</span>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "bkash"}
                onChange={() => setPaymentMethod("bkash")}
              />
            </label>
            <label className="flex items-center justify-between rounded-2xl border border-border px-4 py-3">
              <span>Nagad</span>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === "nagad"}
                onChange={() => setPaymentMethod("nagad")}
              />
            </label>
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Placing order..." : `Pay ${formatCurrency(total)}`}
        </Button>
      </form>

      <div className="h-fit rounded-[2rem] border border-border/70 bg-card p-6 shadow-soft">
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
          Order summary
        </h2>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 text-sm">
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <p className="font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          ))}
          <Separator />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>{formatCurrency(SHIPPING_FEE)}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-bold">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
