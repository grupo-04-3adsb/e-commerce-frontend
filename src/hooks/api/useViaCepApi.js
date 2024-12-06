import { useDispatch } from "react-redux";
import { loading } from "../../store/slices/Loading/slice";
import axios from "axios";

export const useViaCepApi = () => {
  const dispatch = useDispatch();

  const buscarCep = async (cep) => {
    try {
      dispatch(loading(true));
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      dispatch(loading(false));
    }
  };

  return { buscarCep };
};
