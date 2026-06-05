"use client";

import config from "@/config"; // contains googleClientId

export default function GoogleSigninButton() {
  // Button click triggers popup login
  const handleGoogleLogin = () => {
    window.location.href = `${config.backendUrl}/customer/google-login`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border bg-white rounded-md py-3 text-sm font-medium mb-6"
    >
      <img
        src="https://img.icons8.com/color/16/000000/google-logo.png"
        alt="Google"
      />
      গুগল দিয়ে লগইন করুন
    </button>
  );
}
