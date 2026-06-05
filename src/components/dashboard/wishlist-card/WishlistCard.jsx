import Link from "next/link";
import React from "react";

export default function WishlistCard({ item }) {
  return (
    <div>
      <div className="flex gap-5 max-sm:gap-[5px] items-center justify-between">
        <div className="w-[80px] h-[80px] bg-gray-500 rounded-sm">
          <img src={item.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="">
            <Link className="max-sm:text-[12px]" href="">
              {item.name}
            </Link>
          </h4>
          <p className="max-sm:text-[12px]">${item.price}</p>
        </div>
        <div className="">
          <button className="text-[14px] max-sm:text-[12px] max-sm:px-3 max-sm:py-2 px-5 py-2 bg-black rounded-md hover:text-black transition hover:bg-white duration-300 text-white">
            Add to Cart
          </button>
        </div>
      </div>
      <hr className="my-2" />
    </div>
  );
}
