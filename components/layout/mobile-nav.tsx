"use client";

import Link from "next/link";
import { Home, Menu, Search, ShoppingCart, User } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MobileNav() {
  const mounted = useMounted();
  const count = useCartStore((state) => state.itemCount());
  const user = useAuthStore((state) => state.user);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-border bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-primary"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Link
          href="/shop"
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-primary"
        >
          <Menu className="h-5 w-5" />
          <span>Menu</span>
        </Link>

        <Link
          href="/cart"
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-primary"
        >
          <div className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
              {mounted ? count : 0}
            </span>
          </div>
          <span>Cart</span>
        </Link>

        <Link
          href="/shop"
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-primary"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Link>

        <Link
          href={user ? "/account" : "/login"}
          className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground transition hover:text-primary"
        >
          <User className="h-5 w-5" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
