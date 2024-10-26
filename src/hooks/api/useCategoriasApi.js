import axios from 'axios';
import axiosConfig from '../../axiosConfig';

export const getCategorias = async () => {
  const response = await axiosConfig.get('/categorias');
  return response.data;
};
