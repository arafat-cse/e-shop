"use client";

import Link from "next/link";
import { ChevronUp, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

import { useMounted } from "@/hooks/use-mounted";
import { useCartStore } from "@/store/use-cart-store";
import { formatCurrency } from "@/lib/format";

export function FloatingActions() {
  const mounted = useMounted();
  const count = useCartStore((state) => state.itemCount());
  const items = useCartStore((state) => state.items);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Link
        href="/cart"
        className="fixed right-0 top-[34%] z-40 hidden overflow-hidden rounded-l-xl bg-white shadow-lg shadow-black/10 md:block"
      >
        <div className="flex w-[72px] flex-col items-center">
          <div className="flex w-full flex-col items-center bg-primary px-3 py-4 text-white">
            <ShoppingBag className="h-5 w-5" />
            <span className="mt-2 text-sm">{mounted ? count : 0} Items</span>
          </div>
          <div className="w-full px-2 py-3 text-center text-lg font-semibold text-primary">
            {mounted ? formatCurrency(total) : formatCurrency(0)}
          </div>
        </div>
      </Link>

      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}
