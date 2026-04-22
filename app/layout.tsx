import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
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
  metadataBase: new URL("https://jersey-house.local"),
  title: {
    default: `${APP_NAME} | Premium Football Jersey Store`,
    template: `%s | ${APP_NAME}`
  },
  description: APP_DESCRIPTION,
  keywords: ["football jersey", "bangladesh jersey shop", "online jersey store"],
  openGraph: {
    title: `${APP_NAME} | Premium Football Jersey Store`,
    description: APP_DESCRIPTION,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: `${APP_NAME} | Premium Football Jersey Store`,
    description: APP_DESCRIPTION
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${bodyFont.variable} ${headingFont.variable} font-[family-name:var(--font-body)] bg-[#f6f7fb]`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingActions />
            </div>
            <AppToaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
