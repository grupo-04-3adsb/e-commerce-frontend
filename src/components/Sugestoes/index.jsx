import { Image } from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardLoading from "../CardLoading";

const Sugestoes = ({ produtosSugeridos = [], loading = true }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    dots: false,
    centerMode: false,
    pauseOnHover: true,
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

  if (loading) {
    return (
      <div className="w-full justify-center flex flex-col items-center">
        <h4 className="text-2xl font-bold text-gray-800 mt-6 text-center">
          Produtos Sugeridos
        </h4>
        <div className="relative mt-6 w-[95%]">
          <Slider {...settings}>
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <CardLoading key={index} index={index} />
              ))}
          </Slider>
        </div>
      </div>
    );
  }

  if (!produtosSugeridos || produtosSugeridos.length === 0) {
    return (
      <div className="w-full justify-center flex flex-col items-center">
        <h4 className="text-2xl font-bold text-gray-800 mt-6 text-center">
          Produtos Sugeridos
        </h4>
        <p className="text-center text-gray-600 mt-6">
          Nenhum produto encontrado
        </p>
      </div>
    );
  }

  return (
    <div className="w-full justify-center flex flex-col items-center">
      <h4 className="text-2xl font-bold text-gray-800 mt-6 text-center">
        Produtos Sugeridos
      </h4>
      <div className="relative mt-6 w-[95%]">
        <Slider {...settings}>
          {produtosSugeridos.map((produto) => (
            <div
              key={produto.id}
              className="flex justify-center px-3"
              onClick={() =>
                (window.location.href = `/produtos/${produto.nome}`)
              }
            >
              <div className="flex-shrink-0 w-[250px] md:w-60 p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer relative">
                <Image
                  src={produto.urlProduto}
                  alt={produto.nome}
                  objectFit="cover"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h5 className="text-lg font-semibold text-gray-800 line-clamp-1">
                  {produto.nome}
                </h5>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {produto.descricao}
                </p>
                <div className="flex justify-between items-center w-full">
                  <span className="font-bold text-lg text-green-600">
                    R${produto.preco.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Sugestoes;
