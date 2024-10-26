import axios from '../../axiosConfig';

export const getProdutosFiltrados = async (filtros, page = 0, size = 9) => {
    try {
        const response = await axios.get('/produtos', {
            params: {
                nome: filtros.nome,
                sku: filtros.sku,
                margemLucroMinima: filtros.margemLucroMinima,
                margemLucroMaxima: filtros.margemLucroMaxima,
                precoMinimo: filtros.precoMinimo,
                precoMaximo: filtros.precoMaximo,
                nomeCategoria: filtros.nomeCategoria,
                nomeSubcategoria: filtros.nomeSubcategoria,
                isPersonalizavel: filtros.isPersonalizavel,
                isPersonalizacaoObrigatoria: filtros.isPersonalizacaoObrigatoria,
                page,
                size,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar produtos filtrados:", error);
        throw error; 
    }
};
