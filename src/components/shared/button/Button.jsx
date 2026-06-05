import { cn } from "@/utils/cn";
import React from "react";

export default function Button({
  handleSubmit,
  text,
  containerClassName,
  disabled = false,
}) {
  return (
    <button
      onClick={handleSubmit}
      type="submit"
      disabled={disabled}
      className={cn(
        "w-full py-3 bg-black text-white font-bold rounded-md text-sm",
        containerClassName,
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {text}
    </button>
  );
}
