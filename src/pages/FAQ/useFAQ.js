import { useEffect, useState } from "react";
import useFAQApi from "../../hooks/api/useFAQApi";

const useFAQ = () => {
  const [perguntas, setPerguntas] = useState([]);

  const [perguntasFiltradas, setPerguntasFiltradas] = useState(perguntas);

  const [pesquisa, setPesquisa] = useState("");

  const { getAllFAQ } = useFAQApi();

  const fetchData = async () => {
    try {
      const response = await getAllFAQ();
      setPerguntas(response);
      setPerguntasFiltradas(response);
    } catch (error) {
      console.error("Erro ao buscar perguntas frequentes", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pesquisa) {
      const perguntasFiltradas = perguntas.filter((pergunta) =>
        pergunta.titulo
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase() ||
              pergunta.resposta.toLowerCase().includes(pesquisa.toLowerCase())
          )
      );
      setPerguntasFiltradas(perguntasFiltradas);
    }
  }, [pesquisa]);

  return { perguntasFiltradas, setPesquisa };
};

export default useFAQ;
