import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import CategoryCard from "./CategoryCard";

export default function Category({ data }) {
  
  return (
    <div className="pt-6 mt-4 md:mt-6 lg:mt-10 px-2 lg:px-4">
      <SectionTitle
        title={"জনপ্ৰিয় ক্যাটাগরি"}
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
          <CategoryCard data={cat} />
        ))}
      </CustomSlider>
    </div>
  );
}
