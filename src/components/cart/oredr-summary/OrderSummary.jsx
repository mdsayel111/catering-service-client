"use client";

import TakaSymbol from "@/components/shared/Taka-Symbol";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function OrderSummary({
  total,
  subtotal,
  shippingCharge,
  discount,
  shippingCharges,
  setShippingCharge,
  couponCode,
  setCouponCode,
  handleCouponApply,
  paymentMethod,
  setPaymentMethod,
  hasAction = true,
  containerClassName,
}) {
  return (
    <div className={cn("mt-6 sm:mt-0 border h-fit rounded p-4 lg:sticky top-16", containerClassName)}>
      <h2 className="text-lg font-bold text-gray-900 mb-4">অর্ডার বিবরণ</h2>
      <div className="space-y-3">
        <hr />
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm text-gray-500">মোট মূল্য</p>
          <p className="font-bold flex justify-center items-center gap-1"><TakaSymbol className={"w-2.5"} /> {total}</p>
        </div>
      </div>
    </div>
  );
}
