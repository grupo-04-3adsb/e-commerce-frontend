import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Divider, Image } from "@nextui-org/react";
import { getAvaliacoesPorProduto } from '../../../hooks/api/avaliacaoApi';

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
    <div className="avaliacoes flex flex-wrap gap-4">
      {avaliacoes.length > 0 ? (
        avaliacoes.map((avaliacao, index) => (
          <Card key={index} className="w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px]">
            <CardHeader className="flex gap-3">
              <Image
                alt="Avatar"
                height={40}
                radius="sm"
                src={avaliacao.avatarUrl || "https://via.placeholder.com/150"}
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{avaliacao.nomeUsuario}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <h4>{avaliacao.titulo}</h4>
              <p>{avaliacao.descricao}</p>
              <p><strong>Nota:</strong> {avaliacao.nota}</p>
            </CardBody>
            <Divider />
          </Card>
        ))
      ) : (
        <p>Não há avaliações disponíveis.</p>
      )}
    </div>
  );
}
