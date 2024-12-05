import axios from "axios";
import axiosInstance from "../../axiosConfig";

export const getMediaAvaliacaoPorProduto = async (produtoId) => {
  try {
    const response = await axiosInstance.get(`/avaliacoes/produto/${produtoId}/media`);

    if (response.data !== undefined) {
      return response.data;
    } else {
      console.error("A resposta da API não contém um valor válido");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar média de avaliações:", error);
    return null;
  }
};
