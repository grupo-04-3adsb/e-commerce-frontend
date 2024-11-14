import axios from 'axios';

export const getProdutoByName = async (productName) => {
  try {
    const response = await axios.get(`http://localhost:8080/produtos/nome/${encodeURIComponent(productName)}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
};
