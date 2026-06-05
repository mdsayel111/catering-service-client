import React from "react";
import ResetPasswordLayout from "../components/ResetPasswordLayout";
import AuthTextInput from "@/components/auth/auth-inputs/auth-text-input/AuthTextInput";

export default function ResetNumber({ phone, setPhone, sendOtp }) {
  return (
    <ResetPasswordLayout>
      <h2 class="text-3xl font-bold mb-1">Welcome Back!</h2>
      <p class="text-sm text-gray-500 mb-8">
        Please enter your phone number to get a code.
      </p>

      <form>
        <div class="mb-4">
          <AuthTextInput
            label="Phone number"
            placeholder="Phone number"
            value={phone}
            isNumber
            setValue={(value) => {
              if (value.length <= 11) {
                setPhone(value);
              }
            }}
            isRequired
          />
        </div>

        <button
          type="button"
          onClick={sendOtp}
          class="w-full py-3 bg-black text-white font-bold rounded-md text-sm"
        >
          Send OTP
        </button>
      </form>
    </ResetPasswordLayout>
  );
}
