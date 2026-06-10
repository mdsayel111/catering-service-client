import CartCard from "@/components/shared/cart-card/CartCard";
import NotData from "@/components/shared/no-data/NoData";
import Link from "next/link";
export default function CartItems({ cartItems, loading, hasRemove = true, hasIncrease = true, hasDecrease = true }) {
  return (
    <div className="">
      {
        cartItems?.length > 0 ? <>
          <div className={`py-3 md:py-4 px-3 md:px-6 border bg-[#fcfdfd] rounded text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 grid  items-center ${!hasRemove ? "grid-cols-[40px_40%_1fr_1fr] md:grid-cols-[10%_1fr_1fr_1fr_1fr]" : "grid-cols-[40px_40%_1fr_1fr_1fr] md:grid-cols-6"}`}>
            <h5 className="col-span-1">ছবি</h5>
            <h5 className="col-span-1">নাম</h5>
            <h5 className="text-center">মূল্য</h5>
            <h5 className="text-center">সংখ্যা</h5>
            <h5 className="text-center hidden lg:block">মোট</h5>
            <h5 className={`text-center ${hasRemove ? "" : "hidden"}`}>সরান</h5>
          </div>

          {/* order cards */}
          {cartItems?.map((item, index) => (
            <CartCard item={item} key={index} loading={loading} hasIncrease={hasIncrease} hasDecrease={hasDecrease} hasRemove={hasRemove} />
          ))}

        </> : <NotData />
      }
    </div>
  );
}
