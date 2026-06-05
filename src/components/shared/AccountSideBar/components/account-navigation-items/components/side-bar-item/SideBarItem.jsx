"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideBarItem({ item, type, onClick }) {
  const path = usePathname();
  return (
    <li className="flex items-center hover:text-red-600 transition duration-300 justify-between">
      {type === "button" ? (
        <button onClick={onClick}>
          <div className="flex gap-3 items-center">
            <item.icon className="text-[14px]" />
            <p className="text-[14px] font-semibold">{item.label}</p>
          </div>
        </button>
      ) : (
        <Link href={item.path}>
          <div className="flex gap-3 items-center">
            <item.icon className="text-[14px]" />
            <p className="text-[14px] font-semibold">{item.label}</p>
          </div>
        </Link>
      )}
      {path === item.path && (
        <span className="inline-block h-4 border-r-2 !border-r-red-600"></span>
      )}
    </li>
  );
}
