import type { Metadata } from "next";

import { TrackingPageClient } from "@/components/orders/tracking-page-client";
import { TrackingSearchPage } from "@/components/orders/tracking-search-page";
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
    return <TrackingSearchPage defaultValue={token} showNotFound />;
  }

  return (
    <section className="container py-10 md:py-14">
      <TrackingPageClient order={order} showPlacedMessage={query.placed === "1"} />
    </section>
  );
}
