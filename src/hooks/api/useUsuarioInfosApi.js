import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export const useUsuariosInfos = () => {
    const { token } = useSelector((state) => state?.usuario.token)
    const id = useSelector((state) => state?.usuario.usuario.usuario.idUsuario)

    const mutationCarregarEnderecosUsuarioPorId = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.get(`/enderecos/usuario/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        },

        onError: (error) => {
            console.log(
                "Erro ao cadastrar produtos:",
                error.response?.data || error.message
            )
        }


    })

    const mutationCarregarInfosUsuarioPorId = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.get(`/usuarios/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            return response.data;
        },

        onError: (error) => {
            console.log(
                "Erro ao cadastrar produtos:",
                error.response?.data || error.message
            )
        }


    })

    const atualizarInfosUsuario = useMutation({
        mutationFn: async (putDto) => {
            const response = await axiosInstance.put(
                `/usuarios/${id}`,
                
                putDto,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
              );
              return response.data;
        }
    })
    return {
        carregarInfosEnderecos: mutationCarregarEnderecosUsuarioPorId.mutateAsync,
        dataUser: mutationCarregarEnderecosUsuarioPorId.data,
        atualizarInfos: atualizarInfosUsuario.mutateAsync,
        buscarUsuarioPorId: mutationCarregarInfosUsuarioPorId.mutateAsync,
        usuarioDataUser: mutationCarregarInfosUsuarioPorId.data
    };

}
