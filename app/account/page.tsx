import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "My Account",
  description: "Dashboard view for account activity, orders, and cart summary."
};

export default async function AccountPage({
  searchParams
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard initialShowConfirmation={params.welcome === "1"} section="dashboard" />
    </section>
  );
}
