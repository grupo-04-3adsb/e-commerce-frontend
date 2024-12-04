import React, { useState, useEffect } from "react";
import styles from "./Produtos.module.css";
import bannerProdutos from "../../assets/images/banner-produtos.png";
import produtosCriancas from "../../assets/images/produtos-criancas.png";
import cadernoBanner from "../../assets/images/caderno-banner-produtos.png";
import CardProduto from "../../components/Card-produto";
import FilterComponent from "../../components/Filtro-Produto/FilterComponent";
import { getProdutos } from "../../hooks/api/produtosApi";
import { Divider } from "@nextui-org/react";

function Produtos() {
  const [produtosFiltrados, setFilteredProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);

  // Aqui poderia ter algum efeito para buscar os produtos;
  // useEffect(() => {
  //   getProdutos().then(setFilteredProducts);
  // }, []);

  return (
    <div className={styles.produtosPage}>
      <div className={styles.banner}>
        <img
          src={bannerProdutos}
          alt="Banner de Produtos"
          className={styles.bannerImage}
        />
        <div className={styles.bannerContent}>
          <h1>Aproveite Agora e Ganhe 5% OFF!</h1>
          <p>
            Não perca essa chance! Cadastre-se hoje e receba 5% de desconto na
            sua próxima compra. Aproveite para garantir seu caderno com essa
            oferta exclusiva!
          </p>
          <button className={styles.discountButton}>Quero Meu Desconto!</button>
        </div>
        <img
          src={cadernoBanner}
          alt="Caderno de Produtos"
          className={styles.cadernoImage}
        />
        <img
          src={produtosCriancas}
          alt="Crianças com produtos"
          className={styles.criancasImage}
        />
      </div>

      <div className={styles.produtosContainer}>
        <FilterComponent
          setFilteredProducts={setFilteredProducts}
          setTotalProdutos={setTotalElements}
        />
        <section className={styles.produtos}>
          <div className="flex flex-row items-end justify-between w-[95%]">
            <h2 className={styles.tituloProdutos}>Produtos</h2>
              <p
                className="text-sm text-gray-500 leading-[1.8]"
              >Exibindo {produtosFiltrados.length} produtos de {totalElements}</p>
          </div>
          <Divider orientation="horizontal" className="w-[95%] mb-3" />
          <div className={styles.produtoGrid}>
            {produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <CardProduto key={produto.id} produto={produto}></CardProduto>
              ))
            ) : (
              <p>Nenhum produto encontrado</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Produtos;
