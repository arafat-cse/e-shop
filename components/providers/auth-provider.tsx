"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/use-auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const hydrated = useAuthStore((state) => state.hydrated);
  const setUser = useAuthStore((state) => state.setUser);
  const setHydrated = useAuthStore((state) => state.setHydrated);

  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });

        if (!response.ok) {
          if (!ignore) {
            setUser(null);
          }
          return;
        }

        const payload = await response.json();

        if (!ignore) {
          setUser(payload.user ?? null);
        }
      } catch {
        if (!ignore) {
          setUser(null);
        }
      } finally {
        if (!ignore && !hydrated) {
          setHydrated(true);
        }
      }
    }

    loadSession();

    return () => {
      ignore = true;
    };
  }, [hydrated, setHydrated, setUser]);

  return <>{children}</>;
}
