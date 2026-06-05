"use client";
import AuthTextInput from "@/components/auth/auth-inputs/auth-text-input/AuthTextInput";
import GoogleSigninButton from "@/components/auth/google-sign-in-button/GoogleSigninButton";
import CheckBoxWithLabel from "@/components/shared/inputs/check-box-with-label/CheckBoxWithLabel";
import Logo from "@/components/shared/Logo/Logo";
import useAxios from "@/hooks/useAxios";
import { setToken, setUser } from "@/lib/redux/features/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function page() {
  const axios = useAxios();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/customer/sign-in", { phone, password });
      dispatch(setToken(res?.data?.data?.token));
      dispatch(setUser(res?.data?.data?.user));
      router.push("/");
    } catch (err) {
      toast.error(
        typeof err?.response?.data?.error === "string"
          ? err?.response?.data?.error
          : "Something went wrong"
      );
    }
  };
  return (
    <div className="bg-[#f4f7f9]">
      <div class="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-5 min-h-screen p-6 lg:p-10">
        <div class="lg:col-span-2 flex items-center">
          <div class="w-full max-w-md mx-auto">
            <Logo className={"w-1/2 lg:w-1/2 mb-6"} />

            <h2 class="text-3xl font-bold mb-1">Sign In</h2>
            <p class="text-sm text-gray-500 mb-6">
              See your growth and get consulting support!
            </p>
            <GoogleSigninButton />

            <div class="text-center text-gray-500 text-sm mb-6 relative">
              <span class="bg-[#f4f7f9] px-2 z-10 relative">
                Sign in with Phone
              </span>
              <div class="absolute left-0 top-1/2 w-full h-px bg-gray-300 -z-0"></div>
            </div>

            <form>
              <div class="mb-4 space-y-4">
                <AuthTextInput
                  label="Phone number"
                  placeholder="Phone number"
                  value={phone}
                  isNumber
                  setValue={(value) => {
                    if (value.length <= 11) {
                      setPhone(value);
                    }
                  }}
                  isRequired
                />
                <AuthTextInput
                  label="Password"
                  placeholder="Password"
                  value={password}
                  setValue={setPassword}
                  isRequired
                  type="password"
                />
              </div>
              <CheckBoxWithLabel
                label="Remember me"
                checked={remember}
                setChecked={setRemember}
              />

              <button
                onClick={handleSubmit}
                type="submit"
                class="w-full py-3 bg-black text-white font-bold rounded-md text-sm"
              >
                SIGN IN
              </button>
            </form>

            <div class="mt-6 text-sm">
              <p class="text-gray-600">
                Forgot Password?
                <Link href="/reset-password" class="text-black font-medium">
                  Click Here
                </Link>
              </p>
              <p class="text-gray-600 mt-1">
                Don’t have an Account?
                <Link href="/signup" class="text-black font-medium">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div class="hidden lg:col-span-3 lg:flex flex-col justify-center items-center text-center p-4">
          <img
            src="https://amazcart.ischooll.com/public/frontend/amazy/img/banner/login_img.png"
            alt="Login Banner"
            class="mb-8"
          />
          <div class="max-w-md">
            <h2 class="font-bold text-3xl lg:text-4xl mb-4">
              Turn your ideas into reality..
            </h2>
            <p class="text-sm font-medium text-gray-600">
              Consistent quality and experience across all platforms and
              devices..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
