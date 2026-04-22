"use client";

import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Menu,
  PackageSearch,
  Search,
  ShoppingCart,
  UserRound,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useMounted } from "@/hooks/use-mounted";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=Football%20Club%20Jersey", label: "Football Club Jersey", hasDropdown: true },
  {
    href: "/shop?category=International%20Team%20Jersey",
    label: "International Team Jersey",
    hasDropdown: true
  },
  { href: "/shop?category=Combo", label: "Combo" }
];

export function Navbar() {
  const mounted = useMounted();
  const count = useCartStore((state) => state.itemCount());
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const [trackingToken, setTrackingToken] = useState("");
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsCompact(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    logout();
    clearCart();
    toast.success("Logged out");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="container">
        <div
          className={cn(
            "grid items-center gap-4 border-b border-border transition-all duration-300 md:grid-cols-[220px_minmax(280px,1fr)_360px]",
            isCompact ? "h-16" : "h-20"
          )}
        >
          <Link href="/" className="inline-flex items-end gap-0.5">
            <span className="font-[family-name:var(--font-heading)] text-[34px] font-bold tracking-[-0.06em] text-black md:text-[58px] md:leading-none">
              JERSEY
            </span>
            <span className="mb-1 inline-flex h-6 items-center justify-center rounded-sm bg-primary px-1 text-[9px] font-bold uppercase leading-none text-white md:h-9 md:text-[10px]">
              .bd
            </span>
          </Link>

          <form
            action="/shop"
            className={cn("hidden justify-center md:flex", isCompact && "md:hidden lg:flex")}
          >
            <div className="relative w-full max-w-[420px]">
              <Input
                name="q"
                placeholder="Search in..."
                className="h-11 rounded-lg border border-transparent bg-[#f7f7f7] pl-5 pr-12 text-[14px] shadow-none focus-visible:border-primary focus-visible:ring-0"
              />
              <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
            </div>
          </form>

          <div className="hidden items-center justify-end gap-6 md:flex">
            <Link href="/track" className="text-center text-[13px] leading-4 text-foreground">
              <PackageSearch className="mx-auto mb-1 h-5 w-5" />
              <span>Track Order</span>
            </Link>
            <Link
              href={user ? "/account" : "/login"}
              className="text-center text-[13px] leading-4 text-foreground"
            >
              <UserRound className="mx-auto mb-1 h-5 w-5" />
              <span>{user ? "My Account" : "Sign In"}</span>
            </Link>
            <Link href={user ? "/my/wishlists" : "/cart"} className="text-center text-[13px] leading-4 text-foreground">
              <Heart className="mx-auto mb-1 h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link href="/cart" className="relative text-center text-[13px] leading-4 text-foreground">
              <ShoppingCart className="mx-auto mb-1 h-5 w-5" />
              <span className="absolute right-1 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {mounted ? count : 0}
              </span>
              <span>Cart</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                {mounted ? count : 0}
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden h-14 items-center justify-center md:flex">
          <nav className="flex items-center gap-8 text-[14px] font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 transition hover:text-primary"
              >
                {link.label}
                {link.hasDropdown ? <ChevronDown className="h-4 w-4" /> : null}
              </Link>
            ))}
          </nav>
        </div>

        <div className={cn("pb-4 md:hidden", isOpen ? "block" : "hidden")}>
          <form action="/shop" className="mb-3">
            <div className="relative">
              <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Search in..."
                className="h-11 rounded-lg border-0 bg-secondary pr-10"
              />
            </div>
          </form>
          <form action="/track" className="mb-3">
            <div className="relative">
              <PackageSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="token"
                value={trackingToken}
                onChange={(event) => setTrackingToken(event.target.value)}
                placeholder="Track order"
                className="h-11 rounded-xl bg-white pl-11"
              />
            </div>
          </form>
          <div className="grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-border px-4 py-3 text-sm font-medium"
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
                className="rounded-xl border border-border px-4 py-3 text-left text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium"
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
