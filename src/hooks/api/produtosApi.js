import axios from "axios";

const API_URL = "http://localhost:8080/produtos";

export const getTodosOsProdutos = async (page = 0, size = 9) => {
  try {
    const response = await axios.get(API_URL, { params: { page, size } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error);
    throw error;
  }
};

export const getProdutosFiltrados = async (filters, page = 0, size = 9) => {
  try {
    const response = await axios.get(API_URL, { params: { ...filters, page, size } });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos filtrados:", error);
    throw error;
  }
};
