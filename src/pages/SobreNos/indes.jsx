import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import useSobreNos from "./useSobreNos";
import AppBreadcrumb from "../../components/CustomBreadCrumbs/BreadCrumbs";
import { FaArrowAltCircleDown } from "react-icons/fa";

export const SobreNos = () => {
  const {
    espacoCriativo,
    fundadoras,
    nossosValores,
    depoimentos,
    pageInfo,
    banner,
    isLoading
  } = useSobreNos();

  if (isLoading) {
    return <div className="w-full min-h-screen flex flex-col items-center justify-center content-center">
      <Spinner
        color="danger"
        size="lg"
        label="Carregando..."
      />
    </div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div
        className="w-full min-h-[400px] md:h-[785px] bg-gray-300 flex justify-center items-center bg-cover bg-center flex-col relative"
        style={{ backgroundImage: `url(${banner?.imagem})` }}
      >
        <div className="absolute top-0 left-0 p-4">
          <AppBreadcrumb isVisible={true} />
        </div>

        {banner?.buttonLink && (
          <Button
            className="bg-red-400 w-40 h-14 text-white shadow-sm mt-4"
            onClick={() => {
              window.location.href = banner?.buttonLink;
            }}
          >
            {banner?.buttonText}
          </Button>
        )}

        <h1 className="text-[40px] md:text-[66.17px] font-semibold text-white mt-4 text-center px-4">
          {banner?.titulo}
        </h1>
        <p className="text-[18px] md:text-[24px] font-medium text-white mt-4 text-center px-4">
          {banner?.descricao}
        </p>
      </div>

      <div className="w-[95%] md:w-[90%] p-5 flex flex-col justify-center items-center mt-[40px] md:mt-[80px] border-b-2 border-b-black mb-4">
        <div className="font-extrabold text-[40px] md:text-[65px] flex flex-col items-center md:flex-row gap-2">
          {pageInfo?.titulo}
        </div>
        <p className="font-medium text-[18px] md:text-[24px] w-full md:w-[90%] text-justify mt-4">
          {pageInfo?.descricao}
        </p>
      </div>

      {fundadoras.length > 0 && (
        <div
          id="quem_somos"
          className="w-[95%] md:w-[90%] p-5 flex flex-col justify-center items-center border-b-2 border-b-black mb-4"
        >
          <div className="font-extrabold text-[40px] md:text-[65px] w-full md:w-[90%] flex flex-col gap-2 text-left">
            <h1>FUNDADORAS</h1>
            {fundadoras.map((fundadora, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-5 md:gap-10 mb-8 md:mb-12 ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <img
                  src={fundadora.imagens[0]}
                  alt="founder"
                  className="w-[400px] h-[400px] object-cover rounded-sm"
                />
                <div>
                  <h1 className="font-extrabold text-[40px] md:text-[65px] mt-4">
                    {fundadora.titulo}
                  </h1>
                  <p className="font-medium text-[18px] md:text-[24px] w-full md:w-[90%] text-justify mt-4">
                    {fundadora.descricao}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {nossosValores.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#D57878] to-[#C15757] h-auto md:h-[200px] mt-10 shadow-2xl overflow-hidden p-4">
          <h1 className="text-white text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-xl text-center">
            Em que acreditamos?
          </h1>

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                endContent={<FaArrowAltCircleDown />}
                className="w-[90%] md:w-[800px] bg-[#E99E9E] text-white text-xl font-bold py-4 px-8 rounded-3xl shadow-xl hover:bg-[#D57878] transition duration-300 ease-in-out transform hover:scale-105"
              >
                Nossos valores
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Descrição dos valores" variant="faded">
              {nossosValores.map((valor, index) => (
                <DropdownItem
                  key={index}
                  description={valor?.descricao}
                  showDivider={true}
                  className="hover:bg-[#D57878] text-[#D57878] text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 cursor-default"
                >
                  {valor?.titulo}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      )}

      {depoimentos.length > 0 && (
        <div className="py-16 flex flex-col items-center w-[95%] md:w-[90%] border-b-2 border-b-black">
          <h2 className="text-3xl md:text-4xl text-center mb-10 font-bold">
            Depoimentos
          </h2>

          <div className="w-full overflow-x-auto flex space-x-4 md:space-x-8 pb-4">
            {depoimentos.map((depoimento, index) => (
              <div
                key={index}
                className="w-[280px] md:w-[327px] h-[400px] md:h-[499px] bg-cover bg-center rounded-lg shadow-lg relative flex-shrink-0"
                style={{ backgroundImage: `url(${depoimento.imagem})` }}
              >
                <div className="absolute inset-0 bg-black flex justify-center items-center text-center opacity-0 hover:opacity-70 transition-opacity duration-300 p-4 rounded-lg">
                  <div className="text-white">
                    <h3 className="text-lg md:text-xl font-bold">
                      {depoimento.nome}
                    </h3>
                    <p className="text-sm mt-2">{depoimento.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {espacoCriativo && (
        <div className="w-full flex flex-col justify-center items-center mt-[20px]">
          <div className="font-extrabold text-[40px] md:text-[65px] flex flex-col items-center md:flex-row gap-2">
            <h1>{espacoCriativo.titulo}</h1>
          </div>
          <p className="font-medium text-[20px] md:text-[31px] w-full md:w-[70%] text-center mt-4">
            {espacoCriativo.descricao}
          </p>
          <img
            src={espacoCriativo.imagens}
            alt="espaco-criativo"
            className="h-auto md:h-[749px] w-full object-cover rounded-sm mt-4"
          />
        </div>
      )}
    </div>
  );
};
