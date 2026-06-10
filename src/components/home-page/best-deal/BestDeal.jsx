"use client";

import ItemCard from "@/components/shared/product-card/ItemCard";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import Link from "next/link";
import { useEffect, useState } from "react";

const BestDeals = ({ data }) => {
  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width < 1024) setItemsToShow(6);
      else setItemsToShow(5);
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return (
    <section className="px-3 mt-12 md:mt-16">
      <SectionTitle title="গ্রাহকদের পছন্দের পণ্য" className={"text-center mb-6 md:mb-8 lg:mb-14"} />
      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {data?.slice(0, itemsToShow).map((product, idx) => (
          <ItemCard item={product} key={idx} />
        ))}
      </div>
      <div className="text-[14px] font-bold mt-8 text-center">
        <Link href="/products">
          <span className="text-sm md:text-[14px]">সব দেখুন</span>
          <i className="fa-solid fa-angle-right px-2 text-[8px] md:text-[12px] py-1.5 bg-black ml-2 text-white rounded-full"></i>
        </Link>
      </div>
    </section>
  );
};

export default BestDeals;
