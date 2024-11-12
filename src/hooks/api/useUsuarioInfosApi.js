import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export const useUsuariosInfos = () => {
    const { token } = useSelector((state) => state?.usuario.token)
    const id = useSelector((state) => state?.usuario.usuario.usuario.idUsuario)

    const mutationCarregarInfosUsuarioPorId = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.get(`/enderecos/usuario/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            console.log("RESPOSTA: " + JSON.stringify(response.data))
            return response.data;
        },

        onError: (error) => {
            console.log(
                "Erro ao cadastrar produtos:",
                error.response?.data || error.message
            )
        }


    })
    return {
        carregarInfos: mutationCarregarInfosUsuarioPorId.mutateAsync,
        dataUser: mutationCarregarInfosUsuarioPorId.data
    };

}
