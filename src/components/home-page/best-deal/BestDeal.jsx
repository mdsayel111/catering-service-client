"use client";

import ProductCard from "@/components/shared/product-card/ProductCard";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import useAxios from "@/hooks/useAxios";
import useGetData from "@/hooks/useGetData";
import Link from "next/link";
import { useEffect, useState } from "react";

const BestDeals = () => {
  const axios = useAxios();
  const { data: products = Array(6).fill(null), loading } = useGetData(
    axios,
    "/product",
    ["products"]
  );

  const [itemsToShow, setItemsToShow] = useState(5);

  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width < 1024) setItemsToShow(6); // small & medium
      else setItemsToShow(5); // large and above
    };

    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return (
    <section className="px-3 my-12">
      <div className="flex items-center mb-6 justify-between">
        <SectionTitle title="Top Selling Products" />
        <div className="text-[14px] font-bold">
          <Link href="/products">
            <span className="text-sm md:text-[14px]">VIEW ALL</span>
            <i className="fa-solid fa-angle-right px-2 text-[8px] md:text-[12px] py-1.5 bg-black ml-2 text-white rounded-full"></i>
          </Link>
        </div>
      </div>

      <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {products?.slice(0, itemsToShow).map((product, idx) => (
          <ProductCard item={product} key={idx} loading={loading} />
        ))}
      </div>
    </section>
  );
};

export default BestDeals;
