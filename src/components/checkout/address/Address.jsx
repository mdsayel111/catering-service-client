import LocationInput from "@/components/shared/location-input/LocationInput";
import useAuthAxios from "@/hooks/useAuthAxios";
import useGetData from "@/hooks/useGetData";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Address({ setDeliveryAddress, deliveryAddress }) {
  const user = useSelector((state) => state.auth?.user);
  const [loading, setLoading] = useState(user?.phone ? true : false);
  const axios = useAuthAxios();

  const { data, loading: reqLoading } = useGetData(axios, "/address", [
    "address",
  ]);

  const handleAddLocation = (location) => {
    setDeliveryAddress({
      lat: location?.lat,
      long: location?.long,
      address: location?.address,
    });
  };

  useEffect(() => {
    if (!reqLoading) {
      if (data?.lat && data?.long) {
        setDeliveryAddress({
          lat: data?.lat,
          long: data?.long,
          address: data?.address,
        });
      }
      setLoading(false);
    }
  }, [data]);


  return (
    <div>
      {!loading && (
        <LocationInput
          selectedLocation={deliveryAddress}
          handleAddLocation={handleAddLocation}
          btnText={"Add Address"}
        />
      )}
    </div>
  );
}
