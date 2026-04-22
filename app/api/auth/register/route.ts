import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { normalizeUser } from "@/lib/auth";
import { AUTH_COOKIE_NAME, STRAPI_BASE_URL } from "@/lib/constants";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    fullName?: string;
    email?: string;
    password?: string;
  };

  const response = await fetch(`${STRAPI_BASE_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: body.fullName,
      email: body.email,
      password: body.password
    }),
    cache: "no-store"
  });

  const payload = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { error: payload.error?.message ?? "Unable to register." },
      { status: response.status }
    );
  }

  (await cookies()).set({
    name: AUTH_COOKIE_NAME,
    value: payload.jwt,
    httpOnly: true,
    sameSite: "lax",
    path: "/"
  });

  return NextResponse.json({ user: normalizeUser(payload.user) });
}
