import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

const useFreteApi = () => {
  const calcularFreteCarrinho = useMutation({
    mutationFn: async ({ cep, carrinho }) => {
      const payload ={
        idPedido: null,
        statusPedido: "CARRINHO",
        concluido: false,
        idsResponsaveis: [],
        dataPedido: null,
        cliente: null,
        valorFrete: null,
        itens: carrinho 
      }

      const response = await axiosInstance.post(`/calcular-fretes/${cep}`, payload);
      return response.data;
    },
    onError: (error) => {
      console.error("Erro ao calcular frete:", error);
    },
  });

  return {
    calcularFreteCarrinho: calcularFreteCarrinho.mutateAsync,
  };
};

export default useFreteApi;
