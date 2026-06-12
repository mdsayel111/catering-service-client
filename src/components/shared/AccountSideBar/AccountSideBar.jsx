import AccountNavigationItems from "./components/account-navigation-items/AccountNavigationItems";

export default function AccountSideBar() {
  return (
    <div className="lg:w-[400px] max-sm:w-full max-md:w-full gap-5  lg:sticky top-20 h-fit">
      <div className="p-5 bg-white border rounded-md max-sm:hidden">
        <AccountNavigationItems />
      </div>
    </div>
  );
}
