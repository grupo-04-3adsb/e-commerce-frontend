import axios from "axios";

export const getMediaAvaliacaoPorProduto = async (produtoId) => {
  try {
    const response = await axios.get(`http://localhost:8080/avaliacoes/produto/${produtoId}/media`);

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
