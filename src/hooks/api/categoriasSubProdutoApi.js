import axios from "axios";

export const getCategoriaESubcategoriaPorProduto = async (produtoId) => {
  try {
    const response = await axios.get(`http://localhost:8080/produtos/${produtoId}`);
    const { categoria, subcategoria } = response.data;

    return { categoria, subcategoria };
  } catch (error) {
    console.error("Erro ao buscar categoria e subcategoria:", error);
    return null;
  }
};
