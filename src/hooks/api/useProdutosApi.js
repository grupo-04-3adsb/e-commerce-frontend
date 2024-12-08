import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../axiosConfig";

const useProdutosApi = () => {
  const pesquisarProdutoSkuNome = useMutation({
    mutationFn: async ({ pesquisa, page = 0, size = 10 }) => {
      const response = await axiosInstance.get(
        `/produtos/pesquisar/nome-sku?pesquisa=${pesquisa}&page=${page}&size=${size}`
      );
      return response.data;
    },
  });

  const sugerirProdutos = useMutation({
    mutationFn: async ({ carrinho, size = 10 }) => {
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
      const response = await axiosInstance.post(
        `/produtos/sugerir-produtos?limite=${size}`,
        payload
      );
      return response.data;
    },
    onError: (error) => {
      console.error(
        "Erro ao sugerir produtos:"
      );
    },
  });

  return {
    pesquisarProdutoSkuNome: pesquisarProdutoSkuNome.mutateAsync,
    sugerirProdutos: sugerirProdutos.mutateAsync,
  };
};

export default useProdutosApi;
