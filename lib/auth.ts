import "server-only";

import { cookies } from "next/headers";

import { AUTH_COOKIE_NAME, STRAPI_BASE_URL } from "@/lib/constants";
import { AuthUser } from "@/lib/types";

type StrapiAuthResponse = {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName?: string;
  };
};

export function normalizeUser(user: StrapiAuthResponse["user"]): AuthUser {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName ?? user.username
  };
}

export async function getSessionToken() {
  return (await cookies()).get(AUTH_COOKIE_NAME)?.value ?? null;
}

export async function getSessionUser() {
  const token = await getSessionToken();

  if (!token) {
    return null;
  }

  const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    return null;
  }

  const user = (await response.json()) as StrapiAuthResponse["user"];
  return normalizeUser(user);
}
