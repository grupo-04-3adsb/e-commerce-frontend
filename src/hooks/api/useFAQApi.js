import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

const useFAQApi = () => {
  const getAllFAQ = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.get("/faq/all");
      return response.data;
    },
  });

  return { getAllFAQ: getAllFAQ.mutateAsync };
};

export default useFAQApi;
