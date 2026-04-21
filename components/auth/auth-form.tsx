"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isLogin = mode === "login";

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
              setIsSubmitting(true);
              await new Promise((resolve) => setTimeout(resolve, 900));
              toast.success(isLogin ? "Logged in successfully" : "Account created");
              setIsSubmitting(false);
            }}
          >
            {!isLogin && <Input required placeholder="Full name" />}
            <Input required type="email" placeholder="Email address" />
            <Input required type="password" placeholder="Password" />
            {!isLogin && <Input required type="password" placeholder="Confirm password" />}
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
              href={isLogin ? "/register" : "/login"}
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
