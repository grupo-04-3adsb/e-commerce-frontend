import React, { useState, useEffect } from "react";
import Produto from "../../Card-produto/index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../SectionNovidades/SectionNovidades.modules.css";
import { getProdutos } from "../../../hooks/api/produtosApi";

const ProdutosNovidade = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        console.log("Carregando produtos mais recentes...");
        const produtosDataRes = await getProdutos({
          filter: {},
          page: 0,
          size: 10,
          sort: 'id,desc'
        });

        setProdutos(produtosDataRes.content);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    dots: true,
    centerMode: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerMode: false,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bannerNovidade">
      <div className="top-card">
        <div className="today">
          <p>NOVIDADES</p>
        </div>
        <div className="ver-mais">
          <a href="#">VER MAIS</a>
        </div>
      </div>
      <div className="cards">
        {loading ? (
          <p>Carregando produtos...</p>
        ) : produtos.length > 0 ? (
          <Slider {...settings}>
            {produtos.map((produto) => (
              <Produto
                key={produto.id}
                nome={produto.nome}
                preco={produto.preco}
                desconto={produto.desconto}
                urlProduto={produto.urlProduto}
                status={produto.status || "NOVO"}
                avaliacao={produto.avaliacao || "(0)"}
                imagensAdicionais={produto.imagensAdicionais}
              />
            ))}
          </Slider>
        ) : (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default ProdutosNovidade;
