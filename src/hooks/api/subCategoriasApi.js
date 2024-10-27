import axios from "axios";

export const getSubcategorias = async () => {
  try {
    const response = await axios.get("http://localhost:8080/subcategorias");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar subcategorias:", error);
    return []; // Retorna um array vazio em caso de erro
  }
};
