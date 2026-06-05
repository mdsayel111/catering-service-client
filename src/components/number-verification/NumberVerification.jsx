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
      toast.success("OTP Sent To Your Phone");
      setOtp(new Array(6).fill(""));
      setTimer(60);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleNumber = async () => {
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
      toast.error(error?.response?.data?.message || "Something went wrong");
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
        toast.success("OTP Verified Successfully");
        dispatch(setToken(res?.data?.token));
        dispatch(setUser(res?.data?.user));
        router.replace("/");
      } else {
        toast.error("OTP Verification Failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
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
