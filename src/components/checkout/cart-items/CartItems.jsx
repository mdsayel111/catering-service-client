import CartCard from "@/components/shared/cart-card/CartCard";
import NotData from "@/components/shared/no-data/NoData";
import React from "react";

export default function CartItems({ finalCartItems, loading }) {
  return (
    <div className="">
      {finalCartItems?.length > 0 ? (
        <>
          <div className="py-3 md:py-4 px-3 md:px-6 border bg-[#fcfdfd] rounded text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 grid grid-cols-4 md:grid-cols-5 items-center">
            <h5 className="col-span-1">Item</h5>
            <h5 className="col-span-1">Name</h5>
            <h5 className="text-center">Price</h5>
            <h5 className="text-center">Quantity</h5>
            <h5 className="text-center hidden md:block">Subtotal</h5>
          </div>

          {/* order cards */}
          {finalCartItems?.map((item, index) => (
            <CartCard
              item={item}
              key={index}
              loading={loading}
              hasIncrease={false}
              hasDecrease={false}
              hasRemove={false}
            />
          ))}
        </>
      ) : (
        <NotData text="cart item" containerClassName={"h-[60vh] border"} />
      )}
    </div>
  );
}
