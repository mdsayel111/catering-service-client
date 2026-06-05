"use client";

import { accountSideBarItems } from "@/data";
import { logout } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import SideBarItem from "./components/side-bar-item/SideBarItem";
import toast from "react-hot-toast";

export default function AccountNavigationItems() {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <>
      <ul className="flex flex-col gap-5">
        {accountSideBarItems.map((item, index) => (
          <SideBarItem key={index} item={item} />
        ))}
      </ul>
      <hr
        style={{
          border: "1px solid #ccc",
          margin: "20px 10px",
        }}
      />
      <SideBarItem
        item={{ label: "Logout", icon: FaArrowRightFromBracket }}
        type={"button"}
        onClick={() => {
          dispatch(logout());
          toast.success("Logged out successfully");
          router.push("/");
        }}
      />
    </>
  );
}
