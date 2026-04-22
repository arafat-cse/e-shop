"use client";

import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

type AddToCartButtonProps = {
  product: Product;
  fullWidth?: boolean;
};

export function AddToCartButton({
  product,
  fullWidth = false
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  return (
    <Button
      className={fullWidth ? "w-full" : undefined}
      onClick={() => {
        if (!user) {
          toast.error("Login or create an account before adding products to cart.");
          router.push(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
          return;
        }

        if (product.stockQuantity <= 0) {
          toast.error("This product is currently out of stock.");
          return;
        }

        addItem(product);
        toast.success(`${product.title} added to cart`);
      }}
      disabled={product.stockQuantity <= 0}
    >
      <ShoppingCart className="h-4 w-4" />
      {product.stockQuantity <= 0 ? "Out of stock" : "Add to cart"}
    </Button>
  );
}
