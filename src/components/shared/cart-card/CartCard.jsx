"use client";

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

  console.log(item);

  const itemId =
    item?.type === "package"
      ? item?.packageId || item?.id
      : item?.item?._id;

  // =========================
  // LOADING UI
  // =========================
  if (loading) {
    return (
      <div className="mt-2 space-y-3">
        <div className="bg-white border rounded-md p-3 grid grid-cols-5 md:grid-cols-6 items-center animate-pulse">
          <div className="col-span-2 flex gap-2 items-center">
            <div className="w-10 h-10 bg-gray-200 rounded" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gray-200 rounded" />
              <div className="h-2 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // NORMALIZE DATA
  // =========================

  const isPackage = item?.type === "package";

  const product = isPackage ? null : item?.item;
  const packageItems = isPackage ? item?.items || [] : [];

  const image = isPackage
    ? packageItems?.[0]?.image
    : product?.image;

  const title = isPackage
    ? `Package (${packageItems.length} items)`
    : product?.title;

  const unitPrice = isPackage
    ? packageItems.reduce(
      (sum, p) => sum + (p.packagePrice || 0),
      0
    )
    : product?.price || 0;

  const totalPrice = unitPrice * (item?.quantity || 1);

  // =========================
  // UI
  // =========================
  return (
    <div className="mt-2 space-y-3">
      <div
        className={cn(
          "bg-white border rounded-md p-3 grid grid-cols-[40px_40%_1fr_1fr_1fr] md:grid-cols-6 items-center text-[10px] sm:text-xs md:text-sm",
          !hasRemove ? "grid-cols-[40px_40%_1fr_1fr] md:grid-cols-[10%_1fr_1fr_1fr_1fr]" : "grid-cols-[40px_40%_1fr_1fr_1fr] md:grid-cols-6"
        )}
      >
        {/* IMAGE + TITLE */}
        <div className="lg:col-span-1 flex gap-3 items-center">
          <img
            className="w-10 h-10 object-cover rounded"
            src={image}
            alt={title}
          />
          {/* <div className="md:hidden">
            <h4 className="font-semibold text-gray-700 leading-tight">
              {title}
            </h4>

            {isPackage && (
              <p className="text-[10px] text-gray-500">
                {packageItems.length} products included
              </p>
            )}
          </div> */}
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 leading-tight">
            {title}
          </h4>

          {isPackage && (
            <p className="text-[10px] text-gray-500">
              {packageItems.length} products included
            </p>
          )}
        </div>


        {/* UNIT PRICE */}
        <p className="hidden md:flex justify-center font-semibold items-center gap-1">
          <TakaSymbol className="w-2.5" />
          {unitPrice}
        </p>

        {/* QUANTITY */}
        <div className="flex justify-center items-center gap-2">
          {hasDecrease && (
            <button
              onClick={() =>
                dispatch(decreaseQuantity(itemId))
              }
              className="w-5 h-5 border rounded flex items-center justify-center"
            >
              -
            </button>
          )}

          <span>{item.quantity}</span>

          {hasIncrease && (
            <button
              onClick={() =>
                dispatch(increaseQuantity(itemId))
              }
              className="w-5 h-5 border rounded flex items-center justify-center"
            >
              +
            </button>
          )}
        </div>

        {/* TOTAL */}
        <p className="flex justify-center items-center gap-1 font-semibold">
          <TakaSymbol className="w-2.5" />
          {totalPrice}
        </p>

        {/* REMOVE */}
        {hasRemove && (
          <button
            onClick={() =>
              dispatch(removeFromCart(itemId))
            }
            className="text-red-500"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}