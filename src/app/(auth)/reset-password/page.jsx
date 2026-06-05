"use client";

import NewPassword from "@/components/reset-password/new-password/NewPassword";
import ResetNumber from "@/components/reset-password/reset-number/ResetNumber";
import OTP from "@/components/signup/otp/OTP";
import { getOtp, resendOtp, verifyOtp } from "@/data/path";
import useAxios from "@/hooks/useAxios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";

function ResetPassword() {
  const router = useRouter();
  const token = useSearchParams().get("token");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const axios = useAxios();
  const [currentStep, setCurrentStep] = useState("number");
  const sendOtp = async () => {
    try {
      const res = await axios.post(getOtp, { phone, type: "reset-password" });
      toast.success("আপনার ফোনে OTP পাঠানো হয়েছে");
      setCurrentStep("otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleResend = async () => {
    try {
      await axios.post(resendOtp, {
        phone,
      });
      toast.success("আপনার ফোনে OTP পাঠানো হয়েছে");
      setOtp(new Array(6).fill(""));
      setTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(verifyOtp, {
        phone: phone,
        password: password,
        otp: otp.join(""),
        type: "reset-password",
      });
      toast.success("OTP সফলভাবে যাচাই হয়েছে");
      setOtp(new Array(6).fill(""));
      setTimer(60);
      router.replace(res?.data?.data?.redirectUrl || "/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/customer/reset-password", {
        password: password,
        token: token,
      });
      toast.success("পাসওয়ার্ড সফলভাবে রিসেট হয়েছে");
      setOtp(new Array(6).fill(""));
      setTimer(60);
      router.replace("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };
  return (
    <div className="bg-[#f4f7f9]">
      {token === null ? (
        <>
          {currentStep === "number" && (
            <ResetNumber phone={phone} setPhone={setPhone} sendOtp={sendOtp} />
          )}
          {currentStep === "otp" && (
            <OTP
              handleBack={() => setCurrentStep("password")}
              otp={otp}
              setOtp={setOtp}
              handleResend={handleResend}
              handleSubmit={handleVerifyOtp}
              timer={timer}
              setTimer={setTimer}
              phone={phone}
            />
          )}
        </>
      ) : (
        <NewPassword
          password={password}
          setNewPassword={setPassword}
          handleSubmit={handleReset}
        />
      )}
    </div>
  );
}

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
      <ResetPassword />
    </Suspense>
  );
};

export default page;
