"use client";

import { startTransition, useState } from "react";
import { Minus, Plus, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchFiltersProps = {
  categories: string[];
  initialQuery: string;
  initialCategory: string;
};

export function SearchFilters({
  categories,
  initialQuery,
  initialCategory
}: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    flag: true,
    price: true,
    size: true,
    brands: true,
    color: false
  });

  const updateRoute = (nextQuery: string, nextCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextQuery) {
      params.set("q", nextQuery);
    } else {
      params.delete("q");
    }

    if (nextCategory && nextCategory !== "all") {
      params.set("category", nextCategory);
    } else {
      params.delete("category");
    }

    startTransition(() => {
      router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  const jerseyFlags = ["Trending Items", "Best Selling", "Best Collection", "New Arrival", "Offered Items"];
  const sizes = ["M", "L", "XL", "XXL"];
  const brands = ["Adidas-1", "Jordan", "adidas", "nike", "puma", "umbro"];

  return (
    <aside className="space-y-5">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateRoute(query, initialCategory);
        }}
        className="rounded-md border border-border bg-white p-3"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="h-10 rounded-sm pl-10"
            />
          </div>
          <Button type="submit" className="h-10 rounded-sm px-4">
            Go
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-sm px-3"
            onClick={() => {
              setQuery("");
              updateRoute("", "all");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>

      {[
        {
          key: "flag",
          title: "Product Flag",
          content: (
            <div className="space-y-3">
              {jerseyFlags.map((flag) => (
                <label key={flag} className="flex items-center gap-2 text-[14px] text-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  <span>{flag}</span>
                </label>
              ))}
            </div>
          )
        },
        {
          key: "price",
          title: "Price",
          content: (
            <div className="flex items-center gap-3">
              <Input placeholder="min" className="h-10 rounded-sm text-[14px]" />
              <Input placeholder="max" className="h-10 rounded-sm text-[14px]" />
              <Button className="h-10 rounded-sm px-4">Go</Button>
            </div>
          )
        },
        {
          key: "size",
          title: "Filter Sizes",
          content: (
            <div className="space-y-0 overflow-hidden rounded-sm border border-border">
              {sizes.map((size) => (
                <label key={size} className="flex items-center justify-between border-b border-border bg-white px-4 py-3 text-[14px] last:border-b-0">
                  <span>{size}</span>
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                </label>
              ))}
            </div>
          )
        },
        {
          key: "brands",
          title: "Brands",
          content: (
            <div className="space-y-3">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-[14px] text-foreground">
                  <input type="checkbox" className="h-4 w-4 rounded border-border" />
                  <span>{brand}</span>
                </label>
              ))}
              <div className="pt-3">
                <p className="mb-3 text-sm font-semibold">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {["all", ...categories].map((category) => {
                    const active = category === (initialCategory || "all");
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => updateRoute(query, category)}
                        className={cn(
                          "rounded-sm border px-3 py-2 text-sm font-medium transition",
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background hover:bg-accent"
                        )}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )
        },
        {
          key: "color",
          title: "Filter Colors",
          content: <p className="text-[14px] text-muted-foreground">Color filters can be connected when color attributes are added in backend.</p>
        }
      ].map((section) => {
        const open = openSections[section.key];
        return (
          <div key={section.key} className="rounded-md border border-border bg-white">
            <button
              type="button"
              onClick={() => setOpenSections((current) => ({ ...current, [section.key]: !current[section.key] }))}
              className="flex w-full items-center justify-between px-4 py-4 text-left"
            >
              <span className="section-title text-[14px] font-semibold text-foreground">{section.title}</span>
              {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
            {open ? <div className="px-4 pb-4">{section.content}</div> : null}
          </div>
        );
      })}
    </aside>
  );
}
