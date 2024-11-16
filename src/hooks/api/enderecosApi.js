import axiosInstance from "../../axiosConfig";

export const updateEndereco = async (enderecoId, enderecoData) => {
  try {
    console.log("Updating address with data:", enderecoData);
    const response = await axiosInstance.put(`/enderecos/${enderecoId}`, enderecoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    throw error;
  }
};