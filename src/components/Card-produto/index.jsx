import Objprodutos from '../../mock/cardProduto';
import imagem from '../../assets/images/image 14.png';
import star from '../../assets/images/star.png';
import like from '../../assets/images/heart.png';
import style from '../Card-produto/Card-produto.module.css'; 

const Produto = () => {

  return (
    <div className={style["produto"]}>
          <div className={style["novo"]}>
            <p>{Objprodutos.produto1.status}</p>
          </div>
      <div className={style["imagemProduto"]}>
        <img src={imagem} alt="" />
      </div>
      <div className={style["informacoes"]}>
          <h2>{Objprodutos.produto1.nome}</h2>
          <div className={style["preco"]}>
            <span>R${Objprodutos.produto1.preco}</span>
            <span className={style["desconto"]}>R${Objprodutos.produto1.desconto}</span>
          </div>
        <div className={style["feedback"]}>
            <div className={style["avaliacao"]}>
              <div className={style["estrelas"]}>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>
                <div className={style["qtdAvaliacao"]}>
                  <span>{Objprodutos.produto1.avaliacao}</span>
                </div>
            </div>
            <div className={style["acoes"]}>
              <img src={like} alt="" />
            </div>
        </div>  
      </div>
    </div>
  );
}

export default Produto;