import axiosInstance from "../../axiosConfig";

export const getProdutosDetalhes = async ({ filter = {}, page = 0, size = 10, sort }) => {
  const params = new URLSearchParams();

  params.append("size", size);
  params.append("page", page);

  if (sort) {
    params.append("sort", sort);
  }

  if (filter.nomeCategoria) {
    params.append("nomeCategoria", filter.nomeCategoria);
  }
  if (filter.nomeSubcategoria) {
    params.append("nomeSubcategoria", filter.nomeSubcategoria);
  }
  if (filter.isPersonalizavel !== undefined) {
    params.append("isPersonalizavel", filter.isPersonalizavel);
  }
  if (filter.isPersonalizacaoObrigatoria !== undefined) {
    params.append("isPersonalizacaoObrigatoria", filter.isPersonalizacaoObrigatoria);
  }
  if (filter.precoMinimo != null) {
    params.append("precoMinimo", filter.precoMinimo);
  }
  if (filter.precoMaximo != null) {
    params.append("precoMaximo", filter.precoMaximo);
  }

  try {
    const response = await axiosInstance.get(`/produtos?${params.toString()}`);
    console.log("Filtro:", filter);
    console.log("Resposta da API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes dos produtos:", error);
    throw error;
  }
};