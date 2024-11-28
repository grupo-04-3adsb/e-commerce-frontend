import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Card-produto.module.css';
import ProductRating from '../../components/ProdutoDetalhes/StarRatingComponent/StarRatingComponent';

const CardProduto = ({ produto }) => {
  const { id, nome, preco, desconto, urlProduto, status } = produto;
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/produtos/${nome}`);
  };

  return (
    <div className={style.produto} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={style.imagemProduto}>
        <img src={urlProduto} alt={nome} />
        {status && (
          <div className={style.novo}>
            <p>{status}</p>
          </div>
        )}
      </div>

      <div className={style.informacoes}>
        <h2>{nome}</h2>
        <div className={style.preco}>
          <span>R${(preco - preco * (desconto / 100)).toFixed(2)}</span>
          <span className={style.desconto}>R${preco.toFixed(2)}</span>
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
