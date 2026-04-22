import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { createOrderForUser, listOrdersForUser } from "@/lib/orders";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await listOrdersForUser(user.id);
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const order = await createOrderForUser(user.id, payload);
    return NextResponse.json({ order });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to place this order.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
