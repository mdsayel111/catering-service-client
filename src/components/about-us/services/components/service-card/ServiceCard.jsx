import React from "react";

export default function ServiceCard({ item, hasDivider }) {
  return (
    <>
      <div className="w-full bg-gray-100 h-[72px] shadow-lg flex items-center justify-center rounded-xl">
        <div className="flex items-center space-x-4 justify-center">
          {item?.icon}
          <div className="space-y-1">
            <h3 className="font-semibold text-nowrap text-sm lg:text-base">
              {item?.title}
            </h3>
            <p className="text-xs text-nowrap lg:text-sm">{item?.subtitle}</p>
          </div>
        </div>
        {hasDivider && <div className="w-px bg-gray-300"></div>}
      </div>
    </>
  );
}
