import type { Metadata } from "next";

import { TrackingSearchPage } from "@/components/orders/tracking-search-page";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Search your order using tracking number or token."
};

export default async function TrackPage({
  searchParams
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  return <TrackingSearchPage defaultValue={params.token ?? ""} showNotFound />;
}
