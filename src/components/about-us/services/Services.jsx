import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import { CiHeadphones } from "react-icons/ci";
import {
  PiCreditCardThin,
  PiDeviceMobileLight,
  PiGiftThin,
  PiTruckThin,
} from "react-icons/pi";
import ServiceCard from "./components/service-card/ServiceCard";
const services = [
  {
    icon: <PiTruckThin className="text-[44px]" />,
    title: "Free Shipping",
    subtitle: "Free shipping for orders $199",
  },
  {
    icon: <CiHeadphones className="text-4xl" />,
    title: "Returns Policy",
    subtitle: "Within 30 days for exchange",
  },
  {
    icon: <PiDeviceMobileLight className="text-4xl" />,
    title: "Online Support",
    subtitle: "Pay with Multiple Credit cards",
  },
  {
    icon: <PiCreditCardThin className="text-4xl" />,
    title: "Flexible Payment",
    subtitle: "24 hours a day, 7 days a week",
  },
  {
    icon: <PiGiftThin className="text-4xl" />,
    title: "Using For Card",
    subtitle: "Free Gift Wrapping with Notes",
  },
];

export default function Services() {
  return (
    <CustomSlider
      loop={false}
      mobileView={1}
      largeMobileView={2}
      tabletView={3}
      desktopView={4}
      btnContainerClassName="hidden lg:flex"
    >
      {services?.map((item, index) => {
        return (
          <ServiceCard
            key={index}
            item={item}
            hasDivider={index !== services.length - 1}
          />
        );
      })}
    </CustomSlider>
  );
}
