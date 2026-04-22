import { NextResponse } from "next/server";

import { getSessionUser } from "@/lib/auth";
import { getOrderByTrackingToken, getOrderForUser } from "@/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackingToken: string }> }
) {
  const { trackingToken } = await params;
  const user = await getSessionUser();

  const order =
    (user ? await getOrderForUser(user.id, trackingToken) : null) ??
    (await getOrderByTrackingToken(trackingToken));

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
