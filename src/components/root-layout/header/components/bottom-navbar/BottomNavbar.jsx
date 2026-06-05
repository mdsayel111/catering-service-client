import Link from "next/link";

export default function BottomNavbar() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-20 bg-[#eeeef1] shadow-[0_-4px_12px_rgba(0,0,0,0.15)] z-40 lg:hidden">
      <div className="flex justify-between h-full items-center px-4 py-6 text-black text-xs relative">
        <div className="flex flex-col items-center space-y-1">
          <Link href="/">
            <i className="fa-solid text-[18px] fa-house" />
          </Link>
          <span className="font-semibold text-base">Home</span>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Link href="/my-wishlist">
            <i className="fa-solid text-[18px] fa-heart" />
          </Link>
          <span className="font-semibold text-base">Wishlist</span>
        </div>

        <div className="w-16"></div>

        <div className="flex flex-col items-center space-y-1">
          <Link href="/cart">
            <i className="fa-solid text-[18px] fa-cart-shopping" />
          </Link>
          <span className="font-semibold text-base">Cart</span>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <Link href="/user-profile">
            <i className="fa-solid text-[18px] fa-user" />
          </Link>
          <span className="font-semibold text-base">Account</span>
        </div>

        {/* Floating Button */}
        <div
          className="absolute -top-8 left-1/2 z-50"
          style={{
            transform: "translate(-50%)",
          }}
        >
          <div className="bg-black shadow-xl flex justify-center items-center text-white font-bold text-4xl h-16 w-16 rounded-full">
            e
          </div>
        </div>
      </div>
    </div>
  );
}
