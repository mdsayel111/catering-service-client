import { cn } from "@/utils/cn";

const OrderDetails = ({ item }) => {
  const subtotal = 0;
  const discount = item?.isCouponApplied ? subtotal * 0.2 : 0;
  const total = subtotal + item?.shippingCost - discount;
  return (
      <div className="font-sans border rounded-xs h-fit lg:sticky top-0">
        <div className="mx-auto bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 w-full">
            <h1 className="text-xl font-semibold text-gray-800">
              Order Details - {item?._id}
            </h1>
          </div>
        </div>
      </div>
  );
};

export default OrderDetails;
