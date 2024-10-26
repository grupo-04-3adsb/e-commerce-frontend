import axios from "axios";
import axiosConfig from "../../axiosConfig";

export const getTodosOsProdutos = async (page = 0, size = 10) => {
  const response = await axiosConfig.get(`/produtos?page=${page}&size=${size}`);
  return response.data;
};

export const getProdutosFiltrados = async (filters, page = 0, size = 10) => {
  console.log("filters: ", filters);
  const response =
    await axiosConfig.get(`/produtos?
      nomeCategoria=Materiais de Escritório
      &nomeSubcategoria=${filters.nomeSubcategoria}
      &size=${size}
      &page=${page}
      &isPersonalizavel=${filters.isPersonalizavel}
      &IsPersonalizacaoObrigatoria=${filters.isPersonalizacaoObrigatoria}
      &precoMinimo=${filters.precoMinimo}
      &precoMaximo=${filters.precoMaximo}
  `);
  console.log(response.data);
  return response.data;
};
