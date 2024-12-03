import axios from 'axios';
import axiosInstance from '../../axiosConfig';

export const getProdutoByName = async (productName) => {
  try {
    const response = await axiosInstance.get(`/produtos/nome/${encodeURIComponent(productName)}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw error;
  }
};
