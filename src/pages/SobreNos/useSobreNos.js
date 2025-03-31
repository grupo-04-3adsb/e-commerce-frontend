import { useEffect, useState } from "react";
import usePaginasInfoApi from "../../hooks/api/usePaginasInfoApi";
import useValoresApi from "../../hooks/api/useValoresApi";
import useDepoimentosApi from "../../hooks/api/useDepoimentosApi";

const useSobreNos = () => {
  const [banner, setBanner] = useState({});
  const [fundadoras, setFundadoras] = useState([]);
  const [espacoCriativo, setEspacoCriativo] = useState({});
  const [nossosValores, setNossosValores] = useState([]);
  const [depoimentos, setDepoimentos] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { getPaginasInfo } = usePaginasInfoApi();
  const { getValores } = useValoresApi();
  const { getDepoimentos } = useDepoimentosApi();

  const fetchDataPageInfo = async () => {
    try {
      const response = await getPaginasInfo({
        destino: "/sobre",
      });
      if (response.content.length === 0) return;

      setPageInfo(response.content[0]);
      setBanner(response.content[0].banners[0]);
      setFundadoras(response.content[0].conteudosDinamicos.splice(0, 2));

      if (response.content[0].conteudosDinamicos) {
        setEspacoCriativo(response.content[0].conteudosDinamicos[0]);
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataValores = async () => {
    try {
      const response = await getValores();
      if (response.length === 0) return;

      setNossosValores(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataDepoimentos = async () => {
    try {
      const response = await getDepoimentos();
      if (response.length === 0) return;

      console.log(response);
      setDepoimentos(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchDataPageInfo();
    fetchDataValores();
    fetchDataDepoimentos();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return {
    banner,
    fundadoras,
    nossosValores,
    depoimentos,
    espacoCriativo,
    pageInfo,
    isLoading
  };
};

export default useSobreNos;
