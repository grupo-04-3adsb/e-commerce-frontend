import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardImagemComponent from '../../components/ProdutoDetalhes/CardImagemComponent/CardImagemComponent';
import CardProduto from '../../components/Card-produto';
import style from './ProdutoDetalhes.module.css';
import { FaPix } from "react-icons/fa6";
import { TbShoppingCartPlus } from "react-icons/tb";
import { getProdutoByName } from '../../hooks/api/produtoEspecificoApi';

const ProdutoDetalhes = () => {
  const { productName } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await getProdutoByName(productName);
        setProduto(data);
      } catch (error) {
        console.error("Erro ao carregar o produto:", error);
        setProduto(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [productName]);

  if (loading) {
    return (
      <div className={style.carregandoContainer}>
        <div className={style.carregandoSpinner}></div>
        <div className={style.carregandoMensagem}>Carregando...</div>
      </div>
    );
  }

  if (!produto) {
    return <div>Produto não encontrado.</div>;
  }

  return (
    <div className={style.produtoDetalhesContainer}>
      <div className={style.imagensContainer}>
        <CardImagemComponent imagens={[produto.urlProduto, produto.urlProduto, ...produto.imagensAdicionais.map(img => img.url)]} nome={produto.nome} />
      </div>
      <div className={style.infoContainer}>
        <h1>{produto.nome}</h1>
        <div className={style.precoContainer}>
          <span className={style.preco}>R${produto.preco.toFixed(2)}</span>
        </div>
        <div className={style.botoesContainer}>
          <button className={style.comprarAgora}>Comprar agora</button>
          <button className={style.carrinhoIcone}>
            <TbShoppingCartPlus />
          </button>
        </div>
        <div className={style.pixContainer}>
          <p className={style.pixInfo}>Pague com Pix</p>
          <FaPix className={style.pixIcon} />
        </div>
      </div>

      <div className={style.descricaoContainer}>
        <h2>Descrição</h2>
        <p>{produto.descricao}</p>
      </div>

    </div>
  );
};

export default ProdutoDetalhes;
