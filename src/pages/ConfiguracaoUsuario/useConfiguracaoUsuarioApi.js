import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useConfiguracaoUsuarioApi = () => {
    const getEnderecoByCepApi = useMutation({
        mutationFn: async (cep) => {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            return response.data;
        },
        onError: (error) => {
            console.error("Erro ao buscar endereço pelo CEP:", error);
            throw new Error(
                error.response?.data || "Erro desconhecido. Tente novamente mais tarde."
            );
        },
        onSuccess: (data) => {
            console.log("Endereço encontrado com sucesso: ", data);
        }, 
    })

    return {
        getEnderecoByCepApi,

    };
};

export default useConfiguracaoUsuarioApi;