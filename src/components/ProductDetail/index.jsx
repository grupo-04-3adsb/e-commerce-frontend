import React from "react";
import { Button, Input, Divider, Tooltip, Image } from "@nextui-org/react";
import { MdArrowForwardIos } from "react-icons/md";
import { TbPlus, TbMinus, TbShoppingCartPlus } from "react-icons/tb";
import { FaPaintbrush, FaPix } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import MockedProduct from "../../components/ProdutoDetalhes/StarRatingComponent/StarRatingComponent";

const ProductDetails = ({
  produto,
  vendedor,
  quantidade,
  handleDecrementar,
  handleIncrementar,
  handleComprarAgora,
  handleAdicionarCarrinho,
  handleContatoVendedor,
  handlePersonalizacaoChange,
  personalizacoesSelecionadas,
  setIsModalCompraSeguraVisible,
  uploadedImages,
  usuario,
}) => {
  return (
    <div className="flex-1 flex flex-col p-2">
      <h1 className="text-4xl mb-2">{produto.nome}</h1>
      <MockedProduct productId={produto.id} />
      <div className="flex flex-col mb-5 gap-2">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-bold text-gray-800">
            R$
            {(
              produto.preco -
              produto.preco * (produto.desconto / 100)
            ).toFixed(2)}
          </span>
          {produto?.desconto > 0 && (
            <span className="text-sm text-gray-600 line-through mb-1">
              R${produto.preco.toFixed(2)}
            </span>
          )}
        </div>
        {produto?.desconto > 0 && (
          <span className="text-sm text-green-600 font-medium">
            Você economiza {produto.desconto}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mb-5">
        <Button
          onClick={handleDecrementar}
          size="sm"
          radius="md"
          isIconOnly={true}
          color="warning"
          variant="ghost"
        >
          <TbMinus />
        </Button>
        <Input
          type="text"
          value={quantidade}
          readOnly
          variant="bordered"
          className="w-12 text-center flex justify-center items-center"
        />
        <Button
          onClick={handleIncrementar}
          size="sm"
          radius="md"
          isIconOnly={true}
          color="success"
          className="text-slate-50"
          variant="shadow"
        >
          <TbPlus />
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Button
          className="bg-[#D57878] text-white hover:bg-[#d46a6a]"
          fullWidth={true}
          onClick={handleComprarAgora}
          isDisabled={
            produto?.isPersonalizacaoObrigatoria &&
            Object.keys(personalizacoesSelecionadas).length === 0
          }
        >
          Comprar Produto
        </Button>
        <Button
          onClick={handleAdicionarCarrinho}
          isIconOnly={true}
          color="danger"
          variant="faded"
          isDisabled={
            produto?.isPersonalizacaoObrigatoria &&
            Object.keys(personalizacoesSelecionadas).length === 0
          }
        >
          <TbShoppingCartPlus />
        </Button>
      </div>
      {produto?.isPersonalizacaoObrigatoria && (
        <p className="text-sm text-gray-600">
          Este produto requer <strong>personalização.</strong>
          Por favor, escolha <strong>ao menos uma personalização.</strong>
        </p>
      )}
      <div className="flex items-center mt-2 gap-2">
        <p className="text-sm text-black font-semibold ">Meios de pagamento: </p>
        <p className="text-sm text-gray-600"> Pague com Pix</p>
        <FaPix className="text-[#4DB6AC]" />
      </div>
      <Divider className="mt-5" orientation="horizontal" />
      <div className="pt-5">
        <div
          onClick={() => setIsModalCompraSeguraVisible(true)}
          className="flex justify-between items-center mb-3 cursor-pointer hover:bg-gray-300 p-3 rounded-md transition"
        >
          <div>
            <h3 className="font-semibold text-gray-800">
              Compra Segura e Protegida
            </h3>
            <p className="text-sm text-gray-600">Seu pedido ou seu dinheiro de volta</p>
          </div>
          <MdArrowForwardIos className="text-gray-500 text-lg" />
        </div>
        <div className="flex justify-between items-center cursor-pointer hover:bg-gray-300 p-3 rounded-md transition">
          <div>
            <h3 className="font-semibold text-gray-800">Políticas TCAteliê</h3>
            <p className="text-sm text-gray-600">Reembolso, troca e devolução</p>
          </div>
          <MdArrowForwardIos className="text-gray-500 text-lg" />
        </div>
      </div>

      {produto?.isPersonalizavel && (
        <div className="mt-5 p-5 border rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Personalize seu produto
          </h3>
          {produto?.personalizacoes.map((personalizacao) => (
            <div key={personalizacao.idPersonalizacao} className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {personalizacao.nomePersonalizacao}
              </p>
              {personalizacao.tipoPersonalizacao === "Seleção" && (
                <div className="flex items-center gap-2">
                  <select
                    className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onChange={(e) => {
                      const selectedOption = personalizacao.opcoes.find(
                        (opcao) => opcao.idOpcao === parseInt(e.target.value)
                      );
                      handlePersonalizacaoChange(
                        personalizacao,
                        selectedOption?.nomeOpcao,
                        selectedOption
                      );
                    }}
                  >
                    <option value="">Selecione uma opção</option>
                    {personalizacao.opcoes.map((opcao) => (
                      <option key={opcao.idOpcao} value={opcao.idOpcao}>
                        {opcao.nomeOpcao} (+ R$ {opcao.acrescimo.toFixed(2)})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {personalizacao.tipoPersonalizacao === "Texto" &&
                personalizacao.opcoes.map((opcao) => (
                  <Tooltip
                    key={opcao.idOpcao}
                    content={
                      <div className="flex items-center gap-2 flex-col" style={{ maxWidth: "200px" }}>
                        <div className="flex items-center gap-2">
                          <FaPaintbrush className="text-gray-600" />
                          <span className="text-gray-600 text-sm">Imagem prévia</span>
                        </div>
                        <Image
                          src={opcao?.urlImagemOpcao}
                          width={200}
                          height={200}
                          objectFit="contain"
                        />
                      </div>
                    }
                  >
                    <div className="mb-2">
                      <Input
                        label={opcao.nomeOpcao}
                        size="sm"
                        placeholder="Digite sua personalização"
                        variant="bordered"
                        onChange={(e) =>
                          handlePersonalizacaoChange(personalizacao, e.target.value, opcao)
                        }
                        fullWidth
                      />
                      {opcao.acrescimo > 0 && (
                        <p className="text-xs text-gray-500">
                          + R$ {opcao.acrescimo.toFixed(2)}
                        </p>
                      )}
                    </div>
                  </Tooltip>
                ))}
              {personalizacao.tipoPersonalizacao === "Imagem" && (
                <div className={`flex flex-col gap-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm ${!usuario ? "opacity-45" : ""}`}>
                  <h4 className="text-gray-800 font-medium">Envie suas imagens:</h4>
                  {personalizacao.opcoes.map((opcao) => (
                    <div key={opcao.idOpcao} className="flex flex-col gap-3">
                      <Tooltip
                        content={
                          <div className="flex items-center gap-2 flex-col" style={{ maxWidth: "200px" }}>
                            <div className="flex items-center gap-2">
                              <FaPaintbrush className="text-gray-600" />
                              <span className="text-gray-600 text-sm">Imagem prévia</span>
                            </div>
                            <Image
                              src={opcao?.urlImagemOpcao}
                              width={200}
                              height={200}
                              objectFit="contain"
                            />
                          </div>
                        }
                      >
                        <label
                          htmlFor={`upload-${opcao.idOpcao}`}
                          className={`flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition ${!usuario ? "cursor-default" : "cursor-pointer"}`}
                        >
                          <span className="text-gray-600 text-sm mb-2">
                            {opcao.nomeOpcao}{" "}
                            {opcao.acrescimo > 0 && (
                              <span className="text-xs text-green-600 font-medium">
                                (+ R$ {opcao.acrescimo.toFixed(2)})
                              </span>
                            )}
                          </span>
                          <input
                            disabled={!usuario}
                            id={`upload-${opcao.idOpcao}`}
                            type="file"
                            accept="image/png, image/jpeg"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const fileReader = new FileReader();
                                fileReader.onload = () => {
                                  handlePersonalizacaoChange(
                                    personalizacao,
                                    file,
                                    opcao,
                                    fileReader.result,
                                    file
                                  );
                                };
                                fileReader.readAsDataURL(file);
                              }
                            }}
                          />
                          {!usuario && (
                            <span className="text-lg font-extrabold text-gray-950">
                              Faça login para enviar imagens
                            </span>
                          )}
                        </label>
                      </Tooltip>
                      {uploadedImages[opcao.idOpcao] && (
                        <div className="flex justify-center mt-4">
                          <img
                            src={uploadedImages[opcao.idOpcao]}
                            alt="Pré-visualização"
                            className="w-32 h-32 object-contain border border-gray-300 rounded-lg"
                          />
                        </div>
                      )}
                      <p className="text-xs text-gray-500">Suporte para formatos JPG e PNG.</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <ul className="text-sm text-gray-600">
            <li>O valor final do produto pode variar de acordo com as opções de personalização escolhidas.</li>
            <li>O prazo de entrega pode variar de acordo com as opções de personalização escolhidas.</li>
            <li>O acréscimo das opções não sofre influência de descontos.</li>
          </ul>
        </div>
      )}

      <div className="mt-2 p-5 border rounded-lg shadow-sm">
        <h2 className="text-lg font-bold mb-3 text-slate-600">Contate o Vendedor</h2>
        <div className="mb-3">
          <p className="text-sm text-gray-800">
            <strong>Nome:</strong> {vendedor.nome}
          </p>
          <p className="text-sm text-gray-800">
            <strong>WhatsApp:</strong> {vendedor.whatsapp}
          </p>
          <p className="text-sm text-gray-800">
            <strong>Localização:</strong> Diadema - SP
          </p>
        </div>
        <Button
          onClick={handleContatoVendedor}
          className="mt-3 bg-green-600 text-white flex items-center gap-2 py-2 px-4 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105 shadow-sm"
          fullWidth={true}
        >
          <FaWhatsapp className="text-lg" />
          Iniciar Conversa
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;