// src/hooks/useAxiosInstance.js
import { useMemo } from "react";
import axios from "axios";
import config from "@/config";

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: config?.backendUrl, // change to your backend base URL
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return instance;
};

export default useAxios;
