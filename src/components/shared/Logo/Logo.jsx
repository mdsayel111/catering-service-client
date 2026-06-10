"use client";

// import useAuthAxios from "@/hooks/useAuthAxios";
// import useGetData from "@/hooks/useGetData";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Logo({ className, image = "lightImage", src }) {
  // const axios = useAuthAxios({ redirect: false });
  // const { data: logoData } = useGetData(axios, "/logo", ["logo"]);
  // const src = logoData?.[image];
  return (
    <Link href={"/"} className={cn("w-32 md:w-full block", className)}>
      <img src={src} alt="logo" className="w-full" />
    </Link>
  );
}
