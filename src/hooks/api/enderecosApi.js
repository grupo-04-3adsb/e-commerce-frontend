import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export const useEnderecosInfo = () => {
  const { token } = useSelector((state) => state?.usuario.token);
  const id = useSelector((state) => state?.usuario.usuario.usuario.idUsuario);

  const mutationCadastrarEnderecoUsuario = useMutation({
    mutationFn: async (postDto) => {
      const response = await axiosInstance.post(`/enderecos/${id}`, postDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },

    onError: (error) => {
      console.error("Erro ao cadastrar endereço:");
    },
  });

  const mutationEditaEnderecoUsuario = useMutation({
    mutationFn: async ({ putDto, idEndereco }) => {
      const response = await axiosInstance.put(
        `/enderecos/${idEndereco}`,
        putDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },

    onError: (error) => {
      console.error("Erro ao cadastrar produtos:");
    },
  });

  const getEnderecoById = useMutation({
    mutationFn: async (idEndereco) => {
      const response = await axiosInstance.get(`/enderecos/${idEndereco}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  })

  return {
    cadastrarEndereco: mutationCadastrarEnderecoUsuario.mutateAsync,
    editarEndereco: mutationEditaEnderecoUsuario.mutateAsync,
    getEnderecoById: getEnderecoById.mutateAsync,
  };
};
