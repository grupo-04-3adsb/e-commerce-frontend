import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import StarRating from "./StarComponent";
import { getAvaliacoesPorProduto } from "../../../hooks/api/avaliacaoApi";
import { formatarISOParaDataHora } from "../../../utils/DateFormat";

export default function AvaliacaoComponent({ produtoId }) {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const dados = await getAvaliacoesPorProduto(produtoId);
        setAvaliacoes(dados);
      } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
      }
    };

    fetchAvaliacoes();
  }, [produtoId]);

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl text-left w-full font-semibold mb-4 text-gray-800">
        Avaliações do Produto
      </h2>
      {avaliacoes.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {avaliacoes.map((avaliacao, index) => (
            <Card
              key={index}
              className="w-full sm:w-[300px] md:w-[350px] lg:w-[250px] shadow-md"
            >
              <CardHeader className="flex items-center gap-3">
                <Image
                  alt="Avatar do usuário"
                  height={40}
                  radius="sm"
                  src={avaliacao?.usuario?.imgUrl || "https://via.placeholder.com/150"}
                  width={40}
                />
                <div>
                  <p className="text-md font-medium text-gray-800">
                    {avaliacao.nomeUsuario || "Usuário Anônimo"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatarISOParaDataHora(avaliacao.dataAvaliacao) || "Data não informada"}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  {avaliacao.titulo || "Sem título"}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {avaliacao.descricao || "Sem descrição"}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-700">
                    <strong>Nota:</strong> {avaliacao.nota || 0}
                  </p>
                  <StarRating rating={avaliacao.nota || 0} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center mt-5">
          Ainda não há avaliações para este produto. Seja o primeiro a avaliar!
        </p>
      )}
    </div>
  );
}
