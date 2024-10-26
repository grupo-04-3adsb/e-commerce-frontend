import axios from "axios";

export const getCategorias = async () => {
  try {
    const response = await axios.get("http://localhost:8080/categorias");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};
