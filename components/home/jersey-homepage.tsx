"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { ProductGrid } from "@/components/product/product-grid";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const heroSlides = [
  {
    id: 1,
    image: "https://app-area.jersey.com.bd/banner/gUD931775555328-light.jpg",
    alt: "Delivery offer banner",
    href: "/shop"
  },
  {
    id: 2,
    image: "https://app-area.jersey.com.bd/banner/gUD931775555328-light.jpg",
    alt: "Jersey combo offer banner",
    href: "/shop?category=Combo"
  },
  {
    id: 3,
    image: "https://app-area.jersey.com.bd/banner/gUD931775555328-light.jpg",
    alt: "Premium jersey banner",
    href: "/shop?category=International%20Team%20Jersey"
  }
];

const brands = [
  "https://app-area.jersey.com.bd/brand_images/Izm3G1754552718.png",
  "https://app-area.jersey.com.bd/brand_images/UblbA1775715894.png",
  "https://app-area.jersey.com.bd/brand_images/vQJ5s1775715709.png",
  "https://app-area.jersey.com.bd/brand_images/yn9xi1754284129.png",
  "https://app-area.jersey.com.bd/brand_images/toCUL1754552574.png",
  "https://app-area.jersey.com.bd/brand_images/X80xj1754284178.png"
];

const testimonials = [
  {
    name: "Ariful Islam",
    quote:
      "The jersey fits well and the club logo is high quality, not a cheap sticker. For this price, it's a great deal. Highly recommend!"
  },
  {
    name: "Mehedi Hasan",
    quote:
      "The jersey is great, high-quality club logo makes all the difference. Worth it."
  },
  {
    name: "Shitol Ahmed",
    quote: "Alhamdulillah jersey quality 100/100"
  },
  {
    name: "Mohammad Piyash",
    quote: "Premium Jersey with affordable price❤️❤️"
  }
];

function SectionHeader({
  title,
  href,
  label
}: {
  title: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
      <h2 className="section-title text-[30px] font-bold text-[#111827] md:text-[26px]">
        {title}
      </h2>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary"
      >
        {label}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function SliderDots({
  count,
  activeIndex,
  onSelect
}: {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="mt-4 flex justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onSelect(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            activeIndex === index ? "bg-primary" : "bg-primary/35"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

function useAutoSlider(length: number, delay: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, delay);

    return () => window.clearInterval(timer);
  }, [delay, length]);

  return [index, setIndex] as const;
}

function pickProducts(
  products: Product[],
  category: string,
  fallbackStart: number,
  count: number
) {
  const exact = products.filter((product) => product.category === category);
  if (exact.length > 0) {
    return exact.slice(0, count);
  }

  return products.slice(fallbackStart, fallbackStart + count);
}

export function JerseyHomepage({ products }: { products: Product[] }) {
  const [heroIndex, setHeroIndex] = useAutoSlider(heroSlides.length, 4500);
  const [brandIndex, setBrandIndex] = useAutoSlider(brands.length, 3000);
  const [reviewIndex, setReviewIndex] = useAutoSlider(testimonials.length, 3500);

  const premiumProducts = useMemo(
    () => pickProducts(products, "International Team Jersey", 0, 5),
    [products]
  );
  const standardProducts = useMemo(
    () => pickProducts(products, "Football Club Jersey", 2, 10),
    [products]
  );
  const comboProducts = useMemo(
    () => pickProducts(products, "Combo", 4, 5),
    [products]
  );

  const visibleBrands = useMemo(() => {
    const ordered = [...brands.slice(brandIndex), ...brands.slice(0, brandIndex)];
    return ordered.slice(0, 4);
  }, [brandIndex]);

  const visibleTestimonials = useMemo(() => {
    const ordered = [
      ...testimonials.slice(reviewIndex),
      ...testimonials.slice(0, reviewIndex)
    ];
    return ordered.slice(0, 3);
  }, [reviewIndex]);

  return (
    <div className="pb-10">
      <section className="container pt-4 md:pt-6">
        <div className="rounded-[28px] bg-white p-4 md:p-6">
          <div className="relative overflow-hidden rounded-[24px] bg-white">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${heroIndex * 100}%)` }}
            >
              {heroSlides.map((slide) => (
                <Link
                  key={slide.id}
                  href={slide.href}
                  className="relative block min-h-[300px] min-w-full overflow-hidden rounded-[24px] md:min-h-[520px]"
                >
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={slide.id === 1}
                    className="object-cover"
                    sizes="100vw"
                  />
                </Link>
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setHeroIndex((current) =>
                  current === 0 ? heroSlides.length - 1 : current - 1
                )
              }
              className="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow md:inline-flex"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setHeroIndex((current) => (current + 1) % heroSlides.length)}
              className="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-foreground shadow md:inline-flex"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <SliderDots
            count={heroSlides.length}
            activeIndex={heroIndex}
            onSelect={setHeroIndex}
          />
        </div>
      </section>

      <section className="container pt-10">
        <SectionHeader title="Our Brands" href="/shop" label="See All" />
        <div className="grid gap-4 md:grid-cols-4">
          {visibleBrands.map((brand, index) => (
            <div
              key={`${brand}-${index}`}
              className="flex h-20 items-center justify-center rounded-md border border-border bg-white px-8"
            >
              <Image
                src={brand}
                alt={`Brand ${index + 1}`}
                width={180}
                height={70}
                className="h-auto w-auto max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
        <SliderDots
          count={brands.length}
          activeIndex={brandIndex}
          onSelect={setBrandIndex}
        />
      </section>

      <section className="container pt-12">
        <SectionHeader title="Premium Jersey" href="/shop" label="View All Items" />
        <ProductGrid
          products={premiumProducts}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        />
      </section>

      <section className="container pt-12">
        <SectionHeader title="Standard Jersey" href="/shop" label="View All Items" />
        <ProductGrid
          products={standardProducts}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
        />
      </section>

      {comboProducts.length > 0 ? (
        <section className="container pt-12">
          <SectionHeader title="Combo" href="/shop?category=Combo" label="View All Items" />
          <ProductGrid
            products={comboProducts}
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-5"
          />
        </section>
      ) : null}

      <section className="container pt-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {visibleTestimonials.map((item) => (
            <div key={item.name} className="rounded-[18px] border border-border bg-white p-6">
              <p className="min-h-[96px] text-[16px] leading-8 text-muted-foreground">
                {item.quote}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xl font-semibold">{item.name.charAt(0)}</span>
                </div>
                <p className="text-[18px] font-medium text-[#111827]">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        <SliderDots
          count={testimonials.length}
          activeIndex={reviewIndex}
          onSelect={setReviewIndex}
        />
      </section>
    </div>
  );
}
