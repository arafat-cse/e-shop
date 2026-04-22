type OrderStatus =
  | "placed"
  | "confirmed"
  | "packed"
  | "hub"
  | "courier_assigned"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

type OrderTimelineEntry = {
  status: OrderStatus;
  label: string;
  description: string;
  createdAt: string;
};

type OrderRecord = {
  id: number;
  status: OrderStatus;
  statusTimeline?: OrderTimelineEntry[] | string | null;
};

const timelineCopy: Record<OrderStatus, { label: string; description: string }> = {
  placed: {
    label: "Order placed",
    description: "Your order has been received and is waiting for confirmation."
  },
  confirmed: {
    label: "Order confirmed",
    description: "Your order has been confirmed from the backend panel."
  },
  packed: {
    label: "Order packed",
    description: "Your items have been packed and prepared for dispatch."
  },
  hub: {
    label: "Reached hub",
    description: "Your parcel has arrived at the delivery hub."
  },
  courier_assigned: {
    label: "Courier assigned",
    description: "A delivery agent has been assigned to your parcel."
  },
  out_for_delivery: {
    label: "Out for delivery",
    description: "Your parcel is now out for delivery."
  },
  delivered: {
    label: "Delivered",
    description: "The order has been marked as delivered."
  },
  cancelled: {
    label: "Cancelled",
    description: "The order has been cancelled from the backend."
  }
};

export default {
  async beforeUpdate(event: { params: { where?: { id?: number }; data: Record<string, unknown> } }) {
    const orderId = event.params.where?.id;
    const nextStatus = event.params.data.status;

    if (!orderId || typeof nextStatus !== "string") {
      return;
    }

    const order = (await strapi.db.query("api::order.order").findOne({
      where: { id: orderId }
    })) as OrderRecord | null;

    if (!order || order.status === nextStatus) {
      return;
    }

    const timeline = parseTimeline(order.statusTimeline);
    const copy = timelineCopy[nextStatus as OrderStatus];

    if (!copy) {
      return;
    }

    timeline.push({
      status: nextStatus as OrderStatus,
      label: copy.label,
      description: copy.description,
      createdAt: new Date().toISOString()
    });

    event.params.data.statusTimeline = timeline;
  }
};

function parseTimeline(value: OrderRecord["statusTimeline"]) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    try {
      const parsed = JSON.parse(value) as unknown;

      if (Array.isArray(parsed)) {
        return parsed as OrderTimelineEntry[];
      }
    } catch {}
  }

  return [] as OrderTimelineEntry[];
}
