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
        {/* <p>Payment Method</p>
        <div className="text-sm flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="accent-black cursor-pointer"
              onChange={() => setPaymentMethod("online")}
              checked={paymentMethod === "online"}
            />
            <p className="text-gray-600 text-sm font-light">Online Payment</p>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="radio"
              className="accent-black cursor-pointer"
              onChange={() => setPaymentMethod("cash")}
              checked={paymentMethod === "cash"}
            />
            <p className="text-gray-600 text-sm font-light">Cash on Delivery</p>
          </div>
        </div>
        <div className="text-sm flex justify-between items-center">
          <p>Subtotal</p>
          <p className="text-gray-600">+$ {subtotal}</p>
        </div> */}

        {/* uncomment when add delivery charge */}
        {/* {shippingCharges?.length > 0 && (
          <>
            <p>Shipping Charge</p>
            <div>
              {shippingCharges?.map((item, index) => (
                <div
                  key={index}
                  className="text-sm flex justify-between items-center"
                >
                  <div className="flex gap-2 items-center">
                    <input
                      type="radio"
                      className="accent-black cursor-pointer"
                      onChange={() => setShippingCharge(item)}
                      checked={shippingCharge?._id === item?._id}
                    />
                    <p className="text-gray-600 text-sm font-light">
                      {item?.title}
                    </p>
                  </div>
                  <p className="text-gray-600">+${item?.charge}</p>
                </div>
              ))}
            </div>
          </>
        )} */}

        {/* uncomment when discount added */}
        {/* <div className="text-sm flex justify-between items-center">
          <p>Discount</p>
          <p className="text-gray-600">+${discount}</p>
        </div> */}
        <hr />
        <div className="flex justify-between items-center">
          <p className="font-bold text-sm text-gray-500">TOTAL</p>
          <p className="font-bold flex justify-center items-center gap-1"><TakaSymbol className={"w-2.5"} /> {total}</p>
        </div>
      </div>

      {/* uncomment when discount coupon apply */}
      {/* <div className="flex w-full my-4 mx-auto">
        <input
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          type="text"
          placeholder="Coupon code"
          className="px-4 py-2 text-sm border border-r-0 border-gray-300 focus:!border-black rounded-l-full focus:outline-none focus:ring-0 focus:ring-primary transition-shadow w-full md:w-auto grow"
        />
        <button
          className={
            "rounded-r-full hover:bg-primary hover:text-white text-white bg-black px-4 text-sm shadow-none"
          }
          onClick={() => {
            handleCouponApply();
            toast.success("Coupon applied successfully!");
          }}
        >
          Apply Coupon
        </button>
      </div> */}

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
