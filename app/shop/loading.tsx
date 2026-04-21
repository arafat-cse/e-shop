import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <section className="container py-10 md:py-14">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="mt-4 h-12 w-80" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[300px_1fr]">
        <Skeleton className="h-[420px] rounded-[2rem]" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-[420px] rounded-[2rem]" />
          ))}
        </div>
      </div>
    </section>
  );
}
