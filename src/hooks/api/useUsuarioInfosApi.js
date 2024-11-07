import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";
import { error } from "console";

export const useUsuariosInfos = () => {
    const {token} = useSelector((state) => state?.usuario.token)
    const id = useSelector((state) => state?.usuario.idUsuario)

    const mutationCarregarInfosUsuarioPorId = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.get(`/enderecos/usuario/${id}`, 
                {headers: {
                    Authorization: `Bearer ${token}`
                }}
            );
            return response.data;
        },
    
        onError: (error) => {
            console.error(
                "Erro ao cadastrar produtos:",
                error.response?.data || error.message
            )
        }
    })
    return mutationCarregarInfosUsuarioPorId;
}
