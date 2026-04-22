import type { Metadata } from "next";
import { redirect } from "next/navigation";

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

  if (params.token?.trim()) {
    redirect(`/track/${encodeURIComponent(params.token.trim())}`);
  }

  return <TrackingSearchPage defaultValue={params.token ?? ""} showNotFound={false} />;
}
