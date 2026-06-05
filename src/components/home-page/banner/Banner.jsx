import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import { cn } from "@/utils/cn";
import Image from "next/image";

export default function Banner({ data }) {
  return (
    <div className="rounded-md mx-auto mt-2 lg:max-w-[calc(1280px)] px-0 lg:px-4">
      <CustomSlider
        mobileView={1}
        tabletView={1}
        largeMobileView={1}
        desktopView={1}
        extraLargeView={1}
        containerClassName="lg:aspect-[500/180]"
        btnContainerClassName="w-[88%] lg:w-full mx-auto hidden lg:flex"
        loop={true}
      >
        {data?.map((banner, index) => (
          <div className="w-full h-full px-2 lg:px-0" key={index}>
            <Image
              height={400}
              width={400}
              className={cn(
                `w-full h-full rounded-md object-cover transition-opacity duration-500`
              )}
              src={banner.image}
              alt=""
              unoptimized
              priority
            />
          </div>
        ))}
      </CustomSlider>
    </div>
  );
}
