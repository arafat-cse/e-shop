import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container py-20">
      <div className="rounded-[2rem] border border-dashed border-border p-10 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you requested does not exist or is no longer available.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Return home</Button>
        </Link>
      </div>
    </section>
  );
}
