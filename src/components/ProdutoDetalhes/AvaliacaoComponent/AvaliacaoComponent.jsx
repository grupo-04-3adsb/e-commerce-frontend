import React, { useEffect, useState } from 'react';
import { getAvaliacoesPorProduto } from '../../../hooks/api/avaliacaoApi'; // Corrija o caminho conforme necessário

const AvaliacaoComponent = ({ produtoId }) => {
  const [avaliacoes, setAvaliacoes] = useState([]);

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const dados = await getAvaliacoesPorProduto(produtoId);
      setAvaliacoes(dados);
    };

    fetchAvaliacoes();
  }, [produtoId]);

  return (
    <div className="avaliacoes">
      <h3>Avaliações</h3>
      {avaliacoes.length > 0 ? (
        <ul>
          {avaliacoes.map((avaliacao, index) => (
            <li key={index} className="avaliacao">
              <strong>{avaliacao.titulo}</strong>
              <p>{avaliacao.descricao}</p>
              <p><strong>Nota:</strong> {avaliacao.nota}</p>
              <p><em>Por: {avaliacao.nomeUsuario}</em></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há avaliações disponíveis.</p>
      )}
    </div>
  );
};

export default AvaliacaoComponent;
