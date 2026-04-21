import Link from "next/link";

const footerLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/cart", label: "Cart" },
  { href: "/checkout", label: "Checkout" },
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">
              ShopSphere
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
              A fast, modern storefront for daily shopping.
            </h2>
            <p className="max-w-md text-sm text-muted-foreground">
              Built with Next.js 15 App Router, TypeScript, Tailwind CSS, Zustand,
              and production-friendly patterns for search, cart persistence, and
              conversion-focused UI.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Quick Links
            </h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
              Contact
            </h3>
            <div className="grid gap-3 text-sm text-muted-foreground">
              <p>support@shopsphere.dev</p>
              <p>+1 (800) 555-0142</p>
              <p>Mon - Sat, 9:00 AM to 7:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          © 2026 ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
