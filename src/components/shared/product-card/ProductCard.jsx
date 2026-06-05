import { addToCart } from "@/lib/redux/features/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/lib/redux/features/wishlistSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal/Modal";
import TakaSymbol from "../Taka-Symbol";
import ProductDetailsModalContents from "./components/product-details-modal-contents/ProductDetailsModalContents";

export default function ProductCard({ item, loading }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const wishlists = useSelector((state) => state.wishlist?.wishlistItems);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddToCart = () => {
    dispatch(addToCart({ id: item._id, quantity: 1 }));
    toast.success("খাবার কার্টে যোগ করা হয়েছে");
    setIsDetailsOpen(false);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push(`/checkout?product=${item._id}`);
  };
  return (
    <>
      {loading ? (
        <div className="block">
          <div className="group rounded-lg border border-gray-300 shadow-lg overflow-hidden bg-gray-200 animate-pulse relative">
            {/* Image Skeleton */}
            <div className="relative w-full h-48 sm:h-56 md:h-60 bg-gray-300"></div>

            {/* Discount badge skeleton */}
            <div className="absolute top-3 left-0 w-12 h-4 rounded-r-full bg-gray-400"></div>

            {/* Action buttons skeleton */}
            <div className="absolute top-5 right-[-60px] group-hover:right-3 transition-all duration-300 border rounded-md shadow-lg p-2 flex flex-col gap-2 z-10 bg-gray-300">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
            </div>

            {/* Content Skeleton */}
            <div className="bg-gray-200 sm:px-3 px-1 py-3 md:px-5 md:py-5 space-y-2">
              <div className="w-3/4 h-4 bg-gray-400 mx-auto rounded"></div>
              <div className="md:flex md:items-center md:justify-between space-y-2 md:space-y-0">
                <div className="w-1/4 h-4 bg-gray-400 rounded mx-auto md:mx-0"></div>
                {/* <div className="w-20 h-8 bg-gray-400 rounded mx-auto md:mx-0"></div> */}
                <div className="w-12 md:w-32 lg:w-12 h-8 bg-gray-400 rounded mx-auto md:mx-0"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            onClick={(e) => {
              e.preventDefault();
              // router.push(`/products/${item?._id}`);
              setIsDetailsOpen(true);
            }}
            className="block cursor-pointer"
          >
            <div className="group rounded-lg border border-gray-300 shadow-lg bg-[#ffffff38] overflow-hidden transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={item.image}
                  alt="Sofa"
                  className="w-full aspect-[4/3] object-contain transition-transform duration-300 group-hover:scale-105"
                  width={400}
                  height={400}
                />
                {item?.discount && (
                  <div className="absolute top-3 left-0 bg-primary-color text-white text-[6px] sm:text-xs px-2 py-1 rounded-r-full">
                    {item.discount}% Off
                  </div>
                )}
                <div
                  className="absolute top-5 right-3 transition-all duration-300 border rounded-md shadow-lg p-2 flex flex-col gap-2 z-10 bg-white/50 backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!wishlists?.find((wishId) => wishId === item._id)) {
                      dispatch(addToWishlist(item._id));
                      toast.success("পছন্দের তালিকায় যোগ করা হয়েছে");
                    } else {
                      dispatch(removeFromWishlist(item._id));
                      toast.success("পছন্দের তালিকা থেকে সরানো হয়েছে");
                    }
                  }}
                >
                  {wishlists?.find((wishId) => wishId === item._id) ? (
                    <FaHeart className="text-red-500 cursor-pointer" />
                  ) : (
                    <FaRegHeart className="text-text-primary-color cursor-pointer" />
                  )}
                </div>
              </div>

              <div className="bg-[#f4f1f7] sm:px-3 px-1 py-3 md:py-5">
                <h4 className="text-base font-semibold text-center text-text-primary-color group-hover:text-secondary-color transition duration-200 mb-3">
                  {item.title}
                </h4>

                <div className="text-xs sm:text-sm md:text-base space-y-3 md:space-y-0">
                  <p className="text-center md:text-left font-bold text-text-primary-color flex items-center justify-center gap-1">
                    {item?.price ? (
                      <>
                        <TakaSymbol />
                        <span>{item.price}</span>
                      </>
                    ) : (
                      <>
                        <TakaSymbol />
                        <span className=" text-red-500">
                          Current Market Price
                        </span>
                      </>
                    )}
                  </p>

                  <div
                    className="flex px-3 lg:px-2 flex-col lg:flex-row gap-2 lg:gap-3 mt-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="px-2 py-1.5 lg:w-1/2 rounded-md flex justify-center border !border-black text-black font-medium text-sm"
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="px-2 py-2 lg:w-1/2 rounded-md flex justify-center bg-black text-white font-medium text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={isDetailsOpen}
            containerClassName={"max-w-4xl"}
            title={"Product Details"}
            onClose={() => setIsDetailsOpen(false)}
          >
            <ProductDetailsModalContents
              product={item}
              setModalOpen={setIsDetailsOpen}
            />
          </Modal>
        </div>
      )}
    </>
  );
}
