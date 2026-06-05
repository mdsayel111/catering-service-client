"use client";

import { cn } from "@/utils/cn";
import { useState } from "react";

const tabs = [
  { name: "Introduction", value: "introduction" },
  { name: "Our Vision", value: "vision" },
  { name: "What Sets Us Apart", value: "apart" },
  { name: "Our Commitment", value: "commitment" },
];

export default function CompanyDetails({ data: companyDetails }) {
  const [activeTab, setActiveTab] = useState("introduction");
  const bodyText = companyDetails?.[activeTab];
  return (
    <div className="flex items-center justify-center mb-8 lg:mb-16">
      {/* Feature Card Container */}
      <div className="w-full bg-white overflow-hidden">
        {/* Responsive Two-Column Layout (flex on desktop, column on mobile) */}
        <div className="flex flex-col lg:flex-row lg:gap-10">
          {/* Left Column: Image */}
          <div className="lg:w-5/12">
            {/* Image Container with Aspect Ratio and minimum height */}
            <img
              width={800}
              height={400}
              src="/images/LPG_Cylinder.jpg"
              alt="Model holding an orange woven bag"
              className="object-cover  w-full aspect-[5/3]"
            />
            {/* Overlay to replicate the soft, pink lighting/shadow effect */}
            <div className="absolute inset-0 bg-pink-100 opacity-20 mix-blend-multiply pointer-events-none"></div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:w-7/12 w-full flex flex-col justify-center mt-6 lg:mt-0">
            {/* Main Header */}
            <h1 className="text-xl lg:text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 lg:mb-6 leading-tight">
              Modave – Offering Rare And Beautiful Items Worldwide
            </h1>

            {/* Tabbed Navigation */}
            <div className="flex hide-scrollbar space-x-6 sm:space-x-8 mb-4 overflow-x-auto whitespace-nowrap">
              {tabs.map((tab) => (
                <button
                  onClick={() => setActiveTab(tab.value)}
                  key={tab.name}
                  className={`
                                        pb-1  transition duration-200 cursor-pointer 
                                        ${
                                          tab.value === activeTab
                                            ? "font-semibold border-b-2 border-primary text-gray-900"
                                            : "font-medium text-gray-500 hover:text-gray-900 hover:border-b-2 hover:border-gray-400"
                                        }
                                    `}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Body Text (Content for the active tab) */}
            <p
              className={cn(
                "text-gray-500 text-base leading-relaxed mb-4 lg:mb-6 grow font-light"
              )}
              dangerouslySetInnerHTML={{ __html: bodyText }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
}
