import React from 'react';
import style from './Card-produto.module.css'; 
import star from '../../assets/images/star.png';
import like from '../../assets/images/heart.png';

const CardProduto = ({ nome, preco, desconto, urlProduto, status, avaliacao, imagensAdicionais }) => {
  return (
    <div className={style["produto"]}>
      <div className={style["imagemProduto"]}>
        <img src={urlProduto} alt={nome} />
        <div className={style["novo"]}>
          <p>{status}</p>
        </div>
      </div>
      <div className={style["informacoes"]}>
        <h2>{nome}</h2>
        <div className={style["preco"]}>
          <span>R${preco}</span>
          <span className={style["desconto"]}>R${desconto}</span>
        </div>
        <div className={style["feedback"]}>
          <div className={style["avaliacao"]}>
            <div className={style["estrelas"]}>
              {Array(5).fill().map((_, index) => (
                <img key={index} src={star} alt="Star" />
              ))}
            </div>
            <div className={style["qtdAvaliacao"]}>
              <span>{avaliacao}</span>
            </div>
          </div>
          <div className={style["acoes"]}>
            <img src={like} alt="Like" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProduto;
