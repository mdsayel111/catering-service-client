import Logo from "@/components/shared/Logo/Logo";
import fetchData from "@/utils/fetch";
import Link from "next/link";
import { RiHeartFill } from "react-icons/ri";

const Footer = async () => {
  const { data: footerData } =
    (await fetchData("/client/footer", { cache: "no-store" })) || {};
  return (
    <footer className="bg-primary-color">
      <div className="grid container mx-auto px-6 max-w-7xl grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-8 pt-14 md:pt-28 pb-8">
        <div className="self-center col-span-3 md:col-span-1  lg:col-span-2 w-auto mx-auto md:ml-0">
          <Logo
          className={"lg:w-full w-[60%] mx-auto"}
            // src={footerData?.logo?.image}
            image="darkImage"
          />
        </div>
        {/* Footer Links */}
        <div className="col-span-3 md:col-span-2 lg:col-span-7 flex justify-between md:justify-evenly text-white ">
          <div className="max-w-[200px]">
            <h3 className="text-text-secondary-color font-semibold text-lg">
              Contact Us
            </h3>
            <div className="space-y-2 mt-2">
              <div className="">
                <h6 className="text-text-secondary-color">Address:</h6>
                <p className="text-text-tertiary-color  text-sm">
                  {footerData?.address?.address}
                </p>
              </div>
              <div>
                <h6 className="text-text-secondary-color">Phone:</h6>
                <p className="text-text-tertiary-color text-sm">
                  +8801921798502
                </p>
              </div>
              <div>
                <h6 className="text-text-secondary-color">Email:</h6>
                <p className="text-text-tertiary-color text-sm">
                  mdsayel111@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-text-secondary-color font-semibold text-lg">
              Customer Service
            </h3>
            <ul className="text-[12px] md:text-[16px] space-y-1 font-normal text-text-secondary-color mt-2">
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-secondary-color transition duration-200"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-[#ff2631] transition duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/leave-feedback"
                  className="hover:text-[#ff2631] transition duration-200"
                >
                  Leave Feedback
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-[#ff2631] transition duration-200"
                >
                  Faqs
                </Link>
              </li>
              <li>
                <Link
                  href="/return-and-refund"
                  className="hover:text-[#ff2631] transition duration-200"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Estimate Subscription */}
        <div className="flex flex-col items-center md:items-start col-span-3 md:col-span-1 lg:col-span-3">
          <h3 className="text-xl md:text-[16px] mb-2 font-bold text-text-secondary-color ">
            GET TO KNOW PROJECT ESTIMATE?
          </h3>
          <input
            placeholder="Enter email address"
            className="bg-text-secondary-color text-primary-color placeholder:text-text-primary-color px-4 text-[10px] md:text-[14px] mb-2 py-3 md:max-w-72 w-full rounded-lg border-none outline-none"
            type="email"
          />
          <button className="bg-secondary-color text-[9px] md:text-[14px] font-bold px-4 py-3 rounded-lg text-white md:max-w-72 w-full">
            SUBSCRIBE
          </button>
        </div>
      </div>

      <p className="text-text-secondary-color text-center text-[10px] md:text-[14px] border-gray-400 border-y font-normal py-6 lg:pb-6 pb-16">
        Made By <RiHeartFill className=" inline size-5" />{" "}
        <Link
          href={"https://notationit.com/"}
          className="underline hover:text-secondary-color"
        >
          Notation IT
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
