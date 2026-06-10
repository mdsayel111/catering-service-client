import Footer from "@/components/root-layout/footer/Footer";
import Header from "@/components/root-layout/header/Header";
import React from "react";

export const metadata = {
  title: "খাবার-ওয়ালা",
  description: "",
};

export default function layout({ children }) {
  return (
    <div>
      <Header />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
