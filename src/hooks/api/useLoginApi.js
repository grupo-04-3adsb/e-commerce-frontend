import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

export const useLoginApi = () => {
  const mutation = useMutation({
    mutationFn: async (loginDto) => {
      const response = await axiosInstance.post("/auth/customer/login", loginDto);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao fazer login");
    },
    onSuccess: (data) => {
      console.log("Login bem-sucedido");
    },
  });

  return mutation;
};
