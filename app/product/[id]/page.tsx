import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Star, Truck } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { Badge } from "@/components/ui/badge";
import { getProductById, getRelatedProducts } from "@/lib/api/products";
import { formatCurrency } from "@/lib/format";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(Number(id));

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id);

  return (
    <section className="container py-10 md:py-14">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <ProductGallery
          title={product.title}
          images={product.gallery ?? [product.image, product.image]}
        />

        <div className="space-y-6">
          <Badge variant="outline" className="capitalize">
            {product.category}
          </Badge>

          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                {product.rating.rate} rating
              </span>
              <span>{product.rating.count} verified reviews</span>
            </div>
          </div>

          <p className="text-3xl font-bold text-primary">
            {formatCurrency(product.price)}
          </p>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              Regular price {formatCurrency(product.compareAtPrice)}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {product.stockQuantity > 0
              ? `${product.stockQuantity} unit(s) available`
              : "Currently out of stock"}
          </p>

          <p className="leading-7 text-muted-foreground">{product.description}</p>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
              <Truck className="mb-3 h-5 w-5 text-primary" />
              <p className="font-semibold">Fast shipping</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Delivery estimates shown at checkout.
              </p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-4">
              <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
              <p className="font-semibold">Secure purchase</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Cart and order summary are optimized for trust.
              </p>
            </div>
          </div>

          <AddToCartButton product={product} fullWidth />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="mb-8">
            <Badge>More like this</Badge>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold">
              Related products
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </section>
  );
}
