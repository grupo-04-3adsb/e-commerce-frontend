import axios from "axios";

const API_URL = "http://localhost:8080/produtos";

// Função para procurar todos os produtos
export const getTodosOsProdutos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos os produtos:", error);
    throw error;
  }
};

// Função para procurar os produtos filtrados
export const getProdutosFiltrados = async (filters) => {
  try {
    const response = await axios.get(API_URL, { params: filters });
    return response.data; 
  } catch (error) {
    console.error("Erro ao buscar produtos filtrados:", error);
    throw error;
  }
};
