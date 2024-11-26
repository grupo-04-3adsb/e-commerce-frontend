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

  return {
    pesquisarProdutoSkuNome: pesquisarProdutoSkuNome.mutateAsync,
  };
};

export default useProdutosApi;
