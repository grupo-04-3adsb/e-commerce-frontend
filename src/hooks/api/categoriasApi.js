import axios from "axios";
import axiosInstance from "../../axiosConfig";

export const getCategorias = async () => {
  try {
    const response = await axiosInstance.get("/categorias");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
};
