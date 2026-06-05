"use client";

import { useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "./CustomSlider.css";

import { cn } from "@/utils/cn";

export default function CustomSlider({
  children = [],
  mobileView = 3,
  largeMobileView = 3,
  tabletView = 4,
  desktopView = 6,
  extraLargeView = 8,
  btnContainerClassName = "",
  containerClassName = "",
  loop = true,
  hasButtons = true,
}) {
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full">
      <Swiper
        className={cn("mySwiper", containerClassName)}
        modules={[Autoplay]} // <-- register the module
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0: { slidesPerView: mobileView, spaceBetween: 10 },
          500: { slidesPerView: largeMobileView, spaceBetween: 15 },
          768: { slidesPerView: desktopView, spaceBetween: 20 },
          1024: { slidesPerView: desktopView, spaceBetween: 20 },
          // remove or bump this to something like 1600px if you really want extraLargeView only for very large screens
          1600: { slidesPerView: extraLargeView, spaceBetween: 24 },
        }}
        {...(loop && {
          autoplay: {
            delay: 5000, // ms between slides
            disableOnInteraction: false, // keep autoplay after user interaction
            pauseOnMouseEnter: true, // optional: pause while hovering
          }
        })}
        // autoplay={{
        //   delay: 3000, // ms between slides
        //   disableOnInteraction: false, // keep autoplay after user interaction
        //   pauseOnMouseEnter: true, // optional: pause while hovering
        // }}
        loop={loop} // keeps autoplay running and cycles slides
      >
        {Array.from(children).map((child, index) => (
          <SwiperSlide key={index} className="">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {hasButtons && (
        <div
          className={cn(
            "justify-between absolute top-[50%] -translate-y-1/2 left-0 right-0 z-[9] flex",
            btnContainerClassName
          )}
        >
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="h-8 w-8 flex justify-center items-center bg-black transition duration-200 text-white border rounded-full -translate-x-1/2"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="h-8 w-8 flex justify-center items-center bg-black transition duration-200 text-white border rounded-full translate-x-1/2"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}
