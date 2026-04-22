"use client";

import Link from "next/link";
import {
  Menu,
  PackageSearch,
  Search,
  ShoppingCart,
  Store,
  UserRound,
  X
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useMounted } from "@/hooks/use-mounted";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/account/orders", label: "My Orders" }
];

export function Navbar() {
  const mounted = useMounted();
  const count = useCartStore((state) => state.itemCount());
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [trackingToken, setTrackingToken] = useState("");

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    clearCart();
    toast.success("Logged out");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
              <Store className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                ShopSphere
              </p>
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold">
                Premium Market
              </p>
            </div>
          </Link>

          <div className="hidden max-w-xl flex-1 gap-3 md:flex">
            <form action="/shop" className="flex-1">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  placeholder="Search products, brands, and categories"
                  className="rounded-full pl-11"
                />
              </div>
            </form>
            <form action="/track" className="hidden w-[240px] xl:block">
              <div className="relative">
                <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="token"
                  value={trackingToken}
                  onChange={(event) => setTrackingToken(event.target.value)}
                  placeholder="Track order"
                  className="rounded-full pl-11"
                />
              </div>
            </form>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {mounted && user ? (
              <>
                <Link href="/account/orders" className="hidden md:block">
                  <Button variant="outline" size="sm">
                    <UserRound className="h-4 w-4" />
                    {user.fullName.split(" ")[0]}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  <UserRound className="h-4 w-4" />
                  Account
                </Button>
              </Link>
            )}
            <Link href="/cart" className="relative">
              <Button size="icon" aria-label="Shopping cart">
                <ShoppingCart className="h-4 w-4" />
              </Button>
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-xs font-semibold text-background">
                {mounted ? count : 0}
              </span>
            </Link>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen((value) => !value)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className={cn("pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <form action="/shop" className="mb-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Search products"
                className="rounded-full pl-11"
              />
            </div>
          </form>
          <form action="/track" className="mb-4">
            <div className="relative">
              <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="token"
                value={trackingToken}
                onChange={(event) => setTrackingToken(event.target.value)}
                placeholder="Track order"
                className="rounded-full pl-11"
              />
            </div>
          </form>
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            {mounted && user ? (
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  void handleLogout();
                }}
                className="rounded-2xl border border-border/70 px-4 py-3 text-left text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-2xl border border-border/70 px-4 py-3 text-sm font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
