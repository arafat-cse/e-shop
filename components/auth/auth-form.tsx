"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isLogin = mode === "login";
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <div className="container flex min-h-[calc(100vh-18rem)] items-center justify-center py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            {isLogin ? "Welcome back" : "Get started"}
          </p>
          <CardTitle className="font-[family-name:var(--font-heading)] text-3xl">
            {isLogin ? "Login to your account" : "Create a new account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Access your cart, checkout flow, and saved shopping activity."
              : "Register to experience a complete eCommerce account flow UI."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              if (!isLogin && password !== confirmPassword) {
                toast.error("Password and confirm password do not match.");
                return;
              }

              setIsSubmitting(true);

              try {
                const response = await fetch(
                  isLogin ? "/api/auth/login" : "/api/auth/register",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                      isLogin
                        ? { identifier: email, password }
                        : { fullName, email, password }
                    )
                  }
                );

                const payload = await response.json();

                if (!response.ok) {
                  throw new Error(payload.error ?? "Authentication failed.");
                }

                clearCart();
                setUser(payload.user);
                toast.success(isLogin ? "Logged in successfully" : "Account created");

                const redirect = searchParams.get("redirect");
                router.push(redirect || "/shop");
                router.refresh();
              } catch (error) {
                toast.error(
                  error instanceof Error ? error.message : "Authentication failed."
                );
              } finally {
                setIsSubmitting(false);
              }
            }}
          >
            {!isLogin && (
              <Input
                required
                placeholder="Full name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
            )}
            <Input
              required
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {!isLogin && (
              <Input
                required
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting
                ? isLogin
                  ? "Signing in..."
                  : "Creating account..."
                : isLogin
                  ? "Login"
                  : "Register"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? "Need an account?" : "Already have an account?"}{" "}
            <Link
              href={
                isLogin
                  ? `/register${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}` : ""}`
                  : `/login${searchParams.get("redirect") ? `?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}` : ""}`
              }
              className="font-semibold text-primary hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
