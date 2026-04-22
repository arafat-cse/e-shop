import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AppToaster } from "@/components/ui/toaster";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shopsphere.local"),
  title: {
    default: `${APP_NAME} | Modern Online Shopping`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  keywords: ["Next.js ecommerce", "online shop", "cart", "storefront"],
  openGraph: {
    title: `${APP_NAME} | Modern Online Shopping`,
    description: APP_DESCRIPTION,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Modern Online Shopping`,
    description: APP_DESCRIPTION
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} font-[family-name:var(--font-body)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <AppToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
