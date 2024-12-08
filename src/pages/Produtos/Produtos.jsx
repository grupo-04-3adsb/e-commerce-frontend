import React, { useState, useEffect } from "react";
import bannerProdutos from "../../assets/images/banner-produtos.png";
import produtosCriancas from "../../assets/images/produtos-criancas.png";
import cadernoBanner from "../../assets/images/caderno-banner-produtos.png";
import CardProduto from "../../components/Card-produto";
import FilterComponent from "../../components/Filtro-Produto/FilterComponent";
import { Button, Divider } from "@nextui-org/react";
import CardLoading from "../../components/CardLoading";
import { FaArrowUp } from "react-icons/fa"; 

function Produtos() {
  const [produtosFiltrados, setFilteredProducts] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true); 
      } else {
        setIsVisible(false); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={bannerProdutos}
          alt="Banner de Produtos"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-10 text-center text-gray-800 px-4">
          <h1 className="text-4xl md:text-3xl sm:text-2xl font-bold mb-4">
            Aproveite Agora e Ganhe 5% OFF!
          </h1>
          <p className="text-lg md:text-base sm:text-sm mb-6">
            Não perca essa chance! Cadastre-se hoje e receba 5% de desconto na
            sua próxima compra. Aproveite para garantir seu caderno com essa
            oferta exclusiva!
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-lg transition duration-300">
            Quero Meu Desconto!
          </button>
        </div>
        <img
          src={cadernoBanner}
          alt="Caderno de Produtos"
          className="absolute bottom-0 left-0 w-[400px] opacity-80 hidden md:block"
        />
        <img
          src={produtosCriancas}
          alt="Crianças com produtos"
          className="absolute bottom-0 right-0 w-[600px] opacity-80 hidden md:block"
        />
      </div>

      <div className="w-full flex flex-col lg:flex-row px-6 py-8 gap-8">
        <div className="lg:w-1/4">
          <FilterComponent
            setFilteredProducts={setFilteredProducts}
            setTotalProdutos={setTotalElements}
            setIsLoading={setIsLoading}
          />
        </div>

        <section className="lg:w-3/4 w-full">
          <div className="flex flex-row items-end justify-between w-full mb-4 px-4">
            <h2 className="text-2xl font-semibold">Produtos</h2>
            <p className="text-sm text-gray-500">
              {isLoading
                ? "Carregando..."
                : `Exibindo ${produtosFiltrados.length} produtos de ${totalElements}`}
            </p>
          </div>

          <Divider className="my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
            {isLoading ? (
              Array(10)
                .fill(0)
                .map((_, index) => <CardLoading key={index} index={index} />)
            ) : produtosFiltrados.length > 0 ? (
              produtosFiltrados.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-600">
                Nenhum produto encontrado
              </p>
            )}
          </div>
        </section>
      </div>

      <Button
        onClick={scrollToTop}
        className={`fixed bottom-6 z-[1000] right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-opacity duration-300 ease-in-out ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp size={20} />
      </Button>
    </div>
  );
}

export default Produtos;
