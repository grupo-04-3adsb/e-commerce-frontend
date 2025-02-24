import "../SectionProdutosMaisVendidos/SectionProdutosMaisVendidos.modules.css";
import React, { useState, useEffect } from "react";
import Produto from "../../Card-produto";
import { getProdutos } from "../../../hooks/api/produtosApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import CardLoading from "../../CardLoading";

const ProdutosMaisVendidos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const produtosDataRes = await getProdutos({
          filter: { popular: true },
          page: 0,
          size: 10,
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
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    dots: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-[90%] my-2 max-w-full px-4 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col items-start">
          <p className="text-red-600 text-2xl font-semibold mb-2">
            OS MELHORES
          </p>
          <div className="w-16 h-1 bg-red-600 rounded-full"></div>
        </div>
        <div className="text-right">
          <Button
            color="primary"
            variant="bordered"
            size="md"
            startContent={<FaEye />}
            onClick={() => (window.location.href = "/produtos")}
          >
            Ver mais
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-center items-center px-5 flex-wrap">
        {loading ? (
          <Slider {...settings}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <CardLoading key={index} index={index} />
              ))}
          </Slider>
        ) : produtos.length > 0 ? (
          <Slider {...settings}>
            {produtos.map((produto) => (
              <div className="flex justify-center px-3" key={produto.id}>
                <Produto produto={produto} />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-600">Nenhum produto encontrado</p>
        )}
      </div>
    </div>
  );
};

export default ProdutosMaisVendidos;
