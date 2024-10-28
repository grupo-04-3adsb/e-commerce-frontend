import axiosInstance from "../../axiosConfig";

export const getProdutos = async ({ filter, page = 0, size = 10 }) => {
  const params = new URLSearchParams();

  params.append("size", size);
  params.append("page", page);

  if(filter.nomeCategoria){
    params.append("nomeCategoria", filter.nomeCategoria);
  }
  if (filter.nomeSubcategoria)
    params.append("nomeSubcategoria", filter.nomeSubcategoria);
  if (filter.isPersonalizavel)
    params.append("isPersonalizavel", filter.isPersonalizavel);
  if (filter.isPersonalizacaoObrigatoria !== undefined)
    params.append(
      "IsPersonalizacaoObrigatoria",
      filter.isPersonalizacaoObrigatoria
    );
  if (filter.precoMinimo != null)
    params.append("precoMinimo", filter.precoMinimo);
  if (filter.precoMaximo != null)
    params.append("precoMaximo", filter.precoMaximo);

  const response = await axiosInstance.get(`/produtos?${params.toString()}`);
  console.log("Filtro: ", filter);
  console.log(response);
  return response.data;
};
