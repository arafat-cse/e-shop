import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TrackingPageClient } from "@/components/orders/tracking-page-client";
import { Badge } from "@/components/ui/badge";
import { getOrderByTrackingToken } from "@/lib/orders";

type TrackingPageProps = {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ placed?: string }>;
};

export async function generateMetadata({
  params
}: TrackingPageProps): Promise<Metadata> {
  const { token } = await params;
  const order = await getOrderByTrackingToken(token);

  if (!order) {
    return {
      title: "Order tracking"
    };
  }

  return {
    title: `Track ${order.trackingNumber}`,
    description: `Live order tracking for ${order.trackingNumber}.`
  };
}

export default async function TrackingPage({
  params,
  searchParams
}: TrackingPageProps) {
  const { token } = await params;
  const query = await searchParams;
  const order = await getOrderByTrackingToken(token);

  if (!order) {
    notFound();
  }

  return (
    <section className="container py-10 md:py-14">
      <div className="mb-8 space-y-3">
        <Badge>Order tracking</Badge>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold">
          Track your order
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          This tracking page can be viewed with or without login using the tracking link.
        </p>
      </div>
      <TrackingPageClient order={order} showPlacedMessage={query.placed === "1"} />
    </section>
  );
}
