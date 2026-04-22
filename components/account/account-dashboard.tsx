"use client";

import Link from "next/link";
import {
  BadgePercent,
  CreditCard,
  Heart,
  LayoutGrid,
  LogOut,
  MapPin,
  MessageCircleMore,
  Package,
  Settings,
  Shield,
  ShoppingBag,
  Star,
  Ticket,
  Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import { Order } from "@/lib/types";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

export type AccountSection =
  | "dashboard"
  | "orders"
  | "wishlists"
  | "coupons"
  | "payments"
  | "address"
  | "profile";

const sideLinks = [
  { key: "dashboard", label: "Dashboard", icon: LayoutGrid, href: "/account" },
  { key: "orders", label: "My orders", icon: ShoppingBag, href: "/account/orders" },
  { key: "wishlists", label: "Wishlist's", icon: Heart, href: "/my/wishlists" },
  { key: "coupons", label: "Promo/ Coupon", icon: BadgePercent, href: "/promo/coupons" },
  { key: "address", label: "Address", icon: MapPin, href: "/user/address" },
  { key: "payments", label: "Payments", icon: CreditCard, href: "/my/payments" },
  { key: "reviews", label: "Product reviews", icon: Star, href: "/account" },
  { key: "support", label: "Support tickets", icon: MessageCircleMore, href: "/account" },
  { key: "profile", label: "Manage profile", icon: Settings, href: "/manage/profile" },
  { key: "special", label: "Manage Special Day", icon: Ticket, href: "/account" },
  { key: "password", label: "Change Password", icon: Shield, href: "/account" },
  { key: "delete", label: "Delete My Account", icon: Trash2, href: "/account" }
] as const;

function StatCard({
  title,
  value,
  icon: Icon,
  tint
}: {
  title: string;
  value: string | number;
  icon: typeof ShoppingBag;
  tint: string;
}) {
  return (
    <div className={`rounded-[18px] border border-white/50 p-5 ${tint}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[42px] font-bold leading-none text-[#1f2937]">{value}</p>
          <p className="mt-3 text-[16px] font-medium text-[#4b5563]">{title}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/75 text-[#1f2937] shadow">
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
}

function OrderItem({ order }: { order: Order }) {
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const statusColors: Record<string, string> = {
    placed: "bg-blue-100 text-blue-700",
    confirmed: "bg-indigo-100 text-indigo-700",
    packed: "bg-amber-100 text-amber-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-rose-100 text-rose-700"
  };

  return (
    <div className="flex flex-col gap-4 border-b border-border p-4 last:border-0 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <p className="text-[16px] font-bold text-[#111827]">Order #{order.trackingNumber}</p>
          <p className="text-[14px] text-muted-foreground">{date}</p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className={`rounded-full px-3 py-0.5 text-[12px] font-semibold capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
              {order.status}
            </span>
            <span className="rounded-full bg-secondary px-3 py-0.5 text-[12px] font-semibold text-muted-foreground">
              {order.paymentMethod.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6 md:justify-end">
        <div className="text-right">
          <p className="text-[18px] font-bold text-[#111827]">{formatCurrency(order.total)}</p>
          <p className="text-[13px] text-muted-foreground">{order.itemsSnapshot.length} item(s)</p>
        </div>
        <Link
          href={`/track?token=${order.trackingToken}`}
          className="rounded-lg bg-[#333130] px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-black"
        >
          Track Order
        </Link>
      </div>
    </div>
  );
}

export function AccountDashboard({
  initialShowConfirmation = false,
  section = "dashboard"
}: {
  initialShowConfirmation?: boolean;
  section?: AccountSection;
}) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const cartCount = useCartStore((state) => state.itemCount());
  const clearCart = useCartStore((state) => state.clearCart);
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(initialShowConfirmation);

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
        if (!ignore) {
          setLoading(false);
        }
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

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const runningOrders = orders.filter((order) => order.status !== "delivered" && order.status !== "cancelled").length;
    const amountSpent = orders.reduce((sum, order) => sum + order.total, 0);

    return {
      totalOrders,
      runningOrders,
      amountSpent
    };
  }, [orders]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    clearCart();
    toast.success("Logged out");
    window.location.href = "/login";
  }

  if (!user) {
    return (
      <div className="rounded-[24px] border border-dashed border-border bg-white p-10 text-center">
        <h2 className="text-3xl font-bold text-[#111827]">Login to view your account</h2>
        <p className="mt-3 text-muted-foreground">
          Your dashboard, order history, and account tools are available after login.
        </p>
        <Link href="/login?redirect=%2Faccount%2Forders" className="mt-6 inline-block">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  const pageMeta: Record<AccountSection, { title: string; description: string }> = {
    dashboard: {
      title: "Dashboard",
      description: "Overview of your account activity, orders, and cart."
    },
    orders: {
      title: "My orders",
      description: "Review your recent orders and delivery progress."
    },
    wishlists: {
      title: "Wishlist items",
      description: "Products saved for later shopping."
    },
    coupons: {
      title: "Promo / Coupons",
      description: "Available offers and saved coupon codes."
    },
    payments: {
      title: "Payments",
      description: "Your payment history and payment methods."
    },
    address: {
      title: "Address",
      description: "Saved billing and shipping addresses."
    },
    profile: {
      title: "Manage profile",
      description: "Update your personal information and account details."
    }
  };

  const activeMeta = pageMeta[section];

  const sectionContent: Record<AccountSection, React.ReactNode> = {
    dashboard: (
      <>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total order placed"
            value={loading ? "..." : stats.totalOrders}
            icon={ShoppingBag}
            tint="bg-[linear-gradient(135deg,#f3f1ff_0%,#eef4ff_100%)]"
          />
          <StatCard
            title="Running orders"
            value={loading ? "..." : stats.runningOrders}
            icon={Package}
            tint="bg-[linear-gradient(135deg,#edf8ff_0%,#edfdf2_100%)]"
          />
          <StatCard
            title="Items in cart"
            value={cartCount}
            icon={ShoppingBag}
            tint="bg-[linear-gradient(135deg,#f8f2ff_0%,#eef8ff_100%)]"
          />
          <StatCard
            title="Product in wishlist's"
            value={0}
            icon={Heart}
            tint="bg-[linear-gradient(135deg,#eef6ff_0%,#fff3f2_100%)]"
          />
          <StatCard
            title="Amount spent"
            value={loading ? "..." : formatCurrency(stats.amountSpent)}
            icon={CreditCard}
            tint="bg-[linear-gradient(135deg,#eefcff_0%,#fff0fb_100%)]"
          />
          <StatCard
            title="Opened Tickets"
            value={0}
            icon={MessageCircleMore}
            tint="bg-[linear-gradient(135deg,#eef8ff_0%,#f5f3ff_100%)]"
          />
        </div>

        <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between bg-[#333130] px-4 py-3 text-white">
            <h3 className="text-[18px] font-bold">Recent orders</h3>
            <Link href="/account/orders" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#333130]">
              All orders
            </Link>
          </div>
          <div className="min-h-[100px]">
            {loading ? (
              <div className="flex h-24 items-center justify-center text-[#6b7280]">Loading...</div>
            ) : orders.length > 0 ? (
              <div className="divide-y divide-border">
                {orders.slice(0, 3).map((order) => (
                  <OrderItem key={order.id} order={order} />
                ))}
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center text-[18px] font-medium text-[#6b7280]">
                No Order Found
              </div>
            )}
          </div>
        </section>

        <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between bg-[#333130] px-4 py-3 text-white">
            <h3 className="text-[18px] font-bold">Wishlist items</h3>
            <Link href="/my/wishlists" className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[#333130]">
              View more
            </Link>
          </div>
          <div className="px-4 py-5 text-center text-[18px] font-medium text-[#6b7280]">
            No Product in Wishlist
          </div>
        </section>
      </>
    ),
    orders: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">All orders</h3>
        </div>
        <div className="min-h-[200px]">
          {loading ? (
            <div className="flex h-32 items-center justify-center text-[#6b7280]">Loading...</div>
          ) : orders.length > 0 ? (
            <div className="divide-y divide-border">
              {orders.map((order) => (
                <OrderItem key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center text-[18px] font-medium text-[#6b7280]">
              No Order Found
            </div>
          )}
        </div>
      </section>
    ),
    wishlists: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">Wishlist items</h3>
        </div>
        <div className="px-4 py-5 text-center text-[18px] font-medium text-[#6b7280]">
          No Product in Wishlist
        </div>
      </section>
    ),
    coupons: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">Promo / Coupons</h3>
        </div>
        <div className="px-4 py-5 text-center text-[18px] font-medium text-[#6b7280]">
          No coupons available right now
        </div>
      </section>
    ),
    payments: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">Payment history</h3>
        </div>
        <div className="px-4 py-5 text-center text-[18px] font-medium text-[#6b7280]">
          No payment history found
        </div>
      </section>
    ),
    address: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">Saved address</h3>
        </div>
        <div className="px-5 py-5 text-[#6b7280]">
          <p className="text-[17px] font-medium text-[#111827]">{user.fullName}</p>
          <p className="mt-2">{user.email}</p>
          <p className="mt-3">No shipping address saved yet.</p>
        </div>
      </section>
    ),
    profile: (
      <section className="overflow-hidden rounded-[10px] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
        <div className="bg-[#333130] px-4 py-3 text-white">
          <h3 className="text-[18px] font-bold">Manage profile</h3>
        </div>
        <div className="grid gap-4 p-5 md:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Full name</p>
            <p className="mt-2 text-[17px] font-medium text-[#111827]">{user.fullName}</p>
          </div>
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-2 text-[17px] font-medium text-[#111827]">{user.email}</p>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="relative">
      {showConfirmation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/35 px-4 py-10">
          <div className="w-full max-w-[500px] rounded-[28px] bg-white p-8 text-center shadow-[0_25px_70px_rgba(15,23,42,0.18)]">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-[#eef6ff] text-[#2563eb]">
              <MessageCircleMore className="h-14 w-14" />
            </div>

            <h2 className="mt-6 text-[22px] font-bold leading-tight text-[#111827] md:text-[24px]">
              Confirm Your Email or Phone Number
            </h2>
            <p className="mx-auto mt-4 max-w-[360px] text-[15px] leading-7 text-[#64748b]">
              A verification code will be sent to your email or phone to verify
              your account. Please confirm your email or phone number.
            </p>

            <div className="mx-auto mt-6 max-w-[250px] rounded-xl bg-[#f5f5f5] px-4 py-4 text-[15px] text-[#475569]">
              {user?.email}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#f3f3f3] text-lg font-medium text-[#111827]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmation(false);
                  router.replace("/account");
                }}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary text-lg font-medium text-white"
              >
                Yes, confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[245px_1fr]">
        <aside className="overflow-hidden rounded-[14px] bg-white shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
          <div className="bg-[#333130] px-6 py-5 text-white">
            <h2 className="truncate text-[20px] font-bold">{user.fullName || user.username}</h2>
            <p className="mt-1 truncate text-[14px] text-white/85">{user.email}</p>
          </div>

          <div className="p-4">
            <div className="space-y-1">
              {sideLinks.map(({ key, label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={
                    key === section
                      ? "flex items-center justify-between rounded-[10px] bg-[#333130] px-4 py-3 text-white"
                      : "flex items-center gap-3 rounded-[10px] px-4 py-3 text-[#6b7280]"
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-[15px] font-medium">{label}</span>
                  </div>
                  {key === section ? <span className="text-lg">→</span> : null}
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() => void handleLogout()}
              className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#333130] text-[16px] font-medium text-white"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#42c8f8_0%,#4f86ec_45%,#8a31f0_100%)]">
            <div className="h-[195px] bg-[radial-gradient(circle_at_85%_35%,rgba(255,0,170,0.25),transparent_20%),linear-gradient(135deg,transparent_0%,transparent_58%,rgba(255,255,255,0.12)_58%,rgba(255,255,255,0.12)_68%,transparent_68%)]" />
          </div>

          <div>
            <h1 className="text-[30px] font-bold text-[#111827]">{activeMeta.title}</h1>
            <p className="mt-2 text-[15px] text-muted-foreground">{activeMeta.description}</p>
          </div>

          {sectionContent[section]}
        </div>
      </div>
    </div>
  );
}
