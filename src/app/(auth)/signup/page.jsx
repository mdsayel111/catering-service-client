"use client";

import OTP from "@/components/signup/otp/OTP";
import SignupForm from "@/components/signup/signup-form/SignupForm";
import { getOtp, resendOtp, verifyOtp } from "@/data/path";
import useAxios from "@/hooks/useAxios";
import { setToken, setUser } from "@/lib/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState("info");
  const [timer, setTimer] = useState(60);
  const dispatch = useDispatch();
  const router = useRouter();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    checked: false,
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const axios = useAxios();

  const requestOtp = async () => {
    const res = await axios.post(getOtp, data);
    return res;
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(verifyOtp, {
        phone: data?.phone,
        otp: otp.join(""),
      });
      if (res.data?.success) {
        toast.success("OTP সফলভাবে যাচাই হয়েছে");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        router.push("/");
      } else {
        toast.error("OTP যাচাই ব্যর্থ হয়েছে");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    } finally {
    }
  };

  const handleSignupForm = async (e) => {
    e.preventDefault();

    // Empty field check
    if (
      data?.firstName === "" ||
      data?.lastName === "" ||
      data?.phone === "" ||
      data?.password === "" ||
      data?.confirmPassword === "" ||
      !data?.checked
    ) {
      toast.error("দয়া করে সব তথ্য পূরণ করুন");
      return;
    }

    // Password match check
    if (data?.password !== data?.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলেনি");
      return;
    }

    try {
      await handleNumberVerification();
      setCurrentStep("otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(resendOtp, {
        phone: data?.phone,
      });
      toast.success("আপনার মোবাইলে OTP পাঠানো হয়েছে");
      setOtp(new Array(6).fill(""));
      setTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleNumberVerification = async () => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(data?.phone?.trim())) {
      toast.error("সঠিক ফোন নম্বর দিন");
      return;
    }

    try {
      await requestOtp();
      setCurrentStep("otp");
      toast.success("আপনার ফোনে OTP পাঠানো হয়েছে");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="">
      {currentStep === "info" && (
        <SignupForm
          handleSubmit={handleSignupForm}
          data={data}
          setData={setData}
        />
      )}
      {currentStep === "otp" && (
        <OTP
          handleBack={() => setCurrentStep("info")}
          otp={otp}
          setOtp={setOtp}
          handleResend={handleResend}
          handleSubmit={handleVerifyOtp}
          timer={timer}
          setTimer={setTimer}
          phone={data?.phone}
        />
      )}
    </div>
  );
}
