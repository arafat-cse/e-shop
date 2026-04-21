import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Checkout UI with shipping details, payment selection, and summary."
};

export default function CheckoutPage() {
  return (
    <section className="container py-10 md:py-14">
      <CheckoutPageClient />
    </section>
  );
}
