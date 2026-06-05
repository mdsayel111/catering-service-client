// src/hooks/useAxiosAuth.js
import { useSelector } from "react-redux";
import { useMemo } from "react";
import axios from "axios";
import config from "../config";
import { useRouter } from "next/navigation";

const useAuthAxios = ({ redirect = true } = {}) => {
  const token = useSelector((state) => state?.auth?.token);
  const router = useRouter();

  const authAxios = useMemo(() => {
    const instance = axios.create({
      baseURL: config?.backendUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // ✅ Add Authorization header dynamically
    instance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Handle 401 Unauthorized responses globally
    instance.interceptors.response.use(
      (response) => response, // Pass through successful responses
      (error) => {
        if (error?.response?.status === 401 && redirect) {
          // router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [token, router]);

  return authAxios;
};

export default useAuthAxios;
