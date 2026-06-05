import Link from "next/link";
import AccountNavigationItems from "./components/account-navigation-items/AccountNavigationItems";

export default function AccountSideBar() {
  return (
    <div className="lg:w-[400px] max-sm:w-full max-md:w-full gap-5  lg:sticky top-20 h-fit">
      {/* <div className="p-5 rounded-md bg-white border">
        <div className="p-5">
          <div className="flex gap-3 flex-col items-center py-2">
            <img
              src="https://i.ibb.co/PzDTBmqf/g2juhlin4zfmrdjvbhen.webp"
              className="w-[100px] h-[100px] rounded-full border border-gray-300"
              alt="User Avatar"
            />

            <div className="text-center">
              <h4 className="text-[16px]">Md Mamun Khan</h4>
              <p className="text-[12px]">khan@mamun.com</p>

              <Link
                href={"/user-profile"}
                className="px-5 py-2 bg-black mt-1 rounded-md hover:text-black transition hover:bg-white duration-300 border cursor-pointer text-white flex items-center justify-center gap-2"
              >
                <div className="text-[12px] flex items-center gap-2">
                  <i className="fa-solid fa-pen-to-square text-sm"></i>
                  Edit
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="my-1">
          <button className="w-full text-[14px] rounded-md uppercase md:px-10 py-3 hover:text-black hover:bg-white bg-black text-white transition duration-300">
            Convert As Seller
          </button>
        </div>
      </div> */}
      <div className="p-5 bg-white border rounded-md max-sm:hidden">
        <AccountNavigationItems />
      </div>
    </div>
  );
}
