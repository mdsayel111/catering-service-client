import { cn } from "@/utils/cn";
import React from "react";

export default function SectionTitle({ title, className }) {
  return (
    <h2
      className={cn(
        "lg:text-[30px] text-primary-color md:text-[22px] text-[16px] font-bold",
        className
      )}
    >
      {title}
    </h2>
  );
}
