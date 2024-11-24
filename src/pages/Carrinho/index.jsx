import React, { useEffect, useState } from "react";
import { BiCart, BiPencil, BiTrash } from "react-icons/bi";
import {
  Card,
  Divider,
  Button,
  Image,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import ModalGeneric from "../../components/Modal";
import useCarrinho from "../../hooks/useCarrinho";

const Carrinho = () => {
  const { carrinho, removeItem } = useCarrinho();

  const [cep, setCep] = useState("");
  const [isModalVisualizarItem, setIsModalVisualizarItem] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [quantidade, setQuantidade] = useState(1);
  const [imagemAtual, setImagemAtual] = useState(0);

  const imagensCarrossel = [
    { url: itemSelecionado?.produto.urlProduto },
    ...(itemSelecionado?.produto.imagensAdicionais || []),
  ];

  const avancarImagem = () => {
    setImagemAtual((prev) => (prev + 1) % imagensCarrossel.length);
  };

  useEffect(() => {
    const interval = setInterval(avancarImagem, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Item Selecionado:", itemSelecionado);
  }, [itemSelecionado]);

  const consultarFrete = async () => {
    console.log("Consultando frete para o CEP:", cep);
  };

  const handleRemoveItem = (item) => {
    console.log("Removendo item:", item);
    removeItem(item);
  };

  const handleVisualizarItem = (item) => {
    console.log("Visualizando item:", item);
    setItemSelecionado(item);
    setIsModalVisualizarItem(true);
  };

  const handleCloseModalVisualizarItem = () => {
    setIsModalVisualizarItem(false);
    setItemSelecionado(null);
  };

  const alterarQuantidade = (acao) => {
    setQuantidade((prev) => {
      if (acao === "incrementar") {
        return prev + 1;
      } else if (acao === "decrementar" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  return (
    <div className="w-full flex flex-col gap-8 p-8">
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
                    <strong>Preço Unitário:</strong> R${" "}
                    {itemSelecionado?.produto.preco.toFixed(2)}
                  </li>
                  <li>
                    <strong>Desconto:</strong>{" "}
                    {itemSelecionado?.produto.desconto * 100}% | R$
                    {itemSelecionado?.produto.preco *
                      itemSelecionado?.produto.desconto}
                  </li>
                  <li>
                    <strong>Valor das personalizações:</strong> R$
                    {itemSelecionado?.personalizacoes
                      .reduce(
                        (acc, personalizacao) =>
                          acc + personalizacao.opcaoPersonalizacao.acrescimo,
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
                          acc + personalizacao.opcaoPersonalizacao.acrescimo,
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
                            acc + personalizacao.opcaoPersonalizacao.acrescimo,
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
                      <>
                        <div className="flex flex-row justify-between items-end">
                          <li key={index} className="p-4 rounded-lg border">
                            <h6 className="font-semibold text-gray-700 mb-2">
                              {
                                personalizacao.personalizacao
                                  ?.nomePersonalizacao
                              }
                            </h6>
                            <p className="text-sm text-gray-600">
                              <strong>Detalhes:</strong>
                              <br />
                              Opção escolhida:{" "}
                              {personalizacao.opcaoPersonalizacao?.nomeOpcao}
                            </p>
                            {personalizacao.personalizacao
                              ?.tipoPersonalizacao === "Texto" && (
                              <p>
                                Texto Personalizado:{" "}
                                <span className="font-medium">
                                  {personalizacao.descricaoPersonalizacao}
                                </span>
                              </p>
                            )}
                            {personalizacao.personalizacao
                              ?.tipoPersonalizacao === "Imagem" && (
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
                            {personalizacao.personalizacao
                              ?.tipoPersonalizacao === "Seleção" && (
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
                                personalizacao.opcaoPersonalizacao
                                  ?.urlImagemOpcao
                              }
                              alt={
                                personalizacao.opcaoPersonalizacao?.nomeOpcao
                              }
                              width={128}
                              height={128}
                              objectFit="cover"
                              className="rounded-lg mb-5"
                            />
                          </li>
                        </div>
                        <Divider />
                      </>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-600">
                  Nenhuma personalização foi selecionada.
                </p>
              )}
            </div>
            <div className="flex  flex-col">
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
                color="primary"
                variant="bordered"
                startContent={<BiPencil size={20} />}
                onClick={() => console.log("Editar Personalização")}
              >
                Editar Personalização
              </Button>
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

      <h1 className="flex items-center gap-3 text-gray-800">
        <BiCart size={32} />
        Carrinho de Compras
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Card variant="bordered" className="w-full h-full">
            <CardHeader>
              <h3 className="text-xl font-semibold">Produtos</h3>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-4">
              {carrinho.itens.length === 0 ? (
                <div>
                  <p>
                    Nenhum item encontrado no carrinho. Adicione produtos para
                    continuar.
                  </p>
                </div>
              ) : (
                carrinho.itens.map((item, index) => (
                  <Card key={index}>
                    <CardBody className="flex flex-col overflow-hidden md:flex-row items-center gap-6">
                      <div className="w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.produto?.urlProduto}
                          alt={item.produto?.nome}
                          width="100%"
                          height="100%"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800">
                          {item.produto?.nome}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.produto?.descricao}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          Personalização:
                          <span className="font-medium">
                            {item.personalizacoes[0]?.descricaoPersonalizacao ||
                              "Nenhuma"}
                          </span>
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800 flex-col flex">
                          R${" "}
                          {item?.valorTotal ? item?.valorTotal.toFixed(2) : 0.0}{" "}
                          {item?.desconto > 0 && (
                            <span>
                              <span className="text-sm text-gray-600 line-through">
                                R${" "}
                                {(
                                  item.produto?.preco * item.quantidade
                                ).toFixed(2)}
                              </span>
                              <span className="text-sm text-green-600 ml-2">
                                -{item.desconto}%
                              </span>
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantidade:{" "}
                          <span className="font-medium">{item.quantidade}</span>
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-end gap-4">
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onClick={() => handleVisualizarItem(item)}
                      >
                        Visualizar Item
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="shadow"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remover Item
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-[35%]">
          <Card variant="flat" className="w-full bg-gray-50">
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">
                Resumo do Pedido
              </h3>
            </CardHeader>
            <Divider />
            <CardBody className="py-6">
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Subtotal:</p>
                <p className="font-bold text-gray-800">
                  R$
                  {carrinho.itens
                    .reduce((acc, item) => acc + item.valorTotal, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-700">Frete:</p>
                <p className="font-bold text-gray-800">
                  R$
                  {carrinho.itens
                    .reduce((acc, item) => acc + item.valorFrete, 0)
                    .toFixed(2)}
                </p>
              </div>
              <Divider className="my-4" />
              <div className="flex justify-between">
                <p className="text-xl font-semibold text-gray-800">Total:</p>
                <p className="text-xl font-bold text-gray-900">
                  R$
                  {carrinho.itens
                    .reduce(
                      (acc, item) => acc + item?.valorTotal + item.valorFrete,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
              <div className="mt-6">
                <Input
                  placeholder="Digite o CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className="mb-4 border-zinc-500 border-1 rounded-xl"
                  variant="flat"
                  radius="md"
                  color="primary"
                />
                <Button
                  color="primary"
                  onClick={consultarFrete}
                  className="w-full bg-[#0070F3]"
                >
                  Consultar Frete
                </Button>
              </div>
            </CardBody>
            <CardFooter>
              <Button
                color="danger"
                variant="shadow"
                className="w-full bg-[#EB6D6D]"
              >
                Finalizar Compra
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
