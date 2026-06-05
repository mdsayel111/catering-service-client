import { cn } from "@/utils/cn";
import React from "react";

export default function Select({ options, value, setValue, label }) {
  return (
    <>
      <h3 class="font-medium text-[16px] lg:text-[20px]">{label}</h3>
      <div class="flex text-sm gap-3 mt-1">
        {options?.map((option, index) => (
          <button
            onClick={() => setValue(option)}
            class={cn(
              "size-btn px-4 py-2 rounded border bg-white text-black",
              option === value && "bg-black text-white"
            )}
            data-size={option}
            key={index}
          >
            {option}
          </button>
        ))}
        {/* <button
        class="size-btn px-4 py-2 rounded border bg-black text-white"
        data-size="1 pound"
      >
        1 Pound
      </button>
      <button
        class="size-btn px-4 py-2 rounded border border-gray-300 bg-white"
        data-size="2 pound"
      >
        2 Pound
      </button>
      <button
        class="size-btn px-4 py-2 rounded border border-gray-300 bg-white"
        data-size="3 pound"
      >
        3 Pound
      </button> */}
      </div>
    </>
  );
}
