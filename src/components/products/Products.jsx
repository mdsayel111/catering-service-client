"use client";

import config from "@/config";
import { cn } from "@/utils/cn";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import RangeInput from "../shared/inputs/range-input/RangeInput";
import NotData from "../shared/no-data/NoData";
import Pagination from "../shared/pagination/Pagination";
import ProductCard from "../shared/product-card/ProductCard";
import OutsideClickCloseWrapper from "../wrappers/OutsideClickedCloseWrapper";

function Products({ products: productsFromApi, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const categoryId = useSearchParams().get("categoryId");
  const [products, setProducts] = useState(productsFromApi);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = config?.itemsPerPage;
  const totalPage = Math.ceil(productsFromApi.length / itemsPerPage);


  const categoriesOptions = categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const handleCategoryChange = (value) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== value)
      );
    } else {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    console.log(start, end)

    const filteredProducts = productsFromApi
      .filter((item) => {
        if (selectedCategories.length === 0) {
          return true;
        }
        return selectedCategories.some(
          (category) => item.category === category
        );
      })
      .filter((item) => {
        return item.price >= priceRange?.min && item.price <= priceRange?.max;
      })
      .slice(start, end);
    setProducts(filteredProducts);
  }, [selectedCategories, priceRange, currentPage]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategories([categoryId]);
    }
  }, [categoryId]);

  return (
    <div className="grid my-4 grid-cols-1 gap-0 lg:gap-8 lg:grid-cols-4 relative">
      <div className="hidden lg:block lg:col-span-1 sticky top-20 h-fit">
        <div className="border p-4">
          <div className="flex justify-between items-center border-b">
            <h2 className="text-base font-bold text-[#1a1a1a]">
              ফিল্টার করুন
            </h2>
            <div className="p-4 space-y-6 text-sm text-gray-700"></div>
          </div>
          <div className="lg:p-0 px-2">
            {/* Header */}
            <div className="">
              <h2 className="font-semibold text-base my-2">মূল্য</h2>
              <RangeInput onChange={setPriceRange} />
            </div>
          </div>
          <div className="mt-4 ">
            <h3 className="mb-2 font-semibold text-text-primary-color">
              ক্যাটেগরি
            </h3>
            <div className="space-y-2 max-h-[30vh] overflow-y-auto">
              {categoriesOptions.map((item, index) => (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="cursor-pointer !accent-black"
                    checked={selectedCategories.includes(item.value)}
                    onChange={() => handleCategoryChange(item.value)}
                  />
                  <span className="text-text-tertiary-color">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 auto">
        <div className="flex border-b lg:border-none pb-4 lg:pb-0 justify-end items-center">
          <div className="relative w-full">
            <OutsideClickCloseWrapper id="filterPanel" setIsOpen={setIsOpen}>
              <button
                className="text-sm lg:hidden flex items-center gap-2 text-gray-700 hover:text-black ml-auto"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                <i className="fa-solid fa-filter text-3xl"></i>
              </button>

              <div
                className={cn(
                  "absolute space-y-6 text-sm text-gray-700 top-12 right-0 w-[200px] sm:w-[320px] aspect-[3/4] lg:hidden bg-white rounded shadow-xl z-50  transition-transform duration-300 ease-in-out overflow-y-auto p-4",
                  isOpen ? "translate-x-0" : "translate-x-[150%]"
                )}
              >
                <h2 className="text-base font-bold text-[#1a1a1a] border-b border-black pb-2 mb-2">
                  ফিল্টার করুন
                </h2>
                <div>
                  <h4 className="font-semibold border-b pb-2 mb-2">
                    দামের ভিত্তিতে ফিল্টার করুন
                  </h4>
                  <RangeInput
                    onChange={setPriceRange}
                    min={priceRange?.min}
                    max={priceRange?.max}
                  />
                </div>

                <div>
                  <h4 className="font-semibold border-b pb-1 mb-2">Brand</h4>
                  <div className="space-y-2">
                    {categoriesOptions.map((item, index) => (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="cursor-pointer !accent-black"
                          checked={selectedCategories.includes(item.value)}
                          onChange={() => handleCategoryChange(item.value)}
                        />
                        <span className="text-text-tertiary-color">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </OutsideClickCloseWrapper>
          </div>
        </div>
        {products.length > 0 ? (
          <div className="grid mt-6 lg:mt-0 gap-4 grid-cols-2 md:grid-cols-3">
            {products?.map((item, index) => (
              <ProductCard item={item} key={index} />
            ))}
          </div>
        ) : (
          <NotData text="Products" />
        )}
        {totalPage > 1 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPage}
          />
        )}
      </div>
    </div>
  );
}

export default function ProductsPage({ products, categories }) {
  return (
    <Suspense fallback={<div></div>}>
      <Products products={products} categories={categories} />
    </Suspense>
  );
}
