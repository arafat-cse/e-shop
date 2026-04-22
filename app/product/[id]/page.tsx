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

const sizeGuide = [
  ["M", "27", "36"],
  ["L", "28", "38"],
  ["XL", "29", "40"],
  ["XXL", "30", "42"]
];

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
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="w-16 font-medium">Size:</span>
                    {["M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        className="inline-flex h-9 min-w-11 items-center justify-center rounded-sm border border-border px-3 hover:border-primary hover:text-primary"
                      >
                        {size}
                      </button>
                    ))}
                    <button type="button" className="text-sm font-medium text-primary underline underline-offset-2">
                      Size Guide
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="w-16 font-medium">Quantity:</span>
                    <div className="flex items-center overflow-hidden rounded-sm border border-border">
                      <button type="button" className="inline-flex h-9 w-9 items-center justify-center bg-[#f8f8f8] text-lg">
                        -
                      </button>
                      <span className="inline-flex h-9 min-w-10 items-center justify-center text-sm">1</span>
                      <button type="button" className="inline-flex h-9 w-9 items-center justify-center bg-[#f8f8f8] text-lg">
                        +
                      </button>
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
            <div className="mb-4 flex flex-wrap gap-3">
              <span className="rounded-sm bg-secondary px-4 py-2 text-sm font-semibold text-foreground">Description</span>
              <span className="rounded-sm bg-secondary px-4 py-2 text-sm font-medium text-foreground">Size Guide</span>
              <span className="rounded-sm bg-secondary px-4 py-2 text-sm font-medium text-foreground">Customer Reviews (0)</span>
            </div>

            <div className="space-y-8">
              <div className="rounded-xl border border-border bg-white p-5">
                <h2 className="section-title text-[28px] font-bold text-[#111827]">Product Details</h2>
                <p className="mt-6 text-[14px] text-muted-foreground">{product.title}</p>
                <div className="mt-5 space-y-4 text-[14px] leading-7 text-muted-foreground">
                  <p>✅ Fabric: Premium Mash (গ্রীষ্ম-শীতে আরামদায়ক)</p>
                  <p>✅ GSM: 160</p>
                  <p>✅ Logo: High-Quality Premium Club Logo</p>
                  <p>✅ Size: M, L, XL, XXL</p>
                  <p className="pt-4 text-[13px]">
                    Note: আপনার ব্যবহৃত ডিসপ্লে বা মনিটরের কারণে ছবির সাথে আসল পণ্যের রঙে সামান্য পার্থক্য হতে পারে।
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <h3 className="section-title text-[28px] font-bold text-[#111827]">Size Guide</h3>
                <div className="mt-6 overflow-hidden rounded-md border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary text-[#111827]">
                      <tr>
                        <th className="px-4 py-3">Size</th>
                        <th className="px-4 py-3">Length</th>
                        <th className="px-4 py-3">Chest</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map(([size, length, chest]) => (
                        <tr key={size} className="border-t border-border">
                          <td className="px-4 py-3 font-semibold">{size}</td>
                          <td className="px-4 py-3">{length}</td>
                          <td className="px-4 py-3">{chest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-white p-5">
                <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
                  <div>
                    <p className="text-6xl font-bold text-[#111827]">0.0</p>
                    <p className="mt-2 text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-sm text-muted-foreground">(0 Reviews)</p>
                    <p className="mt-4 text-2xl font-semibold text-[#111827]">0.00%</p>
                    <p className="text-sm text-muted-foreground">Recommended (1 of 3)</p>
                    <div className="mt-4 space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3">
                          <span className="w-10 text-sm text-[#f59e0b]">{`${star}★`}</span>
                          <div className="h-2 flex-1 rounded-full bg-secondary" />
                          <span className="text-sm text-muted-foreground">0%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="section-title text-[28px] font-bold text-[#111827]">Submit Your Review</h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Your email address will not be published. Required fields are marked *
                    </p>
                    <div className="mt-4 space-y-4">
                      <textarea
                        className="min-h-36 w-full rounded-md border border-border px-4 py-3 outline-none"
                        placeholder="Write Your Review Here..."
                      />
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <select className="h-11 flex-1 rounded-md border border-border px-4 outline-none">
                          <option>Select One</option>
                          <option>5 Stars</option>
                          <option>4 Stars</option>
                        </select>
                        <button
                          type="button"
                          className="inline-flex h-11 items-center justify-center rounded-sm bg-[#2e2e2e] px-8 text-sm font-semibold text-white"
                        >
                          Submit Review
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
