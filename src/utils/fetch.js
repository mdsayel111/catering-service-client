import config from "@/config";

const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(config?.backendUrl + url, {
      ...options,
    });
    return await res.json();
  } catch (error) {
  }
};

export default fetchData;
