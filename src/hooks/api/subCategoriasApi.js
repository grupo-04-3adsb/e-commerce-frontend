import axios from "axios";
import axiosInstance from "../../axiosConfig";

export const getSubcategorias = async () => {
  try {
    const response = await axiosInstance.get("/subcategorias");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar subcategorias:", error);
    return [];
  }
};
