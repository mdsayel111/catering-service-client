"use client";
import TextInput from "@/components/shared/inputs/text-input/TextInput";
import SubmitButton from "@/components/shared/submit-button/SubmitButton";
import useAuthAxios from "@/hooks/useAuthAxios";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordTab() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const axios = useAuthAxios();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        toast.error("পাসওয়ার্ড দুটি মিলেনি");
        return;
      }
      await axios.put("/customer/update-password", {
        oldPassword,
        newPassword,
      });
      setOldPassword("");
      setNewPassword("");
      toast.success("পাসওয়ার্ড সফলভাবে আপডেট হয়েছে");
    } catch (error) {
      toast.error("দুঃখিত, কিছু সমস্যা হয়েছে");
    }
  };
  return (
    <div className="w-full rounded-sm">
      <div className="space-y-6">
        <TextInput
          label="Current Password"
          placeholder="Current Password"
          value={oldPassword}
          setValue={setOldPassword}
          type="password"
        />
        <TextInput
          label="New Password"
          placeholder="New Password"
          value={newPassword}
          setValue={setNewPassword}
          type="password"
        />
        <TextInput
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          type="password"
        />
      </div>

      <div className="mt-4 lg:mt-6 text-center">
        <SubmitButton handleSubmit={handleSubmit} label="Save Password" />
      </div>
    </div>
  );
}
