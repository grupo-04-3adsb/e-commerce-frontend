import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../../axiosConfig"

export const useCadastroUsuarioApi = () => {
    const mutation = useMutation({
        mutationFn: async(usuarioDTO) => {
            const response =  await axiosInstance.post("/auth/register", usuarioDTO);
            return response.data;
        },
        onError: (error) => {
            console.error("Erro ao fazer login: ", error);
        },
        onSuccess: (data) => {
            console.log("Cadastro realizado: ", data)
        }
    })

    return mutation;
}