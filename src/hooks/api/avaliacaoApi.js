import axios from "axios";

export const getAvaliacoesPorProduto = async (produtoId) => {
  try {
    
    const response = await axios.get(`http://localhost:8080/avaliacoes/produto/${produtoId}`);

    const avaliacoes = response.data.slice(0, 3);

    return avaliacoes;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
};
