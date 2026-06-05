"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function userNavItem({ item, handleClick }) {
  const pathname = usePathname();
  const isActive = pathname === item?.path;
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  if (item?.auth && !user?.phone) return null;

  return (
    <div
      className={item?.containerClassName}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {item?.subMenu ? (
        <div
          className="relative group cursor-pointer"
        >
          <span
            onClick={() => setIsOpen(!isOpen)}
            className={`list-none mb-3 text-lg font-semibold lg:text-base lg:mb-0 flex items-center gap-4 transition-colors duration-200 ${
              isActive
                ? "text-secondary-color " // active style
                : "text-text-primary-color hover:text-secondary-color"
            }`}
          >
            <span>{item?.text}</span>
            <i
              className={`fa-solid text-sm lg:text-base fa-angle-down transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            ></i>
          </span>
          <ul
            className={cn(
              "space-y-2 text-text-primary-color lg:absolute top-[100%] lg:left-1/2 lg:-translate-x-1/2 lg:hidden lg:pt-2 lg:group-hover:block  pl-4 lg:pl-0 border-l lg:border-l-0",
              isOpen ? "block" : "hidden"
            )}
          >
            <div className=" lg:bg-white lg:p-4 rounded-md lg:shadow-lg space-y-2">
              {item?.subMenu?.map((subItem, index) => (
                <li key={index}>
                  <Link
                    onClick={handleClick}
                    href={subItem?.path}
                    className={`list-none transition-colors block duration-200 font-normal text-nowrap  ${
                      isActive
                        ? "text-secondary-color" // active style
                        : "text-text-primary-color hover:text-secondary-color"
                    }`}
                  >
                    {subItem?.text}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
      ) : (
        <Link
          onClick={() => handleClick()}
          href={item?.path}
          className={`list-none font-semibold text-lg lg:text-base transition-colors block duration-200 ${
            isActive
              ? "text-secondary-color " // active style
              : "text-text-primary-color hover:text-secondary-color"
          }`}
        >
          {item?.text}
        </Link>
      )}
    </div>
  );
}
