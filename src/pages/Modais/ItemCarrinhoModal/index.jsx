import React, { useEffect } from "react";
import ModalGeneric from "../../../components/Modal";
import { Button, Divider, Image } from "@nextui-org/react";
import { BiPencil, BiTrash } from "react-icons/bi";

const ItemCarrinhoModal = ({
  isModalVisualizarItem,
  handleCloseModalVisualizarItem,
  itemSelecionado,
  imagensCarrossel,
  imagemAtual,
  setImagemAtual,
  avancarImagem,
  quantidade,
  alterarQuantidade,
  handleRemoveItem,
  setQuantidade,
}) => {
  useEffect(() => {
    if (itemSelecionado) {
      setQuantidade(itemSelecionado.quantidade);
    }
  });

  return (
    <ModalGeneric
      isVisible={isModalVisualizarItem}
      onClose={handleCloseModalVisualizarItem}
      size="3xl"
      posicao={"top"}
      title={`Detalhes do Produto: ${itemSelecionado?.produto.nome}`}
      body={
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0 w-full md:w-64 h-full overflow-hidden">
              <Image
                src={
                  imagensCarrossel[imagemAtual]?.url ||
                  itemSelecionado?.produto.urlProduto
                }
                alt={`Imagem ${imagemAtual + 1}`}
                width={256}
                height={256}
                objectFit="cover"
                className="rounded-lg"
                onClick={() => avancarImagem()}
              />
              <div className="flex justify-center mt-2 gap-2">
                {imagensCarrossel.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImagemAtual(idx)}
                    className={`w-3 h-3 rounded-full ${
                      imagemAtual === idx ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-lg font-semibold text-gray-800 mb-4">
                Informações do Produto
              </h5>
              <div className="mb-6">
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {itemSelecionado?.produto.nome}
                </h4>
                <p className="text-gray-600">
                  {itemSelecionado?.produto.descricao}
                </p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>SKU:</strong> {itemSelecionado?.produto.sku}
                </li>
                <li>
                  <strong>Dimensões:</strong>{" "}
                  {itemSelecionado?.produto.dimensao}
                </li>
                <li>
                  <strong>Peso:</strong> {itemSelecionado?.produto.peso} kg
                </li>
                <li>
                  <strong>Quantidade:</strong>
                  <span>{quantidade}</span>
                </li>
                <li>
                  <strong>Preço Unitário:</strong> R${" "}
                  {itemSelecionado?.produto.preco.toFixed(2)}
                </li>
                <li>
                  <strong>Desconto:</strong> {itemSelecionado?.produto.desconto}
                  % | R$
                  {itemSelecionado?.produto.preco -
                    (
                      (itemSelecionado?.produto.desconto *
                        itemSelecionado?.produto.preco) /
                      100
                    ).toFixed(2)}
                </li>
                <li>
                  <strong>Valor das personalizações:</strong> R$
                  {itemSelecionado?.personalizacoes
                    .reduce(
                      (acc, personalizacao) =>
                        acc + personalizacao?.opcaoPersonalizacao?.acrescimo,
                      0
                    )
                    .toFixed(2)}
                </li>
                <li>
                  <strong>Preço Final:</strong> R${" "}
                  {(
                    itemSelecionado?.produto.preco -
                    itemSelecionado?.produto.preco *
                      (itemSelecionado?.produto.desconto / 100) +
                    itemSelecionado?.personalizacoes.reduce(
                      (acc, personalizacao) =>
                        acc + personalizacao?.opcaoPersonalizacao?.acrescimo,
                      0
                    )
                  ).toFixed(2)}
                </li>
                <li>
                  <strong>Preço Total:</strong> R$
                  {(
                    (itemSelecionado?.produto.preco -
                      itemSelecionado?.produto.preco *
                        (itemSelecionado?.produto.desconto / 100) +
                      itemSelecionado?.personalizacoes.reduce(
                        (acc, personalizacao) =>
                          acc + personalizacao?.opcaoPersonalizacao?.acrescimo,
                        0
                      )) *
                    quantidade
                  ).toFixed(2)}
                </li>
              </ul>
            </div>
          </div>
          <Divider />
          <div>
            <h5 className="text-lg font-semibold text-gray-800 mb-4">
              Personalizações Escolhidas
            </h5>
            {itemSelecionado?.personalizacoes.length > 0 ? (
              <ul className="space-y-4">
                {itemSelecionado?.personalizacoes.map(
                  (personalizacao, index) => (
                    <div key={index}>
                      <div className="flex flex-row justify-between items-end">
                        <li className="p-4 rounded-lg border">
                          <h6 className="font-semibold text-gray-700 mb-2">
                            {personalizacao.personalizacao?.nomePersonalizacao}
                          </h6>
                          <p className="text-sm text-gray-600">
                            <strong>Detalhes:</strong>
                            <br />
                            Opção escolhida:{" "}
                            {personalizacao.opcaoPersonalizacao?.nomeOpcao}
                          </p>
                          {personalizacao.personalizacao?.tipoPersonalizacao ===
                            "Texto" && (
                            <p>
                              Texto Personalizado:{" "}
                              <span className="font-medium">
                                {personalizacao.descricaoPersonalizacao}
                              </span>
                            </p>
                          )}
                          {personalizacao.personalizacao?.tipoPersonalizacao ===
                            "Imagem" && (
                            <div>
                              <p>Imagem Personalizada:</p>
                              <Image
                                src={personalizacao.descricaoPersonalizacao}
                                alt="Imagem Personalizada"
                                width={128}
                                height={128}
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            </div>
                          )}
                          {personalizacao.personalizacao?.tipoPersonalizacao ===
                            "Seleção" && (
                            <div>
                              <p>Opção Escolhida:</p>
                              <p className="font-medium">
                                {personalizacao.descricaoPersonalizacao}
                              </p>
                            </div>
                          )}
                          <p className="text-sm text-gray-600">
                            <strong>Custo Adicional:</strong> R${" "}
                            {parseFloat(
                              personalizacao.opcaoPersonalizacao?.acrescimo
                            ).toFixed(2) || "0.00"}
                          </p>
                        </li>
                        <li>
                          <Image
                            src={
                              personalizacao.opcaoPersonalizacao?.urlImagemOpcao
                            }
                            alt={personalizacao.opcaoPersonalizacao?.nomeOpcao}
                            width={128}
                            height={128}
                            objectFit="cover"
                            className="rounded-lg mb-5"
                          />
                        </li>
                      </div>
                      <Divider />
                    </div>
                  )
                )}
              </ul>
            ) : (
              <p className="text-gray-600">
                Nenhuma personalização foi selecionada.
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <h5 className="text-lg font-semibold text-gray-800 mb-4">
              Quantidade
            </h5>
            <div className="flex items-center gap-2">
              <button
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all shadow-md"
                onClick={() => alterarQuantidade("decrementar")}
              >
                -
              </button>
              <span className="px-4 py-2 bg-white border rounded-lg shadow-md text-gray-800">
                {quantidade}
              </span>
              <button
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all shadow-md"
                onClick={() => alterarQuantidade("incrementar")}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              size="sm"
              variant="solid"
              className="bg-[#EB6D6D] text-white"
              startContent={<BiTrash size={20} />}
              onClick={() => handleRemoveItem(itemSelecionado)}
            >
              Remover Item
            </Button>
          </div>
        </div>
      }
    />
  );
};

export default ItemCarrinhoModal;
