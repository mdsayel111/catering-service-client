"use client";

import Loader from "@/components/shared/loader/Loader";
import { setToken, setUser } from "@/lib/redux/features/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

function SigninSuccessContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const user = searchParams.get("user");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
      router.replace("/");
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[50%] lg:w-[25%]">
        <Loader />
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="w-[50%] lg:w-[25%]">
            <Loader />
          </div>
        </div>
      }
    >
      <SigninSuccessContent />
    </Suspense>
  );
}
