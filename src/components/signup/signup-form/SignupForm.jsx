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
            <Logo className={"w-1/2 lg:w-1/2 mb-6 mx-auto"} />

            <h2 className="text-3xl font-bold mb-1">Sign Up</h2>
            <p className="text-sm text-gray-500 mb-6">
              See your growth and get consulting support!
            </p>

            <GoogleSigninButton />

            <div className="text-center text-gray-500 text-sm mb-6 relative">
              <span className="bg-[#f4f7f9] px-2 z-10 relative">
                Sign up with Phone
              </span>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300 -z-0"></div>
            </div>

            <form>
              <div className="space-y-4 mb-4">
                <AuthTextInput
                  label="First Name"
                  placeholder="First Name"
                  value={data.firstName}
                  setValue={(value) => setData({ ...data, firstName: value })}
                  isRequired
                />
                <AuthTextInput
                  label="Last Name"
                  placeholder="Last Name"
                  value={data.lastName}
                  setValue={(value) => setData({ ...data, lastName: value })}
                  isRequired
                />
                <AuthTextInput
                  label="Phone number"
                  placeholder="Phone number"
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
                  label="Password"
                  placeholder="Password"
                  type="password"
                  value={data?.password}
                  setValue={(value) => setData({ ...data, password: value })}
                  isRequired
                />
                <AuthTextInput
                  type="password"
                  label="Confirm password"
                  placeholder="Confirm password"
                  value={data?.confirmPassword}
                  setValue={(value) =>
                    setData({ ...data, confirmPassword: value })
                  }
                  isRequired
                />
              </div>
              <CheckBoxWithLabel
                label="By signing up, you agree to <a className=text-blue-500 href=''>Teams of Service</a> and <a className=text-blue-500 href=''>Privacy Policy</a>"
                checked={data.checked}
                setChecked={(value) => setData({ ...data, checked: value })}
              />
              <Button handleSubmit={handleSubmit} text="SIGN UP" />
            </form>
            <p className="text-gray-600 mt-6 text-sm">
              Already have an Account?
              <Link href="/login" className="text-black font-medium">
                Sign In
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
              Turn your ideas into reality..
            </h2>
            <p className="text-sm font-medium text-gray-600">
              Consistent quality and experience across all platforms and
              devices..
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
