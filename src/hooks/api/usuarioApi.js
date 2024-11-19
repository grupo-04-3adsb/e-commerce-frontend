import axios from 'axios';

export const updateImageUrl = async (userId, imageUrl) => {
  try {
    const response = await axios.put(`/api/usuarios/${userId}/imagem`, { imgUrl: imageUrl });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar a URL da imagem:', error);
    throw error;
  }
};
