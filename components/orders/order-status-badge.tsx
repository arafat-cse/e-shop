import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types";

const statusLabelMap: Record<OrderStatus, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  packed: "Packed",
  hub: "At Hub",
  courier_assigned: "Courier Assigned",
  out_for_delivery: "Out For Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled"
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className="rounded-full px-3 py-1">
      {statusLabelMap[status]}
    </Badge>
  );
}
