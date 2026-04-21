"use client";

import { startTransition, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
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

  return (
    <aside className="rounded-[1.75rem] border border-border/70 bg-card/80 p-5 shadow-soft">
      <div className="mb-5 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          Search & Filter
        </h2>
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          updateRoute(query, initialCategory);
        }}
        className="space-y-3"
      >
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products"
            className="pl-11"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1">
            Apply
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setQuery("");
              updateRoute("", "all");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="mt-6 space-y-3">
        <p className="text-sm font-semibold">Categories</p>
        <div className="flex flex-wrap gap-2">
          {["all", ...categories].map((category) => {
            const active = category === (initialCategory || "all");
            return (
              <button
                key={category}
                type="button"
                onClick={() => updateRoute(query, category)}
                className={cn(
                  "rounded-full border px-3 py-2 text-sm font-medium transition",
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
    </aside>
  );
}
