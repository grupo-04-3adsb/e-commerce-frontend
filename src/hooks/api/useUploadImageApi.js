import { useSelector } from "react-redux";
import axiosInstance from "../../axiosConfig";

const useUploadImage = () => {
  const { token } = useSelector((state) => state.usuario.token);

  const uploadImage = async (file, tipo, nomeProduto, idEntidade) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tipo", tipo);
    formData.append("nomeProduto", nomeProduto);
    formData.append("idEntidade", idEntidade);

    console.log("formData", formData);
    console.log("token", token);
    console.log("idEntidade", idEntidade);
    try {
      const response = await axiosInstance.post("/api/upload/image", formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      throw error;
    }
  };

  return { uploadImage };
};

export default useUploadImage;
