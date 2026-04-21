"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ShopError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container py-14">
      <div className="rounded-[2rem] border border-destructive/30 bg-card p-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
          Failed to load products
        </h1>
        <p className="mt-3 text-muted-foreground">
          There was a problem loading the shop page. Try again.
        </p>
        <Button onClick={reset} className="mt-6">
          Retry
        </Button>
      </div>
    </section>
  );
}
