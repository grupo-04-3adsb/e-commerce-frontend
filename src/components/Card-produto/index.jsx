import React, { useState } from 'react';

import style from '../Card-produto/Card-produto.module.css'; 
import Objprodutos from '../../mock/cardProduto';
import imagem from '../../assets/images/image 14.png';

const Produto = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (value) => {
      setRating(value);
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRating(i)}
          className={i <= rating ? 'star active' : 'star'}
        >
          ★
        </span>
      );
    }

  return (
    <div className={style["produto"]}>
      <div className={style["imagemProduto"]}>
        <img src={imagem} alt="" />
          <div className={style["novo"]}>
            <p>{Objprodutos.produto1.status}</p>
          </div>
      </div>
      <div className={style["informacoes"]}>
          <h2>{Objprodutos.produto1.nome}</h2>
          <div className={style["preco"]}>
            <span>R${Objprodutos.produto1.preco}</span>
            <span className={style["desconto"]}>R${Objprodutos.produto1.desconto}</span>
          </div>
        <div className={style["feedback"]}>
            <div className={style["avaliacao"]}>
              <button>{stars}</button>
                <div className={style["qtdAvaliacao"]}>
                  <span>{Objprodutos.produto1.avaliacao}</span>
                </div>
            </div>
            <div className={style["acoes"]}>
              <button>♥</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Produto;