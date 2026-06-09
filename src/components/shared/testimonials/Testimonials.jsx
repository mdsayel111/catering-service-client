import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import SectionTitle from "@/components/shared/Titles/SectionTitle";
import { FaQuoteRight } from "react-icons/fa";
export default function Testimonials({data}) {
  return (
    <div className="my-6 lg:my-10 px-4 lg:px-4">
      <SectionTitle className={"text-left mb-4"} title={"Testimonials"} />
      <CustomSlider
        mobileView={1}
        tabletView={2}
        desktopView={4}
        extraLargeView={4}
        // btnContainerClassName="top-[38%]"
        containerClassName=""
      >
        {data?.map((item, index) => {
          return (
            <div className="w-full ">
              <div
                key={index}
                className="w-full cursor-pointer space-y-4 border border-gray-300 shadow-lg bg-gray-100 p-6 flex flex-col rounded-lg  h-[40vh]"
              >
                <div className="grow">
                  <FaQuoteRight className="text-2xl text-primary" />
                  <p className="text-sm leading-[1.8]">
                    {item?.text?.length > 100
                      ? item.text.slice(0, 150)
                      : item.text}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <img
                    src={item?.user.image}
                    alt={item.name}
                    className="w-[17%] lg:w-[15%] aspect-square object-cover rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-base grow">{item?.user?.firstName + " " + item?.user?.lastName}</p>
                    <p className="text-xs">{item?.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </CustomSlider>
    </div>
  );
}
