import axios from 'axios';
import axiosConfig from '../../axiosConfig';

export const getSubcategorias = async () => {
  const response = await axiosConfig.get('/subcategorias');
  return response.data;
};
