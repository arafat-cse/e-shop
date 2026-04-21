import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featurePoints = [
  { icon: Truck, label: "Express Delivery" },
  { icon: ShieldCheck, label: "Secure Checkout" },
  { icon: Sparkles, label: "Curated Deals" }
];

export function HeroSection() {
  return (
    <section className="container py-8 md:py-12">
      <div className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-hero-grid shadow-soft lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8 p-8 md:p-12">
          <Badge>Fresh arrivals for everyday essentials</Badge>
          <div className="space-y-5">
            <h1 className="max-w-2xl font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight text-balance md:text-6xl">
              Shop smarter with a storefront built for speed and trust.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Discover trending tech, fashion, lifestyle, and home products in a
              clean marketplace experience inspired by large-scale retail UX.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/shop">
              <Button size="lg">
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Create account
              </Button>
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {featurePoints.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/60 bg-white/75 p-4 backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <Icon className="mb-3 h-5 w-5 text-primary" />
                <p className="text-sm font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[340px] overflow-hidden border-t border-border/70 lg:border-l lg:border-t-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(180deg,rgba(249,115,22,0.12),rgba(15,23,42,0.02))]" />
          <div className="relative flex h-full items-end justify-center p-8 md:p-12">
            <div className="grid w-full max-w-md gap-4">
              <div className="rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
                <p className="text-sm text-muted-foreground">Today&apos;s spotlight</p>
                <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold">
                  Save up to 40% on curated electronics
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Limited-time deals on audio, wearables, and smart home upgrades.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
                  <p className="text-3xl font-bold">1.2k+</p>
                  <p className="text-sm text-muted-foreground">Products indexed</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/60 bg-white/80 p-5 shadow-soft backdrop-blur dark:border-white/10 dark:bg-slate-950/40">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm text-muted-foreground">Customer support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
