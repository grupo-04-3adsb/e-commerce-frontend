import { Button, Image } from "@nextui-org/react";
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sugestoes = ({ produtosSugeridos = [] }) => {
  const produtosRef = useRef(null);

  const handleNext = () => {
    if (produtosRef.current) {
      produtosRef.current.scrollBy({
        left: 320,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (produtosRef.current) {
      produtosRef.current.scrollBy({
        left: -320,
        behavior: "smooth",
      });
    }
  };

  return (
    produtosSugeridos.length > 0 && (
      <div className="w-full">
        <h4 className="text-2xl font-bold text-gray-800 mt-6 text-center">
          Produtos Sugeridos
        </h4>
        <div className="relative flex items-center justify-center mt-6">
          <Button
            onClick={handlePrev}
            className="absolute left-0 z-50"
            isIconOnly={true}
            size="sm"
            radius="full"
            color="primary"
          >
            <FaArrowLeft />
          </Button>
          <div
            ref={produtosRef}
            className="flex gap-6 overflow-hidden w-full px-4 py-2 md:px-0 justify-start"
          >
            {produtosSugeridos.map((produto) => (
              <div
                key={produto.id}
                className="flex-shrink-0 w-[250px] md:w-60 p-4 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer relative"
                onClick={() =>
                  (window.location.href = `/produtos/${produto.nome}`)
                }
              >
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
            ))}
          </div>
          <Button
            onClick={handleNext}
            className="absolute right-0 z-50"
            isIconOnly={true}
            radius="full"
            size="sm"
            color="primary"
          >
            <FaArrowRight />
          </Button>
        </div>
      </div>
    )
  );
};

export default Sugestoes;
