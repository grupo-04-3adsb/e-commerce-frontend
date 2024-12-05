import axiosInstance from "../../axiosConfig";

export const getCategoriaESubcategoriaPorProduto = async (produtoId) => {
  try {
    const response = await axiosInstance.get(`/produtos/${produtoId}`);
    const { categoria, subcategoria } = response.data;

    return { categoria, subcategoria };
  } catch (error) {
    console.error("Erro ao buscar categoria e subcategoria:", error);
    return null;
  }
};
