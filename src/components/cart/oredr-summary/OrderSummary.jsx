"use client";

import TakaSymbol from "@/components/shared/Taka-Symbol";
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
}) {
  return (
    <div className="mt-6 sm:mt-0 lg:p-4 border h-fit rounded p-4">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3">
        <hr />
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm text-gray-500">TOTAL</p>
          <p className="font-bold flex justify-center items-center gap-1"><TakaSymbol className={"w-2.5"} /> {total}</p>
        </div>
      </div>

      {hasAction && (
        <div className="mt-4 mb-6 flex justify-between lg:hidden gap-4">
          <Link
            href={"/products"}
            className="text-black cursor-pointer hover:bg-black hover:text-white text-sm font-semibold py-3 px-6 rounded border border-black transition text-nowrap"
          >
            CONTINUE SHOPPING
          </Link>
          <Link
            href="/checkout"
            className="bg-black cursor-pointer text-white hover:border hover:border-black text-sm font-semibold py-3 px-6 rounded hover:bg-white hover:text-black transition text-nowrap"
          >
            PROCEED TO CHECKOUT
          </Link>
        </div>
      )}
    </div>
  );
}
