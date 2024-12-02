import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Card-produto.module.css';
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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
      className={style.produto}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      <div className={style.imagemProduto}>
        <img
          src={isHovered && imagensAdicionais.length > 1 ? imagensAdicionais[imagemAtual]?.url : urlProduto}
          alt={nome}
        />
        {status && (
          <div className={style.novo}>
            <p>{status}</p>
          </div>
        )}
      </div>

      <div className={style.informacoes}>
        <h2>{nome}</h2>
        <div className={style.preco}>
          
          <span>R${precoComDesconto}</span>
          
          {desconto > 0 && (
            <span className={style.desconto}>R${preco.toFixed(2)}</span>
          )}
        </div>

        <div className={style.feedback}>
          <div className={style.avaliacao}>
            {id ? (
              <ProductRating productId={id} />
            ) : (
              <p className={style.error}>Avaliação indisponível</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduto;
