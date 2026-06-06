import { accountSideBarItems } from "@/data";
import { logout } from "@/lib/redux/features/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

// The HoverDropdown component
export default function ProfileDropdown({ image }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogOut = async () => {
    await dispatch(logout());
    toast.success("লগ-আউট করা হয়েছে");
    router.push("/");
  };
  return (
    <div className="relative md:inline-block text-left group hidden">
      {/* Profile image button */}
      <img
        src={image || "/images/avatar.png"}
        alt="User Avatar"
        className="rounded-full border-2 p-0.5 !border-black cursor-pointer w-10 h-10"
      />

      {/* Dropdown menu */}
      <div
        className="absolute right-0 z-10 w-56 pt-2 origin-top-right   ring-opacity-5 
                   hidden group-hover:block 
                   transition-all duration-150 ease-out
                   transform opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
      >
        <div
          className="py-1 rounded-lg shadow-xl bg-white ring-1 ring-black"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {accountSideBarItems?.map((item) => (
            <DropdownItem
              href={item?.path || "#"}
              text={item?.label}
              Icon={item?.icon}
            />
          ))}
          <span onClick={handleLogOut}>
            <DropdownItem href="#" text="লগ-আউট" Icon={FaSignOutAlt} />
          </span>
        </div>
      </div>
    </div>
  );
}

// Reusable dropdown item
const DropdownItem = ({ href, text, Icon, isDanger = false }) => {
  const dangerClasses = "text-red-700 hover:bg-red-50";
  const normalClasses = "text-gray-700 hover:bg-gray-100";

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-md mx-1 ${isDanger ? dangerClasses : normalClasses
        } transition-colors duration-100`}
      role="menuitem"
    >
      <Icon />
      <span>{text}</span>
    </Link>
  );
};
