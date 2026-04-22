import type { Metadata } from "next";

import { AccountDashboard } from "@/components/account/account-dashboard";

export const metadata: Metadata = {
  title: "My Wishlists",
  description: "Saved wishlist products."
};

export default function WishlistsPage() {
  return (
    <section className="container py-8 md:py-10">
      <AccountDashboard section="wishlists" />
    </section>
  );
}
