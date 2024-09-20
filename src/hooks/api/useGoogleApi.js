import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

export const useGoogleApi = () => {
  const mutation = useMutation({
    mutationFn: async (googleDTO) => {
      const response = await axiosInstance.post("/auth/google", googleDTO);
      return response.data;
    },
    onError: (error) => {
      console.log("Erro ao fazer login com o google");
    },
    onSuccess: (data) => {
      console.log("Login com google realizado: ", data);
    },
  });
  return mutation;
};
