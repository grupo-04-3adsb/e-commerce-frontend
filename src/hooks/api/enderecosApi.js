import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";
import { useSelector } from "react-redux";

export const useEnderecosInfo = () => {
  const { token } = useSelector((state) => state?.usuario.token)
  const id = useSelector((state) => state?.usuario.usuario.usuario.idUsuario)


  const mutationCadastrarEnderecoUsuario = useMutation({
    mutationFn: async (postDto) => {
        const response = await axiosInstance.post(`/enderecos/${id}`,
          postDto,  
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

return{
  cadastrarEndereco: mutationCadastrarEnderecoUsuario.mutateAsync
}
}