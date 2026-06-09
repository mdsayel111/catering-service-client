import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/lib/redux/features/cartSlice";
import { cn } from "@/utils/cn";
import { useDispatch } from "react-redux";
import TakaSymbol from "../Taka-Symbol";

export default function CartCard({
  item,
  loading,
  hasIncrease = true,
  hasDecrease = true,
  hasRemove = true,
}) {
  const dispatch = useDispatch();
  return (
    <>
      {loading ? (
        <div className="mt-2 space-y-3">
          <div
            className={cn(
              "bg-white border rounded-md p-3 grid grid-cols-5 md:grid-cols-6 items-center text-[10px] sm:text-xs md:text-sm animate-pulse",
              !hasRemove && "grid-cols-4 md:grid-cols-5"
            )}
          >
            {/* Image & Title */}
            <div className="col-span-2 flex gap-2 md:gap-4 items-center">
              <div className="w-10 h-10 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                <div className="h-2 bg-gray-200 rounded w-16 mx-auto"></div>
              </div>
            </div>

            {/* Price (hidden on mobile) */}
            <div className="hidden md:flex justify-center">
              <div className="h-3 bg-gray-200 rounded w-10"></div>
            </div>

            {/* Quantity Controls */}
            <div className="flex justify-center items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="w-5 h-3 bg-gray-200 rounded"></div>
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
            </div>

            {/* Total Price */}
            <div className="flex justify-center">
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>

            {/* Remove Button (conditionally rendered) */}
            {hasRemove && (
              <div className="flex justify-center">
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-2 space-y-3">
          <div
            className={cn(
              "bg-white border rounded-md p-3 grid grid-cols-5 md:grid-cols-6 items-center text-[10px] sm:text-xs md:text-sm",
              !hasRemove && "grid-cols-4 md:grid-cols-5"
            )}
          >
            <div className="col-span-2 flex gap-2 md:gap-4 items-center">
              <img
                className="w-10 h-10 object-cover rounded"
                src={item.image}
                alt="Product"
              />
              <h4 className="leading-tight font-semibold text-gray-700 text-center grow">
                {item.title}
              </h4>
            </div>

            <p className="text-center font-semibold hidden md:flex items-center gap-1 justify-center">
              <TakaSymbol className={"w-2.5"} /> <span>{item.price === 0 ? "Current Market Price" : item.price}</span>
            </p>

            <div className="flex justify-center items-center gap-2">
              {hasDecrease && (
                <button
                  onClick={() => dispatch(decreaseQuantity(item?._id))}
                  className="w-5 h-5 flex items-center justify-center border rounded text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
              )}
              <span className="w-5 text-center">{item.quantity}</span>
              {hasIncrease && (
                <button
                  onClick={() => dispatch(increaseQuantity(item?._id))}
                  className="w-5 h-5 flex items-center justify-center border rounded text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              )}
            </div>

            <p className="text-center font-semibold text-gray-700 flex items-center gap-1 justify-center">
              <TakaSymbol className={"w-2.5"} /> {item.price * item.quantity}
            </p>

            {hasRemove && (
              <button
                onClick={() => dispatch(removeFromCart(item?._id))}
                className="text-red-500 text-center"
              >
                ✖
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
