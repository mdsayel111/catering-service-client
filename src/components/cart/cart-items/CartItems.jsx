import CartCard from "@/components/shared/cart-card/CartCard";
import Link from "next/link";
export default function CartItems({ cartItems, loading }) {
  return (
    <div className="">
      <div className="py-3 md:py-4 px-3 md:px-6 border bg-[#fcfdfd] rounded text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 grid grid-cols-5 md:grid-cols-6 items-center">
        <h5 className="col-span-1">Item</h5>
        <h5 className="col-span-1">Name</h5>
        <h5 className="text-center">Price</h5>
        <h5 className="text-center">Quantity</h5>
        <h5 className="text-center hidden lg:block">Subtotal</h5>
        <h5 className="text-center">Remove</h5>
      </div>

      {/* order cards */}
      {cartItems?.map((item, index) => (
        <CartCard item={item} key={index} loading={loading} />
      ))}
      <div className="mt-4 mb-6 justify-between gap-4  flex">
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
    </div>
  );
}
