import axiosInstance from "../../axiosConfig";

export const getAvaliacoesPorProduto = async (produtoId) => {
  try {
    
    const response = await axiosInstance.get(`/avaliacoes/produto/${produtoId}`);
    const avaliacoes = response.data.slice(0, 6);

    return avaliacoes;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
};
