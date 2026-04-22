import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "Promo Coupons",
  description: "Saved coupons and promotional offers."
};

export default function CouponsPage() {
  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard section="coupons" />
    </section>
  );
}
