import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";

import { Input } from "@/components/ui/input";

const companyLinks = [
  { href: "/shop", label: "Contact us" },
  { href: "/shop", label: "The blog" },
  { href: "/shop", label: "Terms and Conditions" },
  { href: "/shop", label: "Privacy Policy" },
  { href: "/shop", label: "Shipping Policy" },
  { href: "/shop", label: "Return & Refund Policy" },
  { href: "/shop", label: "FAQ" }
];

const accountLinks = [
  { href: "/account/orders", label: "My account" },
  { href: "/account/orders", label: "My orders" },
  { href: "/cart", label: "My wishlist" },
  { href: "/checkout", label: "Payment history" },
  { href: "/track", label: "Support ticket" },
  { href: "/track", label: "Order Tracking" }
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1.2fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-end gap-0.5">
              <span className="font-[family-name:var(--font-heading)] text-[52px] font-bold tracking-[-0.06em] text-black">
                JERSEY
              </span>
              <span className="mb-1 inline-flex h-8 items-center justify-center rounded-sm bg-primary px-1 text-[10px] font-bold uppercase leading-none text-white">
                .bd
              </span>
            </Link>
            <p className="max-w-sm text-[15px] leading-8 text-muted-foreground">
              Bangladesh&apos;s #1 Online Store for Authentic Football, Cricket, and Custom Jerseys.
            </p>
            <div className="space-y-3 text-[15px] text-muted-foreground">
              <p className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                Chashara, Narayanganj Sadar-1400, Narayanganj, Bangladesh
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                +880 1896 274 833
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                info@jersey.com.bd
              </p>
            </div>
            <div className="flex gap-3">
              {[Facebook, Instagram, MessageCircle].map((Icon, index) => (
                <Link
                  key={index}
                  href="/"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[15px] font-semibold uppercase tracking-wide text-foreground">
              Company
            </h3>
            <div className="grid gap-4 text-[15px] text-muted-foreground">
              {companyLinks.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[15px] font-semibold uppercase tracking-wide text-foreground">
              Accounts
            </h3>
            <div className="grid gap-4 text-[15px] text-muted-foreground">
              {accountLinks.map((link) => (
                <Link key={link.label} href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-[15px] font-semibold text-foreground">Sign Up Newsletter</h3>
              <p className="mt-3 text-[15px] text-muted-foreground">
                Don&apos;t worry, we won&apos;t spam you!
              </p>
            </div>
            <form className="flex overflow-hidden rounded-md border border-border bg-secondary">
              <Input
                placeholder="Type Your E-mail"
                className="h-12 border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-14 items-center justify-center bg-primary text-white"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div>
              <h4 className="mb-4 text-[15px] font-semibold text-foreground">
                Download App on Mobile :
              </h4>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-md bg-[#1f1f1f] px-4 py-2 text-sm font-medium text-white">
                  Google Play
                </span>
                <span className="rounded-md bg-[#1f1f1f] px-4 py-2 text-sm font-medium text-white">
                  App Store
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Copyright © 2026 Jersey.com.bd All right reserved</p>
          <p>Pay with Visa, MasterCard, bKash, Nagad, Rocket</p>
        </div>
      </div>
    </footer>
  );
}
