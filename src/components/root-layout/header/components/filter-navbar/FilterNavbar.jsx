"use client";

import OutsideClickCloseWrapper from "@/components/wrappers/OutsideClickedCloseWrapper";
import useAxios from "@/hooks/useAxios";
import useGetData from "@/hooks/useGetData";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterNavbar() {
  const [showCategory, setShowCategory] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const axios = useAxios();
  const [search, setSearch] = useState("");
  const { data: categories } = useGetData(axios, "/category?isActive=true", [
    "categories",
  ]);
  const { data: products } = useGetData(axios, "/product", ["products"]);

  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const threshold = 10;
  const [visible, setVisible] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // if (currentScrollY > threshold && currentScrollY > lastScroll) {
      //   setVisible(false);
      // }

      // // Scroll up → show
      // if (
      //   currentScrollY < lastScroll &&
      //   lastScroll - currentScrollY > threshold
      // ) {
      //   setVisible(true);
      // }

      if(currentScrollY > 50){
        setVisible(false);
      }else{
        setVisible(true);
      }

      lastScroll = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (search) {
      setSuggestedProducts(
        products?.filter((item) => item.title.includes(search))
      );
      setShowSearch(true);
    }
  }, [search]);

  return (
    <>
      {path !== "/cart" && (
        <div
          className={cn(
            "duration-200 py-6 z-[49] block bg-tertiary-color  sticky top-[50px] lg:top-[70.86px]",
            visible ? "translate-y-0 " : "-translate-y-full "
          )}
        >
          <div className="items-center lg:justify-between lg:h-12 max-w-7xl mx-auto px-4 flex">
            <div className="items-center hidden lg:flex">
              <OutsideClickCloseWrapper
                setIsOpen={setShowCategory}
                className="relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCategory((prev) => !prev);
                  }}
                  className="flex items-center px-4 py-3 bg-primary-color text-white text-sm font-semibold rounded-sm"
                >
                  <svg
                    className="w-8 h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  ক্যাটাগরি
                  <svg
                    className="w-4 h-6 ml-14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute top-12 -translate-y-0.5 border-x border-b !border-black rounded-b-sm left-0 w-full max-h-[30vh] bg-[#f4f1f7] shadow-xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
                    showCategory ? "translate-x-0" : "translate-x-full hidden"
                  }`}
                >
                  <div className="">
                    {categories?.length > 0 &&
                      categories?.map((category) => (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/products?categoryId=${category._id}`);
                            setShowCategory(false);
                          }}
                          key={category.id}
                          className="py-2 px-3 block w-full hover:bg-gray-200 rounded-sm cursor-pointer"
                        >
                          {category.name}
                        </span>
                      ))}
                  </div>
                </div>
              </OutsideClickCloseWrapper>

              {/* Desktop Navigation */}
            </div>

            {/* Search */}
            <div className="w-full lg:w-[400px] relative">
              <div className="flex items-center gap-3  border !border-primary-color text-text-primary-color rounded-full bg-transparent px-4 py-2 lg:py-2.5">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
                  />
                </svg>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  placeholder="খাবার সার্চ করুন"
                  className="ml-3 w-full bg-transparent outline-none text-text-primaryColor placeholder-text-primary-color"
                />
              </div>
              {suggestedProducts?.length > 0 && showSearch && (
                <OutsideClickCloseWrapper
                  className={cn(
                    "absolute top-[110%] left-0 w-full bg-gray-100",
                    suggestedProducts?.length > 0 ? "block" : "hidden"
                  )}
                  setIsOpen={() => setShowSearch(false)}
                >
                  {suggestedProducts?.map((product) => (
                    <Link
                      href={`/products/${product._id}`}
                      key={product._id}
                      className="py-2 px-3 w-full hover:bg-gray-200 rounded-sm cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded-sm"
                        />
                        <span className="ml-2">{product.title}</span>
                      </div>
                      <span className="font-semibold">${product.price}</span>
                    </Link>
                  ))}
                </OutsideClickCloseWrapper>
              )}
            </div>
          </div>

          {/* Slide Category Panel */}
        </div>
      )}
    </>
  );
}
