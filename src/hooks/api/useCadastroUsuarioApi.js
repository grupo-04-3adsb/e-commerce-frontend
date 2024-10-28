import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

export const useCadastroUsuarioApi = () => {
  
  const cadastrarUsuario = useMutation({
    mutationFn: async (usuarioDTO) => {
      const response = await axiosInstance.post("/auth/register", usuarioDTO);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao fazer Cadastro:", error);
      throw new Error(
        error.response?.data || "Erro desconhecido. Tente novamente mais tarde."
      );
    },
    onSuccess: (data) => {
      console.log("Cadastro realizado com sucesso");
    },
  });

  const validarCPFEmail = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post(
        `/auth/validar?email=${data.email}&cpf=${data.cpf}`
      );
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao validar email e CPF:");
      throw new Error(
        error.response?.data || "Erro desconhecido. Tente novamente mais tarde."
      );
    },
    onSuccess: (data) => {
      console.log("Usuário verificado com sucesso");
    },
  });

  return {
    cadastrarUsuario,
    validarCPFEmail,
  };
};
