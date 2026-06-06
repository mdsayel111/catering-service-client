"use client";

import SelectInput from "@/components/shared/inputs/select-input/SelectInput";
import TextInput from "@/components/shared/inputs/text-input/TextInput";
import LocationInput from "@/components/shared/location-input/LocationInput";
import SubmitButton from "@/components/shared/submit-button/SubmitButton";
import useAuthAxios from "@/hooks/useAuthAxios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddressTab() {
  const [isLoading, setIsLoading] = useState(true);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [location, setLocation] = useState(null);
  const axios = useAuthAxios();

  const handleSubmit = (location) => {
    if (needUpdate) {
      axios
        .put("/customer/address", location)
        .then((response) => {
          toast.success("ঠিকানা সফলভাবে আপডেট হয়েছে");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      axios
        .post("/customer/address", location)
        .then((response) => {
          toast.success("ঠিকানা সফলভাবে যোগ করা হয়েছে");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  useEffect(() => {
    axios
      .get("/customer/address")
      .then((response) => {
        const locationFromDB = response.data?.data;
        setLocation(locationFromDB || null);
        if (locationFromDB) {
          setNeedUpdate(true);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        // toast.error(error.response.data.message);
      });
  }, []);

  return (
    <>
      {!isLoading && (
        <div>
          <LocationInput
            selectedLocation={location}
            handleAddLocation={(data) => setLocation(data)}
          />
          <SubmitButton
            handleSubmit={() => handleSubmit(location)}
            label={needUpdate ? "ঠিকানা আপডেট করুন" : "ঠিকানা যোগ করুন"}
            className={"mx-auto block"}
          />
        </div>
      )}
    </>
  );
}
