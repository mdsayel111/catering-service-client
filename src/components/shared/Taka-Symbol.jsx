import { cn } from "@/utils/cn";
import React from "react";

export default function TakaSymbol({ className }) {
  return (
    <span>
      <img
        src="/images/taka-symbol.webp"
        alt="taka-symbol"
        className={cn("w-3", className)}
      />
    </span>
  );
}
