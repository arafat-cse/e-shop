import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FeatureStrip } from "@/components/home/feature-strip";
import { HeroSection } from "@/components/home/hero-section";
import { ProductGrid } from "@/components/product/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedProducts } from "@/lib/api/products";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <HeroSection />
      <FeatureStrip />

      <section className="container py-10 md:py-14">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <Badge>Featured collection</Badge>
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold md:text-4xl">
                Trending picks curated for a modern storefront
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                High-intent products across electronics, fashion, and home
                essentials with responsive cards and persistent cart actions.
              </p>
            </div>
          </div>

          <Link href="/shop">
            <Button variant="outline">
              View all products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>
    </>
  );
}
