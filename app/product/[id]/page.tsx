import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Facebook, Heart, MessageCircleMore, Phone, Share2, Star, Twitter } from "lucide-react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
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
    <section className="container py-8 md:py-10">
      <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary">
          Products
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_220px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-5">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <ProductGallery
                title={product.title}
                images={product.gallery ?? [product.image, product.image, product.image]}
              />

              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="max-w-3xl text-[36px] font-semibold leading-tight text-[#111827] md:text-[30px]">
                      {product.title}
                    </h1>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <p className="text-[34px] font-bold text-primary">{formatCurrency(product.price)}</p>
                      {product.compareAtPrice ? (
                        <p className="text-[18px] text-muted-foreground line-through">
                          {formatCurrency(product.compareAtPrice)}
                        </p>
                      ) : null}
                      {product.compareAtPrice ? (
                        <span className="rounded-sm bg-emerald-500 px-2 py-1 text-xs font-semibold text-white">
                          Save{" "}
                          {Math.round(
                            ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
                          )}
                          %
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-0.5 text-[#f59e0b]">
                        {[1, 2, 3, 4, 5].map((item) => (
                          <Star key={item} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <span>(0 Reviews)</span>
                    </div>
                  </div>
                  <button type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>

                <p className="border-b border-border pb-5 text-[14px] leading-7 text-muted-foreground">
                  {product.description}
                </p>

                <div className="space-y-4 text-[14px]">
                  <div className="grid gap-3 rounded-xl border border-border bg-secondary/30 p-4 text-sm sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="mt-1 font-semibold text-foreground">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stock</p>
                      <p className="mt-1 font-semibold text-foreground">
                        {product.stockQuantity > 0 ? `${product.stockQuantity} available` : "Out of stock"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <AddToCartButton
                    product={product}
                    fullWidth
                    quantity={1}
                  />
                  <button
                    type="button"
                    className="inline-flex h-12 items-center justify-center rounded-sm bg-[#231f20] px-5 text-sm font-semibold uppercase tracking-wide text-white"
                  >
                    Buy Now
                  </button>
                  <Link
                    href="https://wa.me/8801896274833"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#23b45d] px-5 text-sm font-semibold text-white"
                  >
                    <MessageCircleMore className="h-4 w-4" />
                    Order On WhatsApp
                  </Link>
                  <Link
                    href="tel:+8801896274833"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-[#2450b9] px-5 text-sm font-semibold text-white"
                  >
                    <Phone className="h-4 w-4" />
                    Call For Order
                  </Link>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>Share Now :</span>
                  <div className="flex items-center gap-2">
                    {[Facebook, Twitter, Share2].map((Icon, index) => (
                      <span key={index} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border">
                        <Icon className="h-4 w-4" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="rounded-xl border border-border bg-white p-5">
              <h2 className="section-title text-[28px] font-bold text-[#111827]">Product Details</h2>
              <div className="mt-6 space-y-4 text-[14px] leading-7 text-muted-foreground">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold">More Products</h2>
              <span className="text-muted-foreground">‹ ›</span>
            </div>
            <div className="space-y-4">
              {relatedProducts.concat(relatedProducts).slice(0, 8).map((item) => (
                <Link key={`${item.id}-${item.title}`} href={`/product/${item.id}`} className="flex gap-3">
                  <div className="relative h-20 w-16 overflow-hidden rounded-sm border border-border bg-white">
                    <Image src={item.image} alt={item.title} fill className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-[13px] leading-5 text-foreground">{item.title}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[15px] font-bold text-primary">{formatCurrency(item.price)}</span>
                      {item.compareAtPrice ? (
                        <span className="text-xs text-muted-foreground line-through">{formatCurrency(item.compareAtPrice)}</span>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-5">
            <h2 className="section-title text-2xl font-bold text-[#111827]">Related Products</h2>
            <Link href="/shop" className="text-sm font-medium uppercase text-primary">
              More Products
            </Link>
          </div>
          <ProductGrid
            products={relatedProducts}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-4"
          />
        </div>
      )}
    </section>
  );
}
