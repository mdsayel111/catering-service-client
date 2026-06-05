import { useQuery } from "@tanstack/react-query";

export default function useGetData(axios, path, tags = []) {
  const { data, isLoading, isError } = useQuery({
    queryKey: tags,
    queryFn: async () => {
      const res = await axios.get(path);
      return res.data.data;
    },
  });

  return { data, loading: isLoading, error: isError };
}
