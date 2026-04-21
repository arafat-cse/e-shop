"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
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

  return (
    <Button
      className={fullWidth ? "w-full" : undefined}
      onClick={() => {
        addItem(product);
        toast.success(`${product.title} added to cart`);
      }}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to cart
    </Button>
  );
}
