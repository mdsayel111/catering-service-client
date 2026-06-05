import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMuteData(
  axios,
  path,
  onSuccess,
  method = "POST",
  invalidateKeys = []
) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      switch (method.toUpperCase()) {
        case "POST":
          return await axios.post(path, data);
        case "PATCH":
          return await axios.patch(path, data);
        case "PUT":
          return await axios.patch(path, data);
        case "DELETE":
          return await axios.delete(path, { data }); // Axios expects DELETE payload as { data }
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    },
    onSuccess: () => {
      // **Correct way in v5**: pass the queryKey array directly
      invalidateKeys.forEach((key) => queryClient.invalidateQueries(key));
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  return mutation;
}
