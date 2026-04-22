import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "Manage Profile",
  description: "Manage account profile information."
};

export default function ManageProfilePage() {
  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard section="profile" />
    </section>
  );
}
