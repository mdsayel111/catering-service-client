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
        toast.success("OTP Verified Successfully");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        router.push("/");
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
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
      toast.error("Please fill all the fields");
      return;
    }

    // Password match check
    if (data?.password !== data?.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await handleNumberVerification();
      setCurrentStep("otp");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(resendOtp, {
        phone: data?.phone,
      });
      toast.success("OTP Sent To Your Phone");
      setOtp(new Array(6).fill(""));
      setTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleNumberVerification = async () => {
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(data?.phone?.trim())) {
      toast.error("Invalid phone number.");
      return;
    }

    try {
      await requestOtp();
      setCurrentStep("otp");
      toast.success("OTP Sent To Your Mobile Number");
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
