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
import useCarrinho from "../../hooks/useCarrinho";
import ItemCarrinhoModal from "../Modais/ItemCarrinhoModal";
import { FaEye } from "react-icons/fa6";

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
      <ItemCarrinhoModal
        alterarQuantidade={alterarQuantidade}
        avancarImagem={avancarImagem}
        handleCloseModalVisualizarItem={handleCloseModalVisualizarItem}
        handleRemoveItem={handleRemoveItem}
        imagemAtual={imagemAtual}
        imagensCarrossel={imagensCarrossel}
        isModalVisualizarItem={isModalVisualizarItem}
        itemSelecionado={itemSelecionado}
        quantidade={quantidade}
        setImagemAtual={setImagemAtual}
        setQuantidade={setQuantidade}
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
                <CardBody className="flex flex-col items-center justify-center gap-6">
                  <div className="text-center items-center justify-center flex flex-col">
                    <BiCart size={64} className="text-gray-400" />
                    <h3 className="text-xl font-semibold text-gray-700 mt-4">
                      Seu carrinho está vazio!
                    </h3>
                    <p className="text-gray-600">
                      Adicione itens ao carrinho para visualizar aqui.
                    </p>
                  </div>
                  <Button
                    size="lg"
                    color="primary"
                    variant="solid"
                    className="bg-blue-500 text-white"
                    onClick={() => {
                      window.location.href = "/produtos";
                    }}
                  >
                    Ir para Produtos
                  </Button>
                </CardBody>
              ) : (
                carrinho.itens.map((item, index) => (
                  <Card
                    key={index}
                    className="shadow-md border rounded-xl p-6 transition-transform transform hover:scale-[1.02] bg-white"
                  >
                    <CardBody className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-28 h-28 flex-shrink-0">
                        <Image
                          src={item.produto?.urlProduto}
                          alt={item.produto?.nome}
                          width={112}
                          height={112}
                          objectFit="cover"
                          className="rounded-lg border"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900">
                          {item.produto?.nome}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.produto?.descricao}
                        </p>
                        <p className="text-sm text-gray-700 mt-3">
                          <strong>Personalizações:</strong>{" "}
                          <span className="font-medium">
                            {item.personalizacoes.length || "Nenhuma"}
                          </span>
                          {item.personalizacoes.length > 0 && (
                            <span className="ml-2 text-sm text-gray-600">
                              +R$
                              {(
                                item.personalizacoes.reduce(
                                  (acc, p) =>
                                    acc + p?.opcaoPersonalizacao?.acrescimo,
                                  0
                                ) * item.quantidade
                              ).toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-800">
                          R${" "}
                          {item?.valorTotal
                            ? item?.valorTotal.toFixed(2)
                            : "0.00"}
                        </p>
                        {item?.desconto > 0 && (
                          <p className="text-sm text-green-500 text-right mt-1">
                            <span className="line-through text-gray-500">
                              R$
                              {(item.produto?.preco * item.quantidade).toFixed(
                                2
                              )}
                            </span>
                            <span className="ml-2">-{item.desconto}%</span>
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Final com personalizações:</strong>{" "}
                          <span className="font-medium text-gray-900">
                            R${" "}
                            {(
                              item.valorTotal +
                              item.personalizacoes.reduce(
                                (acc, p) =>
                                  acc + p?.opcaoPersonalizacao?.acrescimo,
                                0
                              ) *
                                item.quantidade
                            ).toFixed(2)}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Quantidade:</strong>{" "}
                          <span className="font-medium">{item.quantidade}</span>
                        </p>
                      </div>
                    </CardBody>
                    <CardFooter className="flex justify-between items-center mt-4 border-t pt-4">
                      <Button
                        size="sm"
                        color="primary"
                        variant="ghost"
                        onClick={() => handleVisualizarItem(item)}
                        className="flex items-center gap-2 hover:text-blue-600"
                      >
                        <FaEye className="text-lg" />
                        Visualizar
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        variant="solid"
                        onClick={() => handleRemoveItem(item)}
                        className="flex items-center gap-2 hover:bg-red-500"
                      >
                        <BiTrash className="text-lg" />
                        Remover
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
