"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function GlobalError({
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
    <html lang="en">
      <body className="bg-background text-foreground">
        <section className="container py-20">
          <div className="rounded-[2rem] border border-destructive/30 bg-card p-10 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
              Something went wrong
            </h1>
            <p className="mt-3 text-muted-foreground">
              The application hit an unexpected error.
            </p>
            <Button onClick={reset} className="mt-6">
              Reload
            </Button>
          </div>
        </section>
      </body>
    </html>
  );
}
