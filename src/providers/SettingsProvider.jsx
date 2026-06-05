"use client";

import useAxios from "@/hooks/useAxios";
import useGetData from "@/hooks/useGetData";
import { setLoading } from "@/lib/redux/features/loadingSlice";
import { setColor } from "@/lib/redux/features/settingsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SettingsProvider({ children }) {
  // const loading = useSelector((state) => state.loading?.loading);
  const settings = useSelector((state) => state.settings?.settings);
  const dispatch = useDispatch();
  const axios = useAxios();
  const { data } = useGetData(axios, "/client/settings", []);
  useEffect(() => {
    if (data) {
      dispatch(setColor(data?.colors));
    }
  }, [data]);

  useEffect(() => {
    // ✅ Define root before using it
    const root = document.documentElement;
    // this will be uncommented when we have the settings
    // root.style.setProperty("--primary-color", settings?.colors?.primaryColor || "tomato");
    // root.style.setProperty("--secondary-color", settings?.colors?.secondaryColor || "tomato");
    // root.style.setProperty("--tertiary-color", settings?.colors?.tertiaryColor || "tomato");
    // root.style.setProperty("--text-primary-color", settings?.colors?.textPrimaryColor || "tomato");
    // root.style.setProperty("--text-secondary-color", settings?.colors?.textSecondaryColor || "tomato");
    // root.style.setProperty("--text-tertiary-color", settings?.colors?.textTertiaryColor || "tomato");

    root.style.setProperty(
      "--primary-color","black"
    );
    root.style.setProperty(
      "--secondary-color","red"
    );
    root.style.setProperty(
      "--tertiary-color","#f3f4f6"
    );
    root.style.setProperty(
      "--text-primary-color","black"
    );
    root.style.setProperty(
      "--text-secondary-color","white"
    );
    root.style.setProperty(
      "--text-tertiary-color","#99a1af"
    );

    dispatch(setLoading(false));
  }, [settings]);

  return <div>{children}</div>;
}
