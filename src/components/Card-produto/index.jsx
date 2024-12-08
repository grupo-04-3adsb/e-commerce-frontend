import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductRating from '../../components/ProdutoDetalhes/StarRatingComponent/StarRatingComponent';

const CardProduto = ({ produto }) => {
  const { id, nome, preco, desconto, urlProduto, status, imagensAdicionais } = produto;
  const [imagemAtual, setImagemAtual] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const trocarImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagensAdicionais.length);
  };

  useEffect(() => {
    if (isHovered && imagensAdicionais.length > 1) {
      const idInterval = setInterval(trocarImagem, 3000);
      setIntervalId(idInterval);

      return () => clearInterval(idInterval);
    }
  }, [isHovered, imagensAdicionais]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/produtos/${nome}`);
  };

  const precoComDesconto = desconto > 0 
    ? (preco - preco * (desconto / 100)).toFixed(2)
    : preco.toFixed(2);

  return (
    <div
      className=" rounded-lg p-4 transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-[230px] bg-gray-200">
        <img
          src={isHovered && imagensAdicionais.length > 1 ? imagensAdicionais[imagemAtual]?.url : urlProduto}
          alt={nome}
          className="w-full h-full object-cover"
        />
        {status && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs">
            {status}
          </div>
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-800">{nome}</h2>
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-500 font-bold text-xl">R${precoComDesconto}</span>
          {desconto > 0 && (
            <span className="text-gray-500 line-through">R${preco.toFixed(2)}</span>
          )}
        </div>

        <div className="flex items-center mt-2">
          {id ? (
            <ProductRating productId={id} />
          ) : (
            <p className="text-sm text-gray-500">Avaliação indisponível</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
