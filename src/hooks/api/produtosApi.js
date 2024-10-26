import axios from 'axios';
import axiosConfig from '../../axiosConfig';

export const getTodosOsProdutos = async (page = 0, size = 10) => {
  const response = await axiosConfig.get(`/produtos?page=${page}&size=${size}`);
  return response.data;
};

export const getProdutosFiltrados = async (filters, page = 0, size = 10) => {
  const response = await axiosConfig.post(`/produtos/filtro?page=${page}&size=${size}`, filters);
  return response.data;
};
