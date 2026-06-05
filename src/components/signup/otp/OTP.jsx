"use client";

import Button from "@/components/shared/button/Button";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function OTP({
  otp,
  setOtp,
  handleResend,
  handleSubmit,
  timer,
  setTimer,
  phone,
  handleBack,
}) {
  // --- Countdown effect ---
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans">
      <div className="w-full px-4 lg:px-0 lg:max-w-md">
        <div className="text-center">
          <div className="relative">
            <button
              onClick={handleBack || null}
              className="absolute left-0 lg:top-1/2 lg:-translate-y-1/2 translate-x-1/2 lg:-translate-x-[100%] bg-black p-1 rounded-full"
            >
              <IoIosArrowBack className="text-xl text-white" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              OTP Verification
            </h1>
            <p className="text-gray-600 mb-6">
              Please enter the 6-digit code sent to {phone}.
            </p>
          </div>

          <form>
            <div className="flex justify-center gap-2 md:gap-3 mb-6">
              {otp.map((data, index) => (
                <input
                  className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold border !border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>

            <Button handleSubmit={handleSubmit} text="Verify" containerClassName={""} />
          </form>

          <div className="mt-6 text-sm">
            <p className="text-gray-600">
              Didn’t receive the code?{" "}
              {timer > 0 ? (
                <span className="text-gray-400 font-semibold">
                  Resend in {timer}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Resend
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
