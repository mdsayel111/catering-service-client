"use client";
import AuthTextInput from "@/components/auth/auth-inputs/auth-text-input/AuthTextInput";
import GoogleSigninButton from "@/components/auth/google-sign-in-button/GoogleSigninButton";
import Button from "@/components/shared/button/Button";
import CheckBoxWithLabel from "@/components/shared/inputs/check-box-with-label/CheckBoxWithLabel";
import Logo from "@/components/shared/Logo/Logo";
import Link from "next/link";

export default function SignupForm({ data, setData, handleSubmit }) {
  return (
    <div className="bg-[#f4f7f9]">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-5 min-h-screen justify-start p-6 lg:p-10">
        <div className="lg:col-span-2 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <Logo className={"w-1/2 lg:w-1/2 mb-6"} />

            <h2 className="text-3xl font-bold mb-1">নিবন্ধন করুন</h2>
            <p className="text-sm text-gray-500 mb-6">
              নতুন অ্যাকাউন্ট তৈরি করুন
            </p>

            <GoogleSigninButton />

            <div className="text-center text-gray-500 text-sm mb-6 relative">
              <span className="bg-[#f4f7f9] px-2 z-10 relative">
                মোবাইল দিয়ে নিবন্ধন করুন
              </span>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300 -z-0"></div>
            </div>

            <form>
              <div className="space-y-4 mb-4">
                <AuthTextInput
                  label="নাম (প্রথম নাম)"
                  placeholder="নাম (প্রথম নাম)"
                  value={data.firstName}
                  setValue={(value) => setData({ ...data, firstName: value })}
                  isRequired
                />
                <AuthTextInput
                  label="শেষ নাম"
                  placeholder="শেষ নাম"
                  value={data.lastName}
                  setValue={(value) => setData({ ...data, lastName: value })}
                  isRequired
                />
                <AuthTextInput
                  label="মোবাইল নম্বর"
                  placeholder="মোবাইল নম্বর"
                  value={data.phone}
                  isNumber
                  setValue={(value) => {
                    if (value.length <= 11) {
                      setData({ ...data, phone: value });
                    }
                  }}
                  isRequired
                />
                <AuthTextInput
                  label="পাসওয়ার্ড"
                  placeholder="পাসওয়ার্ড"
                  type="password"
                  value={data?.password}
                  setValue={(value) => setData({ ...data, password: value })}
                  isRequired
                />
                <AuthTextInput
                  type="password"
                  label="পাসওয়ার্ড নিশ্চিত করুন"
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  value={data?.confirmPassword}
                  setValue={(value) =>
                    setData({ ...data, confirmPassword: value })
                  }
                  isRequired
                />
              </div>
              <CheckBoxWithLabel
                // label="By signing up, you agree to <a className=text-blue-500 href=''>Teams of Service</a> and <a className=text-blue-500 href=''>Privacy Policy</a>"
                label={`সাইন আপ করার মাধ্যমে, আপনি আমাদের 
  <a style="color:#3B82F6" href="">
    সেবার শর্তাবলী
  </a> এবং
  <a style="color:#3B82F6" href="">
    গোপনীয়তা নীতি
  </a> সাথে সম্মত হচ্ছেন।`}
                checked={data.checked}
                setChecked={(value) => setData({ ...data, checked: value })}
              />
              <Button handleSubmit={handleSubmit} text="নিবন্ধন করুন" />
            </form>
            <p className="text-gray-600 mt-6 text-sm">
              ইতিমধ্যে অ্যাকাউন্ট আছে? {" "}
              <Link href="/login" className="text-black font-medium">
                লগইন করুন
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden lg:col-span-3 lg:flex flex-col justify-center items-center text-center p-4">
          <img
            src="https://amazcart.ischooll.com/public/frontend/amazy/img/banner/login_img.png"
            alt="Login Banner"
            className="mb-8"
          />
          <div className="max-w-md">
            <h2 className="font-bold text-3xl lg:text-4xl mb-4">
              নতুন অ্যাকাউন্ট খুলুন
            </h2>
            <p className="text-sm font-medium text-gray-600">
              নতুন এক্সপেরিয়েন্সের জন্য রেজিস্টার করুন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
