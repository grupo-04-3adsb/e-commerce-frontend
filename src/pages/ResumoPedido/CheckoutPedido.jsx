import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Divider } from "@nextui-org/react";
import { FaPix } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CheckoutComponent from "../../components/CheckoutComponent";
import useCarrinhoApi from "../../hooks/api/useCarrinhoApi";

const ResumoPedido = () => {
  const usuario = useSelector((state) => state.usuario?.usuario?.usuario);
  const [dadosPedido, setDadosPedido] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { buscarCarrinhoPorIdUsuario } = useCarrinhoApi();
  const carrinhoId = useSelector((state) => state.carrinho.id);

  useEffect(() => {
    console.log("CarrinhoId", carrinhoId);
  }, [carrinhoId]);

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        setIsLoading(true);
        const pedidoData = await buscarCarrinhoPorIdUsuario(usuario.idUsuario);
        setDadosPedido(pedidoData.data);
        console.log(pedidoData);
      } catch (error) {
        console.error("Erro ao carregar o pedido:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPedido();
  }, []);

  const Skeleton = ({ height, width }) => (
    <div
      className="bg-gray-200 animate-pulse"
      style={{
        height: height || "1rem",
        width: width || "100%",
        borderRadius: "0.375rem",
      }}
    ></div>
  );

  return (
    <div className="flex flex-wrap justify-between gap-8 p-4 bg-white rounded-lg md:p-10">
      <Card className="w-full md:flex-1 bg-white shadow-md rounded-lg">
        <CardBody className="overflow-visible py-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-gray-700">
                  Nome Completo do Pagador
                </h2>
                <input
                  type="text"
                  value={usuario.nome}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-gray-700">CPF</h2>
                <input
                  type="text"
                  value={usuario.cpf}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-bold text-gray-700">Email</h2>
                <input
                  type="email"
                  value={usuario.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100"
                />
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 mt-6">
            <div className="flex flex-wrap justify-between">
              <h2 className="text-lg font-bold text-gray-700">
                Endereço de entrega
              </h2>
              {isLoading ? (
                <Skeleton height="1rem" width="50%" />
              ) : (
                <h3 className="text-sm text-gray-500">
                  Data de entrega: {dadosPedido?.dataEntrega}
                </h3>
              )}
            </div>
            {isLoading ? (
              <Skeleton height="8rem" />
            ) : (
              <div
                key={dadosPedido?.enderecoEntrega?.id}
                className="flex flex-col p-4 border border-gray-300 rounded-lg shadow-md cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">
                    {dadosPedido?.enderecoEntrega?.rua},{" "}
                    {dadosPedido?.enderecoEntrega?.numero}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {dadosPedido?.enderecoEntrega?.bairro} -{" "}
                  {dadosPedido?.enderecoEntrega?.cidade}/
                  {dadosPedido?.enderecoEntrega?.estado}
                </p>
                <p className="text-sm text-gray-500">
                  CEP: {dadosPedido?.enderecoEntrega?.cep}
                </p>
                {dadosPedido?.enderecoEntrega?.instrucaoEntrega && (
                  <p className="text-xs italic text-gray-400 mt-2">
                    {dadosPedido?.enderecoEntrega?.instrucaoEntrega}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <div className="flex flex-col w-full md:flex-1">
        <Card className="bg-white shadow-md rounded-lg">
          <CardHeader className="pb-0 pt-4 px-6">
            <h2 className="text-xl font-bold text-red-600 text-center">
              Resumo do Pedido
            </h2>
          </CardHeader>
          <CardBody className="py-4">
            <Divider orientation="horizontal" />
            <h2 className="text-lg font-bold mt-4">Produtos</h2>
            {isLoading ? (
              <Skeleton height="8rem" />
            ) : (
              dadosPedido.itens?.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="flex justify-between items-end text-gray-800 text-base">
                    <div className="flex flex-col">
                      <span>{item.produto.nome}</span>
                      <span>Quantidade: {item.quantidade}</span>
                    </div>
                    <span>
                      R${" "}
                      {item.desconto > 0
                        ? (
                            (item.produto.preco -
                              (item.produto.preco * item.desconto) / 100) *
                            item.quantidade
                          ).toFixed(2)
                        : (item.produto.preco * item.quantidade).toFixed(2)}
                    </span>
                  </div>
                  <Divider orientation="horizontal" />
                </React.Fragment>
              ))
            )}
            <h2 className="text-lg font-bold mt-4">Informações de pagamento</h2>
            {isLoading ? (
              <Skeleton height="3rem" />
            ) : (
              <>
                <div className="flex justify-between items-end text-gray-800 text-base">
                  <span>Frete</span>
                  <span>R$ {(dadosPedido.valorFrete).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-end text-gray-800 text-base">
                  <span>Forma de Pagamento</span>
                  <span className="flex items-center gap-2">
                    <FaPix className="text-teal-500" />
                    {dadosPedido.formaPagamento}
                  </span>
                </div>
              </>
            )}
            <Divider orientation="horizontal" />
            <div className="flex justify-between font-bold text-lg text-black">
              {isLoading ? (
                <Skeleton height="2rem" width="50%" />
              ) : (
                <>
                  <span>Total</span>
                  <span>
                    R$ {parseFloat(dadosPedido?.valorTotal).toFixed(2)}
                  </span>
                </>
              )}
            </div>
          </CardBody>
        </Card>
        <div className="flex justify-center mt-6">
          <CheckoutComponent />
        </div>
      </div>
    </div>
  );
};

export default ResumoPedido;
