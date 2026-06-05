import { cn } from "@/utils/cn";
import formatDate from "@/utils/format-date";
import OrderDetails from "../order-details/OrderDetails";
import OrderItems from "../order-items/OrderItems";

export default function OrderCard({ item, setSelectedOrder, selectedOrder }) {
  const subtotal = 0;
  const discount = item?.isCouponApplied ? subtotal * 0.2 : 0;
  const total = subtotal + item?.shippingCost - discount;
  return (
    <div
      className={cn(
        "bg-gray-100 rounded-xs border lg:text-nowrap cursor-pointer",
        selectedOrder?._id === item?._id ? "!border-red-500" : ""
      )}
    >
      <div className={cn("p-4 lg:p-6")} onClick={() => setSelectedOrder(item)}>
        <div className="flex items-center justify-between">
          <h5 className="text-lg">
            <span className="font-medium">Order#</span>
            <span className="font-light">{item?._id}</span>
          </h5>
        </div>
        <div className={cn("pt-4 space-y-3")}>
          <div className="grid grid-cols-3 justify-between items-center ">
            <span className="font-light">Order Date</span>
            <span className="ml-2">:</span>
            <span className="text-sm font-light text-right">
              {formatDate(item?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          selectedOrder?._id === item?._id ? "block" : "hidden",
          "lg:hidden"
        )}
      >
        <OrderDetails item={item} />
        <OrderItems item={item} />
      </div>
    </div>
  );
}
