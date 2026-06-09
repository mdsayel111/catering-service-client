import CartCard from "@/components/shared/cart-card/CartCard";
import Link from "next/link";
export default function CartItems({ cartItems, loading }) {
  return (
    <div className="">
      <div className="py-3 md:py-4 px-3 md:px-6 border bg-[#fcfdfd] rounded text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 grid grid-cols-5 md:grid-cols-6 items-center">
        <h5 className="col-span-1">ছবি</h5>
        <h5 className="col-span-1">নাম</h5>
        <h5 className="text-center">মূল্য</h5>
        <h5 className="text-center">সংখ্যা</h5>
        <h5 className="text-center hidden lg:block">মোট</h5>
        <h5 className="text-center">সরান</h5>
      </div>

      {/* order cards */}
      {cartItems?.map((item, index) => (
        <CartCard item={item} key={index} loading={loading} />
      ))}

    </div>
  );
}
