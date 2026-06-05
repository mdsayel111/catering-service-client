import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import SectionTitle from "@/components/shared/SectionTitle/SectionTitle";
import Image from "next/image";
import Link from "next/link";

export default function Category({ data }) {
  return (
    <div className="pt-6 mt-10 px-2 lg:px-4">
      <SectionTitle
        title={"Popular Categories"}
        className={"mb-6 text-center"}
      />
      <CustomSlider
        mobileView={5}
        largeMobileView={6}
        tabletView={8}
        desktopView={10}
        extraLargeView={13}
        containerClassName=""
        hasButtons={false}
        
      >
        {data?.map((cat, index) => (
          <>
            <Link
              href={`/products?categoryId=${cat._id}`}
              key={index}
              className="flex flex-col items-center w-full group"
            >
              <div className=" shadow-lg border border-green-400 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center p-2">
                {/* <cat.icon className={`fa-solid ${cat.iconClass} ${cat.color} text-3xl`} /> */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={40}
                  height={40}
                  className="rounded-full aspect-square object-cover w-12 h-12"
                />
              </div>
              <p className="text-sm md:text-base text-text-primary-color mt-2 group-hover:text-secondary-color">
                {cat.name}
              </p>
            </Link>
          </>
        ))}
      </CustomSlider>
    </div>
  );
}
