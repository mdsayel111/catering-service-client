"use client";

import useAxios from "@/hooks/useAxios";
import useGetData from "@/hooks/useGetData";
import { addToCart } from "@/lib/redux/features/cartSlice";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function SingleItem() {
  const [activeImageIndx, setActiveImageIndx] = useState(0);
  const [galleryImage, setGalleryImage] = useState([]);
  const axios = useAxios();
  const params = useParams();
  const { id } = params;
  const { data: product, loading } = useGetData(axios, `/product/${id}`, [
    "product",
    id,
  ]);
  const total = (product?.price || 0) * (product?.quantity || 0);

  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart({ id: product._id, quantity: quantity }));
    setQuantity(1);
    toast.success("খাবার কার্টে যোগ করা হয়েছে");
  };

  useEffect(() => {
    if (product) {
      setGalleryImage([product.image, ...product.gallery]);
    }
  }, [product]);
  return (
    <>
      {loading ? (
        <div className="col-span-3 animate-pulse">
          {/* Product Images and Details Section */}
          <div className="lg:flex block gap-4">
            {/* Image Gallery Skeleton */}
            <div className="lg:w-1/2 w-full">
              <div className="bg-gray-300 rounded-lg w-full max-w-md mx-auto h-96"></div>
              <div className="mb-8 gap-2 items-center justify-center flex lg:mb-0 mt-2">
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                <div className="w-16 h-16 bg-gray-300 rounded"></div>
                <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="lg:w-1/2 w-full lg:ml-4 mt-4 lg:mt-0">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
              <div className="h-7 bg-gray-300 rounded w-4/5 my-3"></div>
              <div className="h-6 bg-gray-300 rounded w-3/5 mb-2"></div>

              <div className="flex items-center my-3 pb-2 border-b gap-5">
                <div className="h-5 bg-gray-300 rounded w-1/2"></div>
              </div>

              <div className="h-8 bg-gray-300 rounded w-1/4 mt-4"></div>

              <div className="flex my-5 gap-3 items-center">
                <div className="h-5 w-20 bg-gray-300 rounded"></div>
                <div className="flex">
                  <div className="h-8 w-10 bg-gray-200 rounded-l"></div>
                  <div className="h-8 w-12 bg-gray-300"></div>
                  <div className="h-8 w-10 bg-gray-200 rounded-r"></div>
                </div>
              </div>

              <div className="h-7 w-1/3 bg-gray-300 rounded border-b pb-4 mt-6"></div>

              <div className="my-5 space-y-6">
                <div className="h-10 bg-gray-300 rounded w-full"></div>
                <div className="h-10 bg-gray-300 rounded w-full"></div>
              </div>

              <div className="flex gap-4 mt-8">
                <div className="h-14 w-1/2 bg-gray-300 rounded-md"></div>
                <div className="h-14 w-1/2 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="border mt-8 py-4">
            <div className="h-6 w-1/4 bg-gray-300 rounded mb-4 ml-4"></div>
            <div className="p-2 md:p-6 space-y-3">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>

          {/* Customer Feedback Skeleton */}
          <div className="border mt-8 py-4">
            <div className="h-6 w-1/3 bg-gray-300 rounded mb-4 px-4"></div>

            <div className="p-4 flex flex-col lg:flex-row gap-8">
              <div className="text-center lg:w-1/4 flex flex-col items-center">
                <div className="h-12 w-16 bg-gray-300 rounded"></div>
                <div className="h-5 w-28 bg-gray-300 rounded my-2"></div>
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-10 h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mt-6 px-4">
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>

            <div className="px-4 py-6">
              <div className="h-5 w-1/3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-3">
          <div className="lg:flex block gap-4">
            <div className="lg:w-1/2 w-full">
              <img
                src={galleryImage[activeImageIndx]}
                alt="Product Image"
                className="w-full aspect-[4/3] max-w-md mx-auto"
              />
              <div className="mb-8 gap-2 items-center justify-center flex lg:mb-0 mt-2">
                <button
                  onClick={() => {
                    if (activeImageIndx > 0) {
                      setActiveImageIndx((prev) => prev - 1);
                    }
                  }}
                  className="h-8 w-8 flex justify-center items-center hover:bg-black transition duration-200 hover:text-white border rounded-full cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                {galleryImage.map((img, index) => (
                  <img
                    src={img}
                    className={cn(
                      "max-w-16 border cursor-pointer rounded",
                      activeImageIndx === index && "!border-black "
                    )}
                    alt=""
                  />
                ))}
                <button
                  onClick={() => {
                    if (activeImageIndx < galleryImage?.length - 1) {
                      setActiveImageIndx((prev) => prev + 1);
                    }
                  }}
                  className="h-8 w-8 flex justify-center items-center hover:bg-black transition duration-200 hover:text-white border rounded-full cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:ml-4">
              <span
                className={cn(
                  "p-1 text-sm font-semibold text-white ",
                  product?.stock > 0 ? "bg-green-600" : "bg-red-600",
                  "inline-block"
                )}
              >
                {product?.stock > 0 ? "In stock" : "Out of stock"}
              </span>
              <h2 className="text-[16px] lg:text-[22px] my-2 font-bold">
                {product?.title}
              </h2>

              <div className="flex items-center my-3 pb-1 border-b gap-5">
                <div className="flex items-center gap-3 border-r pr-4">
                  <div className="text-yellow-500">
                    {Array(product?.rating || 0)
                      .fill(0)
                      .map((_, index) => (
                        <i className="fa-solid fa-star"></i>
                      ))}
                  </div>
                  <p className="text-[12px] text-[#687083]">
                    {product?.rating || 0}/5 (0 Review)
                  </p>
                </div>
              </div>

              <h2 className="text-[16px] lg:text-[24px] font-semibold mt-4">
                $ {product?.price}
              </h2>

              <div className="flex my-4 gap-3 items-center">
                <p className="text-sm text-[#687083]">Quantity:</p>
                <div className="flex border text-center">
                  <button
                    className="py-1 px-3 bg-slate-200 cursor-pointer"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="py-1 px-3">{quantity}</p>
                  <button
                    className="py-1 px-3 bg-slate-200 cursor-pointer"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <h2 className="font-medium text-[16px] border-b pb-4 lg:text-[20px] mt-6">
                Total: $ {product?.price * quantity}
              </h2>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border rounded-sm">
                  <div className="p-4">
                    <h3 className="text-[14px] font-semibold">Free Shipping</h3>
                    <p className="text-[13px] text-[#687083] mt-2">
                      Free Shipping on Free Shipping starts from order amount $
                      0.00
                    </p>
                  </div>
                </div>
                <div className="p-4 border rounded-sm flex items-center">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-file"></i>
                    <div>
                      <h3 className="text-[14px] font-semibold">
                        Return Policy
                      </h3>
                      <p className="text-[13px] text-[#687083]">
                        Easy Return, Quick Refund.
                        <Link className="text-blue-500" href="#">
                          see more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAddToCart}
                  className="px-2 py-3 md:py-4 w-1/2 rounded-md flex justify-center bg-black text-white font-medium text-sm"
                >
                  Add to Cart
                </button>
                <Link
                  className="px-2 py-2 md:py-4 w-1/2 rounded-md flex justify-center border !border-black text-black font-medium text-sm"
                  href="/checkout"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>

            <div className="border mt-8 py-4">
              <h2 className="text-[16px] font-semibold border-b pb-4 pl-4">
                Description
              </h2>
              <div
                className="p-2 md:p-6"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
            <div className="border mt-8 py-4">
              <h2 className="text-[16px] font-semibold border-b pb-4 px-4">
                Customer Feedback
              </h2>

              <div className="p-4 flex flex-col lg:flex-row gap-8">
                <div className="text-center lg:w-1/4">
                  <h2 className="text-[48px] font-bold text-red-500 leading-none">
                    0
                  </h2>
                  <div className="text-yellow-400 text-lg my-2">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-sm text-[#687083]">0 Verified ratings</p>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex text-yellow-400 text-sm gap-1 w-24">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                    <span className="text-sm text-[#687083]">0%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex text-yellow-400 text-sm gap-1 w-24">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <span className="text-sm text-[#687083]">0%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex text-yellow-400 text-sm gap-1 w-24">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <span className="text-sm text-[#687083]">0%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex text-yellow-400 text-sm gap-1 w-24">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <span className="text-sm text-[#687083]">0%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-gray-200 rounded-full"></div>
                    <div className="flex text-yellow-400 text-sm gap-1 w-24">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                      <i className="fa-regular fa-star"></i>
                    </div>
                    <span className="text-sm text-[#687083]">0%</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mt-6 px-4">
                <button className="px-4 py-1 border border-red-500 bg-red-100 text-red-600 text-sm font-semibold rounded">
                  All
                </button>
                <button className="px-4 py-1 border text-sm font-semibold rounded">
                  5 <i className="fa-solid fa-star text-yellow-400 ml-1"></i>
                </button>
                <button className="px-4 py-1 border text-sm font-semibold rounded">
                  4 <i className="fa-solid fa-star text-yellow-400 ml-1"></i>
                </button>
                <button className="px-4 py-1 border text-sm font-semibold rounded">
                  3 <i className="fa-solid fa-star text-yellow-400 ml-1"></i>
                </button>
                <button className="px-4 py-1 border text-sm font-semibold rounded">
                  2 <i className="fa-solid fa-star text-yellow-400 ml-1"></i>
                </button>
                <button className="px-4 py-1 border text-sm font-semibold rounded">
                  1 <i className="fa-solid fa-star text-yellow-400 ml-1"></i>
                </button>
              </div>

              <p className="px-4 py-6 text-sm text-[#687083]">
                No review found.
              </p>
            </div>
        </div>
      )}
    </>
  );
}
