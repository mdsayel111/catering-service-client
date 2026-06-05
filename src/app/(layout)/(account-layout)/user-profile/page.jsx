"use client";

import TabButton from "@/components/shared/tab-button/TabButton";
import AddressTab from "@/components/user-profile/profile-tabs/address-tab/AddressTab";
import ChangePasswordTab from "@/components/user-profile/profile-tabs/change-password-tab/ChangePasswordTab";
import InfoTab from "@/components/user-profile/profile-tabs/info-tab/InfoTab";
import useAuthAxios from "@/hooks/useAuthAxios";
import useGetData from "@/hooks/useGetData";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const axios = useAuthAxios();
  const user = useSelector((state) => state.auth?.user);

  // const [data, setData] = React.useState({});
  const [activeTab, setActiveTab] = React.useState("info");
  const tabs = [
    {
      name: "info",
      label: "Basic Info",
    },
    {
      name: "address",
      label: "Address",
    },
  ];

  !user?.googleId ? tabs.push({ name: "change-password", label: "Change Password" }) : null;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const userInfo = useGetData(axios, "/client/user-profile-page", [
    "user-info",
  ]);

  const data = userInfo?.data?.user || null;
  return (
    <div className="w-full">
      <div className="p-3">
        <div className="flex items-center flex-wrap gap-1">
          {tabs.map((tab) => (
            <TabButton
              value={tab.name}
              label={tab.label}
              handleTabClick={handleTabClick}
              activeTab={activeTab}
            />
          ))}
        </div>
        <div className="flex max-md:flex-col-reverse gap-5 py-5">
          <div className="w-[100%]">
            {data && activeTab === "info" && <InfoTab data={data} />}
            {activeTab === "address" && <AddressTab data={data?.address} />}
            {activeTab === "change-password" && !user?.googleId && <ChangePasswordTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
