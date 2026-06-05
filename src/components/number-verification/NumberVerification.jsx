import { getOtp, resendOtp, verifyOtp } from "@/data/path";
import useAxios from "@/hooks/useAxios";
import { setToken, setUser } from "@/lib/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Number from "../signup/number/Number";
import OTP from "../signup/otp/OTP";

function NumberVerification() {
  const axios = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const dataFromSearch = searchParams.get("user");
  const dataFromGoogle = JSON.parse(dataFromSearch);
  const [currentStep, setCurrentStep] = useState("number");
  const [timer, setTimer] = useState(60);
  const [data, setData] = useState({
    ...dataFromGoogle,
    phone: "",
  });
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleResend = async () => {
    try {
      const res = await axios.post(resendOtp, {
        phone: data?.phone,
      });
      toast.success("আপনার ফোনে OTP পাঠানো হয়েছে");
      setOtp(new Array(6).fill(""));
      setTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const handleNumber = async () => {
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
      toast.error(error?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };

  const requestOtp = async () => {
    const res = await axios.post(getOtp, data);
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
        router.replace("/");
      } else {
        toast.error("OTP যাচাই ব্যর্থ হয়েছে");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "দুঃখিত, কিছু সমস্যা হয়েছে");
    } finally {
    }
  };

  return (
    <div>
      {currentStep === "number" && (
        <Number handleNumber={handleNumber} data={data} setData={setData} />
      )}
      {currentStep === "otp" && (
        <OTP
          otp={otp}
          setOtp={setOtp}
          handleResend={handleResend}
          handleSubmit={handleVerifyOtp}
          timer={timer}
          setTimer={setTimer}
          handleBack={() => setCurrentStep("number")}
        />
      )}
    </div>
  );
}

export default NumberVerification;
