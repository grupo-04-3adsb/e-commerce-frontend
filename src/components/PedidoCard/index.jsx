import { useState, useEffect } from "react";
import { Badge, Card, CardBody, Button, Skeleton } from "@nextui-org/react";
import { FaCheckCircle, FaEye, FaStopCircle, FaTruck } from "react-icons/fa";

export const PedidoCard = ({
  pedido = {
    id: 6,
    valorTotal: 0.01,
    valorDesconto: 10.0,
    valorFrete: 20.0,
    status: "EM_ROTA",
    dataPedido: "19:38 | 29/03/2025",
    enderecoEntrega: {
      rua: "Rua Londres",
      numero: "68",
      bairro: "Bairro Jardim das Nações",
      cidade: "Diadema",
      estado: "SP",
      cep: "09930-220",
    },
    itens: [
      {
        id: 28,
        quantidade: 2,
        valorTotal: 200.0,
        produto: {
          nome: "Caneca Playstation",
          urlProduto:
            "https://cdn.awsli.com.br/600x450/1225/1225697/produto/130152295/9ee6196526.jpg",
        },
      },
    ],
  },
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800); 

    return () => clearTimeout(timer);
  }, []);

  const statusIcons = {
    EM_ROTA: <FaTruck className="w-5 h-5 text-[#EB6D6D]" />,
    ENTREGUE: <FaCheckCircle className="w-5 h-5 text-[#4CAF50]" />,
    CANCELADO: <FaStopCircle className="w-5 h-5 text-[#F44336]" />,
  };

  return (
    <Card className="w-full bg-slate-50 shadow-lg rounded-lg p-4">
      <CardBody className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton
            isLoaded={!loading}
            animated
            width="30%"
            height={30}
            classNames={{ base: "bg-gray-200" }}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Pedido #{pedido.id}
            </h3>
          </Skeleton>

          <div className="flex items-center gap-2">
            <Skeleton
              isLoaded={!loading}
              animated
              width={30}
              height={30}
              classNames={{ base: "bg-gray-200" }}
            >
              {statusIcons[pedido.status]}
            </Skeleton>
            <Badge variant="flat" color="error" size="sm">
              <Skeleton
                isLoaded={!loading}
                animated
                width={50}
                height={20}
                classNames={{ base: "bg-gray-200" }}
              >
                {pedido.status.replace("_", " ")}
              </Skeleton>
            </Badge>
          </div>
        </div>

        {/* Remover o Divider durante o carregamento */}
        {loading ? null : <div className="border-t border-gray-300 my-4" />}

        <div className="text-sm text-gray-700 flex gap-5 flex-wrap">
          <div>
            <Skeleton
              isLoaded={!loading}
              animated
              width="80%"
              height={20}
              classNames={{ base: "bg-gray-200" }}
            >
              <p>
                <strong>Data:</strong> {pedido.dataPedido}
              </p>
              <p>
                <strong>Endereço:</strong> {pedido.enderecoEntrega.rua},{" "}
                {pedido.enderecoEntrega.numero}, {pedido.enderecoEntrega.bairro}
              </p>
              <p>
                <strong>Cidade:</strong> {pedido.enderecoEntrega.cidade} -{" "}
                {pedido.enderecoEntrega.estado}, {pedido.enderecoEntrega.cep}
              </p>
            </Skeleton>
          </div>

          <div>
            <Skeleton
              isLoaded={!loading}
              animated
              width="80%"
              height={20}
              classNames={{ base: "bg-gray-200" }}
            >
              <p>
                <strong>Valor Total:</strong> R$ {pedido.valorTotal.toFixed(2)}
              </p>
              <p>
                <strong>Desconto:</strong> R$ {pedido.valorDesconto.toFixed(2)}
              </p>
              <p>
                <strong>Frete:</strong> R$ {pedido.valorFrete.toFixed(2)}
              </p>
            </Skeleton>
          </div>
        </div>

        {loading ? null : <div className="border-t border-gray-300 my-4" />}

        <div>
          {loading ? (
            <Skeleton>
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md shadow-sm">
                <Skeleton
                  width={50}
                  height={50}
                  classNames={{ base: "bg-gray-200" }}
                />
                <div className="flex flex-col">
                  <Skeleton
                    width="80%"
                    height={20}
                    classNames={{ base: "bg-gray-200" }}
                  />
                  <Skeleton
                    width="60%"
                    height={15}
                    classNames={{ base: "bg-gray-200" }}
                  />
                </div>
              </div>
            </Skeleton>
          ) : (
            <h4 className="text-lg font-semibold text-gray-800">
              Itens do Pedido
            </h4>
          )}
          <ul className="list-none space-y-2">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md shadow-sm"
                  >
                    <Skeleton
                      isLoaded={!loading}
                      animated
                      width={50}
                      height={50}
                      classNames={{ base: "bg-gray-200" }}
                    >
                      <div className="w-12 h-12 object-cover rounded-lg bg-gray-300" />
                    </Skeleton>
                    <div className="flex flex-col gap-2">
                      <Skeleton
                        isLoaded={!loading}
                        animated
                        width="80%"
                        height={20}
                        classNames={{ base: "bg-gray-200" }}
                      >
                        <p className="font-medium text-gray-800">loading....</p>
                      </Skeleton>
                      <Skeleton
                        isLoaded={!loading}
                        animated
                        width="60%"
                        height={15}
                        classNames={{ base: "bg-gray-200" }}
                      >
                        <p className="text-xs text-gray-500">loading...</p>
                      </Skeleton>
                    </div>
                    <div className="flex flex-col">
                      <Skeleton
                        isLoaded={!loading}
                        animated
                        width="80%"
                        height={20}
                        classNames={{ base: "bg-gray-200" }}
                      >
                        <div className="bg-gray-300 h-5 rounded" />
                      </Skeleton>
                      <Skeleton
                        isLoaded={!loading}
                        animated
                        width="60%"
                        height={15}
                        classNames={{ base: "bg-gray-200" }}
                      >
                        <div className="bg-gray-300 h-4 rounded" />
                      </Skeleton>
                    </div>
                  </li>
                ))
              : pedido.itens.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-md shadow-sm"
                  >
                    <img
                      src={item.produto.urlProduto}
                      alt={item.produto.nome}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex flex-col">
                      <p className="font-medium text-gray-800">
                        {item.produto.nome} (x{item.quantidade})
                      </p>
                      <p className="text-xs text-gray-500">
                        R$ {item.valorTotal.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
          </ul>
        </div>

        {loading ? null : <div className="border-t border-gray-300 my-4" />}

        <div className="mt-4 flex gap-4 justify-end">
          <Skeleton
            isLoaded={!loading}
            animated
            width={120}
            height={40}
            classNames={{ base: "bg-gray-200" }}
          >
            <Button
              color="error"
              size="md"
              startContent={<FaEye />}
              className=" bg-[#EB6D6D] hover:bg-[#d45a5a] text-white"
            >
              Detalhes
            </Button>
          </Skeleton>
        </div>
      </CardBody>
    </Card>
  );
};
