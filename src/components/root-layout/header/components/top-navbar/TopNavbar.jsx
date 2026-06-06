"use client";

import Drawer from "@/components/shared/Drawer";
import Logo from "@/components/shared/Logo/Logo";
import Button from "@/components/shared/button/Button";
import { navItems } from "@/data";
import useAuthAxios from "@/hooks/useAuthAxios";
import useGetData from "@/hooks/useGetData";
import { logout } from "@/lib/redux/features/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./components/nav-item/NavItem";
import ProfileDropdown from "./components/profile-dropdown/ProfileDropdown";
export default function TopNavbar() {
  const axios = useAuthAxios({ redirect: false });
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  const userInfo = useGetData(axios, "/client/user-profile-page", [
    "user-info",
  ]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const dispatch = useDispatch();

  const data = userInfo?.data?.user || null;

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("লগ-আউট করা হয়েছে");
    router.push("/");
    setShowMenu(false);
  };

  return (
    <div className="mx-auto w-full lg:pb-0 sticky top-0 z-50  bg-tertiary-color ">
      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-2 relative z-10 flex items-center justify-between ">
        <Link href={"/"} className="block w-[150px]">
          <Logo image="lightImage" className="" />
        </Link>

        <nav className="items-center text-[15px] font-medium gap-6 justify-center hidden lg:flex ">
          {navItems.map((item, index) => (
            <NavItem item={item} />
          ))}
        </nav>

        {/* Login/Register */}
        <div className="text-[14px] lg:block font-medium w-fit hidden">
          <div className="w-fit ml-auto flex items-center gap-1">
            {!token ? (
              <>
                <Link
                  href="/login"
                  className="hover:text-secondary-color transition text-text-primary-color duration-200 group flex items-center gap-2"
                >
                  <i className="fa-solid fa-user text-secondary-color" />{" "}
                  <span className="group-hover:text-secondary">লগইন</span>
                </Link>
                <span className="mx-1 text-text-primary-color">/</span>
                <Link
                  href="/signup"
                  className="hover:text-secondary-color text-text-primary-color transition duration-200"
                >
                  নিবন্ধন
                </Link>
              </>
            ) : (
              <ProfileDropdown image={data?.image} />
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:mr-6 lg:hidden">
          <button onClick={() => setShowMenu((prev) => !prev)}>
            <i className="fa-solid text-3xl fa-bars" />
          </button>
        </div>

        <Drawer
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          side="right"
        >
          <div className="px-6 font-bold text-[14px] h-full">
            <ul
              className={`space-y-2 font-medium h-full relative text-text-primary-color `}
            >
              {navItems.map((item, index) => (
                <NavItem item={item} handleClick={() => setShowMenu(false)} />
              ))}
              {!user?.phone && (
                <div className="flex items-center gap-2 mt-6">
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/login"
                    className="hover:text-secondary-color transition text-text-primary-color duration-200 group flex items-center gap-2"
                  >
                    <i className="fa-solid fa-user text-secondary-color" />{" "}
                    <span className="group-hover:text-secondary">লগইন</span>
                  </Link>
                  <span className="mx-1 text-text-primary-color">/</span>
                  <Link
                    onClick={() => setShowMenu(false)}
                    href="/signup"
                    className="hover:text-secondary-color text-text-primary-color transition duration-200"
                  >
                    নিবন্ধন
                  </Link>
                </div>
              )}
              <span className="absolute bottom-4 left-0 w-full">
                {user?.phone && (
                  <Button text={"লগ-আউট"} handleSubmit={handleLogout} />
                )}
              </span>
            </ul>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
