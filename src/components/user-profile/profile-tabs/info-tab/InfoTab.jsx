"use client";
import ImageInput from "@/components/shared/inputs/image-input/ImageInput";
import TextInput from "@/components/shared/inputs/text-input/TextInput";
import SubmitButton from "@/components/shared/submit-button/SubmitButton";
import useAuthAxios from "@/hooks/useAuthAxios";
import useMuteData from "@/hooks/useMuteData";
import { setUser } from "@/lib/redux/features/authSlice";
import { uploadSingleImage } from "@/utils/image-upload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function isValidBangladeshiNumber(number) {
  // Remove spaces and dashes
  const cleaned = number.replace(/[\s-]/g, "");

  // Regex pattern for Bangladeshi phone numbers
  const regex = /^(?:\+?88)?01[3-9]\d{8}$/;

  return regex.test(cleaned);
}

export default function InfoTab({ data }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const axios = useAuthAxios();
  const { mutateAsync } = useMuteData(
    axios,
    "/customer/update-profile",
    () => {
      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
    },
    "PATCH",
    ["user-info"]
  );
  const [firstName, setFirstName] = useState(data?.firstName || "");
  const [lastName, setLastName] = useState(data?.lastName || "");
  const [email, setEmail] = useState(data?.email || "");
  const [phone, setPhone] = useState(data?.phone || "");
  const [image, setImage] = useState(data?.image || null);

  useEffect(() => {
    setFirstName(data?.firstName || "");
    setLastName(data?.lastName || "");
    setEmail(data?.email || "");
    setPhone(data?.phone || "");
    setImage(data?.image || null);
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      firstName,
      lastName,
    };
    if (!user?.googleId) {
      updatedData.email = email;
    }

    if (phone && isValidBangladeshiNumber(phone)) {
      updatedData.phone = phone;
    }

    if (image) {
      await uploadSingleImage(image).then((url) => {
        updatedData.image = url;
      });
    }

    try {
      const res = await mutateAsync(updatedData);
      dispatch(setUser(res?.data?.data));
      // toast.success("Successfully updated profile");
    } catch (error) {
      toast.error("দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full mx-auto space-y-6">
        {/* <ProfileImage /> */}
        <div className="w-1/2 lg:w-[25%] mx-auto pb-1">
          <ImageInput
            image={image}
            setImage={setImage}
            placeholder="প্রোফাইল ছবি আপলোড করুন"
            containerClassName={"aspect-square"}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            label="নাম (প্রথম নাম)"
            placeholder="নাম (প্রথম নাম)"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="শেষ নাম"
            placeholder="শেষ নাম"
            value={lastName}
            setValue={setLastName}
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TextInput
            disabled={user?.googleId}
            label="ইমেইল"
            placeholder="ইমেইল"
            value={email}
            setValue={setEmail}
            type="email"
            inputClass={"outline-0"}
          />
          <TextInput
            isNumber
            label="মোবাইল নম্বর"
            placeholder="মোবাইল নম্বর"
            value={phone}
            // setValue={setPhone}
            disabled
            type="tel"
            inputClass={"outline-0"}
          />
        </div>
      </div>
      <div className="py-1 text-center mt-4 lg:mt-6">
        <SubmitButton handleSubmit={handleSubmit} label="সেভ করুন" />
      </div>
    </div>
  );
}
