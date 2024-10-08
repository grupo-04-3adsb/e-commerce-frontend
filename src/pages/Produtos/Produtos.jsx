import React from 'react';
import styles from './Produtos.module.css';
import bannerProdutos from '../../assets/images/banner-produtos.png';
import produtosCriancas from '../../assets/images/produtos-criancas.png';
import cadernoBanner from '../../assets/images/caderno-banner-produtos.png'; // Adicionando o caderno
import CardProduto from '../../components/Card-produto';
import Objprodutos from '../../mock/cardProduto';

function Produtos() {
  const produtos = Object.values(Objprodutos); // Transformando os produtos em um array

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
        <img src={produtosCriancas} alt="Crianças com produtos" className={styles.criancasImage} />
        <img src={cadernoBanner} alt="Caderno no banner" className={styles.cadernoBannerImage} /> {/* Adicionando o caderno */}
      </div>

      <div className={styles.produtosContainer}>
        <aside className={styles.filtro}>
          <h3>Filtrar</h3>
          <div>
            <h4>Categorias</h4>
            <ul>
              <li>Cadernos</li>
              <li>Agendas</li>
              <li>Presentes</li>
            </ul>
          </div>

          <div>
            <h4>Preço</h4>
            <input type="range" min="10" max="500" />
          </div>

          <div>
            <h4>Avaliação</h4>
            <ul>
              <li>★★★★★</li>
              <li>★★★★☆</li>
              <li>★★★☆☆</li>
            </ul>
          </div>
        </aside>

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
