"use client";

import Link from "next/link";
import { Eye, KeyRound, Mail, MapPin, Smartphone, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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

  const redirectSuffix = searchParams.get("redirect")
    ? `?redirect=${encodeURIComponent(searchParams.get("redirect") ?? "")}`
    : "";

  const FormInput = ({
    icon,
    ...props
  }: React.ComponentProps<typeof Input> & { icon: React.ReactNode }) => (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary">
        {icon}
      </span>
      <Input
        {...props}
        className="h-12 rounded-md border-border bg-white pl-11 pr-11 text-[15px] shadow-none focus-visible:border-primary focus-visible:ring-0"
      />
      {props.type === "password" ? (
        <Eye className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      ) : null}
    </div>
  );

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-[1040px] rounded-[28px] bg-white px-6 py-10 shadow-[0_25px_70px_rgba(15,23,42,0.08)] md:px-10">
        <div className="flex flex-col items-center justify-center gap-4 pb-8 text-center md:flex-row">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white">
            <UserRound className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black">{isLogin ? "Signin" : "Create New Account"}</h1>
            <p className="mt-1 text-lg text-foreground/80">
              {isLogin ? "Access your account securely" : "Register to get started"}
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_72px_1fr]">
          <div className="rounded-3xl bg-[#f5f5f5] p-6">
            <h2 className="mb-5 text-[18px] font-semibold text-black">
              {isLogin ? "Login With Mobile Number" : "Signup With Mobile Number"}
            </h2>
            <div className="space-y-4">
              <FormInput
                icon={<Smartphone className="h-4 w-4" />}
                placeholder="01*********"
              />
              <button
                type="button"
                className="h-12 w-full rounded-md bg-primary text-base font-semibold text-white"
              >
                Send OTP
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-full items-center justify-center">
              <div className="h-full w-px bg-border" />
              <span className="absolute inline-flex h-14 w-14 items-center justify-center rounded-full border border-border bg-white text-lg font-semibold text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#f5f5f5] p-6">
            <h2 className="mb-5 text-[18px] font-semibold text-black">
              {isLogin ? "Login With Credentials" : "Register a new account"}
            </h2>
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
                  router.push(
                    isLogin ? redirect || "/account" : "/account?welcome=1"
                  );
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
              {!isLogin ? (
                <FormInput
                  required
                  icon={<UserRound className="h-4 w-4" />}
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              ) : null}
              <FormInput
                required
                icon={<Mail className="h-4 w-4" />}
                type={isLogin ? "text" : "email"}
                placeholder={isLogin ? "Email or phone number" : "Email or Phone Number"}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormInput
                required
                icon={<KeyRound className="h-4 w-4" />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {!isLogin ? (
                <>
                  <FormInput
                    required
                    icon={<KeyRound className="h-4 w-4" />}
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                  <FormInput
                    icon={<MapPin className="h-4 w-4" />}
                    placeholder="Address"
                  />
                </>
              ) : (
                <div className="flex items-center justify-between gap-4 text-[14px] text-muted-foreground">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-border" />
                    <span>Remember me</span>
                  </label>
                  <Link href="/" className="font-medium text-primary underline underline-offset-2">
                    Forgotten password?
                  </Link>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full rounded-md bg-primary text-base font-semibold text-white"
              >
                {isSubmitting
                  ? isLogin
                    ? "Signing in..."
                    : "Creating account..."
                  : isLogin
                    ? "Login"
                    : "Register account"}
              </button>
            </form>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[480px] text-center">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-[14px] text-foreground">
              {isLogin ? "or signin with" : "or signup with"}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <button
            type="button"
            className="mx-auto mt-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-white text-xl font-semibold text-[#4285F4]"
          >
            G
          </button>
          <p className="mt-5 text-[15px] text-foreground">
            {isLogin ? "Don't have any account?" : "Already have an account?"}{" "}
            <Link
              href={isLogin ? `/register${redirectSuffix}` : `/login${redirectSuffix}`}
              className="font-medium text-primary underline underline-offset-2"
            >
              {isLogin ? "Register account" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
