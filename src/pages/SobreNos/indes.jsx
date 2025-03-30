import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import useSobreNos from "./useSobreNos";
import AppBreadcrumb from "../../components/CustomBreadCrumbs/BreadCrumbs";
import { FaArrowAltCircleDown } from "react-icons/fa";

export const SobreNos = () => {
  const {
    mainImage,
    mainText,
    fundadoras,
    nossosValores,
    depoimentos,
    imgEspacoCriativo,
  } = useSobreNos();

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div
        className="w-full min-h-[400px] md:h-[785px] bg-gray-300 flex justify-center items-center bg-cover bg-center flex-col relative"
        style={{ backgroundImage: `url(${mainImage})` }}
      >
        <div className="absolute top-0 left-0 p-4">
          <AppBreadcrumb isVisible={true} />
        </div>

        <Button
          className="bg-red-400 w-40 h-14 text-white shadow-sm mt-4"
          onClick={() => {
            document
              .getElementById("quem_somos")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          Quem somos?
        </Button>

        <h1 className="text-[40px] md:text-[66.17px] font-semibold text-white mt-4 text-center px-4">
          {mainText}
        </h1>
      </div>

      <div className="w-[95%] md:w-[90%] p-5 flex flex-col justify-center items-center mt-[40px] md:mt-[80px] border-b-2 border-b-black mb-4">
        <div className="font-extrabold text-[40px] md:text-[65px] flex flex-col items-center md:flex-row gap-2">
          <h1>SOBRE A</h1>
          <h1 className="text-red-400">TCAteliê</h1>
        </div>
        <p className="font-medium text-[18px] md:text-[24px] w-full md:w-[90%] text-justify mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>

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
                src={fundadora.imgUrl}
                alt="founder"
                className="w-full md:w-[474px] h-auto object-cover rounded-sm"
              />
              <div>
                <h1 className="font-extrabold text-[40px] md:text-[65px] mt-4">
                  {fundadora.nome}
                </h1>
                <p className="font-medium text-[18px] md:text-[24px] w-full md:w-[90%] text-justify mt-4">
                  {fundadora.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
                  {valor?.nome}
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
                style={{ backgroundImage: `url(${depoimento.imgUrl})` }}
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

      <div className="w-full flex flex-col justify-center items-center mt-[20px]">
        <div className="font-extrabold text-[40px] md:text-[65px] flex flex-col items-center md:flex-row gap-2">
          <h1>NOSSO ESPAÇO</h1>
          <h1 className="text-red-400">CRIATIVO</h1>
        </div>
        <p className="font-medium text-[20px] md:text-[31px] w-full md:w-[70%] text-center mt-4">
          Conheça o <span className="text-red-400">ambiente</span> onde{" "}
          <span className="text-red-400">ideias ganham</span> vida e{" "}
          <span className="text-red-400">
            cada detalhe é cuidadosamente trabalhado.
          </span>
        </p>
        <img
          src={imgEspacoCriativo}
          alt="espaco-criativo"
          className="h-auto md:h-[749px] w-full object-cover rounded-sm mt-4"
        />
      </div>
    </div>
  );
};
