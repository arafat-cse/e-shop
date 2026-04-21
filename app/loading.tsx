import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="container py-10 md:py-14">
      <Skeleton className="h-[480px] rounded-[2rem]" />
    </section>
  );
}
