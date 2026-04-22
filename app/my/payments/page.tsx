import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "My Payments",
  description: "Payment activity and history."
};

export default function PaymentsPage() {
  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard section="payments" />
    </section>
  );
}
