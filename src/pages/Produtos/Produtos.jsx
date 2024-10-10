import React from 'react';
import styles from './Produtos.module.css';
import bannerProdutos from '../../assets/images/banner-produtos.png';
import produtosCriancas from '../../assets/images/produtos-criancas.png';
import cadernoBanner from '../../assets/images/caderno-banner-produtos.png';
import CardProduto from '../../components/Card-produto';
import FilterComponent from '../../components/Filtro-Produto/FilterComponent';
import Objprodutos from '../../mock/cardProduto';

function Produtos() {
  const produtos = Object.values(Objprodutos);

  return (
    <div className={styles.produtosPage}>
      <div className={styles.banner}>
        <img src={bannerProdutos} alt="Banner de Produtos" className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          <h1>Aproveite Agora e Ganhe 5% OFF!</h1>
          <p>
            Não perca essa chance! Cadastre-se hoje e receba 5% de desconto na sua próxima compra. Aproveite para garantir seu caderno com essa oferta exclusiva!
          </p>
          <button className={styles.discountButton}>Quero Meu Desconto!</button>
        </div>
        <img src={cadernoBanner} alt="Caderno de Produtos" className={styles.cadernoImage} />
        <img src={produtosCriancas} alt="Crianças com produtos" className={styles.criancasImage} />
      </div>

      <div className={styles.produtosContainer}>
        <FilterComponent />
        <section className={styles.produtos}>
          <h2>Produtos</h2>
          <div className={styles.produtoGrid}>
            {produtos.map(produto => (
              <CardProduto
                key={produto.id}
                nome={produto.nome}
                preco={`R$ ${produto.preco}`}
                desconto={produto.desconto}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Produtos;
