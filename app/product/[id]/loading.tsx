import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <section className="container py-10 md:py-14">
      <Skeleton className="mb-8 h-5 w-28" />
      <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr]">
        <Skeleton className="aspect-square rounded-[2rem]" />
        <div className="space-y-5">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </section>
  );
}
