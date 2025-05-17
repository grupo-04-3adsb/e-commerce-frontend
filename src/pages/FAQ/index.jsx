import { Input } from "@nextui-org/react";
import useFAQ from "./useFAQ";
import { FaSearch } from "react-icons/fa";

export const Faq = () => {
  const { perguntasFiltradas, setPesquisa } = useFAQ();

  return (
    <div className="w-full flex flex-col items-center mb-20 px-4">
      <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-extrabold text-[#333] text-center">
        FAQ
      </h1>
      <h6 className="text-[18px] md:text-[20px] lg:text-[22px] text-[#7A7A7A] text-center">
        Dúvidas frequentes e suas soluções.
      </h6>
      <div className="flex flex-col items-center mt-10 w-full max-w-[90%] md:max-w-[600px] text-left sticky top-0 bg-white z-10 p-4">
        <label
          className="text-[#52525B] text-[14px] font-medium w-full text-left"
          htmlFor="pesquisa"
        >
          Pesquise por palavras-chave de sua dúvida
        </label>
        <Input
          id="pesquisa"
          className="w-full mt-2 shadow-sm border rounded-lg"
          placeholder="Ex: frete"
          endContent={<FaSearch className="text-[#7A7A7A]" />}
          radius="sm"
          variant="bordered"
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      {perguntasFiltradas.length > 0 ? (
        <div className="mt-10 w-full max-w-[90%] md:max-w-[600px] space-y-6">
          {perguntasFiltradas.map((pergunta, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-[#444] to-[#222]  rounded-2xl p-6 border transition-all hover:shadow-xl"
            >
              <h6 className="text-[#fff] text-[16px] md:text-[18px] font-semibold">
                {pergunta.titulo}
              </h6>
              <p className="text-[#aeadad] text-[14px] mt-2">
                {pergunta.resposta}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mt-10">
          <h6 className="text-[#7A7A7A] text-[20px] md:text-[22px] font-medium">
            Nenhuma pergunta encontrada.
          </h6>
        </div>
      )}
    </div>
  );
};
