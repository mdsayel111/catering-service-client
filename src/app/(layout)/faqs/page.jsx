"use client";

import SectionTitle from "@/components/shared/Titles/SectionTitle";
import React, { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";

// Chevron Icon component for the accordion
const ChevronIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
      isOpen ? "transform rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

// Single FAQ Item component
const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 py-6">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left focus:outline-none"
    >
      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
      <span className="ml-6">
        <ChevronIcon isOpen={isOpen} />
      </span>
    </button>
    <div
      className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <p className="mt-4 text-base text-gray-600">{faq.answer}</p>
    </div>
  </div>
);

// Main FAQ component
export default function App() {
  const axios = useAxios();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqData, setFaqData] = useState([]);

  const handleToggle = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  useEffect(() => {
    axios.get("/client/faq-page").then((res) => {
      setFaqData(res.data?.data?.faqs);
    });
  }, []);


  return (
    <section className="bg-white font-sans">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle title={"Frequently Asked Questions"} />
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          {faqData?.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              isOpen={openFaqIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
