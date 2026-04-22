import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "My Address",
  description: "Saved shipping and billing addresses."
};

export default function AddressPage() {
  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard section="address" />
    </section>
  );
}
