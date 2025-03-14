import axiosInstance from "../../axiosConfig";

export const getProdutos = async ({ filter, page = 0, size = 9, sortBy, sortOrder }) => {
  const params = new URLSearchParams();

  params.append("size", size);
  params.append("page", page);

  if (sortBy) {
    params.append("sortBy", sortBy);
  }
  if (sortOrder) {
    params.append("sortOrder", sortOrder);
  }

  if (filter.nomeCategoria) {
    params.append("nomeCategoria", filter.nomeCategoria);
  }
  if (filter.nomeSubcategoria) {
    params.append("nomeSubcategoria", filter.nomeSubcategoria);
  }
  if (filter.isPersonalizavel) {
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
    const produtos = response.data.content;

    const produtosComAvaliacoes = produtos.map((produto) => {
      produto.avaliacao = produto.avaliacoes?.length
        ? produto.avaliacoes.reduce((acc, aval) => acc + aval.nota, 0) / produto.avaliacoes.length
        : 0;
      return produto;
    });

    return { ...response.data, content: produtosComAvaliacoes };
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

