import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login UI for the storefront account experience."
};

export default function LoginPage() {
  return <AuthForm mode="login" />;
}
