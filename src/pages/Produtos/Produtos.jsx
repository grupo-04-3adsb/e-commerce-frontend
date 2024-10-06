import React from 'react';
import styles from './Produtos.module.css';
import bannerProdutos from '../../assets/images/banner-produtos.png';
import produtosCriancas from '../../assets/images/produtos-criancas.png';
import CardProduto from '../../components/Card-produto';

function Produtos() {
  return (
    <div className={styles.produtosPage}>
      <div className={styles.banner}>
        <img src={bannerProdutos} alt="Banner de Produtos" className={styles.bannerImage} />
        <div className={styles.bannerContent}>
          <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus quis eleifend luctus.
            Etiam quis viverra augue. Nulla scelerisque.
          </p>
          <button className={styles.discountButton}>5% de desconto na compra do caderno</button>
        </div>
        <img src={produtosCriancas} alt="Crianças com produtos" className={styles.criancasImage} />
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
            {Array.from({ length: 20 }).map((_, index) => (
              <CardProduto
                key={index}
                nome={`Caderno Inteligente - Verde ${index + 1}`}
                preco="R$ 50,00"
                desconto={index % 2 === 0 ? "20%" : "10%"}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Produtos;
